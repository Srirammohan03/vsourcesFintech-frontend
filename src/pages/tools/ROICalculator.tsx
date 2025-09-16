// src/pages/tools/ROICalculator.tsx
import DelayedPopup from "@/components/DelayedPopup";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ===== Theme (yours) ===== */
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
} as const;

/* ---------- helpers ---------- */
const cls = (...s: (string | false | null | undefined)[]) => s.filter(Boolean).join(" ");
const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));

/* ---------- Types ---------- */
type Country = "UK" | "USA" | "Canada" | "France" | "Ireland" | "Australia" | "Germany";
type Branch =
  | "Computer Science / IT / Data"
  | "Engineering (Non-CS)"
  | "Business / Management"
  | "Healthcare"
  | "Finance / Accounting"
  | "Hospitality / Tourism"
  | "Design / Arts"
  | "Other";

/* ---------- Salary model (rough, in INR per year) ---------- */
const SALARY_TABLE: Record<Country, Record<Branch, number>> = {
  USA: {
    "Computer Science / IT / Data": 9000000,
    "Engineering (Non-CS)": 7000000,
    "Business / Management": 6000000,
    Healthcare: 6500000,
    "Finance / Accounting": 6000000,
    "Hospitality / Tourism": 4000000,
    "Design / Arts": 4500000,
    Other: 4500000,
  },
  UK: {
    "Computer Science / IT / Data": 4500000,
    "Engineering (Non-CS)": 3800000,
    "Business / Management": 3500000,
    Healthcare: 3800000,
    "Finance / Accounting": 4000000,
    "Hospitality / Tourism": 2800000,
    "Design / Arts": 3000000,
    Other: 3000000,
  },
  Canada: {
    "Computer Science / IT / Data": 5000000,
    "Engineering (Non-CS)": 4000000,
    "Business / Management": 3800000,
    Healthcare: 4200000,
    "Finance / Accounting": 3800000,
    "Hospitality / Tourism": 3000000,
    "Design / Arts": 3200000,
    Other: 3200000,
  },
  France: {
    "Computer Science / IT / Data": 4200000,
    "Engineering (Non-CS)": 3800000,
    "Business / Management": 3400000,
    Healthcare: 3800000,
    "Finance / Accounting": 3600000,
    "Hospitality / Tourism": 2600000,
    "Design / Arts": 2800000,
    Other: 3000000,
  },
  Ireland: {
    "Computer Science / IT / Data": 5200000,
    "Engineering (Non-CS)": 4200000,
    "Business / Management": 3800000,
    Healthcare: 4000000,
    "Finance / Accounting": 3800000,
    "Hospitality / Tourism": 3000000,
    "Design / Arts": 3200000,
    Other: 3200000,
  },
  Australia: {
    "Computer Science / IT / Data": 5500000,
    "Engineering (Non-CS)": 4300000,
    "Business / Management": 4000000,
    Healthcare: 4500000,
    "Finance / Accounting": 4000000,
    "Hospitality / Tourism": 3200000,
    "Design / Arts": 3500000,
    Other: 3500000,
  },
  Germany: {
    "Computer Science / IT / Data": 4800000,
    "Engineering (Non-CS)": 4500000,
    "Business / Management": 3500000,
    Healthcare: 4000000,
    "Finance / Accounting": 3800000,
    "Hospitality / Tourism": 2800000,
    "Design / Arts": 3000000,
    Other: 3200000,
  },
};

/* Growth rate by branch (year-over-year) */
const GROWTH: Record<Branch, number> = {
  "Computer Science / IT / Data": 0.12,
  "Engineering (Non-CS)": 0.09,
  "Business / Management": 0.08,
  Healthcare: 0.09,
  "Finance / Accounting": 0.08,
  "Hospitality / Tourism": 0.07,
  "Design / Arts": 0.07,
  Other: 0.07,
};

/* ---------- EMI ---------- */
function calcEMI(principal: number, annualRatePct: number, months: number) {
  if (!principal || !months) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return (principal * r * pow) / (pow - 1);
}

/* ---------- Page ---------- */
export default function ROICalculator() {
  // Controls
  const [loan, setLoan] = useState(1000000);
  const [rate, setRate] = useState(8);
  const [selfFund, setSelfFund] = useState(100000);
  const [scholar, setScholar] = useState(1000000);
  const [months, setMonths] = useState(24);
  const [partTime, setPartTime] = useState<"Yes" | "No">("No");

  const [country, setCountry] = useState<Country | "">("");
  const [branch, setBranch] = useState<Branch | "">("");

  const [currentEdu, setCurrentEdu] = useState("");
  const [currentMarks, setCurrentMarks] = useState<string>("");
  const [prevEdu, setPrevEdu] = useState("");
  const [prevMarks, setPrevMarks] = useState<string>("");
  const [collegeRank, setCollegeRank] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [targetCountry, setTargetCountry] = useState<Country | "">("");

  // NEW: extra sections
  const [showExtraEdu, setShowExtraEdu] = useState(false);
  const [extraEducation, setExtraEducation] = useState<
    Array<{ level: string; institute: string; marks: string }>
  >([]);
  const [showExtraCert, setShowExtraCert] = useState(false);
  const [extraCerts, setExtraCerts] = useState<
    Array<{ name: string; provider: string; year: string }>
  >([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{
    startSalary: number;
    emi: number;
    breakEvenYears: number;
    points: { year: string; salary: number }[];
    headline: string;
    subline: string;
  } | null>(null);

  const graphRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);

  // derived
  const emi = useMemo(() => calcEMI(loan, rate, months), [loan, rate, months]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!country) e.country = "Required";
    if (!branch) e.branch = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEstimate = () => {
    if (!validate()) return;

    const useCountry = (targetCountry || country) as Country;
    const startSalary = SALARY_TABLE[useCountry][branch as Branch];

    // project 6 points (0..5 years after graduation)
    const g = GROWTH[branch as Branch];
    const years = 6;
    const points: { year: string; salary: number }[] = [];
    for (let i = 0; i < years; i++) {
      const sal = startSalary * Math.pow(1 + g, i);
      points.push({ year: i === 0 ? "Y0" : `Y${i}`, salary: Math.round(sal) });
    }

    // Simple break-even approx:
    const budget = Math.max(0, loan + selfFund - scholar);
    let saved = 0;
    let yrs = 0;
    for (let i = 0; i < 8; i++) {
      const s = startSalary * Math.pow(1 + g, i);
      saved += 0.2 * s;
      if (saved >= budget) {
        yrs = i + 1;
        break;
      }
    }
    if (yrs === 0) yrs = 9;

    const ptNote =
      partTime === "Yes"
        ? "You selected part-time work during studies; this can offset a portion of living costs."
        : "No part-time work selected.";

    const headline = `Estimated starting salary in ${useCountry} for ${branch.toString()} is ₹${formatINR(
      startSalary
    )} per year.`;
    const subline = `Approx. EMI on your loan is ₹${formatINR(
      emi
    )}/month for ${months} months. Based on a simple savings model, you could recover ~₹${formatINR(
      Math.max(0, loan + selfFund - scholar)
    )} in about ${yrs} year(s). ${ptNote}`;

    setResults({
      startSalary,
      emi,
      breakEvenYears: yrs,
      points,
      headline,
      subline,
    });

    setTimeout(() => graphRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  // NEW: download output image (chart SVG -> PNG)
  const downloadOutputImage = () => {
    if (!exportRef.current) return;
    const svgEl = exportRef.current.querySelector("svg");
    if (!svgEl) return;
    const { width, height } = svgEl.getBoundingClientRect();
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgEl);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FCEBFF"; // match container bg
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "roi-output.png";
        a.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[15px]">
      {/* HERO */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-28 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: `url(/assets/images/tools-bg.jpg)`,
        }}
      >
        {/* Dark overlay under content */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="w-full z-10 relative max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center text-center">
          <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight text-center ">
            ROI & Salary Estimator
          </h1>
          <p className="mt-3 text-white/90 text-lg max-w-3xl mx-auto text-center">
            Plan your overseas education smartly. Estimate post-study salary,
            see projections for 5 years,</p>
          <p className="mt-3 text-white/90 text-lg max-w-3xl mx-auto text-center"> and understand how your loan choice
            impacts recovery.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <main className="w-full max-w-[1400px] mx-auto px-6 py-10">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-[#EEF2F7] p-5 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B0B2C]">Inputs</h2>
          <p className="text-sm text-gray-600 mb-6">
            Required fields: <span className="font-semibold">Country</span> and{" "}
            <span className="font-semibold">Course Branch</span>
          </p>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LabeledSlider
              label="Select loan amount"
              value={loan}
              setValue={setLoan}
              min={0}
              max={20000000}
              step={50000}
              postfix=""
            />
            <LabeledSlider
              label="Rate of interest(%)"
              value={rate}
              setValue={setRate}
              min={0}
              max={20}
              step={0.1}
              postfix=""
              valueBoxFormatter={(v) => String(v)}
            />
            <LabeledSlider
              label="Self-Funded Portion (INR)"
              value={selfFund}
              setValue={setSelfFund}
              min={0}
              max={20000000}
              step={50000}
            />
            <LabeledSlider
              label="Scholarship and Grants (INR)"
              value={scholar}
              setValue={setScholar}
              min={0}
              max={20000000}
              step={50000}
            />
            <LabeledSlider
              label="Loan Duration (Months)"
              value={months}
              setValue={setMonths}
              min={0}
              max={180}
              step={1}
              valueBoxFormatter={(v) => String(v)}
              minLabel="0 Month"
              maxLabel="180 Months"
            />

            {/* Right column: dropdowns */}
            <div className="flex flex-col gap-4">
              <SelectBox
                label="Will you do any part time job?"
                value={partTime}
                onChange={(e) => setPartTime(e.target.value as "Yes" | "No")}
              >
                <option>No</option>
                <option>Yes</option>
              </SelectBox>

              <SelectBox
                label="Select Current Education"
                value={currentEdu}
                onChange={(e) => setCurrentEdu(e.target.value)}
              >
                <option value="">Select Current Education</option>
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Diploma</option>
                <option>Other</option>
              </SelectBox>

              <InputBox
                label="Enter Current Marks (%)"
                value={currentMarks}
                onChange={(e) => setCurrentMarks(e.target.value)}
                placeholder="Eg. 75"
              />
            </div>

            <div className="flex flex-col gap-4">
              <SelectBox
                label="Select Prev Education"
                value={prevEdu}
                onChange={(e) => setPrevEdu(e.target.value)}
              >
                <option value="">Select Prev Education</option>
                <option>12th / High School</option>
                <option>Undergraduate</option>
                <option>Diploma</option>
                <option>Other</option>
              </SelectBox>

              <InputBox
                label="Enter Prev Education Marks (%)"
                value={prevMarks}
                onChange={(e) => setPrevMarks(e.target.value)}
                placeholder="Eg. 82"
              />

              <SelectBox
                label="Select College Ranking"
                value={collegeRank}
                onChange={(e) => setCollegeRank(e.target.value)}
              >
                <option value="">Select College Ranking</option>
                <option>Top 100</option>
                <option>Top 500</option>
                <option>Tier-1</option>
                <option>Tier-2</option>
                <option>Tier-3</option>
              </SelectBox>
            </div>

            <div className="flex flex-col gap-4">
              <SelectBox
                label="Select Career Branch *"
                error={errors.branch}
                value={branch}
                onChange={(e) => setBranch(e.target.value as Branch)}
              >
                <option value="">Select Career Branch</option>
                <option>Computer Science / IT / Data</option>
                <option>Engineering (Non-CS)</option>
                <option>Business / Management</option>
                <option>Healthcare</option>
                <option>Finance / Accounting</option>
                <option>Hospitality / Tourism</option>
                <option>Design / Arts</option>
                <option>Other</option>
              </SelectBox>

              <SelectBox
                label="Select Course Duration"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
              >
                <option value="">Select Course Duration</option>
                <option>1 Year</option>
                <option>1.5 Years</option>
                <option>2 Years</option>
                <option>3 Years</option>
              </SelectBox>

              <SelectBox
                label="Select Target Country *"
                error={errors.country}
                value={country}
                onChange={(e) => setCountry(e.target.value as Country)}
              >
                <option value="">Select Target Country</option>
                <option>UK</option>
                <option>USA</option>
                <option>Canada</option>
                <option>France</option>
                <option>Ireland</option>
                <option>Australia</option>
                <option>Germany</option>
              </SelectBox>
            </div>

            {/* Spacer to keep grid even */}
            <div className="hidden md:block" />

            {/* Action + helper buttons */}
            <div className="md:col-span-2 flex flex-col items-center gap-4 mt-2">
              <button
                onClick={handleEstimate}
                className="w-full sm:w-[380px] rounded-2xl px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition bg-red-600"
              >
                Get Salary Estimate
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <button
                  type="button"
                  onClick={() => setShowExtraEdu((s) => !s)}
                  className="rounded-lg px-4 py-3 font-semibold bg-white text-red-600 border-2 border-red-600"

                >
                  + Add Additional Education
                </button>
                <button
                  type="button"
                  onClick={() => setShowExtraCert((s) => !s)}
                  className="rounded-lg px-4 py-3 font-semibold bg-white text-red-600 border-2 border-red-600"

                >
                  + Add Additional Certification
                </button>
              </div>
            </div>
          </div>

          {/* NEW: Extra Education Fields */}
          {showExtraEdu && (
            <div className="mt-6 rounded-2xl ring-1 ring-[#E5EBF0] p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#0B0B2C]">Additional Education</h3>
                <button
                  className="rounded-lg px-3 py-1 border-2 border-red-600  text-sm text-red-600 bg-white hover:bg-red-600 hover:text-white"
                  onClick={() => setExtraEducation((arr) => [...arr, { level: "", institute: "", marks: "" }])}
                >
                  + Add Row
                </button>
              </div>
              {extraEducation.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">Add your extra education history.</p>
              )}
              <div className="mt-3 space-y-3">
                {extraEducation.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                    <InputBox
                      label="Level (e.g., Diploma, PG)"
                      value={row.level}
                      onChange={(e) =>
                        setExtraEducation((arr) =>
                          arr.map((r, i) => (i === idx ? { ...r, level: e.target.value } : r))
                        )
                      }
                    />
                    <InputBox
                      label="Institute / University"
                      value={row.institute}
                      onChange={(e) =>
                        setExtraEducation((arr) =>
                          arr.map((r, i) => (i === idx ? { ...r, institute: e.target.value } : r))
                        )
                      }
                    />
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <InputBox
                          label="Marks (%)"
                          value={row.marks}
                          onChange={(e) =>
                            setExtraEducation((arr) =>
                              arr.map((r, i) => (i === idx ? { ...r, marks: e.target.value } : r))
                            )
                          }
                        />
                      </div>
                      <button
                        className="mt-7 text-sm px-3 py-2 rounded-lg"
                        onClick={() => setExtraEducation((arr) => arr.filter((_, i) => i !== idx))}
                        style={{ color: THEME.red, border: `1px solid ${THEME.red}` }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEW: Extra Certification Fields */}
          {showExtraCert && (
            <div className="mt-6 rounded-2xl ring-1 ring-[#E5EBF0] p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#0B0B2C]">Additional Certifications</h3>
                <button
                  className="rounded-lg px-3 py-1  border-2 border-red-600  text-sm text-red-600 bg-white hover:bg-red-600 hover:text-white"
                  onClick={() => setExtraCerts((arr) => [...arr, { name: "", provider: "", year: "" }])}
                >
                  + Add Row
                </button>
              </div>
              {extraCerts.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">Add your relevant certifications.</p>
              )}
              <div className="mt-3 space-y-3">
                {extraCerts.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                    <InputBox
                      label="Certification Name"
                      value={row.name}
                      onChange={(e) =>
                        setExtraCerts((arr) =>
                          arr.map((r, i) => (i === idx ? { ...r, name: e.target.value } : r))
                        )
                      }
                    />
                    <InputBox
                      label="Provider"
                      value={row.provider}
                      onChange={(e) =>
                        setExtraCerts((arr) =>
                          arr.map((r, i) => (i === idx ? { ...r, provider: e.target.value } : r))
                        )
                      }
                    />
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <InputBox
                          label="Year"
                          value={row.year}
                          onChange={(e) =>
                            setExtraCerts((arr) =>
                              arr.map((r, i) => (i === idx ? { ...r, year: e.target.value } : r))
                            )
                          }
                        />
                      </div>
                      <button
                        className="mt-7 text-sm px-3 py-2 rounded-lg"
                        onClick={() => setExtraCerts((arr) => arr.filter((_, i) => i !== idx))}
                        style={{ color: THEME.red, border: `1px solid ${THEME.red}` }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* OUTPUT */}
        {results && (
          <section ref={graphRef} className="mt-10">
            <h3 className="text-xl md:text-2xl font-bold text-[#0B0B2C] mb-4">Output:</h3>

            <div ref={exportRef} className="rounded-2xl ring-1 ring-[#F0E6FF] bg-[#FCEBFF] p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg md:text-xl font-bold">{country || targetCountry}</div>
        
              </div>

              <div className="w-full h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.points} margin={{ left: 12, right: 12, top: 10, bottom: 10 }}>
                    <CartesianGrid stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => formatINR(v)} width={90} />
                    <Tooltip formatter={(v: number) => `₹${formatINR(v as number)}`} labelFormatter={(l) => `Year ${l}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="salary"
                      name={country || targetCountry || "Salary"}
                      stroke={THEME.blue}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white shadow-lg ring-1 ring-[#EEF2F7] p-4 md:p-6 space-y-2">
              <p className="text-lg font-semibold text-[#0B0B2C]">{results.headline}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{results.subline}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                <Stat label="Starting (Year 0)" value={`₹${formatINR(results.startSalary)}/yr`} />
                <Stat label="Estimated EMI" value={`₹${formatINR(results.emi)}/mo`} />
                <Stat label="Approx. Break-even" value={`${results.breakEvenYears} year(s)`} />
              </div>

              {/* NEW: Apply for Loan button */}
              <div className="pt-4">
                <a
                  href=""
                  aria-label="Apply now" className="mt-4 mx-auto block px-4 py-3 text-center rounded-xl font-bold bg-red-600 text-white w-full max-w-[360px] shadow-lg hover:brightness-105"
                  onClick={() => setShowPopup(true)}
                >
                  Apply Now
                </a>

                {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ---------- Atoms ---------- */

function FieldShell({
  label,
  valueBox,
}: {
  label: string;
  valueBox?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between rounded-xl border px-4 py-3 text-[#0B0B2C] border-gray-400" >
        <span className="font-semibold">{label}</span>
        <div className="ml-3">
          <div className="min-w-[110px] text-center rounded-lg bg-gray-100 px-3 py-2 font-bold text-[#334155]">
            {valueBox}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabeledSlider(props: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  postfix?: string;
  valueBoxFormatter?: (v: number) => string;
  minLabel?: string;
  maxLabel?: string;
}) {
  const {
    label,
    value,
    setValue,
    min,
    max,
    step = 1,
    postfix = "",
    valueBoxFormatter,
    minLabel,
    maxLabel,
  } = props;

  return (
    <div>
      <FieldShell
        label={label}
        valueBox={(valueBoxFormatter ? valueBoxFormatter(value) : formatINR(value)) + (postfix || "")}
      />
      <div className="px-1 py-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-red-600"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{minLabel ?? formatINR(min)}</span>
          <span>{maxLabel ?? formatINR(max)}</span>
        </div>
      </div>
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  children,
  error,
}: React.PropsWithChildren<{
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  error?: string;
}>) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-black">
        {label}
      </label>
      <div className="relative w-full">
        <select
          value={value}
          onChange={onChange}
          className={cls(
            "w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm outline-none",
            error
              ? "border-red-500 ring-2 ring-red-500"
              : "border-[#E5EBF0] focus:ring-2"
          )}
          style={!error ? { ["--tw-ring-color" as any]: THEME.blue } : undefined}
        >
          {children}
        </select>

        {/* Custom Arrow */}
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
        />
      </div>
      {error && (
        <p className="mt-1 text-xs" style={{ color: THEME.red }}>
          {error}
        </p>
      )}
    </div>
  );
}

function InputBox({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1 text-black">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border px-4 py-3 outline-none border-[#E5EBF0] focus:ring-2"
        style={{ ["--tw-ring-color" as any]: THEME.blue }}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#F9FAFB] ring-1 ring-[#E5EBF0] p-3 text-center">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="text-lg font-bold text-[#0B0B2C]">{value}</div>
    </div>
  );
}
