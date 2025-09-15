// src/pages/tools/EstimateFutureEarnings.tsx
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
  | "Chemical Engineering"
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
    "Chemical Engineering": 7000000,
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
    "Chemical Engineering": 3800000,
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
    "Chemical Engineering": 4000000,
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
    "Chemical Engineering": 3800000,
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
    "Chemical Engineering": 4200000,
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
    "Chemical Engineering": 4300000,
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
    "Chemical Engineering": 4500000,
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
  "Chemical Engineering": 0.09,
  "Engineering (Non-CS)": 0.09,
  "Business / Management": 0.08,
  Healthcare: 0.09,
  "Finance / Accounting": 0.08,
  "Hospitality / Tourism": 0.07,
  "Design / Arts": 0.07,
  Other: 0.07,
};

/* ---------- Page ---------- */
export default function EstimateFutureEarnings() {
  // Required fields
  const [country, setCountry] = useState<Country | "">("");
  const [branch, setBranch] = useState<Branch | "">("");

  // Optional inputs that fine-tune the estimate
  const [currentEdu, setCurrentEdu] = useState("");
  const [currentMarks, setCurrentMarks] = useState<string>("");
  const [prevEdu, setPrevEdu] = useState("");
  const [prevMarks, setPrevMarks] = useState<string>("");
  const [collegeRank, setCollegeRank] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  // Extra dynamic sections
  const [showExtraEdu, setShowExtraEdu] = useState(false);
  const [extraEducation, setExtraEducation] = useState<
    Array<{ level: string; marks: string }>
  >([]);
  const [showExtraCert, setShowExtraCert] = useState(false);
  const [extraCerts, setExtraCerts] = useState<
    Array<{ name: string; grade: string }>
  >([]);

  // Feature checkboxes (hero callouts)
  const [cbCountry, setCbCountry] = useState(true);
  const [cbIndustry, setCbIndustry] = useState(true);
  const [cbGoals, setCbGoals] = useState(true);
  const [cbFinance, setCbFinance] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{
    startSalary: number;
    points: { year: string; salary: number }[];
    headline: string;
    notes: string[];
  } | null>(null);

  const graphRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);

  // Derived modifiers
  const rankMultiplier = useMemo(() => {
    switch (collegeRank) {
      case "Top 50":
      case "Top 100":
        return 1.12;
      case "Top 500":
        return 1.06;
      case "Tier-1":
        return 1.04;
      case "Tier-2":
        return 1.0;
      case "Tier-3":
        return 0.92;
      default:
        return 1.0;
    }
  }, [collegeRank]);

  const marksMultiplier = useMemo(() => {
    const cm = Number(currentMarks || 0);
    const pm = Number(prevMarks || 0);
    const m = Math.max(cm, pm);
    if (m >= 90) return 1.07;
    if (m >= 80) return 1.04;
    if (m > 0) return 0.98;
    return 1.0;
  }, [currentMarks, prevMarks]);

  const durationNote = useMemo(() => {
    switch (courseDuration) {
      case "1 Year":
        return "Fast-track program may favor quicker entry to roles.";
      case "1.5 Years":
        return "Balanced duration with internship room.";
      case "2 Years":
        return "Longer program often increases internship exposure.";
      case "3 Years":
        return "Extended study may deepen specialization.";
      default:
        return "";
    }
  }, [courseDuration]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!country) e.country = "Required";
    if (!branch) e.branch = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEstimate = () => {
    if (!validate()) return;

    const base = SALARY_TABLE[country as Country][branch as Branch];
    const startSalary = Math.round(base * rankMultiplier * marksMultiplier);
    const growth = GROWTH[branch as Branch];

    // 6 points (Y0..Y5)
    const points: { year: string; salary: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const sal = Math.round(startSalary * Math.pow(1 + growth, i));
      points.push({ year: i === 0 ? "Y0" : `Y${i}`, salary: sal });
    }

    const notes: string[] = [];
    if (cbCountry) notes.push(`Country-wise salary base applied for ${country}.`);
    if (cbIndustry) notes.push(`Industry projection used for ${branch} (growth ~${Math.round(growth * 100)}%/yr).`);
    if (cbGoals) notes.push("Use the year-wise projection to set milestone targets.");
    if (cbFinance) notes.push("Supports planning tuition/living budgets vs expected income.");
    if (durationNote) notes.push(durationNote);
    if (currentEdu) notes.push(`Current education: ${currentEdu}${currentMarks ? ` (${currentMarks}%)` : ""}.`);
    if (prevEdu) notes.push(`Previous education: ${prevEdu}${prevMarks ? ` (${prevMarks}%)` : ""}.`);
    if (collegeRank) notes.push(`College rank considered: ${collegeRank}.`);
    if (extraEducation.length)
      notes.push(`Additional education added (${extraEducation.length}).`);
    if (extraCerts.length)
      notes.push(`Certifications added (${extraCerts.length}).`);

    const headline = `Estimated starting salary in ${country} for ${branch} is about ₹${formatINR(
      startSalary
    )} per year.`;

    setResults({ startSalary, points, headline, notes });

    setTimeout(() => graphRef.current?.scrollIntoView({ behavior: "smooth" }), 40);
  };

  // Download chart image (SVG → PNG)
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
        ctx.fillStyle = "#FCEBFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "future-earnings-output.png";
        a.click();
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[15px]">
      {/* HERO */}
      <header
        className="w-full bg-gradient-to-b from-[#002855] to-[#1a1a1a] text-white"
        style={{ height: "50vh", minHeight: 430 }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight text-center">
            Estimate Future Earnings
          </h1>
          <p className="mt-3 text-white/90 text-lg text-center max-w-3xl mx-auto">
            Country-wise & industry-based salary projections to help you set realistic goals and plan finances.
          </p>

          {/* Feature checkboxes */}
          {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <CheckRow label="Country-wise salary insights" checked={cbCountry} onChange={setCbCountry} />
            <CheckRow label="Industry-based projections" checked={cbIndustry} onChange={setCbIndustry} />
            <CheckRow label="Helps set realistic goals" checked={cbGoals} onChange={setCbGoals} />
            <CheckRow label="Supports financial planning" checked={cbFinance} onChange={setCbFinance} />
          </div> */}
        </div>
      </header>

      {/* FORM SECTION */}
      <main className="w-full max-w-[1400px] mx-auto px-6 pb-10 -mt-8">
        <div className="rounded-2xl bg-white shadow-xl ring-1 ring-[#EEF2F7] p-5 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B0B2C]">Inputs</h2>
          <p className="text-sm text-gray-600 mb-6">
            Required fields: <span className="font-semibold">Country</span> and{" "}
            <span className="font-semibold">Course Branch</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectBox label="Select Current Education" value={currentEdu} onChange={(e) => setCurrentEdu(e.target.value)}>
              <option value="">Select Current Education</option>
              <option>Master's</option>
              <option>Bachelor's</option>
              <option>Diploma</option>
              <option>Other</option>
            </SelectBox>

            <InputBox label="Enter Current Marks (%)" value={currentMarks} onChange={(e) => setCurrentMarks(e.target.value)} placeholder="Eg. 78" />

            <SelectBox label="Select Prev Education" value={prevEdu} onChange={(e) => setPrevEdu(e.target.value)}>
              <option value="">Select Prev Education</option>
              <option>12th Grade</option>
              <option>Undergraduate</option>
              <option>Diploma</option>
              <option>Other</option>
            </SelectBox>

            <InputBox label="Enter Prev Education Marks (%)" value={prevMarks} onChange={(e) => setPrevMarks(e.target.value)} placeholder="Eg. 82" />

            <SelectBox label="Select Career Branch *" value={branch} error={errors.branch} onChange={(e) => setBranch(e.target.value as Branch)}>
              <option value="">Select Career Branch</option>
              <option>Computer Science / IT / Data</option>
              <option>Chemical Engineering</option>
              <option>Engineering (Non-CS)</option>
              <option>Business / Management</option>
              <option>Healthcare</option>
              <option>Finance / Accounting</option>
              <option>Hospitality / Tourism</option>
              <option>Design / Arts</option>
              <option>Other</option>
            </SelectBox>

            <SelectBox label="Select College Ranking" value={collegeRank} onChange={(e) => setCollegeRank(e.target.value)}>
              <option value="">Select College Ranking</option>
              <option>Top 50</option>
              <option>Top 100</option>
              <option>Top 500</option>
              <option>Tier-1</option>
              <option>Tier-2</option>
              <option>Tier-3</option>
            </SelectBox>

            <SelectBox label="Select Course Duration" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)}>
              <option value="">Select Course Duration</option>
              <option>1 Year</option>
              <option>1.5 Years</option>
              <option>2 Years</option>
              <option>3 Years</option>
            </SelectBox>

            <SelectBox label="Select Country *" value={country} error={errors.country} onChange={(e) => setCountry(e.target.value as Country)}>
              <option value="">Select Country</option>
              <option>Germany</option>
              <option>UK</option>
              <option>USA</option>
              <option>Canada</option>
              <option>France</option>
              <option>Ireland</option>
              <option>Australia</option>
            </SelectBox>

            {/* Toggle Buttons */}
            <div
              className=" cursor-pointer rounded-lg px-4 py-3 font-semibold bg-white text-red-600 border-2 border-red-600"
              onClick={() => setShowExtraEdu((s) => !s)}
          
            >
              + Add Additional Education
            </div>

            <div
              className="rounded-lg px-4 py-3 font-semibold bg-white text-red-600 border-2 border-red-600 cursor-pointer"
              onClick={() => setShowExtraCert((s) => !s)}
             
            >
              + Add Additional Certification
            </div>
          </div>

          {/* Extra Education Section */}
          {showExtraEdu && (
            <div className="mt-6 rounded-2xl ring-1 ring-[#E5EBF0] p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#0B0B2C]">Additional Education</h3>
                <button
                  className="rounded-lg px-3 py-1 text-white text-sm"
                  onClick={() => setExtraEducation((arr) => [...arr, { level: "", marks: "" }])}
                  style={{ backgroundColor: THEME.blue }}
                >
                  + Add Row
                </button>
              </div>
              {extraEducation.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">Add previous/extra education (e.g., Graduate, PG Diploma).</p>
              )}
              <div className="mt-3 space-y-3">
                {extraEducation.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    <SelectBox
                      label="Select Additional Education"
                      value={row.level}
                      onChange={(e) =>
                        setExtraEducation((arr) => arr.map((r, i) => (i === idx ? { ...r, level: e.target.value } : r)))
                      }
                    >
                      <option value="">Select Additional Education</option>
                      <option>Graduate</option>
                      <option>Postgraduate</option>
                      <option>Diploma</option>
                      <option>Certificate</option>
                      <option>Other</option>
                    </SelectBox>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <InputBox
                          label="Enter Additional Education Marks (%)"
                          value={row.marks}
                          onChange={(e) =>
                            setExtraEducation((arr) => arr.map((r, i) => (i === idx ? { ...r, marks: e.target.value } : r)))
                          }
                          placeholder="Eg. 80"
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

          {/* Extra Certification Section */}
          {showExtraCert && (
            <div className="mt-6 rounded-2xl ring-1 ring-[#E5EBF0] p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#0B0B2C]">Additional Certification</h3>
                <button
                  className="rounded-lg px-3 py-1 text-white text-sm"
                  onClick={() => setExtraCerts((arr) => [...arr, { name: "", grade: "" }])}
                  style={{ backgroundColor: THEME.blue }}
                >
                  + Add Row
                </button>
              </div>
              {extraCerts.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">Add certifications relevant to your field.</p>
              )}
              <div className="mt-3 space-y-3">
                {extraCerts.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    <InputBox
                      label="Certification Name"
                      value={row.name}
                      onChange={(e) =>
                        setExtraCerts((arr) => arr.map((r, i) => (i === idx ? { ...r, name: e.target.value } : r)))
                      }
                      placeholder="Eg. AWS Solutions Architect"
                    />
                    <div className="flex gap-2">
                      <SelectBox
                        label="Select Certificate Grade"
                        value={row.grade}
                        onChange={(e) =>
                          setExtraCerts((arr) => arr.map((r, i) => (i === idx ? { ...r, grade: e.target.value } : r)))
                        }
                      >
                        <option value="">Select Certificate Grade</option>
                        <option>A+</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>Pass</option>
                      </SelectBox>
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

          {/* Submit */}
          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={handleEstimate}
              className="w-full sm:w-[380px] rounded-2xl px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition bg-red-600"
            >
              Get Salary Estimate
            </button>
          </div>
        </div>

        {/* OUTPUT */}
        {results && (
          <section ref={graphRef} className="mt-10">
            <h3 className="text-xl md:text-2xl font-bold text-[#0B0B2C] mb-4">Output:</h3>

            <div ref={exportRef} className="rounded-2xl ring-1 ring-[#F0E6FF] bg-[#FCEBFF] p-4 md:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg md:text-xl font-bold">{country}</div>
                {/* Download icon */}
                <button
                  onClick={downloadOutputImage}
                  title="Download image"
                  className="p-2 rounded-lg hover:bg-white/40 transition"
                  aria-label="Download output as image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                    <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 21h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
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
                      name={branch || "Salary"}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                <Stat label="Starting (Year 0)" value={`₹${formatINR(results.startSalary)}/yr`} />
                <Stat label="Country" value={country} />
                <Stat label="Branch" value={branch} />
              </div>
              {results.notes.length > 0 && (
                <ul className="list-disc ml-6 mt-4 text-sm text-gray-700 space-y-1">
                  {results.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}

              {/* Apply for Loan button (red) */}
              <div className="pt-4">
                <button
                  className="rounded-xl px-6 py-3 font-semibold text-white shadow-md hover:shadow-lg transition"
                  style={{ backgroundColor: THEME.red }}
                >
                  Apply for Loan
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

/* ---------- Atoms ---------- */

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded accent-white"
      />
      <span className="text-sm">{label}</span>
    </label>
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
            "w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 outline-none",
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
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black"
        />
      </div>
      {error && <p className="mt-1 text-xs" style={{ color: THEME.red }}>{error}</p>}
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
        className="w-full rounded-xl border px-4 py-3 outline-none border-gray-400 focus:ring-2"
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
