// src/pages/GpaCalculatorPage.tsx
import DelayedPopup from "@/components/DelayedPopup";
import React, { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";

/* -----------------------------------
   Data & helpers (unchanged)
------------------------------------*/

type GradeRow = { grade: string; scale: string; description: string };
const GRADING_SCALE: GradeRow[] = [
  { grade: "A+", scale: "4", description: "Excellent" },
  { grade: "A", scale: "4", description: "Excellent" },
  { grade: "A-", scale: "3.7", description: "Average" },
  { grade: "AB", scale: "3.5", description: "Below Average" },
  { grade: "B+", scale: "3.3", description: "Good" },
  { grade: "B", scale: "3", description: "Good" },
  { grade: "B-", scale: "2.7", description: "Good" },
  { grade: "BC", scale: "2.5", description: "Average" },
  { grade: "C+", scale: "2.3", description: "Average" },
  { grade: "C", scale: "2", description: "Average" },
  { grade: "C-", scale: "1.7", description: "Below Average" },
  { grade: "CD", scale: "1.5", description: "Below Average" },
  { grade: "D+", scale: "1.3", description: "Below Average" },
  { grade: "D", scale: "1", description: "Poor" },
  { grade: "D-", scale: "0.7", description: "Fail" },
  { grade: "F", scale: "N/A", description: "Fail" },
];

const GRADE_POINTS: Record<string, number> = {
  "A+": 4,
  A: 4,
  "A-": 3.7,
  AB: 3.5,
  "B+": 3.3,
  B: 3,
  "B-": 2.7,
  BC: 2.5,
  "C+": 2.3,
  C: 2,
  "C-": 1.7,
  CD: 1.5,
  "D+": 1.3,
  D: 1,
  "D-": 0.7,
  F: 0,
};

type Course = { id: string; name: string; credits: string; grade: string };
type Semester = { id: string; name: string; courses: Course[] };
type CalcMode = "4.0 GPA" | "CGPA to GPA" | "Percentage to GPA";
const ALL_GRADES = Object.keys(GRADE_POINTS);

const CONFETTI_COLORS = [
  "#22c55e",
  "#eab308",
  "#0ea5e9",
  "#7c3aed",
  "#ef4444",
  "#f97316",
  "#06b6d4",
];

/* -----------------------------------
   Utilities (unchanged)
------------------------------------*/

function makeSemester(n: number): Semester {
  return {
    id: crypto.randomUUID(),
    name: `Semester ${n}`,
    courses: [{ id: crypto.randomUUID(), name: "", credits: "", grade: "" }],
  };
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/* -----------------------------------
   Small UI primitives (Tailwind versions)
------------------------------------*/

const Select: React.FC<{
  value?: string;
  options: string[];
  placeholder?: string;
  ariaLabel?: string;
  onChange: (v: string) => void;
}> = ({ value, options, placeholder, ariaLabel, onChange }) => {
  return (
    <label className="relative inline-flex w-full items-center">
      <select
        aria-label={ariaLabel}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full border border-gray-300 px-3 py-2 rounded-lg text-sm bg-white outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-300"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="absolute right-3 text-gray-400 pointer-events-none"
      >
        ▾
      </span>
    </label>
  );
};

const Modal: React.FC<{
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}> = ({ title, children, onClose }) => {
  return createPortal(
    <div
      className="fixed inset-0 bg-[rgba(2,6,23,0.55)] grid place-items-center p-4 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-[min(640px,95vw)] bg-white rounded-xl p-4 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
          {title && <h3 className="m-0 text-lg font-semibold">{title}</h3>}
          <button
            aria-label="Close"
            onClick={onClose}
            title="Close"
            className="border-0 bg-transparent text-base leading-none cursor-pointer p-1 rounded-md hover:bg-gray-100"
          >
            ✖
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

/* -----------------------------------
   Main Page (Tailwind)
------------------------------------*/

const GpaCalculatorPage: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>("4.0 GPA");
  const [semesters, setSemesters] = useState<Semester[]>([makeSemester(1)]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ gpa: number; outOf: number }>({
    gpa: 0,
    outOf: 4,
  });

  // Converter inputs
  const [cgpa10, setCgpa10] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");

  function handleAddSemester() {
    if (semesters.length >= 12) return;
    setSemesters((prev) => [...prev, makeSemester(prev.length + 1)]);
  }
  function handleRemoveSemester(id: string) {
    setSemesters((prev) => prev.filter((s) => s.id !== id));
  }
  function updateSemester(id: string, updater: (s: Semester) => Semester) {
    setSemesters((prev) => prev.map((s) => (s.id === id ? updater(s) : s)));
  }
  function handleAddCourse(semId: string) {
    updateSemester(semId, (s) => ({
      ...s,
      courses: [
        ...s.courses,
        { id: crypto.randomUUID(), name: "", credits: "", grade: "" },
      ],
    }));
  }
  function handleRemoveCourse(semId: string, courseId: string) {
    updateSemester(semId, (s) => ({
      ...s,
      courses: s.courses.filter((c) => c.id !== courseId),
    }));
  }

  function clearAll() {
    setSemesters([makeSemester(1)]);
    setMode("4.0 GPA");
    setCgpa10("");
    setPercentage("");
    setShowResult(false);
    setResult({ gpa: 0, outOf: 4 });
  }

  function validate(): [boolean, string?] {
    if (mode === "4.0 GPA") {
      for (const sem of semesters) {
        for (const [idx, c] of sem.courses.entries()) {
          if (!c.name.trim())
            return [
              false,
              `Semester ${sem.name}: Course ${idx + 1} name is empty.`,
            ];
          const credits = Number(c.credits);
          if (!Number.isFinite(credits) || credits <= 0)
            return [
              false,
              `Semester ${sem.name}: Course ${idx + 1} has invalid credits.`,
            ];
          if (!c.grade)
            return [
              false,
              `Semester ${sem.name}: Course ${idx + 1} grade is missing.`,
            ];
        }
      }
    } else if (mode === "CGPA to GPA") {
      const v = Number(cgpa10);
      if (!Number.isFinite(v) || v < 0 || v > 10)
        return [false, "Enter CGPA on a 10-point scale (0–10)."];
    } else {
      const v = Number(percentage);
      if (!Number.isFinite(v) || v < 0 || v > 100)
        return [false, "Enter percentage between 0 and 100."];
    }
    return [true];
  }

  function calculate() {
    const [ok, msg] = validate();
    if (!ok) {
      alert(msg);
      return;
    }

    if (mode === "4.0 GPA") {
      let qp = 0;
      let cr = 0;
      for (const sem of semesters) {
        for (const c of sem.courses) {
          qp += (GRADE_POINTS[c.grade] ?? 0) * Number(c.credits);
          cr += Number(c.credits);
        }
      }
      const gpa = cr > 0 ? qp / cr : 0;
      setResult({ gpa: round2(gpa), outOf: 4 });
    } else if (mode === "CGPA to GPA") {
      setResult({ gpa: round2((Number(cgpa10) / 10) * 4), outOf: 4 });
    } else {
      setResult({ gpa: round2((Number(percentage) / 100) * 4), outOf: 4 });
    }
    setShowResult(true);
  }

  const isGood = result.gpa >= 2.5;
  const meterColor = useMemo(() => {
    const v = result.gpa;
    if (v >= 3.5) return "#22c55e";
    if (v >= 2.5) return "#eab308";
    if (v >= 1.5) return "#f97316";
    return "#ef4444";
  }, [result.gpa]);

  /* Small inline CSS used for responsive table stacking + animations */
  const extraStyles = `
    /* Responsive table stacking (mobile) */
    .responsive-table thead { }
    @media (max-width: 560px) {
      .responsive-table thead { display: none; }
      .responsive-table tr { display: block; border: 1px solid #eef0f6; border-radius: 12px; box-shadow: 0 4px 10px rgba(2,6,23,.04); margin-bottom: .65rem; padding: .35rem .5rem; }
      .responsive-table td { display: grid; grid-template-columns: 9.5rem 1fr; gap: .4rem; border: 0; padding: .45rem .2rem; }
      .responsive-table td::before { content: attr(data-label); font-weight: 700; color: #334155; }
    }

    /* Modal show-in animation */
    @keyframes showIn {
      from { transform: translateY(8px); opacity: .95; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up { animation: showIn .14s ease-out both; }

    /* Confetti fall animation */
    @keyframes fall {
      0%   { transform: translateY(-120%) rotate(0deg); opacity: 0; }
      10%  { opacity: 1; }
      100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
    }
    .confetti-layer { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 60; }
  `;

  /* Confetti overlay (converted to inline-style pieces) */
  const ConfettiOverlay: React.FC = () => {
    const pieces = Array.from({ length: 120 }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 0.6;
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const w = 6 + Math.round(Math.random() * 6);
      const h = 10 + Math.round(Math.random() * 12);
      const style: React.CSSProperties = {
        position: "absolute",
        top: -16,
        left: `${left}%`,
        width: `${w}px`,
        height: `${h}px`,
        background: color,
        borderRadius: 2,
        animation: `fall 2.8s linear ${delay}s forwards`,
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,.15))",
      };
      return <span key={i} style={style} aria-hidden />;
    });
    return (
      <div className="confetti-layer" aria-hidden>
        {pieces}
      </div>
    );
  };
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  // Needle component (identical math)
  const GaugeNeedle: React.FC<{ value: number }> = ({ value }) => {
    const v = Math.max(0, Math.min(1, value));
    const angle = -180 + 180 * v; // -180..0
    const x = 60 + 45 * Math.cos((Math.PI * (angle + 180)) / 180);
    const y = 60 + 45 * Math.sin((Math.PI * (angle + 180)) / 180);
    return (
      <>
        <line
          x1="60"
          y1="60"
          x2={x}
          y2={y}
          stroke="#0f172a"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="60" cy="60" r="4.5" fill="#0f172a" />
      </>
    );
  };

  return (
    <div className="min-h-[100svh] bg-[#fafbff] text-[#222] overflow-x-hidden break-words">
      {/* Inject extra styles for responsive table and animations */}
      <style>{extraStyles}</style>

      {/* Banner */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-36 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: `url(/assets/images/tools-bg.webp)`,
        }}
      >
        {/* Dark overlay under content */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h1
            className="m-0 font-extrabold tracking-wide"
            style={{
              marginBottom: ".35rem",
              fontSize: "clamp(1.8rem, 2.4vw + 1rem, 2.6rem)",
              letterSpacing: "0.5px",
            }}
          >
            GPA Calculator
          </h1>
          <p className="m-0 opacity-95">
            Compute your GPA on a 4-point scale or convert CGPA/Percentage.
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="w-full max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* LEFT (3/5) */}
          <section className="lg:col-span-3 grid gap-4">
            {/* Calculation Type */}
            <section
              className="bg-white rounded-[14px] p-4 shadow-md border border-gray-400x"
              aria-labelledby="mode-heading"
            >
              <h2 id="mode-heading" className="text-base font-bold mb-3">
                Calculation Type
              </h2>
              <div>
                <Select
                  value={mode}
                  onChange={(v) => setMode(v as CalcMode)}
                  ariaLabel="Select GPA calculation type"
                  options={["4.0 GPA", "CGPA to GPA", "Percentage to GPA"]}
                />
              </div>
            </section>

            {/* Main Card (Semesters / Converters) */}
            <section className="bg-white rounded-[14px] p-4 shadow-md border border-gray-400x">
              {mode === "4.0 GPA" ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold mb-2">Semesters</h2>
                    <span aria-live="polite" className="text-sm text-gray-600">
                      {semesters.length}/12
                    </span>
                  </div>

                  {semesters.map((sem, idx) => (
                    <div
                      key={sem.id}
                      aria-label={`Semester ${idx + 1}`}
                      className="border border-gray-400x rounded-lg p-3 mb-4 shadow-sm bg-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <strong>Semester {idx + 1}</strong>
                        <button
                          aria-label={`Delete Semester ${idx + 1}`}
                          onClick={() => handleRemoveSemester(sem.id)}
                          disabled={semesters.length === 1}
                          title={
                            semesters.length === 1
                              ? "At least one semester is required"
                              : "Remove semester"
                          }
                          className={`p-1 rounded-md ${
                            semesters.length === 1
                              ? "opacity-40 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          } `}
                        >
                          🗑
                        </button>
                      </div>

                      <table
                        className="responsive-table w-full border-collapse bg-white rounded-xl overflow-hidden"
                        role="grid"
                        aria-label={`Courses for Semester ${idx + 1}`}
                      >
                        <thead className="hidden sm:table-header-group">
                          <tr>
                            <th className="text-left bg-[#eaf2ff] text-[#1f2937] px-3 py-2 font-bold border-b border-[#dde7ff]">
                              S.no
                            </th>
                            <th className="text-left bg-[#eaf2ff] text-[#1f2937] px-3 py-2 font-bold border-b border-[#dde7ff]">
                              Courses
                            </th>
                            <th className="text-left bg-[#eaf2ff] text-[#1f2937] px-3 py-2 font-bold border-b border-[#dde7ff]">
                              Credits
                            </th>
                            <th className="text-left bg-[#eaf2ff] text-[#1f2937] px-3 py-2 font-bold border-b border-[#dde7ff]">
                              Grades
                            </th>
                            <th
                              className="bg-[#eaf2ff] px-3 py-2 border-b border-[#dde7ff]"
                              aria-hidden
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {sem.courses.map((c, i) => (
                            <tr key={c.id} className="">
                              <td
                                data-label="S.no"
                                className="px-2 py-2 border-b sm:border-b-0 align-middle"
                              >
                                {i + 1}
                              </td>
                              <td
                                data-label="Courses"
                                className="px-2 py-2 border-b sm:border-b-0 align-middle"
                              >
                                <input
                                  placeholder="Course name"
                                  value={c.name}
                                  onChange={(e) =>
                                    updateSemester(sem.id, (s) => ({
                                      ...s,
                                      courses: s.courses.map((x) =>
                                        x.id === c.id
                                          ? { ...x, name: e.target.value }
                                          : x
                                      ),
                                    }))
                                  }
                                  aria-label={`Course ${i + 1} name`}
                                  className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm  outline-none transition"
                                />
                              </td>
                              <td
                                data-label="Credits"
                                className="px-2 py-2 border-b sm:border-b-0 align-middle"
                              >
                                <input
                                  placeholder="e.g. 4"
                                  inputMode="decimal"
                                  value={c.credits}
                                  onChange={(e) =>
                                    updateSemester(sem.id, (s) => ({
                                      ...s,
                                      courses: s.courses.map((x) =>
                                        x.id === c.id
                                          ? { ...x, credits: e.target.value }
                                          : x
                                      ),
                                    }))
                                  }
                                  aria-label={`Course ${i + 1} credits`}
                                  className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm outline-none transition"
                                />
                              </td>
                              <td
                                data-label="Grades"
                                className="px-2 py-2 border-b sm:border-b-0 align-middle"
                              >
                                <Select
                                  value={c.grade}
                                  onChange={(v) =>
                                    updateSemester(sem.id, (s) => ({
                                      ...s,
                                      courses: s.courses.map((x) =>
                                        x.id === c.id ? { ...x, grade: v } : x
                                      ),
                                    }))
                                  }
                                  ariaLabel={`Course ${i + 1} grade`}
                                  placeholder="Select"
                                  options={ALL_GRADES}
                                />
                              </td>
                              <td
                                data-label="Remove"
                                className="px-2 py-2 align-middle"
                              >
                                <button
                                  aria-label={`Remove Course ${i + 1}`}
                                  onClick={() =>
                                    handleRemoveCourse(sem.id, c.id)
                                  }
                                  title="Remove course"
                                  className="p-1 rounded-md hover:bg-gray-100"
                                >
                                  ✖
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <button
                        onClick={() => handleAddCourse(sem.id)}
                        aria-label="Add course"
                        className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-400 bg-white hover:border-violet-600 hover:shadow-sm transition"
                      >
                        ＋ Add Course
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleAddSemester}
                      disabled={semesters.length >= 12}
                      aria-disabled={semesters.length >= 12}
                      aria-label="Add semester"
                      title={
                        semesters.length >= 12
                          ? "Maximum 12 semesters allowed"
                          : "Add a new semester"
                      }
                      className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-400 bg-white hover:border-violet-600 hover:shadow-sm transition"
                    >
                      ＋ Add Semester
                    </button>
                    <div />
                  </div>
                </>
              ) : mode === "CGPA to GPA" ? (
                <div className="grid gap-2">
                  <h2 className="text-base font-bold">
                    CGPA (10-point) → 4.0 GPA
                  </h2>
                  <label htmlFor="cgpa10" className="text-sm text-slate-700">
                    Enter CGPA (0–10)
                  </label>
                  <input
                    id="cgpa10"
                    inputMode="decimal"
                    placeholder="e.g. 8.2"
                    value={cgpa10}
                    onChange={(e) => setCgpa10(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:border-violet-600 focus:ring-4 focus:ring-violet-300 outline-none transition"
                  />
                  <p className="text-sm text-gray-500">
                    We convert by:{" "}
                    <code className="bg-[#eef2ff] px-1 rounded">
                      {" "}
                      (CGPA ÷ 10) × 4{" "}
                    </code>
                  </p>
                </div>
              ) : (
                <div className="grid gap-2">
                  <h2 className="text-base font-bold">Percentage → 4.0 GPA</h2>
                  <label htmlFor="pct" className="text-sm text-slate-700">
                    Enter Percentage (0–100)
                  </label>
                  <input
                    id="pct"
                    inputMode="decimal"
                    placeholder="e.g. 78"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:border-violet-600 focus:ring-4 focus:ring-violet-300 outline-none transition"
                  />
                  <p className="text-sm text-gray-500">
                    We convert by:{" "}
                    <code className="bg-[#eef2ff] px-1 rounded">
                      (Percentage ÷ 100) × 4
                    </code>
                  </p>
                </div>
              )}
            </section>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={calculate}
                aria-label="Calculate GPA"
                className="px-1 py-1 h-12 rounded-xl font-bold bg-red-600 text-white  "
              >
                Calculate GPA
              </button>
              <button
                onClick={clearAll}
                aria-label="Clear all grades"
                className="px-1 py-1 h-12 rounded-xl font-bold bg-white text-red-600 border border-red-600 "
              >
                Clear Grades
              </button>
            </div>
          </section>

          {/* RIGHT (2/5) */}
          <aside className="lg:col-span-2 lg:sticky lg:top-4 self-start">
            <section
              className="bg-white rounded-[14px] p-4 shadow-md border border-gray-400x"
              aria-labelledby="scale-heading"
            >
              <h2 id="scale-heading" className="text-base font-bold mb-3">
                4-point Grading Scale Chart
              </h2>
              <table
                className="responsive-table w-full border-collapse text-sm"
                role="table"
                aria-label="4 point grading scale"
              >
                <thead className="hidden sm:table-header-group">
                  <tr>
                    <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                      Grade
                    </th>
                    <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                      Scale
                    </th>
                    <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {GRADING_SCALE.map((r) => (
                    <tr key={r.grade}>
                      <td data-label="Grade" className="px-3 py-2 border-b">
                        {r.grade}
                      </td>
                      <td data-label="Scale" className="px-3 py-2 border-b">
                        {r.scale}
                      </td>
                      <td
                        data-label="Description"
                        className="px-3 py-2 border-b"
                      >
                        {r.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </aside>
        </div>
      </main>

      {/* LEARN / HOW-TO */}
      <section className="w-full max-w-[1400px] mx-auto px-6 py-10">
        <div className="text-center my-8">
          <h2
            className="m-0"
            style={{
              marginBottom: ".35rem",
              fontSize: "clamp(1.4rem, 1.2rem + 1.2vw, 2rem)",
            }}
          >
            GPA Calculator: How do we Calculate GPA?
          </h2>
          <p className="m-0 text-gray-600">
            Let us take the example of a student who has{" "}
            <strong>2 semesters</strong>. Below we demonstrate how the GPA and
            CGPA are computed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Semester 1 */}
          <div className="bg-white rounded-[14px] p-4 shadow-md border border-gray-400x">
            <h3 className="text-lg font-semibold mb-3">Semester 1</h3>
            <table
              className="responsive-table w-full border-collapse"
              role="table"
              aria-label="Semester 1 example"
            >
              <thead className="hidden sm:table-header-group">
                <tr>
                  <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                    Code Number &amp; Subject
                  </th>
                  <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                    Credits
                  </th>
                  <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Mathematics", "5.0", "A"],
                  ["Science", "4.0", "B+"],
                  ["Literature", "3.5", "A-"],
                  ["History", "3.0", "B"],
                  ["Geography", "4.0", "C+"],
                  ["Physics", "2.5", "B-"],
                  ["Chemistry", "3.5", "A+"],
                  ["Biology", "4.0", "A"],
                  ["Computer Science", "4.5", "A"],
                ].map((r, i) => (
                  <tr key={i}>
                    <td
                      data-label="Code Number & Subject"
                      className="px-3 py-2 border-b"
                    >
                      {r[0]}
                    </td>
                    <td data-label="Credits" className="px-3 py-2 border-b">
                      {r[1]}
                    </td>
                    <td data-label="Grade" className="px-3 py-2 border-b">
                      {r[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Semester 2 */}
          <div className="bg-white rounded-[14px] p-4 shadow-md border border-gray-400x">
            <h3 className="text-lg font-semibold mb-3">Semester 2</h3>
            <table
              className="responsive-table w-full border-collapse"
              role="table"
              aria-label="Semester 2 example"
            >
              <thead className="hidden sm:table-header-group">
                <tr>
                  <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                    Code Number &amp; Subject
                  </th>
                  <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                    Credits
                  </th>
                  <th className="bg-[#eaf2ff] px-3 py-2 text-left font-bold border-b border-[#dde7ff]">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Algebra", "5.0", "A"],
                  ["Physics", "4.0", "B+"],
                  ["Literature", "3.5", "A-"],
                  ["World History", "3.0", "B"],
                  ["Cultural Geography", "4.0", "C+"],
                  ["Astrophysics", "2.5", "B-"],
                  ["Organic Chemistry", "3.5", "A+"],
                  ["Anatomy", "4.0", "A"],
                  ["Computer Engineering", "4.5", "A"],
                ].map((r, i) => (
                  <tr key={i}>
                    <td
                      data-label="Code Number & Subject"
                      className="px-3 py-2 border-b"
                    >
                      {r[0]}
                    </td>
                    <td data-label="Credits" className="px-3 py-2 border-b">
                      {r[1]}
                    </td>
                    <td data-label="Grade" className="px-3 py-2 border-b">
                      {r[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CGPA formula card */}
          <div className="bg-[#f8fbff] rounded-[14px] p-4 shadow-md border border-gray-400">
            <h3 className="text-lg font-semibold mb-3">
              CGPA Calculator: How to Check CGPA after Semester 2?
            </h3>
            <div className="text-sm text-[#0f172a]">
              <p>
                <strong>Calculate CGPA Formula:</strong>{" "}
                <code className="bg-[#eef2ff] px-1 rounded">
                  Total Semester Grade Point ÷ Total Credits
                </code>
              </p>
              <hr className="border-t border-dashed border-gray-200 my-2" />
              <p>
                <strong>Total Grade Point =</strong> Semester 1 + Semester 2
              </p>
              <p>
                = <strong>208.5</strong> + <strong>216.5</strong>
              </p>
              <p>
                = <strong>425</strong>
              </p>
              <hr className="border-t border-dashed border-gray-200 my-2" />
              <p>
                <strong>Total Credit Score =</strong> Semester 1 + Semester 2
              </p>
              <p>
                = <strong>23.0</strong> + <strong>24.5</strong>
              </p>
              <p>
                = <strong>47.5</strong>
              </p>
              <hr className="border-t border-dashed border-gray-200 my-2" />
              <p>
                <strong>How to Check CGPA</strong>
              </p>
              <p>
                = <strong>425 ÷ 47.5</strong>
              </p>
              <p className="text-lg font-extrabold text-red-500">
                = <strong>8.94736</strong>
              </p>
              <div className="inline-block mt-2 bg-white text-red-600 border border-red-600 px-3 py-1 rounded-full font-extrabold">
                CGPA = <strong>8.9474</strong> at the end of Semester 2
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confetti overlay only when good */}
      {showResult && isGood && <ConfettiOverlay />}

      {/* Result modal */}
      {showResult && (
        <Modal
          onClose={() => setShowResult(false)}
          title="Your calculated GPA is"
        >
          <div className="p-2">
            <div className="text-center">
              <svg
                viewBox="0 0 120 60"
                preserveAspectRatio="xMidYMid meet"
                className="w-full max-w-[520px] block mx-auto mb-2"
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <path
                  d="M10,60 A50,50 0 0 1 110,60"
                  fill="none"
                  stroke="url(#g)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity={0.35}
                />
                <GaugeNeedle value={result.gpa / result.outOf} />
              </svg>

              <div
                style={{ fontSize: "clamp(2rem, 6vw, 2.6rem)" }}
                className="font-extrabold leading-none"
              >
                <span style={{ color: meterColor }}>
                  {result.gpa.toFixed(2)}
                </span>
                <span className="text-[0.55em] text-slate-600 ml-1">
                  / {result.outOf}
                </span>
              </div>

              {isGood ? (
                <p className="mt-2 font-bold text-green-600 text-center">
                  🎉 Congratulations! You have a good score.
                </p>
              ) : (
                <p className="mt-2 font-semibold text-slate-900 text-center">
                  Don’t worry — your average score won’t hinder your goals.
                  <br />
                  We’ll help you improve with smart study plans and pacing.
                </p>
              )}

              <p className="mt-2 text-sm text-gray-500">
                Results are indicative based on the 4.0 scale.
              </p>
            </div>

            {/* <button onClick={() => window.open("#", "_parent")} aria-label="Apply now" className="mt-4 mx-auto block px-4 py-3 rounded-xl font-bold bg-red-600 text-white w-full max-w-[360px] shadow-lg hover:brightness-105"

            >
              Apply Now
            </button> */}
            <a
              href="#"
              aria-label="Apply now"
              className="mt-4 mx-auto block px-4 py-3 rounded-xl font-bold bg-red-600 text-white w-full max-w-[360px] shadow-lg hover:brightness-105"
              onClick={() => setShowPopup(true)}
            >
              Apply Now
            </a>

            {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
          </div>
        </Modal>
      )}
    </div>
  );
};

/* -----------------------------------
   Example routing (DemoApp)
------------------------------------*/

export const DemoApp: React.FC = () => {
  return (
    <BrowserRouter>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-400x">
        <div className="max-w-[1120px] mx-auto flex items-center justify-between gap-4 py-2 px-4">
          <Link to="/" className="font-extrabold text-[#0f172a] no-underline">
            MyAcademics
          </Link>
          <nav className="flex gap-3">
            <Link
              to="/"
              className="text-[#0f172a] px-2 py-1 rounded-lg hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/gpa"
              className="text-[#0f172a] px-2 py-1 rounded-lg hover:bg-gray-100"
            >
              GPA Calculator
            </Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomeStub />} />
        <Route path="/gpa" element={<GpaCalculatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const HomeStub: React.FC = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2>Welcome</h2>
    <p>
      Open the{" "}
      <Link to="/gpa" className="text-sky-600 underline">
        GPA Calculator
      </Link>{" "}
      to get started.
    </p>
  </div>
);

export default GpaCalculatorPage;
