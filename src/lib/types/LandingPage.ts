// src/types/LandingPage.ts

// ---------- Media ----------
export interface Media {
  id: number;
  documentId: string;
  url: string;
  name: string;
  alternativeText?: string | null;
}


// ---------- Banks ----------
export interface Bank {
  id: number;
  name: string;
  slug: string;
  path: string;
  logo: Media;
}

export interface BanksBlock {
  __component: "fintech.banks";
  id: number;
  heading: string;
  description: string;
  bank: Bank[];
}




// ---------- Union of Blocks ----------
export type Block =
  | BanksBlock


