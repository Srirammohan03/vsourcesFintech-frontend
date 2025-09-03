import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ChevronRight, House, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const faqs = [
  [
    "How much loan can a student get in India?",
    "Up to ₹1.5 Cr for abroad, ₹50L for domestic.",
  ],
  [
    "How to repay an education loan?",
    "Through EMIs after moratorium, via bank transfer/auto-debit.",
  ],
  ["What is the time period of an education loan?", "7–15 years depending on loan type."],
  [
    "Who is eligible for student education loan?",
    "Indian students with confirmed admission, meeting income/age criteria.",
  ],
  [
    "Can I get a 20 lakhs education loan?",
    "Yes, based on collateral or co-applicant strength.",
  ],
  [
    "How much interest on student loans?",
    "Typically 8–12% depending on secured/unsecured.",
  ],
  [
    "Which loan type is better?",
    "Secured for higher amounts, unsecured for quick smaller loans.",
  ],
  [
    "Is it OK to take loan for education?",
    "Yes, as it’s an investment in career and offers tax benefits.",
  ],
];
const EducationLoan: React.FC = () => {
     const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative bg-[#2563eb] text-white pt-28 pb-20 lg:pt-32">
                <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left Side */}
                    <div className="space-y-6">
                        {/* Breadcrumb with Home icon */}
                        <p className="text-sm opacity-90 flex items-center gap-2">
                            <Link to="/" className="flex items-center gap-1 hover:text-red-600">
                                <House className="h-5 w-5" />
                                Home
                            </Link>
                            <span>/</span>
                            <span>Education Loan</span>
                        </p>

                        {/* Heading */}
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                            Student Education Loans
                        </h1>

                        {/* Checklist in 2 rows */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "No Credit History Required",
                                "Build Your U.S. Credit Score from Day One",
                                "Easy Online Application",
                                "Exclusive Student Rewards",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-white">
                                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* Buttons */}
                        <div className="flex gap-4 flex-wrap">
                            <Button className="text-white bg-red-600 font-semibold">
                                Check Eligibility
                            </Button>
                            <Button variant="secondary" className="bg-white text-red-600 hover:bg-red-600 hover:text-white font-semibold ">
                                Apply Now
                            </Button>
                        </div>
                    </div>

                    {/* Right Side Image */}
                    <div className="flex justify-center">
                        <img
                            src="/assets/images/education-loan.jpg"
                            alt="Education Loan"
                            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[420px] h-auto rounded-2xl shadow-lg"
                        />
                    </div>
                </div>

            </section>

            {/* Explore Our Education Loans */}
            <section className="py-20 bg-gray-50">
                <div className="w-full max-w-[1400px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Explore Our Education Loans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1 - Domestic */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-2xl shadow-md overflow-hidden"
                        >
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('/assets/images/Domestic-Education.png')" }}
                            />
                            <div className="absolute inset-0 bg-black/70" /> {/* Overlay */}

                            {/* Card Content */}
                            <div className="relative p-8 text-left space-y-4 text-white">
                                <h3 className="text-xl font-semibold">Domestic Education Loans</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Quick approval process</li>
                                    <li>Competitive interest rates</li>
                                    <li>No collateral for smaller amounts</li>
                                </ul>
                                <Button className="mt-4 text-white bg-red-600 font-semibold">
                                    Speak to an Advisor
                                </Button>
                            </div>
                        </motion.div>

                        {/* Card 2 - Abroad */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-2xl shadow-md overflow-hidden"
                        >
                            {/* Background Image with Overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('/assets/images/Abroad-Education.jpg')" }}
                            />
                            <div className="absolute inset-0 bg-black/70" /> {/* Overlay */}

                            {/* Card Content */}
                            <div className="relative p-8 text-left space-y-4 text-white">
                                <h3 className="text-xl font-semibold">Abroad Education Loans</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Covers tuition + living expenses</li>
                                    <li>Longer repayment tenure</li>
                                    <li>Moratorium period till course completion</li>
                                </ul>
                                <Button className="mt-4 text-white bg-red-600 font-semibold ">
                                    Speak to an Advisor
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Benefits of Education Loans */}
            <section className="py-20">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Benefits of Education Loans
                    </h2>
                    <p className="text-center mb-12 text-gray-700">
                        Education loans make higher studies affordable while offering financial
                        flexibility. Here are the key benefits:
                    </p>
                    <div className="grid md:grid-cols-5 gap-6">
                        {[
                            "All Expenses Coverage",
                            "Benefits in Taxes",
                            "Longer Repayment Tenure",
                            "Helps Build Credit",
                            "Affordable Interest Rates",
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-gray-50 rounded-xl p-6 text-center shadow-md"
                            >
                                <div className="w-10 h-10 mx-auto mb-4 bg-red-600 text-white flex items-center justify-center rounded-full">
                                    {i + 1}
                                </div>
                                <p className="font-semibold">{step}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Types of Student Loan */}
            <section className="py-20 bg-gray-50">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Types of Student Loan
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Secured Education Loan</h3>
                            <p>
                                Requires collateral, higher amounts, and lower interest rates.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-xl font-semibold mb-2">
                                Unsecured Education Loan
                            </h3>
                            <p>No collateral, quicker process, and slightly higher rates.</p>
                        </div>
                    </div>
                    {/* Comparison Table */}
                    <div className="w-full">
                        {/* Desktop Table */}
                        <div className="hidden md:block">
                            <table className="w-full border border-gray-200 border-collapse text-left text-sm">
                                <thead className="bg-red-600 text-white">
                                    <tr>
                                        <th className="p-3">Feature</th>
                                        <th className="p-3">Secured Loan</th>
                                        <th className="p-3">Unsecured Loan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Collateral Requirement", "Yes", "No"],
                                        ["Loan Amount", "Higher (up to ₹1.5 Cr)", "Lower (up to ₹50L)"],
                                        ["Processing Time", "10-15 days", "5-7 days"],
                                        ["Interest Rates", "Lower", "Higher"],
                                        ["Repayment Duration", "10-15 years", "7-10 years"],
                                        ["Moratorium Period", "Yes", "Yes"],
                                        ["Documentation Required", "More (property papers, etc.)", "Less"],
                                    ].map((row, i) => (
                                        <tr
                                            key={i}
                                            className="border-b hover:bg-gray-100 transition-colors"
                                        >
                                            <td className="p-3 font-medium">{row[0]}</td>
                                            <td className="p-3">{row[1]}</td>
                                            <td className="p-3">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {[
                                ["Collateral Requirement", "Yes", "No"],
                                ["Loan Amount", "Higher (up to ₹1.5 Cr)", "Lower (up to ₹50L)"],
                                ["Processing Time", "10-15 days", "5-7 days"],
                                ["Interest Rates", "Lower", "Higher"],
                                ["Repayment Duration", "10-15 years", "7-10 years"],
                                ["Moratorium Period", "Yes", "Yes"],
                                ["Documentation Required", "More (property papers, etc.)", "Less"],
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                                >
                                    <p className="font-medium text-red-600 mb-2">{row[0]}</p>
                                    <div className="flex justify-between text-sm">
                                        <span className="font-semibold">Secured:</span>
                                        <span>{row[1]}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="font-semibold">Unsecured:</span>
                                        <span>{row[2]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Eligibility */}
            <section className="py-20">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Eligibility for an Education Loan
                    </h2>
                    <p className="mb-8 text-gray-700 text-center">
                        To qualify, applicants must meet specific requirements:
                    </p>
                    <div className="w-full">
                        {/* Desktop Table */}
                        <div className="hidden md:block">
                            <table className="w-full border border-gray-200 border-collapse text-left text-sm">
                                <thead className="bg-red-600 text-white">
                                    <tr>
                                        <th className="p-3 w-1/3">Criteria</th>
                                        <th className="p-3">Detail in Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        [
                                            "Income Proof",
                                            "The applicant’s parent or co-borrower must provide income documents such as salary slips, bank statements, or income tax returns to prove repayment ability.",
                                        ],
                                        [
                                            "Nationality",
                                            "Applicants should be Indian citizens. For NRIs or foreign students applying in India, additional approvals and compliance with RBI rules may be needed.",
                                        ],
                                        [
                                            "Age",
                                            "Students must usually be between 18–35 years at the time of loan application. Some banks may extend this range based on specific programs.",
                                        ],
                                        [
                                            "Admission Status",
                                            "Confirmed admission into a recognized university or institution is mandatory. Provisional admissions may be accepted in some cases with conditions.",
                                        ],
                                        [
                                            "Co-borrower Requirement",
                                            "Most lenders require a parent, guardian, or spouse as a co-borrower/guarantor to ensure repayment responsibility if the student is unable to pay.",
                                        ],
                                        [
                                            "Academic Performance",
                                            "Applicants are expected to have a strong academic track record. A minimum score threshold may apply, especially for unsecured loans.",
                                        ],
                                    ].map((row, i) => (
                                        <tr
                                            key={i}
                                            className="border-b hover:bg-gray-100 transition-colors"
                                        >
                                            <td className="p-3 font-medium">{row[0]}</td>
                                            <td className="p-3">{row[1]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {[
                                [
                                    "Income Proof",
                                    "The applicant’s parent or co-borrower must provide income documents such as salary slips, bank statements, or income tax returns to prove repayment ability.",
                                ],
                                [
                                    "Nationality",
                                    "Applicants should be Indian citizens. For NRIs or foreign students applying in India, additional approvals and compliance with RBI rules may be needed.",
                                ],
                                [
                                    "Age",
                                    "Students must usually be between 18–35 years at the time of loan application. Some banks may extend this range based on specific programs.",
                                ],
                                [
                                    "Admission Status",
                                    "Confirmed admission into a recognized university or institution is mandatory. Provisional admissions may be accepted in some cases with conditions.",
                                ],
                                [
                                    "Co-borrower Requirement",
                                    "Most lenders require a parent, guardian, or spouse as a co-borrower/guarantor to ensure repayment responsibility if the student is unable to pay.",
                                ],
                                [
                                    "Academic Performance",
                                    "Applicants are expected to have a strong academic track record. A minimum score threshold may apply, especially for unsecured loans.",
                                ],
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                                >
                                    <p className="font-medium text-red-600 mb-2">{row[0]}</p>
                                    <p className="text-sm text-gray-700">{row[1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Documents Required */}
            <section className="py-20 bg-gray-50">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Documents Required for an Education Loan
                    </h2>
                    <div className="w-full">
                        {/* Desktop Table */}
                        <div className="hidden md:block">
                            <table className="w-full border border-gray-200 border-collapse text-sm">
                                <thead className="bg-red-600 text-white text-left">
                                    <tr>
                                        <th className="p-3">Document Type</th>
                                        <th className="p-3">Applicant (Student)</th>
                                        <th className="p-3">Co-Applicant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Proof of Identity", "Aadhaar/Passport", "Aadhaar/PAN"],
                                        ["Proof of Address", "Aadhaar/Utility Bill", "Aadhaar/Utility Bill"],
                                        ["Photographs", "Passport-size", "Passport-size"],
                                        ["Academic Records", "Marksheets, Certificates", "-"],
                                        ["Cost of Education", "Admission letter, fee structure", "-"],
                                        ["Income Proof", "-", "Salary slips, IT returns"],
                                        ["Affidavit/Declaration", "Student declaration", "Parent declaration"],
                                        ["Property Documents (if collateral)", "-", "Property papers"],
                                    ].map((row, i) => (
                                        <tr
                                            key={i}
                                            className={`border-b transition-colors ${i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                } hover:bg-gray-100`}
                                        >
                                            <td className="p-3 font-medium">{row[0]}</td>
                                            <td className="p-3">{row[1]}</td>
                                            <td className="p-3">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {[
                                ["Proof of Identity", "Aadhaar/Passport", "Aadhaar/PAN"],
                                ["Proof of Address", "Aadhaar/Utility Bill", "Aadhaar/Utility Bill"],
                                ["Photographs", "Passport-size", "Passport-size"],
                                ["Academic Records", "Marksheets, Certificates", "-"],
                                ["Cost of Education", "Admission letter, fee structure", "-"],
                                ["Income Proof", "-", "Salary slips, IT returns"],
                                ["Affidavit/Declaration", "Student declaration", "Parent declaration"],
                                ["Property Documents (if collateral)", "-", "Property papers"],
                            ].map((row, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                                >
                                    <p className="font-medium text-red-600 mb-2">{row[0]}</p>
                                    <div className="text-sm text-gray-700">
                                        <p>
                                            <span className="font-semibold">Applicant (Student): </span>
                                            {row[1]}
                                        </p>
                                        <p className="mt-1">
                                            <span className="font-semibold">Co-Applicant: </span>
                                            {row[2]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Repayment Process */}
            <section className="py-20">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Repayment Process for Education Loan
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 text-gray-800">
                        <li>
                            <strong>Understanding the Moratorium Period:</strong> Repayment begins 6–12
                            months after course completion.
                        </li>
                        <li>
                            <strong>Loan Repayment Start:</strong> EMI begins after moratorium.
                        </li>
                        <li>
                            <strong>Payment Methods:</strong> ECS, net banking, auto-debit.
                        </li>
                        <li>
                            <strong>Prepayment Options:</strong> Allowed with minimal charges.
                        </li>
                    </ol>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="w-full max-w-[1000px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-md border border-gray-200"
                            >
                                {/* Question Row */}
                                <button
                                    onClick={() => toggleFAQ(i)}
                                    className="w-full flex justify-between items-center p-5 text-left"
                                >
                                    <span className="font-semibold">{faq[0]}</span>
                                    {openIndex === i ? (
                                        <Minus className="w-5 h-5 text-red-600" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-red-600" />
                                    )}
                                </button>

                                {/* Answer with animation */}
                                <AnimatePresence initial={false}>
                                    {openIndex === i && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden px-5 pb-4"
                                        >
                                            <p className="text-gray-700">{faq[1]}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EducationLoan;
