/**
 * TypeScript interfaces for structured data schemas
 */

export interface Person {
  name: string;
  jobTitle: string;
  description?: string;
  email?: string;
  phone?: string;
  worksFor?: Organization;
  address?: Address;
  areaServed?: Place;
  hasOccupation?: Occupation[];
  knowsAbout?: string[];
  sameAs?: string[];
}

export interface Organization {
  name: string;
  url?: string;
  logo?: string;
  description?: string;
  employee?: Person[];
  founder?: Person;
  areaServed?: Place;
  knowsAbout?: string[];
  sameAs?: string[];
}

export interface Occupation {
  name: string;
  occupationLocation?: Place;
  description?: string;
}

export interface Place {
  name: string;
  addressRegion?: string;
  addressLocality?: string;
  addressCountry?: string;
}

export interface Address {
  addressRegion: string;
  addressLocality: string;
  addressCountry?: string;
  postalCode?: string;
  streetAddress?: string;
}

export interface LocalBusiness extends Organization {
  priceRange?: string;
  serviceType?: string[];
  telephone?: string;
  openingHours?: string[];
}