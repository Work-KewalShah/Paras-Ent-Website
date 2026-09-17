export interface B2BContent {
  headline: string;
  body: string;
  ctaText: string;
  ctaHref: string;
}

export interface Product {
  title: string;
  tagline: string;
  features: string[];
  useCases?: string[];
  image: string;
}

export interface CaseStudy {
  clientName: string;
  painPoint: string;
  solution: string;
  result: string;
  testimonial: string;
  testimonialAuthor: string;
  image: string; // exact filename with extension
}