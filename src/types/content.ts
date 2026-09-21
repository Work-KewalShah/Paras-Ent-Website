export interface B2BContent {
  ctaHref: string;
}

export interface Product {
  slug: string;
  image: string;
  hasUseCases?: boolean;
}

export interface CaseStudy {
  slug: string;
  image: string; // exact filename with extension
}