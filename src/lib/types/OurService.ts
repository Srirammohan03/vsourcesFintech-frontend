import { BanksBlock, Image } from "./LandingPage";

export interface Services {
  id: number;
  heading: string;
  heading1: string;
  description: string;
  heading2: string;
  eligible_description: string;
  heading_schemes: string;
  background_image: Image;
  list: List[];
  desktop_img: Image;
  mobile_img: Image;
  eligible: Eligible[];
  bank: BanksBlock;
  schemes_lenders: SchemesLenders[];
}

export interface CreditCardService {
  id: number;
  heading: string;
  description: string;
  partner_heading: string;
  partner_description: string;
  works_heading: string;
  work_description: string;
  financial_heading: string;
  background_image: Image;
  list: List[];
  partner_image: Image;
  works_card: WorksCard[];
  financial_card: FinancialCard[];
}

export interface List {
  id: number;
  list: string;
}

export interface WorksCard {
  id: number;
  heading: string;
  description: string;
}

export interface FinancialCard {
  id: number;
  title: string;
  shortHead: string;
  shortContent: string;
  image: Image;
  points: Point[];
}

export interface Point {
  id: number;
  list: string;
}

export interface List {
  id: number;
  list: string;
}

export interface Eligible {
  id: number;
  criteria: string;
  details: string;
}

export interface Bank {
  id: number;
  heading: string;
  description: string;
  bank: InnerBank[];
}

export interface InnerBank {
  id: number;
  name: string;
  slug: string;
  path: string;
  logo: Image;
}

export interface SchemesLenders {
  id: number;
  bank: string;
  scheme: string;
  tenure: string;
}
