import React from 'react';
import { Helmet } from 'react-helmet-async';

const sitewideSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://yoananincoaching.com/#website',
      url: 'https://yoananincoaching.com',
      name: 'Yoana Nin Coaching',
      description:
        'ADHD coaching and business strategy for women entrepreneurs, serving clients virtually across the U.S. and locally in North Carolina.',
      inLanguage: 'en-US',
      publisher: {
        '@id': 'https://yoananincoaching.com/#organization',
      },
    },
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': 'https://yoananincoaching.com/#organization',
      name: 'Yoana Nin Coaching',
      url: 'https://yoananincoaching.com',
      image: 'https://yoananincoaching.com/metaOG.png',
      logo: 'https://yoananincoaching.com/web-app-manifest-512x512.png',
      description:
        'ADHD coaching and business strategy for women entrepreneurs, offered virtually across the U.S. and in person in the Raleigh-Durham Triangle area.',
      email: 'yoana@yoananin.com',
      telephone: '+1-919-530-1252',
      priceRange: '$$$',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'yoana@yoananin.com',
          telephone: '+1-919-530-1252',
          areaServed: 'US',
          availableLanguage: ['en'],
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cary',
        addressRegion: 'NC',
        addressCountry: 'US',
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'United States',
        },
        {
          '@type': 'City',
          name: 'Raleigh',
        },
        {
          '@type': 'City',
          name: 'Cary',
        },
        {
          '@type': 'City',
          name: 'Apex',
        },
        {
          '@type': 'City',
          name: 'Durham',
        },
        {
          '@type': 'City',
          name: 'Chapel Hill',
        },
      ],
      knowsAbout: [
        {
          '@type': 'DefinedTerm',
          name: 'Attention deficit hyperactivity disorder',
          sameAs: 'https://en.wikipedia.org/wiki/Attention_deficit_hyperactivity_disorder',
        },
        'ADHD Coaching',
        'Executive Function Support',
        'Women Entrepreneurship',
        'Business Strategy',
      ],
      sameAs: [
        'https://www.youtube.com/@ElevatewithYoanaNin',
        'https://www.facebook.com/Nin.Yoana/',
        'https://www.instagram.com/yoananincoaching/',
        'https://www.linkedin.com/in/yoananin',
        'https://www.tiktok.com/@adhdcoachyoana',
      ],
      founder: {
        '@id': 'https://yoananincoaching.com/#person',
      },
      hasOfferCatalog: {
        '@id': 'https://yoananincoaching.com/coaching#offer-catalog',
      },
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@id': 'https://yoananincoaching.com/coaching#group-service',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@id': 'https://yoananincoaching.com/coaching#private-service',
          },
        },
      ],
    },
    {
      '@type': 'OfferCatalog',
      '@id': 'https://yoananincoaching.com/coaching#offer-catalog',
      name: 'Yoana Nin Coaching Offers',
      url: 'https://yoananincoaching.com/coaching',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: 2,
      itemListElement: [
        {
          '@type': 'Offer',
          position: 1,
          itemOffered: {
            '@id': 'https://yoananincoaching.com/coaching#group-service',
          },
        },
        {
          '@type': 'Offer',
          position: 2,
          itemOffered: {
            '@id': 'https://yoananincoaching.com/coaching#private-service',
          },
        },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://yoananincoaching.com/coaching#group-service',
      name: 'A Daily Healing Diary Circle',
      serviceType: 'Group ADHD Coaching',
      url: 'https://yoananincoaching.com/coaching#group-offer',
      provider: {
        '@id': 'https://yoananincoaching.com/#organization',
      },
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://yoananincoaching.com/coaching',
        availableLanguage: 'en',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://yoananincoaching.com/coaching#group-offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://yoananincoaching.com/coaching#private-service',
      name: '6-Month Private Coaching',
      serviceType: 'Private ADHD Business Coaching',
      url: 'https://yoananincoaching.com/coaching#private-offer',
      provider: {
        '@id': 'https://yoananincoaching.com/#organization',
      },
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: 'https://yoananincoaching.com/coaching',
        availableLanguage: 'en',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://yoananincoaching.com/coaching#private-offer',
        availability: 'https://schema.org/LimitedAvailability',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://yoananincoaching.com/#person',
      name: 'Yoana Nin',
      jobTitle: 'ADHD Entrepreneur Coach',
      url: 'https://yoananincoaching.com/my-story',
      image: 'https://yoananincoaching.com/YoanaIseeYou.webp',
      knowsLanguage: ['en', 'hu', 'ro'],
      worksFor: {
        '@id': 'https://yoananincoaching.com/#organization',
      },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Certification',
          name: 'Jay Shetty Certified Life & Success Coach',
        },
      ],
      sameAs: [
        'https://www.youtube.com/@ElevatewithYoanaNin',
        'https://www.facebook.com/Nin.Yoana/',
        'https://www.instagram.com/yoananincoaching/',
        'https://www.linkedin.com/in/yoananin',
        'https://www.tiktok.com/@adhdcoachyoana',
      ],
    },
  ],
};

const SitewideSchema: React.FC = () => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(sitewideSchema)}</script>
  </Helmet>
);

export default SitewideSchema;