// components/tools/CurrencyConverter.tsx
import React, { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftRight,
  Calculator,
  Globe,
  DollarSign,
} from "lucide-react";

// ✅ Static demo rates (can be replaced with live API later)
// Values = 1 unit foreign currency in INR
const rates: Record<string, number> = {
  USD: 83.0, // US Dollar
  GBP: 105.0, // British Pound
  CAD: 61.5, // Canadian Dollar
  EUR: 89.5, // Euro (France & Ireland)
};

const countries = [
  { code: "INR", name: "India (INR ₹)" },
  { code: "USD", name: "United States (USD $)" },
  { code: "GBP", name: "United Kingdom (GBP £)" },
  { code: "CAD", name: "Canada (CAD $)" },
  { code: "EUR", name: "France / Ireland (EUR €)" },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>("INR");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [converted, setConverted] = useState<number>(0);

  const handleConvert = () => {
    if (!amount || fromCurrency === toCurrency) {
      setConverted(amount);
      return;
    }

    let result = 0;

    if (fromCurrency === "INR") {
      // INR → Foreign
      result = amount / rates[toCurrency];
    } else if (toCurrency === "INR") {
      // Foreign → INR
      result = amount * rates[fromCurrency];
    } else {
      // Foreign → Foreign (via INR)
      const inrValue = amount * rates[fromCurrency];
      result = inrValue / rates[toCurrency];
    }

    setConverted(result);
  };

  const formatCurrency = (value: number, code: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: code,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <ToolPageLayout
      title="Currency Converter"
      description="Convert between Indian Rupee (INR) and major international currencies like USD, GBP, CAD, and EUR (France/Ireland)."
      heroIcon={<ArrowLeftRight className="h-12 w-12 text-white" />}
      heroBg="/assets/images/currency-bg.jpg"
      calculatorForm={
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Currency Conversion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            {/* From Currency */}
            <div className="space-y-2">
              <Label>From</Label>
              <Select
                value={fromCurrency}
                onValueChange={(v) => setFromCurrency(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Currency */}
            <div className="space-y-2">
              <Label>To</Label>
              <Select
                value={toCurrency}
                onValueChange={(v) => setToCurrency(v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleConvert}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              Convert
            </Button>
          </CardContent>
        </Card>
      }
      calculatorResults={
        <div className="space-y-6">
          {/* Result Card */}
          <Card className="p-6 text-center shadow-md">
            <p className="text-sm text-gray-600 mb-2">Converted Amount</p>
            <p className="text-3xl font-bold text-red-600">
              {converted
                ? formatCurrency(
                    converted,
                    toCurrency === "INR" ? "INR" : toCurrency
                  )
                : "--"}
            </p>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span>
                  {formatCurrency(
                    amount,
                    fromCurrency === "INR" ? "INR" : fromCurrency
                  )}{" "}
                  ({fromCurrency})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span>
                  {converted
                    ? formatCurrency(
                        converted,
                        toCurrency === "INR" ? "INR" : toCurrency
                      )
                    : "--"}{" "}
                  ({toCurrency})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate:</span>
                <span>
                  {fromCurrency === "INR"
                    ? `1 ${toCurrency} = ₹${rates[toCurrency]}`
                    : toCurrency === "INR"
                    ? `1 ${fromCurrency} = ₹${rates[fromCurrency]}`
                    : `1 ${fromCurrency} = ${(
                        rates[fromCurrency] / rates[toCurrency]
                      ).toFixed(2)} ${toCurrency}`}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      howItWorks={[
        {
          icon: <Globe className="h-8 w-8 text-red-600 mx-auto" />,
          title: "Choose Currencies",
          description: "Pick source and target currencies for conversion.",
        },
        {
          icon: <Calculator className="h-8 w-8 text-blue-600 mx-auto" />,
          title: "Enter Amount",
          description: "Input the amount you want to convert.",
        },
        {
          icon: <DollarSign className="h-8 w-8 text-yellow-600 mx-auto" />,
          title: "Instant Conversion",
          description: "Get results instantly using static or live rates.",
        },
      ]}
      extraSectionTitle="Why Use Our Converter?"
      extraSectionContent={
        <ul className="text-left list-disc list-inside space-y-2 text-gray-700">
          <li>Plan your international study expenses better.</li>
          <li>Understand tuition and living costs in home currency.</li>
          <li>Helps parents track remittance value over time.</li>
        </ul>
      }
      references={[
        {
          title: "Loan Calculator",
          description: "Check how much loan EMI you’ll need for study abroad.",
          link: "/tools/loan-calculator",
        },
        {
          title: "EMI Calculator",
          description: "Plan your monthly EMIs efficiently.",
          link: "/tools/emi-calculator",
        },
        {
          title: "Interest Calculator",
          description: "Know how much interest you’ll pay on your loan.",
          link: "/tools/interest-calculator",
        },
      ]}
    />
  );
}
