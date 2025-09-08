import { useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { Wallet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Conversion rates for demo purposes (1 unit foreign = ? INR)
const RATES: Record<string, number> = {
  UK: 105, // GBP → INR
  USA: 83, // USD → INR
  Canada: 61, // CAD → INR
  Ireland: 105, // EUR → INR
  France: 105, // EUR → INR
  India: 1,
};

export default function ExpenseCalculator() {
  const [country, setCountry] = useState("UK");
  const [accommodation, setAccommodation] = useState<number>(0);
  const [food, setFood] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);
  const [other, setOther] = useState<number>(0);

  const [totalExpenseINR, setTotalExpenseINR] = useState<number>(0);
  const [totalExpenseLocal, setTotalExpenseLocal] = useState<number>(0);

  const calculateExpense = () => {
    const rate = RATES[country];
    const totalLocal = accommodation + food + transport + other;
    const totalInINR =
      country === "India"
        ? totalLocal
        : parseFloat((totalLocal * rate).toFixed(2));

    setTotalExpenseLocal(totalLocal);
    setTotalExpenseINR(totalInINR);
  };

  return (
    <ToolPageLayout
      title="Study Abroad Expense Calculator"
      description="Estimate your monthly living expenses abroad and compare them with costs in India. Helps students plan finances better for studying overseas."
      heroIcon={<Wallet className="h-12 w-12 text-white" />}
      heroBg="/assets/images/expense-bg.jpg"
      calculatorForm={
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Expenses</CardTitle>
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

            {/* Accommodation */}
            <div>
              <Label>Accommodation (per month)</Label>
              <Input
                type="number"
                value={accommodation}
                onChange={(e) => setAccommodation(Number(e.target.value))}
              />
            </div>

            {/* Food */}
            <div>
              <Label>Food & Groceries (per month)</Label>
              <Input
                type="number"
                value={food}
                onChange={(e) => setFood(Number(e.target.value))}
              />
            </div>

            {/* Transport */}
            <div>
              <Label>Transport (per month)</Label>
              <Input
                type="number"
                value={transport}
                onChange={(e) => setTransport(Number(e.target.value))}
              />
            </div>

            {/* Other */}
            <div>
              <Label>Other Expenses</Label>
              <Input
                type="number"
                value={other}
                onChange={(e) => setOther(Number(e.target.value))}
              />
            </div>

            <Button className="w-full bg-red-600" onClick={calculateExpense}>
              Calculate
            </Button>
          </CardContent>
        </Card>
      }
      calculatorResults={
        <Card>
          <CardHeader>
            <CardTitle>Estimated Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              <span className="font-semibold">Total in {country}:</span>{" "}
              {totalExpenseLocal.toLocaleString()}{" "}
              {country === "India" ? "INR" : ""}
            </p>
            {country !== "India" && (
              <p>
                <span className="font-semibold">Equivalent in INR:</span>{" "}
                ₹{totalExpenseINR.toLocaleString()}
              </p>
            )}
            {country === "India" && (
              <p>
                <span className="font-semibold">Equivalent Abroad:</span> Use
                currency converter for details
              </p>
            )}
          </CardContent>
        </Card>
      }
      howItWorks={[
        {
          icon: <Wallet className="h-6 w-6 text-red-600" />,
          title: "Enter Costs",
          description:
            "Fill in your monthly rent, food, transport, and other expenses for your chosen country.",
        },
        {
          icon: <Wallet className="h-6 w-6 text-red-600" />,
          title: "Convert to INR",
          description:
            "We use the latest exchange rates to convert your expenses to Indian Rupees.",
        },
        {
          icon: <Wallet className="h-6 w-6 text-red-600" />,
          title: "Compare & Plan",
          description:
            "See how living abroad compares to India and prepare your budget smartly.",
        },
      ]}
      extraSectionTitle="Tips for Managing Living Costs"
      extraSectionContent={
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Share accommodation with roommates to reduce rent.</li>
          <li>Cook at home instead of eating out frequently.</li>
          <li>Use student discounts for transport and utilities.</li>
          <li>Track all expenses to avoid overspending abroad.</li>
        </ul>
      }
      references={[
        {
          title: "Loan Calculator",
          description:
            "Estimate how much loan you need based on your total expenses.",
          link: "/tools/loan-calculator",
        },
        {
          title: "Currency Converter",
          description:
            "Check real-time conversions between INR and foreign currencies.",
          link: "/tools/currency-converter",
        },
        {
          title: "EMI Calculator",
          description:
            "Plan your repayment schedule based on your monthly expenses.",
          link: "/tools/emi-calculator",
        },
      ]}
    />
  );
}
