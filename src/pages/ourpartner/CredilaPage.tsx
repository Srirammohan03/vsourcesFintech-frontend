import React from "react";
import BankLayout from "@/components/layout/BankLayout";
import { Users, Globe, University } from "lucide-react";

const CredilaPage = () => {
  return (
    <BankLayout
      heroBg="/assets/images/partners/our-partners.webp"
      heroTitle="Credila"
      heroSubtitle="Trusted Education Loan Partner"
      interstRate="Starting at 10.99% p.a."
      serviceCharge="Free of Cost"
      marginRate="NIL"
      bankImg="/assets/images/partners/cerdila-img.webp"
      description="Credila, part of HDFC, provides customized education loans for students aspiring to study in India and abroad with flexible repayment options."
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
            "Students pursuing higher education in India or abroad can apply.",
        },
        {
          criteria: "Academic Qualifications",
          details:
            "Must have prior education required for UG or PG programmes.",
        },
        {
          criteria: "Eligible Courses",
          details: "All courses*",
        },
        {
          criteria: "Eligible Institutions",
          details: "All Universities, Colleges, and Vocational Institutes*",
        },
      ]}
    />
  );
};

export default CredilaPage;
