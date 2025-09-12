// src/pages/GpaCalculatorPage.tsx
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css, keyframes } from "styled-components";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";

/* -----------------------------------
   Data & helpers
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

const CONFETTI_COLORS = ["#22c55e", "#eab308", "#0ea5e9", "#7c3aed", "#ef4444", "#f97316", "#06b6d4"];

/* -----------------------------------
   Page
------------------------------------*/

const GpaCalculatorPage: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>("4.0 GPA");
  const [semesters, setSemesters] = useState<Semester[]>([makeSemester(1)]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ gpa: number; outOf: number }>({ gpa: 0, outOf: 4 });

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
      courses: [...s.courses, { id: crypto.randomUUID(), name: "", credits: "", grade: "" }],
    }));
  }
  function handleRemoveCourse(semId: string, courseId: string) {
    updateSemester(semId, (s) => ({ ...s, courses: s.courses.filter((c) => c.id !== courseId) }));
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
          if (!c.name.trim()) return [false, `Semester ${sem.name}: Course ${idx + 1} name is empty.`];
          const credits = Number(c.credits);
          if (!Number.isFinite(credits) || credits <= 0) return [false, `Semester ${sem.name}: Course ${idx + 1} has invalid credits.`];
          if (!c.grade) return [false, `Semester ${sem.name}: Course ${idx + 1} grade is missing.`];
        }
      }
    } else if (mode === "CGPA to GPA") {
      const v = Number(cgpa10);
      if (!Number.isFinite(v) || v < 0 || v > 10) return [false, "Enter CGPA on a 10-point scale (0–10)."];
    } else {
      const v = Number(percentage);
      if (!Number.isFinite(v) || v < 0 || v > 100) return [false, "Enter percentage between 0 and 100."];
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

  return (
    <Page>
      <Banner role="img" aria-label="Gradient header">
        <BannerInner>
          <Title>GPA Calculator</Title>
          <SubTitle>Compute your GPA on a 4-point scale or convert CGPA/Percentage.</SubTitle>
        </BannerInner>
      </Banner>

      <Main>
        {/* LEFT */}
        <LeftCol>
          <Card aria-labelledby="mode-heading">
            <SectionHeading id="mode-heading">Calculation Type</SectionHeading>
            <Select
              value={mode}
              onChange={(v) => setMode(v as CalcMode)}
              ariaLabel="Select GPA calculation type"
              options={["4.0 GPA", "CGPA to GPA", "Percentage to GPA"]}
            />
          </Card>

          <Card>
            {mode === "4.0 GPA" ? (
              <>
                <RowBetween>
                  <SectionHeading>Semesters</SectionHeading>
                  <span aria-live="polite">{semesters.length}/12</span>
                </RowBetween>

                {semesters.map((sem, idx) => (
                  <SemesterBlock key={sem.id} aria-label={`Semester ${idx + 1}`}>
                    <SemHeader>
                      <strong>Semester {idx + 1}</strong>
                      <IconButton
                        aria-label={`Delete Semester ${idx + 1}`}
                        onClick={() => handleRemoveSemester(sem.id)}
                        disabled={semesters.length === 1}
                        title={semesters.length === 1 ? "At least one semester is required" : "Remove semester"}
                      >
                        🗑
                      </IconButton>
                    </SemHeader>

                    <ResponsiveTable role="grid" aria-label={`Courses for Semester ${idx + 1}`}>
                      <thead>
                        <tr>
                          <th>S.no</th>
                          <th>Courses</th>
                          <th>Credits</th>
                          <th>Grades</th>
                          <th aria-hidden />
                        </tr>
                      </thead>
                      <tbody>
                        {sem.courses.map((c, i) => (
                          <tr key={c.id}>
                            <td data-label="S.no">{i + 1}</td>
                            <td data-label="Courses">
                              <Input
                                placeholder="Course name"
                                value={c.name}
                                onChange={(e) =>
                                  updateSemester(sem.id, (s) => ({
                                    ...s,
                                    courses: s.courses.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)),
                                  }))
                                }
                                aria-label={`Course ${i + 1} name`}
                              />
                            </td>
                            <td data-label="Credits">
                              <Input
                                placeholder="e.g. 4"
                                inputMode="decimal"
                                value={c.credits}
                                onChange={(e) =>
                                  updateSemester(sem.id, (s) => ({
                                    ...s,
                                    courses: s.courses.map((x) => (x.id === c.id ? { ...x, credits: e.target.value } : x)),
                                  }))
                                }
                                aria-label={`Course ${i + 1} credits`}
                              />
                            </td>
                            <td data-label="Grades">
                              <Select
                                value={c.grade}
                                onChange={(v) =>
                                  updateSemester(sem.id, (s) => ({
                                    ...s,
                                    courses: s.courses.map((x) => (x.id === c.id ? { ...x, grade: v } : x)),
                                  }))
                                }
                                ariaLabel={`Course ${i + 1} grade`}
                                placeholder="Select"
                                options={ALL_GRADES}
                              />
                            </td>
                            <td data-label="Remove">
                              <IconButton aria-label={`Remove Course ${i + 1}`} onClick={() => handleRemoveCourse(sem.id, c.id)} title="Remove course">
                                ✖
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </ResponsiveTable>

                    <AddRowButton onClick={() => handleAddCourse(sem.id)} aria-label="Add course">
                      ＋ Add Course
                    </AddRowButton>
                  </SemesterBlock>
                ))}

                <RowBetween>
                  <AddSemesterButton
                    onClick={handleAddSemester}
                    disabled={semesters.length >= 12}
                    aria-disabled={semesters.length >= 12}
                    aria-label="Add semester"
                    title={semesters.length >= 12 ? "Maximum 12 semesters allowed" : "Add a new semester"}
                  >
                    ＋ Add Semester
                  </AddSemesterButton>
                </RowBetween>
              </>
            ) : mode === "CGPA to GPA" ? (
              <ConverterBox>
                <SectionHeading>CGPA (10-point) → 4.0 GPA</SectionHeading>
                <Label htmlFor="cgpa10">Enter CGPA (0–10)</Label>
                <Input id="cgpa10" inputMode="decimal" placeholder="e.g. 8.2" value={cgpa10} onChange={(e) => setCgpa10(e.target.value)} />
                <Hint>We convert by: <code>(CGPA ÷ 10) × 4</code></Hint>
              </ConverterBox>
            ) : (
              <ConverterBox>
                <SectionHeading>Percentage → 4.0 GPA</SectionHeading>
                <Label htmlFor="pct">Enter Percentage (0–100)</Label>
                <Input id="pct" inputMode="decimal" placeholder="e.g. 78" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                <Hint>We convert by: <code>(Percentage ÷ 100) × 4</code></Hint>
              </ConverterBox>
            )}
          </Card>

          <Actions>
            <PrimaryButton onClick={calculate} aria-label="Calculate GPA">
              Calculate GPA
            </PrimaryButton>
            <SecondaryButton onClick={clearAll} aria-label="Clear all grades">
              Clear Grades
            </SecondaryButton>
          </Actions>
        </LeftCol>

        {/* RIGHT */}
        <RightCol>
          <Card aria-labelledby="scale-heading">
            <SectionHeading id="scale-heading">4-point Grading Scale Chart</SectionHeading>
            <ResponsiveTable role="table" aria-label="4 point grading scale">
              <thead>
                <tr>
                  <th>Grade</th>
                  <th>Scale</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {GRADING_SCALE.map((r) => (
                  <tr key={r.grade}>
                    <td data-label="Grade">{r.grade}</td>
                    <td data-label="Scale">{r.scale}</td>
                    <td data-label="Description">{r.description}</td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </Card>
        </RightCol>
      </Main>

      {/* LEARNING / HOW-TO SECTION -------------------------------------- */}
      <LearnSection>
        <LearnHeader>
          <h2>GPA Calculator: How do we Calculate GPA?</h2>
          <p>
            Let us take the example of a student who has <strong>2 semesters</strong>. Below we demonstrate how the GPA and CGPA are computed.
          </p>
        </LearnHeader>

        <LearnGrid>
          {/* Semester 1 card */}
          <LearnCard>
            <CardTitle>Semester 1</CardTitle>
            <ResponsiveTable role="table" aria-label="Semester 1 example">
              <thead>
                <tr>
                  <th>Code Number &amp; Subject</th>
                  <th>Credits</th>
                  <th>Grade</th>
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
                    <td data-label="Code Number & Subject">{r[0]}</td>
                    <td data-label="Credits">{r[1]}</td>
                    <td data-label="Grade">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </LearnCard>

          {/* Semester 2 card */}
          <LearnCard>
            <CardTitle>Semester 2</CardTitle>
            <ResponsiveTable role="table" aria-label="Semester 2 example">
              <thead>
                <tr>
                  <th>Code Number &amp; Subject</th>
                  <th>Credits</th>
                  <th>Grade</th>
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
                    <td data-label="Code Number & Subject">{r[0]}</td>
                    <td data-label="Credits">{r[1]}</td>
                    <td data-label="Grade">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </ResponsiveTable>
          </LearnCard>

          {/* CGPA formula card */}
          <LearnCard className="accent">
            <CardTitle>CGPA Calculator: How to Check CGPA after Semester 2?</CardTitle>
            <Formula>
              <p><strong>Calculate CGPA Formula:</strong> <code>Total Semester Grade Point ÷ Total Credits</code></p>
              <Break />
              <p><strong>Total Grade Point =</strong> Semester 1 + Semester 2</p>
              <p>= <strong>208.5</strong> + <strong>216.5</strong></p>
              <p>= <strong>425</strong></p>
              <Break />
              <p><strong>Total Credit Score =</strong> Semester 1 + Semester 2</p>
              <p>= <strong>23.0</strong> + <strong>24.5</strong></p>
              <p>= <strong>47.5</strong></p>
              <Break />
              <p><strong>How to Check CGPA</strong></p>
              <p>= <strong>425 ÷ 47.5</strong></p>
              <Final>= <strong>8.94736</strong></Final>
              <Badge>CGPA = <strong>8.9474</strong> at the end of Semester 2</Badge>
            </Formula>
          </LearnCard>
        </LearnGrid>
      </LearnSection>

      {/* Confetti overlay only when score is good */}
      {showResult && isGood && <ConfettiOverlay />}

      {/* Result modal */}
      {showResult && (
        <Modal onClose={() => setShowResult(false)} title="Your calculated GPA is">
          <GaugeWrap>
            <RadialMeter role="img" aria-label={`GPA ${result.gpa} out of ${result.outOf}`}>
              <RadialSVG viewBox="0 0 120 60" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <path d="M10,60 A50,50 0 0 1 110,60" fill="none" stroke="url(#g)" strokeWidth="12" strokeLinecap="round" opacity={0.35} />
                <GaugeNeedle value={result.gpa / result.outOf} />
              </RadialSVG>

              <GaugeValue style={{ color: meterColor }}>
                {result.gpa.toFixed(2)}
                <Small>/ {result.outOf}</Small>
              </GaugeValue>

              {isGood ? (
                <ResultMsgGood>🎉 Congratulations! You have a good score.</ResultMsgGood>
              ) : (
                <ResultMsgOk>
                  Don’t worry — your average score won’t hinder your goals.
                  <br />
                  We’ll help you improve with smart study plans and pacing.
                </ResultMsgOk>
              )}

              <GaugeHint>Results are indicative based on the 4.0 scale.</GaugeHint>
            </RadialMeter>

            <ApplyNowButton onClick={() => window.open("#", "_blank")} aria-label="Apply now">
              Apply Now
            </ApplyNowButton>
          </GaugeWrap>
        </Modal>
      )}
    </Page>
  );
};

/* -----------------------------------
   Small UI primitives
------------------------------------*/

const Select: React.FC<{
  value?: string;
  options: string[];
  placeholder?: string;
  ariaLabel?: string;
  onChange: (v: string) => void;
}> = ({ value, options, placeholder, ariaLabel, onChange }) => {
  return (
    <SelectWrap>
      <select aria-label={ariaLabel} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
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
      <span aria-hidden>▾</span>
    </SelectWrap>
  );
};

const Modal: React.FC<{ title?: string; children: React.ReactNode; onClose: () => void }> = ({ title, children, onClose }) => {
  return createPortal(
    <ModalBackdrop role="dialog" aria-modal="true">
      <ModalCard>
        <ModalHeader>
          {title && <h3>{title}</h3>}
          <IconButton aria-label="Close" onClick={onClose} title="Close">
            ✖
          </IconButton>
        </ModalHeader>
        <div>{children}</div>
      </ModalCard>
    </ModalBackdrop>,
    document.body
  );
};

/* -----------------------------------
   Styling
------------------------------------*/

const Page = styled.div`
  min-height: 100svh;
  background: #fafbff;
  color: #222;
  overflow-x: hidden; /* guardrail: no sideways move */
  word-break: break-word;
`;

const Banner = styled.div`
  background: linear-gradient(180deg, #002855 0%, #1a1a1a 100%);
  color: white;
  height: 50vh;
  min-height: 430px;
  display: grid;
  place-items: center;
  text-align: center;
  padding-block: 4.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) inset;
`;

const BannerInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding-inline: clamp(14px, 3vw, 20px);
`;

const Title = styled.h1`
  margin: 0 0 .35rem 0;
  font-size: clamp(1.8rem, 2.4vw + 1rem, 2.6rem);
  font-weight: 800;
  letter-spacing: 0.5px;
`;

const SubTitle = styled.p`
  margin: 0;
  opacity: .95;
`;

const Main = styled.main`
  max-width: 1120px;
  margin: 1.25rem auto 3rem;
  padding-inline: clamp(14px, 3vw, 20px);
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.section`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
`;

const RightCol = styled.aside`
  position: sticky;
  top: 1rem;
  align-self: start;

  @media (max-width: 1024px) {
    position: static;
  }
`;

const Card = styled.section`
  background: #fff;
  border-radius: 14px;
  padding: clamp(12px, 1.5vw, 16px);
  box-shadow: 0 10px 20px rgba(16, 24, 40, 0.06);
  border: 1px solid #eef0f6;
`;

const SectionHeading = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin: .25rem 0 .75rem;
`;

/* --------- Responsive Table (no overflow on phones) ---------- */
const ResponsiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;

  thead th {
    text-align: left;
    background: #eaf2ff;
    color: #1f2937;
    padding: .75rem .75rem;
    border-bottom: 1px solid #dde7ff;
    font-weight: 700;
    white-space: nowrap;
  }
  tbody td {
    padding: .55rem .75rem;
    border-bottom: 1px solid #f0f2f8;
    vertical-align: middle;
  }
  tbody tr:hover { background: #fbfcff; }

  /* Mobile transform: stacked card rows */
  @media (max-width: 560px) {
    thead { display: none; }
    tr { display: block; border: 1px solid #eef0f6; border-radius: 12px; box-shadow: 0 4px 10px rgba(2,6,23,.04); margin-bottom: .65rem; padding: .35rem .5rem; }
    td { display: grid; grid-template-columns: 9.5rem 1fr; gap: .4rem; border: 0; padding: .45rem .2rem; }
    td::before { content: attr(data-label); font-weight: 700; color: #334155; }
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  padding: .55rem .6rem;
  border-radius: 10px;
  outline: none;
  transition: box-shadow .2s, border-color .2s;
  font-size: 0.95rem;
  &:focus {
    border-color: #7c3aed;
    box-shadow: 0 0 0 4px rgba(124, 58, 237, .12);
  }
`;

const SelectWrap = styled.label`
  position: relative;
  display: inline-flex;
  width: 100%;
  align-items: center;

  select {
    appearance: none;
    width: 100%;
    border: 1px solid #e5e7eb;
    padding: .6rem .9rem .6rem .6rem;
    border-radius: 10px;
    outline: none;
    transition: box-shadow .2s, border-color .2s;
    background: white;
    font-size: .95rem;
    &:focus {
      border-color: #0ea5e9;
      box-shadow: 0 0 0 4px rgba(14, 165, 233, .12);
    }
  }
  span {
    position: absolute;
    right: .55rem;
    pointer-events: none;
    color: #64748b;
  }
`;

const IconButton = styled.button<{ disabled?: boolean }>`
  border: 0;
  background: transparent;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 0.9)};
  padding: .25rem .3rem;
  border-radius: 8px;
  &:hover:not([disabled]) { background: #f3f4f6; }
`;

const AddRowButton = styled.button`
  margin-top: .6rem;
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  padding: .5rem .75rem;
  border-radius: 10px;
  border: 1px dashed #9ca3af;
  background: #fff;
  cursor: pointer;
  transition: all .2s;
  &:hover { border-color: #7c3aed; box-shadow: 0 2px 10px rgba(124,58,237,.12); }
`;

const AddSemesterButton = styled(AddRowButton)`
  width: fit-content;
`;

const SemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
`;

const SemesterBlock = styled.div`
  border: 1px solid #eef0f6;
  border-radius: 12px;
  padding: .75rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 14px rgba(2,6,23,.035);
  background: #fff;
`;

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

const buttonBase = css`
  padding: .85rem 1rem;
  border-radius: 12px;
  border: 0;
  cursor: pointer;
  font-weight: 700;
  transition: transform .04s ease, box-shadow .2s ease, background .2s ease;
  &:active { transform: translateY(1px); }
`;

const PrimaryButton = styled.button`
  ${buttonBase};
  background: linear-gradient(135deg, #7c3aed, #0ea5e9);
  color: white;
  box-shadow: 0 10px 18px rgba(14,165,233,.28);
  &:hover { box-shadow: 0 14px 24px rgba(14,165,233,.32); }
`;

const SecondaryButton = styled.button`
  ${buttonBase};
  background: #fff;
  border: 1px solid #e5e7eb;
  color: #111827;
  &:hover { background: #f9fafb; }
`;

const ConverterBox = styled.div`
  display: grid;
  gap: .5rem;
`;

const Label = styled.label`
  font-size: .9rem;
  color: #334155;
`;

const Hint = styled.p`
  margin: .2rem 0 0;
  font-size: .85rem;
  color: #6b7280;
`;

/* ---------- Modal Styles ---------- */

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 50;
`;

const showIn = keyframes`
  from { transform: translateY(8px); opacity: .95; }
  to { transform: translateY(0); opacity: 1; }
`;

const ModalCard = styled.div`
  width: min(640px, 95vw);
  background: #fff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 24px 60px rgba(2,6,23,.35);
  animation: ${showIn} .14s ease-out both;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: .5rem;
  margin-bottom: .75rem;
  h3 { margin: 0; }
`;

/* ---------- Gauge ---------- */

const GaugeWrap = styled.div`
  padding: .5rem;
`;

const RadialMeter = styled.div`
  text-align: center;
`;

const RadialSVG = styled.svg`
  width: min(520px, 100%);
  display: block;
  margin: 0 auto .5rem;
`;

const GaugeValue = styled.div`
  font-size: clamp(2rem, 6vw, 2.6rem);
  font-weight: 900;
  line-height: 1;
`;

const Small = styled.span`
  font-size: .55em;
  color: #475569;
  margin-left: .25rem;
`;

const GaugeHint = styled.p`
  margin: .35rem 0 0;
  color: #64748b;
  font-size: .9rem;
`;

const ResultMsgGood = styled.p`
  margin: .35rem auto .1rem;
  font-weight: 700;
  color: #16a34a;
`;

const ResultMsgOk = styled.p`
  margin: .35rem auto .1rem;
  font-weight: 600;
  color: #0f172a;
`;

const ApplyNowButton = styled.button`
  margin: .9rem auto 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${buttonBase};
  background: #e3000f;
  color: #fff;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 10px 18px rgba(227, 0, 15, 0.25);
  &:hover { filter: brightness(1.05); }
`;

/* ---------- Confetti (party popper) ---------- */

const fall = keyframes`
  0%   { transform: translateY(-120%) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
`;

const ConfettiLayer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 60;
`;

const Piece = styled.span<{ delay: number; left: number; color: string; w: number; h: number }>`
  position: absolute;
  top: -16px;
  left: ${({ left }) => left}%;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  background: ${({ color }) => color};
  border-radius: 2px;
  animation: ${fall} 2.8s linear ${({ delay }) => delay}s forwards;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.15));
`;

const ConfettiOverlay: React.FC = () => {
  const pieces = Array.from({ length: 120 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 0.6;
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const w = 6 + Math.round(Math.random() * 6);
    const h = 10 + Math.round(Math.random() * 12);
    return <Piece key={i} left={left} delay={delay} color={color} w={w} h={h} />;
  });
  return <ConfettiLayer aria-hidden>{pieces}</ConfettiLayer>;
};

// Needle
const GaugeNeedle: React.FC<{ value: number }> = ({ value }) => {
  const v = Math.max(0, Math.min(1, value));
  const angle = -180 + 180 * v; // -180..0
  const x = 60 + 45 * Math.cos((Math.PI * (angle + 180)) / 180);
  const y = 60 + 45 * Math.sin((Math.PI * (angle + 180)) / 180);
  return (
    <>
      <line x1="60" y1="60" x2={x} y2={y} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="4.5" fill="#0f172a" />
    </>
  );
};

/* ----------------- Learn Section ----------------- */

const LearnSection = styled.section`
  max-width: 1120px;
  margin: 0 auto 4rem;
  padding-inline: clamp(14px, 3vw, 20px);
`;

const LearnHeader = styled.div`
  text-align: center;
  margin: 2rem 0 1rem;
  h2 { margin: 0 0 .35rem; font-size: clamp(1.4rem, 1.2rem + 1.2vw, 2rem); }
  p  { margin: 0; color: #475569; }
`;

const LearnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const LearnCard = styled(Card)`
  &.accent { background: #f8fbff; border: 1px solid #e6f0ff; }
`;

const CardTitle = styled.h3`
  margin: 0 0 .6rem;
  font-size: 1.05rem;
`;

const Formula = styled.div`
  font-size: .97rem;
  color: #0f172a;
  code { background: #eef2ff; padding: 0 .35rem; border-radius: 6px; }
  strong { font-weight: 800; }
`;

const Break = styled.hr`
  border: 0;
  border-top: 1px dashed #e5e7eb;
  margin: .6rem 0;
`;

const Final = styled.p`
  font-size: 1.1rem;
  font-weight: 800;
  color: #0ea5e9;
`;

const Badge = styled.div`
  margin-top: .4rem;
  display: inline-block;
  background: #0ea5e9;
  color: #fff;
  padding: .4rem .6rem;
  border-radius: 999px;
  font-weight: 800;
`;

/* -----------------------------------
   Utilities
------------------------------------*/

function makeSemester(n: number): Semester {
  return { id: crypto.randomUUID(), name: `Semester ${n}`, courses: [{ id: crypto.randomUUID(), name: "", credits: "", grade: "" }] };
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/* -----------------------------------
   Example routing (demo)
------------------------------------*/

export const DemoApp: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar>
        <NavInner>
          <Brand to="/">MyAcademics</Brand>
          <NavLinks>
            <NavA to="/">Home</NavA>
            <NavA to="/gpa">GPA Calculator</NavA>
          </NavLinks>
        </NavInner>
      </NavBar>
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
      Open the <Link to="/gpa">GPA Calculator</Link> to get started.
    </p>
  </div>
);

const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: #ffffffd9;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #eef0f6;
`;

const NavInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: .6rem 1rem;
`;

const Brand = styled(Link)`
  font-weight: 900;
  color: #0f172a;
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: grid;
  grid-auto-flow: column;
  gap: .75rem;
`;

const NavA = styled(Link)`
  color: #0f172a;
  padding: .5rem .6rem;
  border-radius: 10px;
  text-decoration: none;
  &:hover { background: #f3f4f6; }
`;

export default GpaCalculatorPage;
