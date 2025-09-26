"use client";

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
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// shadcn/ui Select
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AbroadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    admission_status: "",
    loanType: "",
  });

  const [loanAmount, setLoanAmount] = useState(1000000);

  // ✅ Submit mutation
  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_CMS_GLOBALURL}/api/abroad-forms`,
        {
          data: payload, // 🔹 Strapi v4 requires wrapping in "data"
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        number: "",
        country: "",
        admission_status: "",
        loanType: "",
      });
      setLoanAmount(1000000);
    },
    onError: (err: any) => {
      console.error(err.response?.data);
      toast.error(
        err.response?.data?.error?.message || "Something went wrong!"
      );
    },
  });

  // ✅ Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      loanAmount,
    });
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-IN").format(amount);

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-white md:grid md:grid-cols-2 lg:gap-8">
        {/* Left Section */}
        <div className="p-6 md:p-12 flex flex-col justify-center bg-blue-700 text-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Your Passport to Global Education
          </h2>
          <p className="text-blue-100 mb-8 font-light">
            Financing your study abroad dream should be seamless. Our education
            loans are designed to cover all your needs, from tuition to living
            expenses. We're here to help you take on the world.
          </p>

          <ul className="space-y-4 text-blue-100">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-200 mt-1" />
              <span>
                <span className="font-semibold text-white">
                  Pre-admission loans
                </span>{" "}
                available so you can apply worry-free.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-200 mt-1" />
              <span>
                Covers{" "}
                <span className="font-semibold text-white">
                  tuition, living, flights, and more
                </span>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-200 mt-1" />
              <span>
                <span className="font-semibold text-white">
                  Collateral-free options
                </span>{" "}
                for top universities.
              </span>
            </li>
          </ul>
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
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
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
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mobile */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="number"
                placeholder="Mobile Number"
                value={formData.number}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Country + Admission Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Select
                  value={formData.country}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, country: val }))
                  }
                >
                  <SelectTrigger className="w-full pl-12">
                    <SelectValue placeholder="Country of Study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="uk">UK</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Select
                  value={formData.admission_status}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, admission_status: val }))
                  }
                >
                  <SelectTrigger className="w-full pl-12">
                    <SelectValue placeholder="Admission Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">
                      Admission Confirmed
                    </SelectItem>
                    <SelectItem value="pending">Admission Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loan Type */}
            <div className="relative">
              <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Select
                value={formData.loanType}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, loanType: val }))
                }
              >
                <SelectTrigger className="w-full pl-12">
                  <SelectValue placeholder="Select Loan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collateral">With Collateral</SelectItem>
                  <SelectItem value="non-collateral">
                    Without Collateral
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loan Amount */}
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
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>10L</span>
                <span>1.5Cr</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg disabled:opacity-60"
            >
              {mutation.isPending ? "Submitting..." : "Get My Loan Quote"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AbroadForm;
