import axios from "axios";

export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name?: string;
}

export interface TrustedByItem {
  id?: number;
  icon: React.ElementType;
  label: string;
  labelCount?: number;
}

export interface EligibilityItem {
  id?: number;
  criteria: string;
  details: string;
}

export interface Document {
  id?: number;
  document: string;
}

export interface BankLayoutProps {
  background_image: Image;
  title: string;
  subtitle?: string;
  interstRate?: string;
  serviceCharge?: string;
  marginRate?: string;
  bankImage: Image;
  description: string;
  trustedBy: TrustedByItem[];
  documents: Document[];
  eligibility: EligibilityItem[];
  slug?: string;
}

export const fetchBanks = async (): Promise<BankLayoutProps[]> => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/our-patners?populate[background_image][fields][0]=url&populate[bankImage][fields][0]=url&populate[trustedBy]=true&populate[documents]=true&populate[eligibility]=true`
  );
  return data.data;
};
