import React from "react";
import { Users, Globe, University } from "lucide-react";
import BankLayout from "@/components/layout/BankLayout";

export const IncredFinancingPage = () => {
  return (
    <BankLayout
      heroBg="/assets/images/partners/our-partners.webp"
      heroTitle="Incred Financing"
      heroSubtitle="Trusted Education Loan Partner"
      interstRate="Starting from 10.0-13.99%"
      serviceCharge="0.5% - 1.5%"
      marginRate="NIL"
      bankImg="/assets/images/partners/incred-img.webp"
      description=""
      trustedBy={[
        { icon: University, label: "Universities", labelCount: 1000 },
        { icon: Globe, label: "Countries", labelCount: 25 },
        { icon: Users, label: "Students", labelCount: 1000 },
      ]}
      documents={[
        "Proof of Admission",
        "Academic Records",
        "KYC Documents",
        "Income Proof of Parents/Guardian",
        "Identity Proof & Address Proof",
      ]}
      eligibility={[
        {
          criteria: "Who Can Apply",
          details:
            "Applicants must be at least 18 years old at the time of applying. The student should also have secured admission to a recognized university or institution.",
        },
        {
          criteria: "Academic Qualifications",
          details:
            "The applicant should have a good academic record and must meet the minimum academic criteria set by the lending institution. Also, the student must appear for the required tests such as GRE, IELTS, or TOEFL. Please note for the US, GRE plays a vital role in securing an education loan.",
        },
        {
          criteria: "Eligible Courses",
          details:
            "Loans are available for regular graduate, postgraduate, diploma, certificate, or doctoral programs across various disciplines offered by reputed universities and institutes in the USA, UK, Canada, Australia, New Zealand, France, Germany, and Ireland.",
        },
        {
          criteria: "Eligible Institutions",
          details:
            "All recognized Universities, Colleges, and Vocational Institutes* are covered under this scheme.",
        },
      ]}
    />
  );
};
