import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './MobileInteractions.module.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------
   Scroll reveal: elements marked data-reveal fade up into view.
   Content is fully visible without JS (prerendered HTML); the
   hidden start state only applies once this hook has run.
   --------------------------------------------------------- */
export function useReveal(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    root.classList.add(styles.revealReady);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove(styles.revealReady);
    };
  }, [rootRef]);
}

/* ---------------------------------------------------------
   Mobile self-check: one statement at a time, swipe or tap.
   --------------------------------------------------------- */
interface SelfCheckDeckProps {
  statements: string[];
  checked: boolean[];
  onAnswer: (index: number, value: boolean) => void;
  onReset: () => void;
  renderResult: () => React.ReactNode;
}

const SWIPE_THRESHOLD = 80;

export const SelfCheckDeck: React.FC<SelfCheckDeckProps> = ({ statements, checked, onAnswer, onReset, renderResult }) => {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [exit, setExit] = useState<'left' | 'right' | null>(null);
  const startX = useRef<number | null>(null);
  const total = statements.length;
  const done = index >= total;

  const answer = (value: boolean) => {
    if (exit || done) return;
    onAnswer(index, value);
    if (prefersReducedMotion()) {
      setIndex((i) => i + 1);
      return;
    }
    setExit(value ? 'right' : 'left');
    window.setTimeout(() => {
      setExit(null);
      setDragX(0);
      setIndex((i) => i + 1);
    }, 240);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (exit) return;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setDragX(e.clientX - startX.current);
  };

  const onPointerUp = () => {
    if (startX.current === null) return;
    startX.current = null;
    if (dragX > SWIPE_THRESHOLD) answer(true);
    else if (dragX < -SWIPE_THRESHOLD) answer(false);
    else setDragX(0);
  };

  const restart = () => {
    onReset();
    setIndex(0);
  };

  if (done) {
    return (
      <div className={styles.deckDone} aria-live="polite">
        {renderResult()}
        <button type="button" className={styles.deckRestart} onClick={restart}>
          Start over
        </button>
      </div>
    );
  }

  const topTransform = exit
    ? `translateX(${exit === 'right' ? 130 : -130}%) rotate(${exit === 'right' ? 14 : -14}deg)`
    : `translateX(${dragX}px) rotate(${dragX / 18}deg)`;

  const hint = dragX > 30 ? 'yes' : dragX < -30 ? 'no' : null;

  return (
    <div className={styles.deck}>
      <div className={styles.deckProgress}>
        <span>
          {index + 1} of {total}
        </span>
        <div className={styles.deckTrack} aria-hidden="true">
          <div className={styles.deckFill} style={{ width: `${(index / total) * 100}%` }} />
        </div>
      </div>

      <div className={styles.deckStage}>
        {[2, 1].map((offset) => {
          const i = index + offset;
          if (i >= total) return null;
          return (
            <div
              key={i}
              className={`${styles.deckCard} ${styles.deckCardBehind}`}
              style={{ transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.05})` }}
              aria-hidden="true"
            >
              <p>{statements[i]}</p>
            </div>
          );
        })}
        <div
          key={index}
          className={`${styles.deckCard} ${startX.current !== null ? styles.dragging : ''}`}
          style={{ transform: topTransform, opacity: exit ? 0 : 1 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className={`${styles.stamp} ${styles.stampYes} ${hint === 'yes' ? styles.stampOn : ''}`}>That's me</span>
          <span className={`${styles.stamp} ${styles.stampNo} ${hint === 'no' ? styles.stampOn : ''}`}>Not really</span>
          <p aria-live="polite">{statements[index]}</p>
          <span className={styles.swipeHint} aria-hidden="true">
            ← swipe →
          </span>
        </div>
      </div>

      <div className={styles.deckButtons}>
        <button type="button" className={styles.deckNo} onClick={() => answer(false)}>
          Not really
        </button>
        <button type="button" className={styles.deckYes} onClick={() => answer(true)}>
          Yes, that's me
        </button>
      </div>

      <div className={styles.deckFooter}>
        <button
          type="button"
          className={styles.deckBack}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          ← Back
        </button>
        <span className={styles.deckCount}>{checked.filter(Boolean).length} that sound like you</span>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------
   Help cards: side-scrolling on mobile, with position dots.
   --------------------------------------------------------- */
export const HelpCarousel: React.FC<{
  className: string;
  count: number;
  children: React.ReactNode;
  as?: 'div' | 'ul';
  label?: string;
}> = ({ className, count, children, as: Track = 'div', label = 'card' }) => {
  const trackRef = useRef<HTMLDivElement & HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    setActive(Math.min(count - 1, Math.round(track.scrollLeft / step)));
  };

  const goTo = (i: number) => {
    const card = trackRef.current?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  return (
    <>
      <Track ref={trackRef} className={className} onScroll={onScroll}>
        {children}
      </Track>
      <div className={styles.dots}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`Show ${label} ${i + 1} of ${count}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
};

/* ---------------------------------------------------------
   Sticky "Book a free call" bar (mobile only, via CSS).
   Rendered into <body> because .main-content uses
   `contain: layout`, which would trap position: fixed.
   --------------------------------------------------------- */
interface StickyCallBarProps {
  to: string;
  showAfter: React.RefObject<HTMLElement | null>;
  hideWhen: React.RefObject<HTMLElement | null>[];
}

export const StickyCallBar: React.FC<StickyCallBarProps> = ({ to, showAfter, hideWhen }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!('IntersectionObserver' in window)) return;

    const state = new Map<Element, boolean>();
    let scrolledPastStart = false;
    const startEl = showAfter.current;
    const blockers = hideWhen.map((r) => r.current).filter(Boolean) as Element[];
    const footer = document.querySelector('footer');
    if (footer) blockers.push(footer);

    const update = () => {
      const pastStart = startEl ? scrolledPastStart : true;
      const blocked = blockers.some((el) => state.get(el));
      setVisible(pastStart && !blocked);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        state.set(entry.target, entry.isIntersecting);
        // Only count the start element as passed once it has left through the top of the screen.
        if (entry.target === startEl) {
          scrolledPastStart = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        }
      });
      update();
    });

    if (startEl) observer.observe(startEl);
    blockers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showAfter, hideWhen]);

  if (!mounted) return null;

  return createPortal(
    <div className={`${styles.callBar} ${visible ? styles.callBarVisible : ''}`} aria-hidden={!visible}>
      <div className={styles.callBarText}>
        <strong>Free 30-minute call</strong>
        <span>No pressure, no obligation</span>
      </div>
      <Link to={to} className={styles.callBarButton} tabIndex={visible ? 0 : -1} onClick={() => window.scrollTo(0, 0)}>
        Book now
      </Link>
    </div>,
    document.body
  );
};
