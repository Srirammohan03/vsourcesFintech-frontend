import { PlaneTakeoff, Sparkles, ShieldCheck, Briefcase, BaggageClaim, DollarSign, Headphones, Hospital } from "lucide-react";
import React, { useState } from "react";

const countries = ["USA", "UK", "Canada", "France", "Ireland", "Australia", "Germany", "New Zealand"];

const whyYouNeedData = [
    {
        iconSrc: "/assets/images/Covers-Emergency.jpg",
        title: "Covers Emergency Medical Assistance",
        description:
            "Unexpected medical emergencies can be financially devastating. Travel insurance covers hospitalisation, doctor's visits, and other medical expenses while you are away from home, ensuring your health is protected.",
    },
    {
        iconSrc: "/assets/images/Covers-Travel.jpg",
        title: "Covers Travel Related Inconveniences",
        description:
            "From flight delays and cancellations to missed connections, travel disruptions are common. Insurance plans help you recoup costs for non-refundable tickets and unexpected accommodation expenses.",
    },
    {
        iconSrc: "/assets/images/baggage-insurance.webp",
        title: "Covers Baggage-Related Hassles",
        description:
            "Losing your luggage can be a major stressor. Insurance provides coverage for lost, stolen, or damaged baggage, helping you replace essential items and continue your journey smoothly.",
    },
    {
        iconSrc: "/assets/images/Travel-Security.jpg",
        title: "Affordable Travel Security",
        description:
            "Compared to the high cost of international medical care or travel disruptions, travel insurance is a small investment. It offers peace of mind and financial security for your entire trip.",
    },
    {
        iconSrc: "/assets/images/clock-Assistance.jpg",
        title: "Round-the-clock Assistance",
        description:
            "Most travel insurance providers offer 24/7 customer support and emergency assistance services. This means you can get help anytime, anywhere, for a wide range of travel-related issues.",
    },
    {
        iconSrc: "/assets/images/Essential-Visa.jpg",
        title: "Essential for Visa Applications",
        description:
            "Many countries, especially in the Schengen Area, require students to have mandatory travel insurance as part of their visa application. Securing a policy is often a critical step to get your visa approved.",
    },
];
// Data for the sliding plans section
const planSlides = [
    {
        title: "Travel Insurance for Individuals",
        description: "Designed for solo adventurers, this plan provides comprehensive coverage for a single traveler, including medical emergencies, personal liability, and trip cancellations.",
        image: "/assets/images/Travel-Insurance-Individuals.webp"
    },
    {
        title: "Travel Insurance for Families",
        description: "A single, cost-effective plan that covers the entire family, ensuring every member is protected against unexpected events like medical emergencies, flight delays, and lost baggage.",
        image: "/assets/images/Travel-Insurance-family.jpg"
    },
    {
        title: "Travel Insurance for Frequent Fliers",
        description: "An annual, multi-trip policy that provides year-long coverage for multiple international trips, saving you the hassle and cost of buying a new policy for every journey.",
        image: "/assets/images/Insurance-Frequent-Fliers.jpg"
    },
    {
        title: "Travel Insurance for Students",
        description: "Customised plans that meet the specific needs of students studying abroad. These policies often include coverage for tuition fee protection, compassionate visit, and study interruptions.",
        image: "/assets/images/Travel-Insurance-for-Students.jpg"
    }
];

export default function TravelInsurance() {
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("USA");
    const [currentSlide, setCurrentSlide] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % planSlides.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + planSlides.length) % planSlides.length);
    };

    return (
        <div className="bg-white text-gray-800 font-sans">
           {/* Hero Section */}
<section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-32">
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
  <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center md:items-start justify-center text-left">
    <PlaneTakeoff className="w-10 h-10 text-white mb-4 animate-pulse" />
    <h1 className="text-4xl font-bold text-white mb-3 text-center max-w-3xl">
      TRAVEL INSURANCE
    </h1>
    <p className="text-white max-w-2xl">
      Travel Insurance for students planning to study abroad is a protection plan
      which covers costs if you fall sick, lose your bags, or if your flight
      gets delayed or cancelled. VSource helps Indian students offers customised
      insurance plans from multiple insurance providers for students who are
      going to study abroad. We make it easy to get travel insurance with
      affordable plans and customised support.
    </p>
  </div>
</section>


            <section className="text-gray-800 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 px-4 md:px-16 py-10">
                <div className="w-full max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-4">
                            Secure Your Journey Abroad <br /> with Student Travel Insurance
                        </h1>
                        <p className="text-lg md:text-xl text-black mb-6 max-w-xl mx-auto md:mx-0">
                            Comprehensive coverage tailored for students studying in USA, UK,
                            Canada, Ireland, France, Australia, Germany, and more.
                        </p>
                        <button className="mt-2 inline-flex items-center px-8 py-3 bg-red-600 rounded-2xl text-white font-semibold shadow-lg transition duration-300 ease-in-out">
                            Get Your Quote
                            <svg
                                className="ml-3 w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1">
                        <img
                            src="/assets/images/travel-insurence.png"
                            alt="Student travel insurance"
                            className="w-full h-96 object-top object-cover max-w-md mx-auto rounded-xl shadow-lg"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Country Selector */}
            {/* <section className="w-full max-w-[1400px] mx-auto px-6 py-5 flex flex-col items-center">
                <label htmlFor="country" className="block text-lg font-semibold mb-2 text-gray-700">
                    Select Your Country
                </label>
                <select
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 bg-white"
                >
                    {countries.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </section> */}


            {/* Why you need Travel Insurance Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
                        Here's Why You Need Travel Insurance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyYouNeedData.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
                            >
                                <img
                                    src={item.iconSrc}
                                    alt={item.title}
                                    className="w-full h-52 mb-4 object-cover rounded-md"
                                />

                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>;

            {/* Travel Insurance Plans Section (Sliding) */}
           <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-12">
            Travel Insurance Plans For All Types Of Travellers
        </h2>
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {planSlides.map((slide, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4 md:px-12"
                    >
                        {/* Image Container */}
                        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
                            <img src={slide.image} alt={slide.title} className="w-full h-auto object-cover" />
                        </div>
                        {/* Text Content Container */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">{slide.title}</h3>
                            <p className="text-lg text-gray-600">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4 md:px-0">
                <button
                    onClick={handlePrevSlide}
                    // Button size smaller on mobile
                    className="bg-gray-800 text-white mb-[50%] md:mb-0 p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
                >
                    {/* SVG size smaller on mobile */}
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button
                    onClick={handleNextSlide}
                    // Button size smaller on mobile
                    className="bg-gray-800 text-white mb-[50%] md:mb-0 p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
                >
                    {/* SVG size smaller on mobile */}
                    <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</section>

            {/* FAQ Section (Existing code) */}
            < section className="w-full max-w-[1400px] mx-auto px-6 py-10" >
                {/*
          I'll leave this section commented out as the original code
          did not have it fully implemented.
          You can add your FAQ content here if needed.
        */}
            </section >
        </div >
    );
}
