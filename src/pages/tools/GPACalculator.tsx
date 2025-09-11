// src/pages/tools/GPACalculator.tsx
import React, { useEffect, useState } from "react";
import ToolPageLayout from "@/components/layout/ToolPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Plus, Trash2 } from "lucide-react";

/* ===== Theme ===== */
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
} as const;

/* ===== 4.0 scale ===== */
const GRADE_POINTS = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  AB: 3.5,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  BC: 2.5,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  CD: 1.5,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0,
} as const;
type GradeKey = keyof typeof GRADE_POINTS;
const GRADE_OPTIONS = Object.keys(GRADE_POINTS) as GradeKey[];

/* ===== Types ===== */
type Course = { id: string; name: string; credits: string; grade: GradeKey };
type Semester = { id: string; title: string; courses: Course[] };

/* ===== Utils ===== */
const uid = (): string => Math.random().toString(36).slice(2, 9);
const newCourse = (): Course => ({ id: uid(), name: "", credits: "", grade: "A+" });
const newSemester = (n: number): Semester => ({ id: uid(), title: `Semester ${n}`, courses: [newCourse()] });
const parseCredits = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
function computeSemesterGPA(s: Semester) {
  let pts = 0, cr = 0;
  for (const c of s.courses) {
    const credits = parseCredits(c.credits);
    pts += GRADE_POINTS[c.grade] * credits;
    cr += credits;
  }
  return { gpa: cr > 0 ? pts / cr : 0, credits: cr, points: pts };
}

/* ===== Component ===== */
export default function GPACalculator(): JSX.Element {
  const heroGradientClass =
    "bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(37,99,235,0.30),transparent_70%)] bg-gradient-to-b from-[#0d1b2a] via-[#0d0f14] to-[#0b0b0b]";

  const [semesters, setSemesters] = useState<Semester[]>([newSemester(1)]);
  const [mode, setMode] = useState<"4gpa" | "cgpaToGpa" | "percentToGpa">("4gpa");
  const [results, setResults] = useState<{
    perSemester: { id: string; title: string; gpa: number }[];
    cgpa: number;
    totalCredits: number;
  } | null>(null);

  /* persistence */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gpa_calc_state_v2");
      if (saved) {
        const parsed = JSON.parse(saved) as Semester[];
        if (Array.isArray(parsed) && parsed.length) setSemesters(parsed);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("gpa_calc_state_v2", JSON.stringify(semesters));
    } catch {}
  }, [semesters]);

  /* handlers */
  const addSemester = () => semesters.length < 12 && setSemesters((p) => [...p, newSemester(p.length + 1)]);
  const removeSemester = (id: string) =>
    setSemesters((p) => p.filter((s) => s.id !== id).map((s, i) => ({ ...s, title: `Semester ${i + 1}` })));
  const addCourse = (sid: string) =>
    setSemesters((p) => p.map((s) => (s.id === sid ? { ...s, courses: [...s.courses, newCourse()] } : s)));
  const removeCourse = (sid: string, cid: string) =>
    setSemesters((p) => p.map((s) => (s.id === sid ? { ...s, courses: s.courses.filter((c) => c.id !== cid) } : s)));
  function updateCourse<T extends keyof Course>(sid: string, cid: string, field: T, value: Course[T]) {
    setSemesters((p) =>
      p.map((s) =>
        s.id === sid ? { ...s, courses: s.courses.map((c) => (c.id === cid ? ({ ...c, [field]: value } as Course) : c)) } : s,
      ),
    );
  }
  const clearAll = () => {
    setSemesters([newSemester(1)]);
    setResults(null);
  };
  const calculate = () => {
    const per = semesters.map((s) => ({ id: s.id, title: s.title, gpa: computeSemesterGPA(s).gpa }));
    let totalPoints = 0,
      totalCredits = 0;
    for (const s of semesters) {
      const { points, credits } = computeSemesterGPA(s);
      totalPoints += points;
      totalCredits += credits;
    }
    setResults({ perSemester: per, cgpa: totalCredits > 0 ? totalPoints / totalCredits : 0, totalCredits });
  };

  /* styling helpers */
  const tableHeaderBg = THEME.red; // solid red header (no gradient)
  const redBorder = { borderColor: "#dedede" };
  const redBtnFilled = { backgroundColor: THEME.red, color: "#fff", borderColor: "#dedede" };
  const redBtnOutline = { backgroundColor: "#fff", color: THEME.red, borderColor: "#dedede" };

  return (
    <ToolPageLayout
      title="GPA / CGPA Calculator"
      description="Build semesters, add courses, and instantly compute GPA per semester and overall CGPA on a 4.0 scale."
      heroIcon={<Calculator className="h-12 w-12 text-white" />}
      heroClassName={`${heroGradientClass} relative overflow-hidden`}

      /* LEFT column */
      calculatorForm={
        <>
          {/* Top callout */}
          {/* <div
            className="rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden mb-6 md:mb-8"
            style={{ backgroundColor: THEME.text, boxShadow: "0 12px 28px rgba(0,0,0,0.15)" }}
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold">Start building your semesters</h3>
              <p className="text-white/90 text-sm sm:text-base">
                Mobile-friendly cards for inputs, compact tables on desktop. Your data auto-saves locally.
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <Button onClick={calculate} className="font-semibold border-2" style={redBtnFilled}>
                Calculate GPA
              </Button>
              <Button onClick={clearAll} className="border-2 hover:bg-red-50" variant="outline" style={redBtnOutline}>
                Clear Grades
              </Button>
            </div>
          </div> */}

          {/* === BUILDER CARD === */}
          <Card
            className="rounded-2xl border-2"
            style={{ ...redBorder, boxShadow: "0 10px 24px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg font-semibold" style={{ color: THEME.text }}>
                Enter Courses (Responsive)
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* >>> TOP MODE DROPDOWN (above semesters) <<< */}
              <div className="rounded-2xl border-2 px-3 sm:px-4 py-2 sm:py-3" style={redBorder}>
                <Label className="sr-only">Mode</Label>
                <Select value={mode} onValueChange={(v: any) => setMode(v)}>
                  <SelectTrigger className="h-12 border-0 shadow-none bg-transparent px-0 focus:ring-0 focus-visible:ring-0">
                    <SelectValue placeholder="4.0 GPA" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    <SelectItem value="4gpa">4.0 GPA</SelectItem>
                    <SelectItem value="cgpaToGpa">CGPA to GPA</SelectItem>
                    <SelectItem value="percentToGpa">Percentage to GPA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {semesters.map((sem) => (
                <div
                  key={sem.id}
                  className="rounded-2xl border-2 p-4 sm:p-5 bg-[rgba(255,252,251,0.65)] backdrop-blur"
                  style={redBorder}
                >
                  {/* Semester header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-1.5 rounded-full" style={{ backgroundColor: THEME.red }} />
                      <h3 className="text-lg font-semibold">{sem.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline text-sm text-neutral-600">
                        {computeSemesterGPA(sem).credits} credits
                      </span>
                      {semesters.length > 1 && (
                        <button
                          title="Remove semester"
                          onClick={() => removeSemester(sem.id)}
                          className="inline-flex items-center justify-center rounded-lg h-9 w-9 border-2 hover:bg-red-50 transition"
                          style={redBorder}
                        >
                          <Trash2 className="h-4 w-4" color={THEME.red} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Desktop table header — SOLID RED */}
                  <div
                    className="hidden md:grid grid-cols-[72px_1fr_220px_180px] gap-3 font-semibold text-white rounded-xl px-4 py-2"
                    style={{ backgroundColor: tableHeaderBg }}
                  >
                    <div>#</div>
                    <div>Course</div>
                    <div>Credits</div>
                    <div>Grade</div>
                  </div>

                  {/* Rows */}
                  <div className="mt-3 space-y-3">
                    {sem.courses.map((c, idx) => (
                      <div
                        key={c.id}
                        className="relative group rounded-xl border-2 p-3 md:p-0 md:border-0 bg-white md:bg-transparent pr-12"
                        style={redBorder}
                      >
                        {/* Overlay dustbin (no dedicated column) */}
                        <button
                          title="Remove row"
                          onClick={() => removeCourse(sem.id, c.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-9 w-9 rounded-lg border-2 opacity-70 hover:opacity-100 bg-white transition"
                          style={redBorder}
                        >
                          <Trash2 className="h-4 w-4" color={THEME.red} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-[72px_1fr_220px_180px] gap-3">
                          {/* # */}
                          <div className="flex md:block items-center">
                            <div
                              className="md:flex md:items-center md:justify-center rounded-lg border-2 md:h-full w-16 md:w-auto px-3 py-2 text-center font-medium bg-white"
                              style={redBorder}
                            >
                              {idx + 1}
                            </div>
                          </div>

                          {/* Course */}
                          <div>
                            <Label className="md:hidden mb-1 block">Course</Label>
                            <Input
                              placeholder="e.g., Linear Algebra"
                              value={c.name}
                              onChange={(e) => updateCourse(sem.id, c.id, "name", e.target.value)}
                              className="border-2 rounded-xl focus-visible:ring-0"
                              style={redBorder}
                            />
                          </div>

                          {/* Credits */}
                          <div>
                            <Label className="md:hidden mb-1 block">Credits</Label>
                            <Input
                              placeholder="e.g., 4"
                              inputMode="decimal"
                              type="number"
                              value={c.credits}
                              onChange={(e) => updateCourse(sem.id, c.id, "credits", e.target.value)}
                              className="border-2 rounded-xl focus-visible:ring-0"
                              style={redBorder}
                            />
                          </div>

                          {/* Grade (dropdown styled) */}
                          <div>
                            <Label className="md:hidden mb-1 block">Grade</Label>
                            <Select
                              value={c.grade}
                              onValueChange={(v: GradeKey) => updateCourse(sem.id, c.id, "grade", v)}
                            >
                              <SelectTrigger
                                className="border-2 rounded-xl h-10 focus:ring-0 focus-visible:ring-0"
                                style={redBorder}
                              >
                                <SelectValue placeholder="Grade" />
                              </SelectTrigger>
                              <SelectContent className="max-h-72">
                                {GRADE_OPTIONS.map((g) => (
                                  <SelectItem key={g} value={g}>
                                    {g}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add row */}
                    <div>
                      <button
                        onClick={() => addCourse(sem.id)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm hover:bg-red-50 transition"
                        style={{ ...redBorder, color: THEME.red }}
                      >
                        <Plus className="h-4 w-4" />
                        Add Course
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add semester */}
              <div className="rounded-2xl border-2 overflow-hidden" style={redBorder}>
                <button
                  onClick={addSemester}
                  disabled={semesters.length >= 12}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm hover:bg-red-50 transition"
                  style={{ color: THEME.red }}
                >
                  <Plus className="h-4 w-4" />
                  Add Semester
                  <span className="opacity-60">({12 - semesters.length} remaining)</span>
                </button>
              </div>

              {/* Mobile sticky actions */}
              <div className="md:hidden sticky bottom-4 z-20">
                <div className="mx-auto max-w-md rounded-2xl shadow-xl p-3 flex gap-3 bg-white border-2" style={redBorder}>
                  <Button onClick={calculate} className="flex-1 font-semibold border-2" style={redBtnFilled}>
                    Calculate GPA
                  </Button>
                  <Button onClick={clearAll} className="border-2" variant="outline" style={redBtnOutline}>
                    Clear Grades
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      }

      /* RIGHT column */
      calculatorResults={
        <div className="space-y-6">
          {/* Scale */}
          <Card
            className="rounded-2xl border-2"
            style={{ ...redBorder, boxShadow: "0 10px 24px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg font-semibold" style={{ color: THEME.text }}>
                4-Point Grading Scale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border-2" style={redBorder}>
                <div className="px-4 py-2 text-white text-sm font-semibold" style={{ backgroundColor: tableHeaderBg }}>
                  Grade • Points • Meaning
                </div>
                <ul className="divide-y" style={{ borderColor: THEME.gray }}>
                  {[
                    { g: "A+", s: "4.0", d: "Excellent" },
                    { g: "A", s: "4.0", d: "Excellent" },
                    { g: "A-", s: "3.7", d: "Very Good" },
                    { g: "AB", s: "3.5", d: "Strong" },
                    { g: "B+", s: "3.3", d: "Good" },
                    { g: "B", s: "3.0", d: "Good" },
                    { g: "B-", s: "2.7", d: "Satisfactory" },
                    { g: "BC", s: "2.5", d: "Satisfactory" },
                    { g: "C+", s: "2.3", d: "Average" },
                    { g: "C", s: "2.0", d: "Average" },
                    { g: "C-", s: "1.7", d: "Below Avg" },
                    { g: "CD", s: "1.5", d: "Below Avg" },
                    { g: "D+", s: "1.3", d: "Poor" },
                    { g: "D", s: "1.0", d: "Poor" },
                    { g: "D-", s: "0.7", d: "Fail" },
                    { g: "F", s: "0.0", d: "Fail" },
                  ].map((r) => (
                    <li key={r.g} className="flex items-center justify-between px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex h-6 min-w-10 items-center justify-center rounded-full px-2 text-xs font-semibold text-white"
                          style={{ backgroundColor: THEME.blue }}
                        >
                          {r.g}
                        </span>
                        <span className="text-neutral-700">{r.d}</span>
                      </div>
                      <div className="font-semibold">{r.s}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card
              className="rounded-2xl border-2"
              style={{ ...redBorder, boxShadow: "0 10px 24px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                  {results.perSemester.map((r, idx) => (
                    <div key={r.id} className="rounded-xl border p-4 text-sm bg-white" style={{ borderColor: THEME.gray }}>
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{`Semester ${idx + 1}`}</div>
                        <span className="text-xs rounded-full px-2 py-0.5 text-white" style={{ backgroundColor: THEME.red }}>
                          {r.gpa.toFixed(3)}
                        </span>
                      </div>
                      <div className="opacity-70 mt-1">{r.title}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl p-4 text-center text-white font-semibold" style={{ backgroundColor: THEME.red }}>
                  CGPA = {results.cgpa.toFixed(4)}{" "}
                  <span className="opacity-90">(Total Credits: {results.totalCredits})</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card
            className="rounded-2xl border-2"
            style={{ ...redBorder, boxShadow: "0 10px 24px rgba(0,0,0,0.05)", backgroundColor: "#fff" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">CGPA Formula</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-800">
              <p>
                <span className="font-medium">CGPA =</span> (Σ Semester Grade Points) ÷ (Σ Credits)
              </p>
              <p className="text-sm text-neutral-600">Your grades above are weighted by credits.</p>
            </CardContent>
          </Card>
        </div>
      }

      howItWorks={[
        { icon: <Plus className="h-8 w-8 mx-auto" style={{ color: THEME.red }} />, title: "Add Semesters & Courses", description: "Up to 12 semesters. Add/remove rows freely." },
        { icon: <Calculator className="h-8 w-8 mx-auto" style={{ color: THEME.blue }} />, title: "Enter Credits & Grades", description: "We weight each grade by its credits automatically." },
        { icon: <Calculator className="h-8 w-8 mx-auto" style={{ color: THEME.yellow }} />, title: "Instant Results", description: "See per-semester GPA and overall CGPA." },
      ]}
      extraSectionTitle="Notes"
      extraSectionContent={
        <ul className="text-left list-disc list-inside space-y-2">
          <li>Uses your 4.0 scale exactly as shown.</li>
          <li>Auto-saves entries locally so you don’t lose work.</li>
          <li>Mobile stacks vertically; desktop is 1 row • 2 columns.</li>
        </ul>
      }
      references={[
        { title: "Education Loan EMI Calculator", description: "Estimate your monthly EMIs.", link: "/tools/education-loan-emi-calculator" },
        { title: "Interest Calculator", description: "Simple vs compound interest explained.", link: "/tools/interest-calculator" },
        { title: "Bank Comparison Tool", description: "Compare study-abroad lenders side by side.", link: "/tools/bank-comparison-tool" },
      ]}
    />
  );
}
