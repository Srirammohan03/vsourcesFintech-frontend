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

export interface FAQListItem {
  id: number;
  list: string;
}

export interface FAQContent {
  id: number;
  description: string | null;
  list: FAQListItem[];
}

export interface FAQ {
  id: number;
  title: string;
  content: FAQContent[];
}

interface ProviderListItem {
  id: number;
  list: string;
}

// Blocked account provider
interface BlockedAccountProvider {
  id: number;
  title: string;
  description: string;
  image: Image;
  list: ProviderListItem[];
}

export interface BlockedAccount {
  id: number;
  heading: string;
  description: string;
  provider_heading: string;
  background_image: Image;
  faq: FAQ[];
  blocked_account_providers: BlockedAccountProvider[];
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

//! Bank Account

export interface BankAccount {
  id: number;
  heading: string;
  description: string;
  top_bank_heading: string;
  background_image: Image;
  top_banks: TopBanks[];
}

export interface TopBanks {
  id: number;
  country: string;
  background_image: Image;
  list: List[];
}

//! forex card

export interface ForexCard {
  id: number;
  heading: string;
  description: string;
  partner_heading: string;
  partner_description: string;
  works_heading: string;
  work_description: string;
  benefits_heading: string;
  card_management_heading: string;
  Features_heading: string;
  background_image: Image;
  partner_image: Image;
  works: Work[];
  benfits: Benfits[];
  management: Benfits[];
  features: Features[];
}

export interface Work {
  id: number;
  title: string;
  description: string;
}

export interface Features {
  id: number;
  heading: string;
  description: string;
}

export interface Benfits {
  id: number;
  title: string;
  list: List[];
}
