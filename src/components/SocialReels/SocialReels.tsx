import React from 'react';
import styles from './SocialReels.module.css';
import iconInstagram from '../../assets/images/icon_instagram.webp';
import iconFacebook from '../../assets/images/icon_fb_wht.webp';
import iconTiktok from '../../assets/images/icon_tiktok_wht.webp';
import imgInstagram from '../../assets/images/InstagramCard.webp';
import imgFacebook from '../../assets/images/FacebookCard.webp';
import imgTiktok from '../../assets/images/TikTokCard.webp';

const SOCIALS = [
  {
    platform: 'instagram' as const,
    label: 'Instagram',
    handle: '@yoananincoaching',
    caption: 'Daily mindset shifts & ADHD coaching tips',
    url: 'https://www.instagram.com/yoananincoaching',
    image: imgInstagram,
    icon: iconInstagram,
  },
  {
    platform: 'facebook' as const,
    label: 'Facebook',
    handle: 'Yoana Nin Coaching',
    caption: 'Community conversations & coaching resources',
    url: 'https://www.facebook.com/yoananincoaching',
    image: imgFacebook,
    icon: iconFacebook,
  },
  {
    platform: 'tiktok' as const,
    label: 'TikTok',
    handle: '@yoananincoaching',
    caption: 'Real talk on ADHD, real estate & reinvention',
    url: 'https://www.tiktok.com/@yoananincoaching',
    image: imgTiktok,
    icon: iconTiktok,
  },
];

const SocialReels: React.FC = () => {
  return (
    <section className={styles.section} aria-label="Follow Yoana on social media">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Behind the Sessions</p>
        <h2 className={styles.heading}>Follow Along</h2>
        <p className={styles.subheading}>
          Real moments, mindset tips, and community — wherever you spend your scroll time.
        </p>

        <div className={styles.reelsTrack} role="list">
          {SOCIALS.map(({ platform, label, handle, caption, url, image, icon }) => (
            <div
              key={platform}
              className={styles.reelCard}
              data-platform={platform}
              role="listitem"
            >
              <img
                src={image}
                alt={`Preview of Yoana's ${label} content`}
                className={styles.thumbnail}
                loading="lazy"
              />

              {/* Play hint icon — purely decorative */}
              <div className={styles.playHint} aria-hidden="true">▶</div>

              {/* Platform badge top-left */}
              <div className={styles.platformBadge} aria-hidden="true">
                <img src={icon} alt="" className={styles.platformIcon} />
                <span>{label}</span>
              </div>

              {/* Slide-up overlay with caption */}
              <div className={styles.overlay} aria-hidden="true">
                <p className={styles.caption}>{caption}</p>
                <span className={styles.handle}>{handle}</span>
              </div>

              {/* CTA — the only interactive element, keyboard-accessible */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.followBtn}
                aria-label={`Follow Yoana on ${label} — opens in new tab`}
              >
                Follow on {label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialReels;
