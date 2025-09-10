import BankLayout from '@/components/layout/BankLayout';
import React from 'react'
import { Users, Globe, University } from "lucide-react";

export const Auxilopage = () => {
    return (
        <BankLayout
            heroBg="/images/auxilo.jpg"
            heroTitle="Auxilo"
            heroSubtitle="Trusted Education Loan Partner"
            interstRate="Starting from 11.0-14.0 %"
            serviceCharge="0.5% - 1.5%"
            marginRate="NIL"
            bankImg="/assets/images/Auxilo-img.jpg"
            description=""
            trustedBy={[
                { icon: University, label: "Universities", labelCount: 1000 },
                { icon: Globe, label: "Countries", labelCount: 25 },
                { icon: Users, label: "Students", labelCount: 1000 },
            ]} documents={[
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
                        "Students are required to meet Auxilo’s minimum academic standards and maintain a good academic track record. Depending on the course and country, prerequisite tests such as GRE, IELTS, or TOEFL may be necessary. For applicants in the US, GRE scores play a key role in loan approval.",
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
}
export default Auxilopage;
