export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  categoryLabel: string;
  region: string;
  county: string;
  author: string;
  date: string;
  readingTime: number;
  image: string;
  imageAlt: string;
  tags: string[];
  label: 'verificat' | 'date-oficiale' | 'contributie-comunitara' | 'model-replicabil';
  featured: boolean;
  isGoodModel: boolean;
  impact?: string;
  source?: string;
}

export interface Category {
  slug: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export interface GoodModel {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryLabel: string;
  county: string;
  scale: 'localitate' | 'oras' | 'judet' | 'national';
  impact: string;
  howItWorked: string[];
  resources: string;
  contact: string;
  replicatedIn: number;
  articleSlug: string;
  date: string;
}

export interface County {
  id: string;
  name: string;
  region: string;
  stories: number;
  latestStory: string;
  articleSlug: string;
}
