export interface Gallery {
  id: number;
  title: string;
  subheading: string;
  blocks: Blocks[];
}

export interface Students {
  id: number;
  card_title: string;
  card_title1: string;
  students_images: Images[];
}

export interface Blocks {
  id: number;
  __component: string;
  title?: string;
  subheading?: string;
  view360url?: string;
  journey_images?: Images[];
}

export interface Images {
  id: number;
  documentId: string;
  url: string;
  name: string;
  alternativeText?: string;
}
