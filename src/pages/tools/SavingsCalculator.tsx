import { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { PiggyBank } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Conversion rates: 1 unit foreign currency = ? INR
const RATES: Record<string, number> = {
  UK: 105, // GBP → INR
  USA: 83, // USD → INR
  Canada: 61, // CAD → INR
  Ireland: 89, // EUR → INR
  France: 89, // EUR → INR
  India: 1,
};

// Map country to proper currency code
const CURRENCY_CODES: Record<string, string> = {
  UK: "GBP",
  USA: "USD",
  Canada: "CAD",
  Ireland: "EUR",
  France: "EUR",
  India: "INR",
};

export default function SavingsCalculator() {
  const [country, setCountry] = useState("UK");
  const [monthlySaving, setMonthlySaving] = useState<number>(1000);
  const [durationMonths, setDurationMonths] = useState<number>(12);

  const [totalLocal, setTotalLocal] = useState<number>(0);
  const [totalINR, setTotalINR] = useState<number>(0);

  const handleCalculate = () => {
    const total = monthlySaving * durationMonths;
    const rate = RATES[country];
    setTotalLocal(total);
    setTotalINR(country === "India" ? total : total * rate);
  };

  const formatCurrency = (value: number, countryCode: string) => {
    const currency = CURRENCY_CODES[countryCode] || "INR";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <ToolPageLayout
      title="Savings Calculator"
      description="Calculate how much you can save monthly in your country and see the equivalent in Indian Rupees. Plan your study abroad finances effectively."
      heroIcon={<PiggyBank className="h-12 w-12 text-white" />}
      heroBg="/assets/images/savings-bg.jpg"
      calculatorForm={
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Enter Savings Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Country Selector */}
            <div>
              <Label>Country</Label>
              <select
                className="w-full border rounded-md p-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="UK">United Kingdom (GBP)</option>
                <option value="USA">United States (USD)</option>
                <option value="Canada">Canada (CAD)</option>
                <option value="Ireland">Ireland (EUR)</option>
                <option value="France">France (EUR)</option>
                <option value="India">India (INR)</option>
              </select>
            </div>

            {/* Monthly Saving */}
            <div>
              <Label>Monthly Saving</Label>
              <Input
                type="number"
                value={monthlySaving}
                onChange={(e) => setMonthlySaving(Number(e.target.value))}
              />
            </div>

            {/* Duration */}
            <div>
              <Label>Duration (Months)</Label>
              <Input
                type="number"
                value={durationMonths}
                onChange={(e) => setDurationMonths(Number(e.target.value))}
              />
            </div>

            <Button className="w-full bg-red-600" onClick={handleCalculate}>
              Calculate Savings
            </Button>
          </CardContent>
        </Card>
      }
      calculatorResults={
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle>Savings Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <span className="font-semibold">Total Savings in {country}:</span>{" "}
              {formatCurrency(totalLocal, country)}
            </p>
            {country !== "India" && (
              <p>
                <span className="font-semibold">Equivalent in INR:</span>{" "}
                {formatCurrency(totalINR, "India")}
              </p>
            )}
          </CardContent>
        </Card>
      }
      howItWorks={[
        {
          icon: <PiggyBank className="h-8 w-8 text-red-600 mx-auto" />,
          title: "Select Country",
          description: "Choose the country where you are saving or studying.",
        },
        {
          icon: <PiggyBank className="h-8 w-8 text-blue-600 mx-auto" />,
          title: "Enter Amount",
          description: "Input how much you can save each month.",
        },
        {
          icon: <PiggyBank className="h-8 w-8 text-yellow-600 mx-auto" />,
          title: "View Results",
          description:
            "See your total savings in local currency and its equivalent in INR.",
        },
      ]}
      extraSectionTitle="Tips to Maximize Savings"
      extraSectionContent={
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Set up automatic monthly transfers to savings account.</li>
          <li>Track your expenses to save more efficiently.</li>
          <li>Consider student discounts and deals abroad.</li>
          <li>Use multi-currency accounts to avoid conversion fees.</li>
        </ul>
      }
      references={[
        {
          title: "Loan Calculator",
          description: "Check how much loan EMI you’ll need for study abroad.",
          link: "/tools/loan-calculator",
        },
        {
          title: "Expense Calculator",
          description:
            "Estimate your monthly living expenses in different countries.",
          link: "/tools/expense-calculator",
        },
        {
          title: "Currency Converter",
          description:
            "Convert your savings or expenses into INR or foreign currency.",
          link: "/tools/currency-converter",
        },
      ]}
    />
  );
}
