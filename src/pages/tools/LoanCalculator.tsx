import React, { useEffect, useMemo, useState } from "react";
import ToolPageTemplate from "@/components/layout/ToolPageLayout";
import { Calculator, DollarSign, Percent, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// THEME (yours)
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
};

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

  const clamp = (v: number, min: number, max: number) =>
    isNaN(v) ? min : Math.min(Math.max(v, min), max);

  const calculateEMI = () => {
    const principal = clamp(loanAmount, 100000, 5000000);
    const rate = clamp(interestRate, 0, 100);
    const years = clamp(loanTenure, 1, 30);
    const m = rate / (12 * 100);
    const n = years * 12;

    if (m === 0) {
      const e = principal / n;
      setEmi(e);
      setTotalPayment(principal);
      setTotalInterest(0);
      return;
    }

    const p = Math.pow(1 + m, n);
    const e = (principal * m * p) / (p - 1);
    const tp = e * n;

    setEmi(e);
    setTotalPayment(tp);
    setTotalInterest(tp - principal);
  };

  const resetAll = () => {
    setLoanAmount(500000);
    setInterestRate(12);
    setLoanTenure(10);
  };

  const formatINR = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.max(0, amount || 0));

  const pieData = useMemo(
    () => [
      { name: "Principal", value: Math.max(0, loanAmount), color: THEME.red },
      {
        name: "Interest",
        value: Math.max(0, totalInterest),
        color: THEME.yellow,
      },
    ],
    [loanAmount, totalInterest]
  );

  const StatChip = ({
    label,
    value,
    bg,
    fg = "#ffffff",
  }: {
    label: string;
    value: string;
    bg: string;
    fg?: string;
  }) => (
    <div
      className="rounded-2xl px-4 py-3 shadow-sm"
      style={{ backgroundColor: bg, color: fg }}
    >
      <p className="text-[11px] opacity-90">{label}</p>
      <p className="text-xl font-bold leading-tight">{value}</p>
    </div>
  );

  return (
    // PAGE BACKGROUND GRADIENT (no hero image)
    <div className="bg-gradient-to-b from-[#002855] to-[#1a1a1a] min-h-screen">
      <ToolPageTemplate
        title="Education Loan Calculator"
        description="Plan your education loan by estimating EMI, total interest, and overall cost."
        heroIcon={<Calculator className="h-12 w-12" color="#fff" />}
        // heroBg removed
        calculatorForm={
          <Card
            className="rounded-3xl"
            style={{
              backgroundColor: "#ffffff",
              borderColor: THEME.gray,
              borderWidth: 1,
              boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
            }}
          >
            <CardHeader className="flex-row items-center justify-between">
              {/* Reduced title size */}
              <CardTitle
                className="text-xl md:text-[20px] font-semibold"
                style={{ color: THEME.text }}
              >
                Loan Details
              </CardTitle>
              <Button
                variant="ghost"
                onClick={resetAll}
                className="gap-2 text-sm md:text-base hover:text-red-600"
                style={{ color: THEME.sky }}
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Loan Amount */}
              <div className="space-y-2">
                <Label htmlFor="loan-amount" style={{ color: THEME.text }}>
                  Loan Amount (₹)
                </Label>
                <Input
                  id="loan-amount"
                  type="number"
                  inputMode="numeric"
                  min={100000}
                  max={5000000}
                  step={1000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <input
                  aria-label="Loan Amount Slider"
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.red }}
                />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  Range: ₹1,00,000 – ₹50,00,000
                </p>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="interest-rate" style={{ color: THEME.text }}>
                  Interest Rate (% p.a.)
                </Label>
                <Input
                  id="interest-rate"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <input
                  aria-label="Interest Rate Slider"
                  type="range"
                  min={0}
                  max={20}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.red }}
                />
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <Label htmlFor="loan-tenure" style={{ color: THEME.text }}>
                  Loan Tenure (Years)
                </Label>
                <Input
                  id="loan-tenure"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={30}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <input
                  aria-label="Loan Tenure Slider"
                  type="range"
                  min={1}
                  max={30}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.red }}
                />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  Up to 30 years
                </p>
              </div>

              <Button
                onClick={calculateEMI}
                className="w-full font-medium"
                style={{ backgroundColor: THEME.red, color: "#fff" }}
              >
                Calculate
              </Button>

              {/* Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <StatChip
                  label="Monthly EMI"
                  value={formatINR(emi)}
                  bg={THEME.red}
                />
                <StatChip
                  label="Total Payment"
                  value={formatINR(totalPayment)}
                  bg={THEME.blue}
                />
                <StatChip
                  label="Total Interest"
                  value={formatINR(totalInterest)}
                  bg={THEME.yellow}
                  fg={THEME.text}
                />
              </div>
            </CardContent>
          </Card>
        }
        /* ===== RESULTS: ONE COLUMN ONLY (RIGHT SIDE) ===== */
        calculatorResults={
          <div className="space-y-6">
            {/* Cost Breakdown (Pie first) */}
            <Card
              className="rounded-2xl"
              style={{
                borderColor: THEME.gray,
                borderWidth: 1,
                boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
              }}
            >
              <CardHeader className="pb-0">
                {/* Smaller section title */}
                <CardTitle
                  className="flex items-center gap-2 text-base md:text-lg"
                  style={{ color: THEME.text }}
                >
                  <Percent className="h-5 w-5" color={THEME.yellow} />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4 space-y-6">
                {/* FIXED HEIGHT 300px CHART */}
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        formatter={(v: number) => formatINR(v)}
                        contentStyle={{
                          borderRadius: 12,
                          border: `1px solid ${THEME.gray}`,
                        }}
                      />
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius="62%"
                        outerRadius="88%"
                        startAngle={90}
                        endAngle={-270}
                        paddingAngle={2}
                        isAnimationActive
                      >
                        {pieData.map((d, i) => (
                          <Cell key={i} fill={d.color} />
                        ))}
                      </Pie>

                      {/* Center label */}
                      <foreignObject x="30%" y="34%" width="40%" height="32%">
                        <div className="w-full h-full flex flex-col items-center justify-center text-center">
                          <p
                            className="text-[10px] tracking-wide"
                            style={{ color: "#6b7280" }}
                          >
                            TOTAL
                          </p>
                          <p className="text-base sm:text-lg font-semibold leading-tight">
                            {formatINR(totalPayment)}
                          </p>
                        </div>
                      </foreignObject>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* LEGEND + EMI */}
                <div className="space-y-3">
                  <LegendRow
                    color={THEME.red}
                    label="Principal"
                    value={formatINR(loanAmount)}
                  />
                  <LegendRow
                    color={THEME.yellow}
                    label="Interest"
                    value={formatINR(totalInterest)}
                    dark
                  />
                  <div
                    className="border-t pt-3"
                    style={{ borderColor: THEME.gray }}
                  >
                    <LegendRow
                      color={THEME.blue}
                      label="Monthly EMI"
                      value={formatINR(emi)}
                      noDot
                      bold
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Summary */}
            <Card
              className="rounded-2xl"
              style={{
                borderColor: THEME.gray,
                borderWidth: 1,
                boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
              }}
            >
              <CardHeader className="pb-2">
                <CardTitle
                  className="text-base md:text-lg font-semibold"
                  style={{ color: THEME.text }}
                >
                  Loan Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="Principal" value={formatINR(loanAmount)} />
                <Row label="Interest Rate" value={`${interestRate}% p.a.`} />
                <Row
                  label="Tenure"
                  value={`${loanTenure} years (${loanTenure * 12} months)`}
                />
                <Row label="Total Payment" value={formatINR(totalPayment)} />
                <Row label="Total Interest" value={formatINR(totalInterest)} />
                <Row label="Monthly EMI" value={formatINR(emi)} />
              </CardContent>
            </Card>
          </div>
        }
        howItWorks={[
          {
            icon: <DollarSign className="h-8 w-8 mx-auto" color={THEME.red} />,
            title: "Enter Loan Details",
            description: "Provide loan amount, interest rate, and tenure.",
          },
          {
            icon: <Calculator className="h-8 w-8 mx-auto" color={THEME.blue} />,
            title: "Instant Calculation",
            description: "We compute EMI and total cost instantly.",
          },
          {
            icon: <Percent className="h-8 w-8 mx-auto" color={THEME.yellow} />,
            title: "Plan Smarter",
            description: "Use insights to reduce interest burden.",
          },
        ]}
        extraSectionTitle="Tips for Loan Planning"
        extraSectionContent={
          <ul className="text-left list-disc list-inside space-y-2">
            <li style={{ color: THEME.text }}>
              Compare lenders before finalizing an education loan.
            </li>
            <li style={{ color: THEME.text }}>
              Consider repayment options after the moratorium period.
            </li>
            <li style={{ color: THEME.text }}>
              Prepay when possible to reduce interest burden.
            </li>
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
    </div>
  );
}

/* ------- Small helpers ------- */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function LegendRow({
  color,
  label,
  value,
  dark,
  noDot,
  bold,
}: {
  color: string;
  label: string;
  value: string;
  dark?: boolean;
  noDot?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        {!noDot && (
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span
          className={bold ? "font-semibold" : ""}
          style={{ color: dark ? "#111827" : THEME.text }}
        >
          {label}
        </span>
      </div>
      <span className={bold ? "font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}
