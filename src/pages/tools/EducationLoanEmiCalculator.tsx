// components/tools/EducationLoanEmiCalculator.tsx
"use client";

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

export default function EducationLoanEmiCalculator() {
  // Inputs (with your ranges)
  const [loanAmount, setLoanAmount] = useState<number>(1000000);  // ₹10,00,000 default
  const [interestRate, setInterestRate] = useState<number>(10);   // 10% p.a.
  const [courseMonths, setCourseMonths] = useState<number>(12);    // 12 months
  const [tenureYears, setTenureYears] = useState<number>(5);       // 5 years

  // Outputs
  const [emi, setEmi] = useState<number>(0);
  const [accruedDuringCourse, setAccruedDuringCourse] = useState<number>(0);
  const [repaymentInterest, setRepaymentInterest] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [effectivePrincipal, setEffectivePrincipal] = useState<number>(0);

  // Clamp helper
  const clamp = (v: number, min: number, max: number) =>
    isNaN(v) ? min : Math.min(Math.max(v, min), max);

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, interestRate, courseMonths, tenureYears]);

  /**
   * Education Loan EMI Model:
   * 1) Course period: simple interest accrues (no payments)
   *    Accrued = P * r * (courseMonths/12)
   *    Effective Principal at repayment start = P + Accrued
   * 2) Repayment period: EMI with monthly compounding on Effective Principal
   *    m = r/12, n = tenureYears*12, EMI formula
   *    Repayment Interest = (EMI * n) - Effective Principal
   */
  const calculate = () => {
    const P = clamp(loanAmount, 100000, 30000000); // ₹1L–₹3Cr
    const r = clamp(interestRate, 8, 20) / 100;    // decimal
    const months = clamp(courseMonths, 6, 72);
    const years = clamp(tenureYears, 1, 20);

    // 1) Accrued simple interest during the course
    const accrued = P * r * (months / 12);
    const P_eff = P + accrued;

    // 2) EMI on effective principal
    const m = r / 12;
    const n = years * 12;

    let E = 0;
    let totalRepay = 0;
    if (m === 0) {
      E = P_eff / n;
      totalRepay = P_eff;
    } else {
      const pow = Math.pow(1 + m, n);
      E = (P_eff * m * pow) / (pow - 1);
      totalRepay = E * n;
    }

    const repayInterest = totalRepay - P_eff;
    const totalInt = accrued + repayInterest;
    const totalPay = P + totalInt; // cost relative to original principal

    setEmi(E);
    setAccruedDuringCourse(accrued);
    setEffectivePrincipal(P_eff);
    setRepaymentInterest(repayInterest);
    setTotalInterest(totalInt);
    setTotalPayment(totalPay);
  };

  const resetAll = () => {
    setLoanAmount(1000000);
    setInterestRate(10);
    setCourseMonths(12);
    setTenureYears(5);
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
      { name: "Interest", value: Math.max(0, totalInterest), color: THEME.yellow },
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
        title="Education Loan EMI Calculator"
        description="Estimate course-period interest and your EMI during repayment for an education loan."
        heroIcon={<Calculator className="h-12 w-12" color="#fff" />}
        // no heroBg
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
              {/* Smaller title size */}
              <CardTitle
                className="text-xl md:text-[20px] font-semibold"
                style={{ color: THEME.text }}
              >
                Inputs
              </CardTitle>
              <Button
                variant="ghost"
                onClick={resetAll}
                className="gap-2 text-sm md:text-base"
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
                  max={30000000}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <input
                  aria-label="Loan Amount Slider"
                  type="range"
                  min={100000}
                  max={30000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.red }}
                />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  Range: ₹1,00,000 – ₹3,00,00,000
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
                  min={8}
                  max={20}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <input
                  aria-label="Interest Rate Slider"
                  type="range"
                  min={8}
                  max={20}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.red }}
                />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  Range: 8% – 20% p.a.
                </p>
              </div>

              {/* Course Duration (months) */}
              <div className="space-y-2">
                <Label htmlFor="course-months" style={{ color: THEME.text }}>
                  Course Duration (Months)
                </Label>
                <Input
                  id="course-months"
                  type="number"
                  inputMode="numeric"
                  min={6}
                  max={72}
                  value={courseMonths}
                  onChange={(e) => setCourseMonths(Number(e.target.value))}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <input
                  aria-label="Course Duration Slider"
                  type="range"
                  min={6}
                  max={72}
                  step={1}
                  value={courseMonths}
                  onChange={(e) => setCourseMonths(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.red }}
                />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  6 – 72 months
                </p>
              </div>

              {/* Loan Tenure (years) */}
              <div className="space-y-2">
                <Label htmlFor="tenure-years" style={{ color: THEME.text }}>
                  Loan Tenure (Years)
                </Label>
                <Input
                  id="tenure-years"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={20}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <input
                  aria-label="Loan Tenure Slider"
                  type="range"
                  min={1}
                  max={20}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.red }}
                />
                <p className="text-xs" style={{ color: "#6b7280" }}>
                  1 – 20 years
                </p>
              </div>

              {/* Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <StatChip label="Monthly EMI" value={formatINR(emi)} bg={THEME.red} />
                <StatChip label="Total Interest" value={formatINR(totalInterest)} bg={THEME.yellow} fg={THEME.text} />
                <StatChip label="Total Payment" value={formatINR(totalPayment)} bg={THEME.blue} />
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
                          <p className="text-[10px] tracking-wide" style={{ color: "#6b7280" }}>
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

                {/* LEGEND */}
                <div className="space-y-3">
                  <LegendRow color={THEME.red} label="Principal" value={formatINR(loanAmount)} />
                  <LegendRow color={THEME.yellow} label="Total Interest" value={formatINR(totalInterest)} dark />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card
              className="rounded-2xl"
              style={{
                borderColor: THEME.gray,
                borderWidth: 1,
                boxShadow: "0 10px 24px rgba(0,0,0,0.05)",
              }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg font-semibold" style={{ color: THEME.text }}>
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row label="Principal" value={formatINR(loanAmount)} />
                <Row label="Interest Rate" value={`${interestRate}% p.a.`} />
                <Row label="Course Duration" value={`${courseMonths} months`} />
                <Row label="Loan Tenure" value={`${tenureYears} years`} />
                <Row label="Accrued During Course" value={formatINR(accruedDuringCourse)} />
                <Row label="Effective Principal (at repayment)" value={formatINR(effectivePrincipal)} />
                <Row label="Repayment Interest" value={formatINR(repaymentInterest)} />
                <Row label="Total Interest" value={formatINR(totalInterest)} />
                <Row label="Monthly EMI" value={formatINR(emi)} />
                <Row label="Total Payment (overall)" value={formatINR(totalPayment)} />
              </CardContent>
            </Card>
          </div>
        }
        howItWorks={[
          { icon: <DollarSign className="h-8 w-8 mx-auto" color={THEME.red} />, title: "Enter Details", description: "Set course duration, amount, interest, and repayment tenure." },
          { icon: <Calculator className="h-8 w-8 mx-auto" color={THEME.blue} />, title: "We Compute", description: "Course-period accrual + EMI for tenure." },
          { icon: <Percent className="h-8 w-8 mx-auto" color={THEME.yellow} />, title: "Plan Smart", description: "See interest split and your monthly EMI." },
        ]}
        extraSectionTitle="References for this page"
        extraSectionContent={
          <ul className="text-left list-disc list-inside space-y-2">
            <li style={{ color: THEME.text }}>
              EMI formula with monthly compounding and simple accrual during moratorium.
            </li>
          </ul>
        }
        references={[
          { title: "Loan Repayment Calculator", description: "Accrual + EMI view for any loan.", link: "/tools/loan-repayment-calculator" },
          { title: "Interest Calculator", description: "Simple vs compound interest explorer.", link: "/tools/interest-calculator" },
          { title: "EMI Calculator", description: "Quick monthly repayment calculator.", link: "/tools/emi-calculator" },
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
          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
        )}
        <span className={bold ? "font-semibold" : ""} style={{ color: dark ? "#111827" : THEME.text }}>
          {label}
        </span>
      </div>
      <span className={bold ? "font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}
