import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const courseLevels = ["Masters", "Bachelor"];
const loanTypes = [
  "Collateral",
  "Non-Collateral",
];
const countries = ["UK", "USA", "Canada", "Ireland", "France", "Australia", "Germany"];

export function SearchHero() {
  const [activeTab, setActiveTab] = useState<"scholarship" | "loan">(
    "scholarship"
  );
  const [courseLevel, setCourseLevel] = useState("");
  const [scholarshipType, setScholarshipType] = useState("");
  const [country, setCountry] = useState("");
const [loanType, setLoanType] = useState("");

  const handleSearch = () => {
    console.log({
      activeTab,
      courseLevel,
      loanType,
      country,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-card rounded-xl shadow-card p-6 border">
        {/* Headings Row (Tabs) */}

        <div className="flex flex-col md:flex-row md:justify-around md:items-center gap-4 mb-6">
          {/* Scholarship Tab (stays in current page) */}
          {/* <h2
            onClick={() => setActiveTab("scholarship")}
            className={`text-xl font-semibold md:px-24 py-2 px-10 rounded-md cursor-pointer border-2 ${activeTab === "scholarship"
              ? "bg-red-600 text-white"
              : "border-transparent text-gray-600 hover:border-red-400"
              }`}
          >
            Search for Loans
          </h2> */}

          {/* Education Loan Tab (navigates to route) */}
          <Link
            to="/education-loan"
            className={`text-lg md:px-24 py-2 px-10 rounded-md cursor-pointer border-2 ${location.pathname === "/education-loan"
              ? "border-red-600 text-red-600"
              : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              }`}
          >
            Get an Education Loan
          </Link>
        </div>


        {/* Dropdowns only for Scholarship tab */}
        {activeTab === "scholarship" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
            {/* Course Level Dropdown */}
            <div className="w-full">
              <Select value={courseLevel} onValueChange={setCourseLevel}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Course Level" />
                </SelectTrigger>
                <SelectContent>
                  {courseLevels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Scholarship Type Dropdown */}
            <div className="w-full">
              <Select value={loanType} onValueChange={setLoanType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Loan Type" />
                </SelectTrigger>
                <SelectContent>
                  {loanTypes.map((type) => (
                    <SelectItem
                      key={type}
                      value={type.toLowerCase().replace("-", "_")}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            {/* Country Dropdown */}
            <div className="w-full">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((countryName) => (
                    <SelectItem
                      key={countryName}
                      value={countryName.toLowerCase()}
                    >
                      {countryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* For Loan Tab → Example Placeholder (you can add loan-specific fields) */}
        {activeTab === "loan" && (
          <div className="text-center text-gray-600 py-10">
            <p>Loan form fields will go here...</p>
          </div>
        )}

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleSearch}
            className="bg-gradient-primary hover:opacity-90 px-8 h-12"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
