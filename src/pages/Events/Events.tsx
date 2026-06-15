import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Events.module.css';
import SEO from '../../components/SEO/SEO';

const podcastHeroImage = '/images/events/podcast/Adhd_Advantage_Podcast.webp';
const womensDayPressImage = '/images/events/womens-day-expo/Yoana_Giving_Speech_KeynoteSpeaker.webp';
const relayForLifeCollageImages = [
  {
    src: '/images/events/relay-for-life/RelayForLife.webp',
    alt: 'Yoana Nin at Relay for Life community event',
  },
  {
    src: '/images/events/relay-for-life/RelayForLifePosingBySign.webp',
    alt: 'Yoana Nin posing by Relay for Life event sign',
  },
  {
    src: '/images/events/relay-for-life/KissingCameraAtRelayForLife.webp',
    alt: 'Candid moment from Relay for Life event',
  },
];
const sheSafeHomeCollageImages = [
  {
    src: '/images/events/she-safe-home/SHE1YoanaPosing.webp',
    alt: 'Yoana Nin posing at the S.H.E. Safe Home Network event',
  },
  {
    src: '/images/events/she-safe-home/SHEYoanaExcited.webp',
    alt: 'Yoana Nin presenting ADHD strategies at S.H.E. Safe Home Network',
  },
  {
    src: '/images/events/she-safe-home/SHEYoanaInteracting.webp',
    alt: 'Yoana Nin interacting with attendees at S.H.E. Safe Home Network',
  },
];
const womensDayCollageImages = [
  {
    src: '/images/events/womens-day-expo/Yoana_Giving_Speech_KeynoteSpeaker.webp',
    alt: 'Yoana Nin delivering her keynote speech at the Women\'s Day Expo',
  },
  {
    src: '/images/events/womens-day-expo/Yoana_Speaking_onStage.webp',
    alt: 'Yoana Nin speaking on stage at the Women\'s Day Expo',
  },
  {
    src: '/images/events/womens-day-expo/Yoana_with_EventLeader.webp',
    alt: 'Yoana Nin with an event leader at the Women\'s Day Expo',
  },
  {
    src: '/images/events/womens-day-expo/Yoana_full_group_photo.webp',
    alt: 'Group photo from the Women\'s Day Expo event',
  },
];

const eventSections = [
  {
    title: 'Relay for Life',
    date: 'May 30, 2025',
    role: 'Participant',
    location: 'Fenton Square',
    summary:
      'Bringing her passion for community leadership to Fenton Square, Yoana Nin participated in the Relay for Life of the Triangle 1-mile walk. This inspiring event brought the local community together to celebrate cancer survivors, remember loved ones, and raise vital support for the global fight against cancer.',
    assetFolder: '/images/events/relay-for-life/',
    image: relayForLifeCollageImages[0].src,
    imageAlt: relayForLifeCollageImages[0].alt,
    collageImages: relayForLifeCollageImages,
    accent: 'Warm community energy and visible service.',
  },
  {
    title: '4th Annual International Women\'s Day Expo',
    date: 'Keynote Speaker',
    role: 'Speaker',
    location: 'NC State University McKimmon Center',
    summary:
      'Yoana Nin took the stage as a keynote speaker at the 4th Annual International Women\'s Day Expo at NC State University\'s McKimmon Center, inspiring an audience of local change-makers. Drawing from her journey as a first-generation immigrant and award-winning CEO, she shared actionable strategies on mastering emotional regulation and executive function to help women entrepreneurs build extraordinary lives.',
    assetFolder: '/images/events/womens-day-expo/',
    image: womensDayPressImage,
    imageAlt: 'Yoana Nin speaking beside her coaching banner at an event',
    collageImages: womensDayCollageImages,
    accent: 'A keynote moment with leadership, clarity, and momentum.',
  },
  {
    title: 'S.H.E. Safe Home Network',
    date: 'Speaker',
    role: 'ADHD Strategy Presenter',
    location: 'Women in home services and trades',
    summary:
      'At a recent gathering for the S.H.E. Safe Home Network, Yoana Nin presented actionable ADHD management strategies tailored for women in home services and trades. Drawing from her frameworks at Yoana Nin Coaching, she shared practical tactics for conquering task initiation and executive dysfunction to help these professionals streamline their businesses and daily lives.',
    assetFolder: '/images/events/she-safe-home/',
    image: sheSafeHomeCollageImages[0].src,
    imageAlt: sheSafeHomeCollageImages[0].alt,
    collageImages: sheSafeHomeCollageImages,
    accent: 'Practical tools for busy professionals and business owners.',
  },
];

const Events: React.FC = () => {
  const [newsletterLoadTime] = useState(() => Date.now());

  return (
    <>
      <SEO
        title="Events & Speaking | Yoana Nin — ADHD Coach & Keynote Speaker"
        description="Explore Yoana Nin's speaking engagements, media features, podcast appearances, and community impact events. Available for keynotes and ADHD entrepreneurship talks."
        url="https://yoananincoaching.com/events"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://yoananincoaching.com/events",
          "url": "https://yoananincoaching.com/events",
          "name": "Events & Speaking — Yoana Nin",
          "description": "Speaking engagements, podcast appearances, media features, and community events featuring Yoana Nin — certified ADHD life coach and women's entrepreneur advocate.",
          "inLanguage": "en-US",
          "isPartOf": { "@id": "https://yoananincoaching.com/#website" },
          "about": {
            "@type": "Person",
            "name": "Yoana Nin",
            "@id": "https://yoananincoaching.com/#person",
            "jobTitle": "ADHD Life Coach & Keynote Speaker"
          }
        })}
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Events</p>
              <h1 className={styles.title}>Momentum in motion: Where strategy meets community.</h1>
              <p className={styles.subtitle}>
                Catch the latest podcast drops, local Raleigh events, and raw strategies designed to help neurodivergent women stop fighting their brains and start scaling their businesses.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#featured-story">
                  Featured Story
                </a>
                <Link className={styles.secondaryButton} to="/contact/">
                  Book Yoana
                </Link>
              </div>
            </div>

            <div className={styles.heroMediaCard}>
              <img
                className={styles.heroImage}
                src={podcastHeroImage}
                alt="Podcast promotional artwork for Yoana Nin's ADHD Agent Advantage webinar"
              />
              <a
                className={styles.heroListenCta}
                href="https://www.youtube.com/live/hRDRSGsAEFg?si=aVMlcokZjUo2F0Ue"
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.playBadge} aria-hidden="true">
                  <span className={styles.playTriangle} />
                </span>
                Press Play, Not Panic - Listen Here
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-story" className={`${styles.section} ${styles.pressSection}`}>
        <div className={styles.container}>
          <article className={styles.magazineFeature}>
            <div className={styles.magazineQuoteRail} aria-hidden="true">
              <span className={styles.magazineQuoteGlyph}>“</span>
            </div>

            <div className={styles.magazineBody}>
              <div className={styles.sectionHeading}>
                <p className={styles.sectionKicker}>In the press</p>
                <h2 className={styles.sectionTitle}>Voyage Raleigh feature</h2>
              </div>

              <div className={styles.magazineContentGrid}>
                <div className={styles.magazineTextColumn}>
                  <h3 className={styles.featureQuote}>Turning chaos into clarity and strength.</h3>
                  <p className={styles.sectionText}>
                    As featured in VoyageRaleigh, award-winning CEO and empowerment coach Yoana Nin shares how her journey as a first-generation immigrant inspires her work helping women entrepreneurs overcome overwhelm and build extraordinary lives.
                  </p>
                  <a
                    className={styles.featureLink}
                    href="https://voyageraleigh.com/interview/meet-yoana-nin-of-the-prosperous-agency-and-yoana-nin-coaching"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the full feature
                  </a>
                </div>

                <div className={styles.magazinePortraitWrap}>
                  <img className={styles.magazinePortrait} src={womensDayPressImage} alt="Yoana Nin speaking at the Women's Day Expo keynote" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="community-highlights" className={`${styles.section} ${styles.altSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionKicker}>Community impact</p>
            <h2 className={styles.sectionTitle}>Where Yoana shows up</h2>
          </div>

          <div className={styles.eventsList}>
            {eventSections.map((event, index) => (
              <article
                className={`${styles.eventCard} ${event.collageImages?.length ? styles.eventCardStacked : ''} ${!event.collageImages?.length && index % 2 === 1 ? styles.eventCardReverse : ''} ${index === 2 ? styles.eventCardSpotlight : ''}`}
                key={event.title}
              >
                <div className={styles.eventContent}>
                  <p className={styles.eventMeta}>
                    {event.role} · {event.date}
                  </p>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventLocation}>{event.location}</p>
                  <p className={styles.eventSummary}>{event.summary}</p>
                  <p className={styles.eventAccent}>{event.accent}</p>
                </div>

                <div className={styles.eventMedia}>
                  {event.collageImages?.length ? (
                    <div className={styles.eventCollageRow}>
                      {event.collageImages.map((image) => (
                        <figure key={image.src} className={styles.eventCollageItem}>
                          <img className={styles.eventCollageImage} src={image.src} alt={image.alt} />
                        </figure>
                      ))}
                    </div>
                  ) : event.image ? (
                    <img className={styles.eventImage} src={event.image} alt={event.imageAlt ?? event.title} />
                  ) : (
                    <div className={`${styles.photoPlaceholder} ${index === 0 ? styles.photoPlaceholderGallery : styles.photoPlaceholderChecklist}`}>
                      <p className={styles.photoPlaceholderLabel}>Photo set coming soon</p>
                      {index === 0 ? (
                        <>
                          <p className={styles.photoPlaceholderText}></p>
                          <p className={styles.photoPlaceholderPath}></p>
                          <div className={styles.placeholderTiles}>
                            <span />
                            <span />
                            <span />
                            <span />
                          </div>
                        </>
                      ) : (
                        <>
                          <p className={styles.photoPlaceholderText}>Photos Coming soon</p>
                          <p className={styles.photoPlaceholderPath}></p>
                        
                        </>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterCopy}>
              <p className={styles.sectionKicker}>Newsletter</p>
              <h2 className={styles.sectionTitle}>Stay close to the next event, podcast drop, and practical ADHD insight.</h2>
              <p className={styles.sectionText}>
                Join the Newsletter for real-world ADHD strategies, event invites, and honest behind-the-scenes guidance to help you feel focused, confident, and in control.
              </p>
            </div>

            <form
              className={styles.newsletterForm}
              name="events-newsletter"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="events-newsletter" />
              <input type="hidden" name="subject" value="New Newsletter Signup - Yoana Nin" />
              <input type="hidden" name="form-timestamp" value={String(newsletterLoadTime)} />
              <input type="text" name="bot-field" className={styles.srOnly} tabIndex={-1} autoComplete="off" />

              <label className={styles.field}>
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" placeholder="Your name" />
              </label>

              <label className={styles.field}>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
              </label>

              <label className={styles.checkboxRow}>
                <input type="checkbox" name="consent" value="Yes" required />
                <span>I agree to receive event updates, coaching insights, and occasional newsletter emails.</span>
              </label>

              <button className={styles.primaryButton} type="submit">
                Join the list
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
