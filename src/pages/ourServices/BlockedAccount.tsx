import React, { useState, useRef, useEffect } from "react";
import {
    Globe,
    UserCheck,
    FileText,
    Star,
    Clock,
    CreditCard,
    CheckCircle,
} from "lucide-react";

const faqs = [
    {
        title: "What is a Blocked Account & Who Needs It?",
        icon: <UserCheck className="w-8 h-8 md:w-6 md:h-6 text-red-600" />,
        content: (
            <>
                <p className="mb-3 text-gray-700 leading-relaxed">
                    A Blocked Account, also called “Sperrkonto,” is proof to German authorities that you have sufficient funds to support your stay while studying or staying in Germany.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Mandatory for most international students applying for a visa.</li>
                    <li>Required for researchers, au pairs, and job seekers from non-EU countries.</li>
                    <li>Shows you have 12 months’ living expenses secured.</li>
                </ul>
                <p className="mt-2 italic text-gray-600 text-sm">
                    Note: If you have a recognized scholarship or sponsor, you might not need a blocked account.
                </p>
            </>
        ),
    },
    {
        title: "Documents Required For Opening a Blocked Account",
        icon: <FileText className="w-8 h-8 md:w-6 md:h-6 text-red-600" />,
        content: (
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Valid Passport or national ID</li>
                <li>University admission letter</li>
                <li>Visa application proof (if required)</li>
                <li>Proof of address (bill, bank statement, etc.)</li>
                <li>Additional forms or photographs depending on the provider</li>
            </ul>
        ),
    },
    {
        title: "Required Amount For A Blocked Account",
        icon: <Star className="w-8 h-8 md:w-6 md:h-6 text-red-600" />,
        content: (
            <>
                <p className="mb-2 text-gray-700 leading-relaxed">
                    The current minimum amount you need to deposit (2025) is approximately €11,904, which covers about €992 monthly for a year.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>This covers accommodation, food, insurance, and basic living costs.</li>
                    <li>Fees vary by provider; check for setup or monthly charges.</li>
                    <li>The required amount can be updated yearly by German authorities.</li>
                </ul>
            </>
        ),
    },
    {
        title: "How Much Time Does It Take To Open A Blocked Account?",
        icon: <Clock className="w-8 h-8 md:w-6 md:h-6 text-red-600" />,
        content: (
            <>
                <p className="mb-2 text-gray-700 leading-relaxed">
                    Once your documents and initial deposit are submitted, expect processing times of 3-7 business days.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Instant activation options may be available for an extra fee.</li>
                    <li>Delays could occur if your paperwork is incomplete or verification is needed.</li>
                </ul>
                <p className="italic text-sm text-gray-600 mt-2">
                    Pro Tip: Prepare your documents in advance to avoid delays.
                </p>
            </>
        ),
    },
];

const providers = [
    {
        name: "Fintiba",
        description: "Popular with quick processing and excellent support.",
    },
    {
        name: "Expatrio",
        description: "Offers bundled services including health insurance.",
    },
    {
        name: "Deutsche Bank",
        description: "Traditional bank providing blocked accounts.",
    },
    {
        name: "Coracle",
        description: "Specialized gateway for international students.",
    },
];

const applySteps = [
    "Choose your preferred blocked account provider.",
    "Fill out the online application form.",
    "Submit required documents (passport, admission letter, visa proof).",
    "Transfer the required minimum deposit into the blocked account.",
    "Receive confirmation letter for visa application.",
    "Activate account upon arrival in Germany via online or bank visit.",
];

const AccordionItem = ({
    faq,
    isExpanded,
    onClick,
}: {
    faq: typeof faqs[0];
    isExpanded: boolean;
    onClick: () => void;
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string | number>("0px");

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isExpanded ? contentRef.current.scrollHeight + "px" : "0px");
        }
    }, [isExpanded]);

    return (
        <div className="border border-red-300 rounded-xl bg-indigo-50 shadow-sm overflow-hidden">
            <button
                type="button"
                onClick={onClick}
                className="flex items-start justify-between w-full px-6 py-4 text-left text-indigo-900 font-semibold text-lg hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl"
                aria-expanded={isExpanded}
            >
                <div className="flex items-start gap-4">
                    {faq.icon}
                    <span>{faq.title}</span>
                </div>
                <span className="text-red-600 font-bold text-2xl select-none">
                    {isExpanded ? "–" : "+"}
                </span>
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: height, transition: "max-height 0.35s ease" }}
                className="px-6 pb-6 text-gray-700"
            >
                {faq.content}
            </div>
        </div>
    );
};

const BlockedAccount: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#002855] to-[#1a1a1a]">
                <div className="w-full max-w-[1400px] mx-auto px-6 py-16 flex flex-col items-center justify-center text-white">
                    <Globe className="w-14 h-14 mb-4 animate-pulse " />
                    <h1 className="text-4xl font-extrabold mb-4 leading-tight">
                        Everything About Blocked Accounts for International Students
                    </h1>
                    <p className="">
                        Secure your stay in Germany with a Blocked Account. Learn who needs it,
                        how to open it, and essentials to manage your blocked funds easily.
                    </p>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="space-y-6 w-full max-w-[1400px] mx-auto px-6 py-16">
                {faqs.map((faq, i) => (
                    <AccordionItem
                        key={i}
                        faq={faq}
                        isExpanded={expandedIndex === i}
                        onClick={() => toggleIndex(i)}
                    />
                ))}
            </section>

            {/* How To Open A Blocked Account Steps - Vertical Cards */}
            <section className="w-full max-w-3xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-12 text-indigo-900 text-center">
                    How To Open A Blocked Account With Vsource
                </h2>
                <div className="space-y-8">
                    {applySteps.map((step, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                        >
                            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xl shadow">
                                {i + 1}
                            </div>
                            <p className="text-indigo-900 font-semibold text-lg leading-relaxed">
                                {step}
                            </p>
                        </div>
                    ))}
                </div>
            </section>




            {/* Providers Section */}
            <section className="space-y-6 w-full max-w-[1400px] mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-indigo-900 text-center mb-6">
                    List of German Blocked Account Providers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {providers.map(({ name, description }, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-6 shadow-lg border border-indigo-200 hover:shadow-2xl transition-shadow cursor-pointer"
                        >
                            <h3 className="text-indigo-800 font-bold text-xl mb-2">{name}</h3>
                            <p className="text-gray-700">{description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Activation & Essential Tips */}
            <section className="space-y-10 w-full max-w-[1400px] mx-auto px-6 py-16">
                <div className="bg-indigo-50 p-6 rounded-xl shadow-md max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-900 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-indigo-600" />
                        How Do I Activate My Blocked Account In Germany?
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        After arrival, verify your identity online or at bank branches/partner offices. Once verified, monthly fund access begins.
                    </p>
                </div>

                <div className="bg-indigo-100 p-6 rounded-xl shadow-inner max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-900">
                        Essential Things To Remember About Your Blocked Account
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-indigo-800">
                        <li>Keep credentials secure and private.</li>
                        <li>Plan monthly withdrawals to fit your budget.</li>
                        <li>Inform provider promptly of any stay or status changes.</li>
                        <li>Stay updated on balance requirements and regulations.</li>
                        <li>Use official channels only for communications and transfers.</li>
                    </ul>
                </div>
            </section>

            {/* Post-Study Guidance */}
            <section className="w-full max-w-[1400px] mx-auto py-16 text-center px-6 ">
                <h2 className="text-3xl font-bold mb-6 text-indigo-900">
                    How To Choose A Blocked Account After Finishing My Studies?
                </h2>
                <p className="mb-4 text-gray-800">
                    After completing studies, your financial needs change. Switching to regular student or salary accounts with lower fees and more flexibility is typical.
                </p>
                <p className="font-semibold text-indigo-700">
                    Vsource provides expert consulting to help transition your banking post studies.
                </p>
            </section>

            {/* Sticky Apply Button for Mobile */}
            <div className="py-10 bottom-6 left-0 right-0 mx-auto max-w-md px-6">
                <button className="w-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-full shadow-lg hover:brightness-110 transition-all">
                    Start Your Blocked Account Application
                </button>
            </div>
        </div>
    );
};

export default BlockedAccount;
