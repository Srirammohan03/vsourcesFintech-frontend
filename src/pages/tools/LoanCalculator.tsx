// components/tools/LoanCalculator.tsx
import React, { useState, useEffect } from "react";
import ToolPageTemplate from "@/components/layout/ToolPageLayout";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [loanTenure, setLoanTenure] = useState<number>(10);
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / (12 * 100);
    const numberOfPayments = loanTenure * 12;

    if (monthlyRate === 0) {
      const calculatedEmi = principal / numberOfPayments;
      setEmi(calculatedEmi);
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const calculatedEmi =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const calculatedTotalPayment = calculatedEmi * numberOfPayments;
      const calculatedTotalInterest = calculatedTotalPayment - principal;

      setEmi(calculatedEmi);
      setTotalPayment(calculatedTotalPayment);
      setTotalInterest(calculatedTotalInterest);
    }
  };

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <ToolPageTemplate
      title="Education Loan Calculator"
      description="Plan your education loan repayment by calculating EMI, interest, and total cost. Useful for Indian students applying abroad."
      heroIcon={<Calculator className="h-12 w-12 text-white" />}
      heroBg="/assets/images/loan-bg.jpg"
      calculatorForm={
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <Label>Loan Amount (₹)</Label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label>Interest Rate (% p.a.)</Label>
              <Input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <input
                type="range"
                min={5}
                max={20}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <Label>Loan Tenure (Years)</Label>
              <Input
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
              />
              <input
                type="range"
                min={1}
                max={15}
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>

            <Button
              onClick={calculateEMI}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              Calculate
            </Button>
          </CardContent>
        </Card>
      }
      calculatorResults={
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-red-600 text-white p-6 rounded-2xl shadow-md">
              <p className="text-sm opacity-80">Monthly EMI</p>
              <p className="text-2xl font-bold">{formatINR(emi)}</p>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md">
              <p className="text-sm opacity-80">Total Payment</p>
              <p className="text-2xl font-bold">{formatINR(totalPayment)}</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-md">
              <p className="text-sm opacity-80">Total Interest</p>
              <p className="text-2xl font-bold">{formatINR(totalInterest)}</p>
            </div>
          </div>

          {/* Detailed Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Principal:</span>
                <span>{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate:</span>
                <span>{interestRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tenure:</span>
                <span>{loanTenure} years ({loanTenure * 12} months)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Payment:</span>
                <span>{formatINR(totalPayment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span>{formatINR(totalInterest)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      howItWorks={[
        {
          icon: <DollarSign className="h-8 w-8 text-red-600 mx-auto" />,
          title: "Enter Loan Details",
          description: "Provide loan amount, interest rate, and tenure.",
        },
        {
          icon: <Calculator className="h-8 w-8 text-blue-600 mx-auto" />,
          title: "Instant Calculation",
          description: "Our tool instantly computes EMI and total cost.",
        },
        {
          icon: <Percent className="h-8 w-8 text-yellow-600 mx-auto" />,
          title: "Plan Smarter",
          description: "Use results to plan repayment and reduce interest.",
        },
      ]}
      extraSectionTitle="Tips for Loan Planning"
      extraSectionContent={
        <ul className="text-left list-disc list-inside space-y-2 text-gray-700">
          <li>Compare lenders before finalizing an education loan.</li>
          <li>Consider repayment options after the moratorium period.</li>
          <li>Prepay when possible to reduce interest burden.</li>
        </ul>
      }
      references={[
        {
          title: "EMI Calculator",
          description: "Calculate your EMIs for different loan scenarios.",
          link: "/tools/emi-calculator",
        },
        {
          title: "Loan Eligibility",
          description: "Check your eligibility before applying.",
          link: "/tools/loan-eligibility-calculator",
        },
        {
          title: "Interest Calculator",
          description: "Understand how much interest you’ll pay.",
          link: "/tools/interest-calculator",
        },
      ]}
    />
  );
}
