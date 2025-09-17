import React, { useState } from "react";
import {
    ShieldCheck,
    CreditCard,
    PhoneCall,
    BarChart2,
    Tag,
    Globe,
    ArrowDownCircle,
    BriefcaseMedical, Wallet, RefreshCw, Bell, Mail, UserCog, Layers, Headphones,
    Nfc
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import DelayedPopup from "@/components/DelayedPopup";


const BENEFITS = [
    {
        icon: <ShieldCheck size={32} className="text-red-600" />,
        title: "Protection from Exchange Rate Fluctuations",
        desc: "Lock the rate at loading, so currency value remains stable during your study abroad.",
        category: "Security",
    },
    {
        icon: <CreditCard size={32} className="text-red-600" />,
        title: "Easy Access to Cash",
        desc: "Withdraw local currency at ATMs worldwide at low cost—track and reload any time.",
        category: "Convenience",
    },
    {
        icon: <PhoneCall size={32} className="text-red-600" />,
        title: "24/7 Assistance",
        desc: "Global support helplines and emergency card replacement for stress-free travel.",
        category: "Support",
    },
    {
        icon: <BarChart2 size={32} className="text-red-600" />,
        title: "Real-Time Expense Tracking",
        desc: "Instant app alerts and statements help manage money and avoid overspending.",
        category: "Convenience",
    },
    {
        icon: <Tag size={32} className="text-red-600" />,
        title: "Exclusive Discounts",
        desc: "Enjoy student offers on dining, travel and shopping across select partners.",
        category: "Perks",
    },
    {
        icon: <Globe size={32} className="text-red-600" />,
        title: "Accepted Worldwide",
        desc: "Pay at millions of outlets: shops, restaurants, education fees, and online.",
        category: "Convenience",
    },
    {
        icon: <ArrowDownCircle size={32} className="text-red-600" />,
        title: "Minimal Transaction Fees",
        desc: "No hidden markups; typically lower charges than regular debit cards for currency conversion.",
        category: "Security",
    },
    {
        icon: <BriefcaseMedical size={32} className="text-red-600" />,
        title: "Insurance Coverage",
        desc: "Many cards offer travel and accidental insurance for added student safety.",
        category: "Security",
    },
];

const categories = ["All", "Security", "Convenience", "Support", "Perks"];
export default function ForexCard() {
      const [showPopup, setShowPopup] = useState(false);
  
    const handlePopupClose = () => {
      setShowPopup(false);
    };
    return (
        <div className="">
            {/* Hero Section */}
            <section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-36">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-right bg-no-repeat"
                    style={{
                        backgroundImage: "url('/assets/images/ourservices-img.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/70 md:bg-black/50" />
                </div>

                {/* Content */}
                <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center md:items-start justify-center text-left">
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
                        Best Forex Card for Students Abroad
                    </h1>
                    <p className="text-lg mb-6 max-w-3xl">
                        Your smart, safe, and low-cost prepaid card for all overseas student
                        payments — manage money, avoid extra fees, and access exclusive benefits
                        globally.
                    </p>
                </div>
            </section>


            {/* Intro Sections */}
            <section className=" ">
                <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
                    <h2 className="md:text-3xl text-xl font-bold mb-3 text-black">What is a <span className="text-red-600">Forex Card</span> ?</h2>
                    <p className="text-gray-700 mb-8 leading-relaxed">
                        A <strong>Forex card</strong> is a prepaid travel card allowing international payments in supported foreign currencies. It offers locked-in exchange rates and secure worldwide use similar to a debit card, ideal for students managing expenses abroad.
                    </p>

                    <h2 className="md:text-3xl text-xl font-bold mb-3 text-black">Why is a <span className="text-red-600">Student Forex Card</span> ?</h2>
                    <p className="text-gray-700 mb-8 leading-relaxed">
                        Specifically designed for overseas students, these cards provide lower fees, multi-currency options, travel insurance coverage, and discounts for education-related expenses — helping you spend smart and worry-free abroad.
                    </p>

                    <h2 className="md:text-3xl text-xl font-bold mb-5 text-center text-black">How Forex Cards Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-black mb-2">Loading the Card</h3>
                            <p className="text-gray-700 text-sm">
                                Convert Indian Rupees to foreign currencies and load the card pre-travel.
                                Reloading can be done anytime through an app or online portal.
                            </p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-black mb-2">Using the Card Abroad</h3>
                            <p className="text-gray-700 text-sm">
                                Use it like a debit card for payments or ATM withdrawals globally.
                                Supports contactless and chip payments.
                            </p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-black mb-2">Reloading the Card</h3>
                            <p className="text-gray-700 text-sm">
                                Convenient online reload options ensure uninterrupted spending power,
                                whether by students or their guardians.
                            </p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-black mb-2">Multi-Currency Support</h3>
                            <p className="text-gray-700 text-sm">
                                Manage balances across multiple currencies in one card,
                                avoiding conversion fees during foreign transactions.
                            </p>
                        </div>
                    </div>

                </div>
            </section>


            {/* Benefits Cards grid */}
            <section>
                <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Benefits for Students
                    </h2>

                    <Tabs.Root defaultValue="All" className="flex flex-col">
                        {/* Tab List */}
                        <Tabs.List className="flex justify-center flex-wrap gap-3 mb-8">
                            {categories.map((cat) => (
                                <Tabs.Trigger
                                    key={cat}
                                    value={cat}
                                    className="px-4 py-2 rounded-full text-sm font-medium border border-red-600 
                text-red-600 hover:bg-red-300 hover:text-white data-[state=active]:bg-red-600 
                data-[state=active]:text-white transition"
                                >
                                    {cat}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>

                        {/* Tab Content */}
                        {categories.map((cat) => {
                            const filtered =
                                cat === "All"
                                    ? BENEFITS
                                    : BENEFITS.filter((b) => b.category === cat);
                            return (
                                <Tabs.Content key={cat} value={cat}>
                                    <div
                                        className="grid gap-5 text-center justify-center 
               grid-cols-[repeat(auto-fit,minmax(270px,max-content))]"
                                    >
                                        {filtered.map((b) => (
                                            <div
                                                key={b.title}
                                                className="bg-white shadow rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center hover:shadow-lg transition w-[250px]"
                                            >
                                                <div className="mb-2">{b.icon}</div>
                                                <h3 className="font-semibold text-black mb-1">{b.title}</h3>
                                                <p className="text-gray-600 text-sm">{b.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Tabs.Content>




                            );
                        })}
                    </Tabs.Root>
                </div>
            </section>

            {/* Top Forex Cards Table */}
            <section className="bg-gray-50 py-10">
                <div className="max-w-[1400px] mx-auto px-6 space-y-10">

                    {/* 1. Benefits to Customers */}
                    <div>
                        <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                           <span className="text-red-600">EbixCash</span> Globetrotter Travel – Benefits to Customers
                        </h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    icon: <Globe className="w-10 h-10 text-blue-600  mb-4" />,
                                    title: "Simple",
                                    items: [
                                        "Withdraw local currency at 1.9M+ ATMs worldwide",
                                        "Accepted at 31.4M+ merchants worldwide",
                                        "Use unspent funds on next trip or cash out",
                                        "Manage balances online",
                                    ],
                                },
                                {
                                    icon: <Wallet className="w-10 h-10 text-blue-600  mb-4" />,
                                    title: "Smart",
                                    items: [
                                        "Manage funds smartly",
                                        "Load up to 8 currencies",
                                        "Avoid currency fluctuations",
                                        "Reload anytime, contactless card",
                                    ],
                                },
                                {
                                    icon: <ShieldCheck className="w-10 h-10 text-blue-600  mb-4" />,
                                    title: "Secure",
                                    items: [
                                        "Chip & PIN protected",
                                        "Not linked to bank account",
                                        "24/7 Global Assistance",
                                        "Card Insurance",
                                    ],
                                },
                            ].map(({ icon, title, items }) => (
                                <article
                                    key={title}
                                    className="bg-white rounded-3xl shadow-md p-8 flex flex-col justify-start transition hover:shadow-lg hover:border-red-600 border border-transparent"
                                >
                                    {icon}
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
                                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
                                        {items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* 2. Easy Card Management */}
                    <div>
                        <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                           <span className="text-red-600">EbixCash</span> Globetrotter Travel – Easy Card Management
                        </h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    icon: <UserCog className="w-10 h-10 text-blue-600 mb-4" />,
                                    title: "Customer Portal",
                                    items: [
                                        "Set/Reset ATM PIN & IPIN",
                                        "Download statements",
                                        "Swap between wallets",
                                        "Block/unblock card",
                                        "Check transactions",
                                    ],
                                },
                                {
                                    icon: <Bell className="w-10 h-10 text-blue-600 mb-4" />,
                                    title: "SMS Alerts",
                                    items: [
                                        "Card activation & reloads",
                                        "Refunds & add-on cards",
                                        "POS & ATM alerts",
                                        "ECOM alerts",
                                    ],
                                },
                                {
                                    icon: <Mail className="w-10 h-10 text-blue-600 mb-4" />,
                                    title: "Email Alerts",
                                    items: [
                                        "Card activation",
                                        "Card load & reload",
                                        "ATM PIN reset",
                                        "IPIN reset",
                                    ],
                                },
                            ].map(({ icon, title, items }) => (
                                <article
                                    key={title}
                                    className="bg-white rounded-3xl shadow-md p-8 flex flex-col justify-start transition hover:shadow-lg hover:border-red-600 border border-transparent"
                                >
                                    {icon}
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
                                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
                                        {items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* 3. Additional Features */}
                    <div>
                        <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                          <span className="text-red-600">EbixCash</span>  Globetrotter Travel – Additional Features
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            {[
                                {
                                    icon: <Layers className="w-10 h-10 text-orange-600" />,
                                    title: "Multi-Wallet",
                                    description:
                                        "Supported by 6 wallets. Transfer between wallets, manage via app.",
                                },
                                {
                                    icon: <RefreshCw className="w-10 h-10 text-orange-600" />,
                                    title: "Reloadable",
                                    description:
                                        "Reload multiple times, 5 years validity. Works abroad only.",
                                },
                                {
                                    icon: <Nfc className="w-10 h-10 text-orange-600" />,
                                    title: "EMV & Contactless",
                                    description:
                                        "Cards are EMV & contactless enabled for secure global use.",
                                },
                                {
                                    icon: <CreditCard className="w-10 h-10 text-orange-600" />,
                                    title: "Pair Card",
                                    description: "Card kit includes 2 cards. Easily activate via mobile app.",
                                },
                                {
                                    icon: <Headphones className="w-10 h-10 text-orange-600" />,
                                    title: "24x7 Global Assistance",
                                    description:
                                        "Dedicated team available 24/7 in case of loss or theft. Toll-free help worldwide.",
                                    fullWidth: true,
                                },
                            ].map(({ icon, title, description, fullWidth }, idx, arr) => (

                                <div className={`bg-white rounded-3xl shadow-md p-8 flex flex-col justify-start transition hover:shadow-lg hover:border-orange-600 border border-transparent ${fullWidth ? "md:col-span-2" : ""
                                    }`}><div
                                        key={title}
                                        className="flex flex-row gap-3"
                                    >
                                        {icon}
                                        <h3 className="text-xl font-semibold text-center mb-4 text-gray-900">{title}</h3>
                                    </div>
                                    <div>
                                        <p className="text-gray-700 text-sm">{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Button */}
            <div id="apply" className="w-full max-w-sm mx-auto mt-4 mb-4">
                <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-lg shadow-lg transition"  onClick={() => setShowPopup(true)}>
                    Apply for Forex Card
                </button>
                {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
            </div>
        </div>
    );
}
