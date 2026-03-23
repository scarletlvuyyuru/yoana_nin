import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  canonical?: string;
  schema?: string | string[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url = 'https://yoananincoaching.com',
  image = 'https://yoananincoaching.com/metaOG.png',
  canonical,
  schema
}) => {
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{s}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
