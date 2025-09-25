import React, { useState } from "react";
import {
  CheckCircle2,
  User,
  Mail,
  Phone,
  Globe,
  BookOpen,
  Banknote,
} from "lucide-react";

// Main AbroadForm component
const AbroadForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    status: "",
    loanType: "",
  });

  const [loanAmount, setLoanAmount] = useState(1000000);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle loan amount slider change
  const handleLoanAmountChange = (e) => {
    setLoanAmount(Number(e.target.value));
  };

  // Function to format the loan amount with commas and currency symbol
  const formatAmount = (value) => {
    return value.toLocaleString("en-IN");
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", {
      ...formData,
      loanAmount,
    });
    // Here you would typically send the data to a server or API
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-white md:grid md:grid-cols-2 lg:gap-8">
        {/* Left Section - Hero Content */}
        <div className="p-6 md:p-12 flex flex-col justify-center bg-blue-700 text-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight tracking-wide">
            Your Passport to Global Education
          </h2>
          <p className="text-blue-100 mb-8 font-light leading-relaxed">
            Financing your study abroad dream should be seamless. Our education
            loans are designed to cover all your needs, from tuition to living
            expenses, with a smooth, hassle-free application process. We're here
            to help you take on the world.
          </p>

          <ul className="space-y-4 text-blue-100">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-200 mt-1" />
              <span>
                <span className="font-semibold text-white">
                  Pre-admission loans
                </span>{" "}
                are available so you can apply worry-free.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-200 mt-1" />
              <span>
                Covers{" "}
                <span className="font-semibold text-white">
                  tuition, living, flights, and more
                </span>{" "}
                – all in one loan.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-200 mt-1" />
              <span>
                <span className="font-semibold text-white">
                  Collateral-free options
                </span>{" "}
                for top international universities.
              </span>
            </li>
          </ul>

          {/* <div className="mt-8 flex justify-center md:justify-start">
            <div className="w-64 h-24 bg-blue-800 rounded-full blur-3xl opacity-50"></div>
          </div> */}
        </div>

        {/* Right Section - Form */}
        <div className="p-6 md:p-12 bg-gray-50 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Apply Now
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            {/* Mobile */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            {/* Country and Course fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Country */}
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                >
                  <option value="" disabled>
                    Country of Study
                  </option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="france">France</option>
                  <option value="germany">Germany</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Admission Status */}
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                >
                  <option value="" disabled>
                    Admission Status
                  </option>
                  <option value="confirmed">Admission Confirmed</option>
                  <option value="pending">Admission Pending</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loan Type */}
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                name="loanType"
                value={formData.loanType}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              >
                <option value="" disabled>
                  Select Loan Type
                </option>
                <option value="collateral">With Collateral</option>
                <option value="non-collateral">Without Collateral</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Loan Amount Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-blue-600 min-w-[100px] text-right">
                  ₹ {formatAmount(loanAmount)}
                </span>
                <input
                  type="range"
                  min={1000000}
                  max={15000000}
                  step={500000}
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>10L</span>
                <span>1.5Cr</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg "
            >
              Get My Loan Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AbroadForm;
