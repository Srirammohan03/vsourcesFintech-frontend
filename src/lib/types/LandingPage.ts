// src/types/LandingPage.ts

// ---------- Media ----------
export interface Media {
  id: number;
  documentId: string;
  url: string;
  name: string;
  alternativeText?: string | null;
}

// ---------- Basic ----------
export interface Basic {
  id: number;
  title: string;
  description: string;
}

// ---------- About Us ----------
export interface AboutUsContent {
  id: number;
  title: string;
  sub_title: string;
  gif: Media | null;
}

export interface AboutNumber {
  id: number;
  count: string;
  text: string;
  image: Media;
}

export interface AboutUsBlock {
  __component: "fintech.about-us";
  id: number;
  heading: string;
  content: AboutUsContent[];
  about_number: AboutNumber[];
  chairman: Media;
}

// ---------- Loan Disbursement ----------
export interface Scholarship {
  id: number;
  student_name: string;
  amount: string;
  country: string;
  image: Media;
}

export interface LoanDisbursementBlock {
  __component: "fintech.loan-disbursement";
  id: number;
  title: string;
  sub_title: string;
  scholarship: Scholarship[];
}

// ---------- Why Loan ----------
export interface WhyLoanList {
  id: number;
  lists: string;
}

export interface WhyLoanSuccess {
  id: number;
  title: string;
  description: string;
}

export interface WhyLoanBlock {
  __component: "fintech.why-loan";
  id: number;
  heading: string;
  sub_title: string;
  image_background: Media | null;
  list_text: WhyLoanList[];
  success_number: WhyLoanSuccess[];
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

// ---------- Services ----------
export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: Media;
}

export interface ServicesBlock {
  __component: "blocks.services";
  id: number;
  title: string;
  services_list: ServiceItem[];
}

// ---------- Comprehensive ----------
export interface ComprehensiveCard {
  id: number;
  title: string;
  description: string;
  external_url: string;
  image: Media;
  logo: Media;
}

export interface ComprehensiveBlock {
  __component: "blocks.comprehensive";
  id: number;
  title: string;
  description: string;
  cards: ComprehensiveCard[];
}

// ---------- Company ----------
export interface CompanyBlock {
  __component: "blocks.company";
  id: number;
  title: string;
  description: string;
  thumbnail: Media;
  video: Media | null;
}

// ---------- Testimonials ----------
export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  image: Image;
}

export interface Testimonials {
  basic: Basic;
  testimonials: Testimonial[];
}

// ---------- Union of Blocks ----------
export type Block =
  | AboutUsBlock
  | LoanDisbursementBlock
  | WhyLoanBlock
  | BanksBlock
  | ServicesBlock
  | ComprehensiveBlock
  | CompanyBlock;

// ---------- Landing Page ----------
export interface LandingPage {
  id: number;
  documentId: string;
  title: string;
  sub_title: string;
  mobile_sub_title: string;
  country_names: string[];
  background_image: Media;
  mobile_bg_img: Media;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

//! About Us

export interface Description {
  id: number;
  description: string;
}

export interface AboutUsCounts {
  id: number;
  count: string;
  image: Image;
  text: string;
}

export interface AboutUsBanner {
  id: number;
  title: string;
  description: string;
  banner: Image;
}

export interface InnerAboutUs {
  id: number;
  title: string;
  description: string;
  subheadings: Description[];
  about_cards: AboutUsCounts[];
  chairman: Image;
}

export interface AboutSectionProps {
  aboutData: InnerAboutUs;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export interface Members {
  basic: Basic;
  members: Member[];
}

export interface Member {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: Image;
}
