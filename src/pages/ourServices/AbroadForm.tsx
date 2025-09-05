import React, { useState } from "react";
import { CheckCircle2, User, Mail, Phone, Globe, BookOpen, Banknote } from "lucide-react";

const AbroadForm: React.FC = () => {
      const [loanAmount, setLoanAmount] = useState(1000000); 
  const formatAmount = (value: number) => {
    return value.toLocaleString("en-IN");
  };
    return (
        <section className="w-full py-10 px-4">
            <div className="w-full max-w-[1400px] mx-auto md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 border border-blue-200 rounded-lg shadow-sm bg-white">
                <div className="p-6 flex flex-col justify-center">
                    <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">
                        Get Education Loan for Studying Abroad
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Leaving home to study abroad is brave. Financing it shouldn’t be a
                        battle. Our abroad education loans are your passport to global
                        learning, without stressing over bank visits and hidden terms. We’re
                        here to help you go global smoothly.
                    </p>

                    <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-green-500 w-5 h-5 mt-0.5" />
                            <span className="text-gray-700">
                                Pre-admission loans are available so you can apply worry-free.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-green-500 w-5 h-5 mt-0.5" />
                            <span className="text-gray-700">
                                Covers tuition, living, flights, and more – all in one loan.
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle2 className="text-green-500 w-5 h-5 mt-0.5" />
                            <span className="text-gray-700">
                                Collateral-free options for top international universities.
                            </span>
                        </li>
                    </ul>

                    <div className="mt-6 flex justify-center md:justify-start">
                        <img
                            src="/assets/images/AbroadForm.webp"
                            alt="Study Abroad"
                            className="w-64 h-auto"
                        />
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
                    <form className="space-y-4">
                        {/* Full Name */}
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Mobile */}
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="tel"
                                placeholder="Enter your mobile number"
                                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Country */}
                        <div className="relative">
                            <Globe className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <select className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select a country</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                                <option value="canada">Canada</option>
                                <option value="australia">IRELAND</option>
                                <option value="australia">FRANCE</option>
                            </select>
                        </div>

                        {/* Loan Amount Slider */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Loan Amount
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min={1000000}
                                    max={15000000}
                                    step={500000}
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full"
                                />
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 font-semibold rounded-md">
                                    ₹ {formatAmount(loanAmount)}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                                <span>10L</span>
                                <span>1.5Cr</span>
                            </div>
                        </div>

                        {/* Status & Loan Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <BookOpen className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <select className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select status</option>
                                    <option value="admission">Admission Confirmed</option>
                                    <option value="pending">Admission Pending</option>
                                </select>
                            </div>

                            <div className="relative">
                                <Banknote className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <select className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select loan type</option>
                                    <option value="collateral">With Collateral</option>
                                    <option value="non-collateral">Without Collateral</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white font-medium py-2 rounded-md shadow-md hover:opacity-90 transition"
                        >
                            Submit Now
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AbroadForm;
