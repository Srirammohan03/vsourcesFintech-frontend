// src/pages/tools/SOPGenerator.tsx
import { FormInput } from "lucide-react";
import React, { useRef, useState } from "react";

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

/* ---------- types ---------- */
type YesNo = "Yes" | "No";
type Multi = string[];
type Step =
  | 1 // Personal & Program
  | 2 // Academic Background
  | 3 // Projects & Research
  | 4 // Internships/Training
  | 5 // Work Experience
  | 6 // Extra Curricular
  | 7 // Community Service
  | 8 // Motivation
  | 9 // Fit for the Program
  | 10 // Future Goals
  | 11; // Editor (result)

type FormState = {
  // 1
  fullName: string;
  email: string;
  phone: string;
  targetCountry: string;
  targetUniversity: string;
  targetProgram: string;

  // 2
  highestEdu: string;
  collegeName: string;
  fieldOfStudy: string;
  relevantCourses: string;
  gradingScale: string;
  gpa: string;
  achievements: string[];

  // 3
  hasProjects: YesNo;
  projects: { title: string; summary: string; impact?: string }[];

  // 4
  hasInternships: YesNo;
  internships: { org: string; role: string; summary: string }[];

  // 5
  hasWork: YesNo;
  work: { company: string; role: string; duration: string; impact?: string }[];

  // 6
  hasEC: YesNo;
  ec: { org: string; role: string; responsibility: string }[];

  // 7
  hasCommunity: YesNo;
  community: { org: string; role: string; impact: string }[];

  // 8
  whyProgram: Multi;
  whyProgramReason: string;
  whyUniversity: Multi;
  whyUniversityReason: string;

  // 9
  contribute: Multi;
  fitReason: string;

  // 10
  careerGoal: string;
  careerNotes: string;
};

const defaultState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  targetCountry: "",
  targetUniversity: "",
  targetProgram: "",

  highestEdu: "",
  collegeName: "",
  fieldOfStudy: "",
  relevantCourses: "",
  gradingScale: "Out of 10",
  gpa: "",
  achievements: [],

  hasProjects: "No",
  projects: [],

  hasInternships: "No",
  internships: [],

  hasWork: "No",
  work: [],

  hasEC: "No",
  ec: [],

  hasCommunity: "No",
  community: [],

  whyProgram: [],
  whyProgramReason: "",
  whyUniversity: [],
  whyUniversityReason: "",

  contribute: [],
  fitReason: "",

  careerGoal: "",
  careerNotes: "",
};

/* ---------- atoms ---------- */

const Label: React.FC<{
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}> = ({ children, required, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-semibold mb-1 text-black"
  >
    {children} {required && <span style={{ color: THEME.red }}>*</span>}
  </label>
);

const FieldNote: React.FC<{ error?: string }> = ({ error }) =>
  error ? (
    <p className="mt-1 text-xs" style={{ color: THEME.red }}>
      {error}
    </p>
  ) : null;

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
  }
> = ({ error, ...props }) => (
  <>
    <input
      {...props}
      className={cls(
        "w-full rounded-xl border px-4 py-3 outline-none",
        "transition-shadow",
        error
          ? "border-red-500 ring-2 ring-red-500"
          : "border-[#E5EBF0] focus:ring-2 focus:ring-offset-0"
      )}
      style={!error ? { boxShadow: "0 0 0 0", ["--tw-ring-color" as any]: THEME.blue } : undefined}
    />
    <FieldNote error={error} />
  </>
);

const TextArea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: string;
  }
> = ({ error, ...props }) => (
  <>
    <textarea
      {...props}
      className={cls(
        "w-full rounded-xl border px-4 py-3 outline-none min-h-[110px]",
        error
          ? "border-red-500 ring-2 ring-red-500"
          : "border-[#E5EBF0] focus:ring-2 focus:ring-offset-0"
      )}
      style={!error ? { ["--tw-ring-color" as any]: THEME.blue } : undefined}
    />
    <FieldNote error={error} />
  </>
);

const SelectBox: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string;
  }
> = ({ error, children, ...props }) => (
  <>
    <select
      {...props}
      className={cls(
        "w-full rounded-xl border px-4 py-3 outline-none bg-white",
        error
          ? "border-red-500 ring-2 ring-red-500"
          : "border-[#E5EBF0] focus:ring-2 focus:ring-offset-0"
      )}
      style={!error ? { ["--tw-ring-color" as any]: THEME.blue } : undefined}
    >
      {children}
    </select>
    <FieldNote error={error} />
  </>
);

/* chips multi-select (supports required + error) */
const MultiSelect: React.FC<{
  label?: string;
  required?: boolean;
  options: string[];
  value: Multi;
  onChange: (v: Multi) => void;
  placeholder?: string;
  error?: string;
}> = ({ label, required, options, value, onChange, placeholder, error }) => {
  const [open, setOpen] = useState(false);
  const remaining = options.filter((o) => !value.includes(o));
  return (
    <div className="w-full">
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      <div
        className={cls(
          "w-full rounded-xl border bg-white px-3 py-2",
          error
            ? "border-red-500 ring-2 ring-red-500"
            : "border-[#E5EBF0] focus-within:ring-2"
        )}
        style={!error ? { ["--tw-ring-color" as any]: THEME.blue } : undefined}
      >
        <div className="flex flex-wrap items-center gap-2">
          {value.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 text-sm px-3 py-1 ring-1 ring-green-300"
            >
              {v}
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x !== v))}
                className="ml-1 text-green-700/80 hover:text-green-900"
                aria-label={`Remove ${v}`}
              >
                ✕
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className={cls(
              "ml-auto md:ml-0 text-sm rounded-lg px-3 py-1",
              "ring-1 ring-[#E5EBF0] hover:bg-[#F9FAFB]"
            )}
          >
            {open ? "Close" : (placeholder || "You can choose multiple")}
          </button>
        </div>

        {open && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {remaining.length === 0 && (
              <div className="text-sm text-gray-500 px-1 py-2">All options selected</div>
            )}
            {remaining.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange([...value, opt])}
                className="text-left rounded-lg px-3 py-2 ring-1 ring-[#E5EBF0] hover:bg-[#F5F8FB]"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      <FieldNote error={error} />
    </div>
  );
};

/* cards & titles */
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={cls("rounded-2xl shadow-xl bg-white ring-1 ring-[#EEF2F7] p-6 my-10", className)}>
    {children}
  </div>
);

const SectionTitle: React.FC<{ title: string; stepLabel?: string }> = ({ title, stepLabel }) => (
  <div className="flex items-center justify-between mb-6 ">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0B0B2C]">{title}</h2>
    {stepLabel && <span className="text-sm font-semibold text-red-600" >{stepLabel}</span>}
  </div>
);

/* buttons (no gradients) */
const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    {...props}
    className={cls(
      "rounded-xl px-6 py-3 font-semibold text-white bg-red-600 shadow-md hover:shadow-lg transition",
      className
    )}
  >
    {children}
  </button>
);

const OutlineRedButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    {...props}
    className={cls(
      "rounded-xl px-6 py-3 font-semibold transition",
      "bg-white hover:bg-red-50",
      className
    )}
    style={{ color: THEME.red, border: `2px solid ${THEME.red}` }}
  >
    {children}
  </button>
);

/* ---------- page ---------- */
export default function SOPGenerator() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(defaultState);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<string>("");
  const [editorFont, setEditorFont] = useState<string>("Helvetica");
  const [downloadFormat, setDownloadFormat] = useState<"txt" | "pdf" | "word">("txt");

  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((s) => ({ ...s, [key]: value }));

  /* ---------- validation ---------- */
  const validateStep = (s: Step): boolean => {
    const e: Record<string, string> = {};
    if (s === 2) {
      if (!form.highestEdu) e.highestEdu = "This field is required";
      if (!form.fieldOfStudy) e.fieldOfStudy = "This field is required";
      if (!form.gradingScale) e.gradingScale = "This field is required";
      if (!form.gpa) e.gpa = "This field is required";
    }
    if (s === 8) {
      if (form.whyProgram.length === 0) e.whyProgram = "This field is required";
      if (form.whyUniversity.length === 0) e.whyUniversity = "This field is required";
    }
    if (s === 9) {
      if (form.contribute.length === 0) e.contribute = "This field is required";
    }
    if (s === 10) {
      if (!form.careerGoal) e.careerGoal = "This field is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((Math.min(10, (step + 1)) as Step));
      setErrors({});
    }
  };

  /* ---------- SOP generator ---------- */
  const buildSOP = (f: FormState) => {
    const name = f.fullName || "Applicant";
    const uni = f.targetUniversity || "the university";
    const program = f.targetProgram || "the program";
    const country = f.targetCountry || "";

    const pgWhy =
      f.whyProgram.length > 0
        ? `My decision to pursue ${program} is driven by ${f.whyProgram.map((w) => w.toLowerCase()).join(", ")}. ${f.whyProgramReason || ""}`.trim()
        : `I am keen to pursue ${program} to deepen my knowledge and broaden my impact.`;

    const uniWhy =
      f.whyUniversity.length > 0
        ? `${uni} stands out for its ${f.whyUniversity.map((w) => w.toLowerCase()).join(", ")}. ${f.whyUniversityReason || ""}`.trim()
        : `${uni} aligns strongly with my aspirations.`;

    const achievements = f.achievements.length > 0 ? `Some highlights include ${listToEnglish(f.achievements)}.` : "";

    const projects =
      f.hasProjects === "Yes" && f.projects.length > 0
        ? `During my academic journey, I executed ${f.projects.length} project${f.projects.length > 1 ? "s" : ""}, such as ${f.projects
            .map((p) => `${p.title}: ${p.summary}${p.impact ? ` (${p.impact})` : ""}`)
            .join("; ")}.`
        : "";

    const internships =
      f.hasInternships === "Yes" && f.internships.length > 0
        ? `I complemented academics with practical exposure through internship(s) at ${f.internships.map((i) => `${i.org} (${i.role})`).join(", ")} where I ${f.internships
            .map((i) => i.summary)
            .join("; ")}.`
        : "";

    const work =
      f.hasWork === "Yes" && f.work.length > 0
        ? `Professionally, I have worked at ${f.work.map((w) => `${w.company} as ${w.role}${w.duration ? `, ${w.duration}` : ""}`).join("; ")}${
            f.work.some((w) => w.impact) ? ` where I ${f.work.map((w) => w.impact).filter(Boolean).join("; ")}.` : "."
          }`
        : "";

    const ec =
      f.hasEC === "Yes" && f.ec.length > 0
        ? `Beyond academics, I engaged in ${f.ec.map((e) => `${e.org} (${e.role})`).join(", ")}, taking responsibility for ${f.ec
            .map((e) => e.responsibility)
            .join("; ")}.`
        : "";

    const community =
      f.hasCommunity === "Yes" && f.community.length > 0
        ? `My community involvement includes contributions at ${f.community.map((c) => `${c.org} as ${c.role}`).join(", ")}, where I ${f.community
            .map((c) => c.impact)
            .join("; ")}.`
        : "";

    const contribute =
      f.contribute.length > 0 ? `At ${uni}, I plan to contribute through ${f.contribute.map((c) => c.toLowerCase()).join(", ")}, ${f.fitReason || ""}`.trim() : f.fitReason || "";

    const goal = f.careerGoal || f.careerNotes ? `Upon completing the program, my goal is ${f.careerGoal.toLowerCase() || "to advance professionally"}. ${f.careerNotes}` : "";

    const intro = `Statement of Purpose – ${name}\n\nI am applying to the ${program} at ${uni}${country ? `, ${country}` : ""}. With a background in ${
      f.fieldOfStudy || "my discipline"
    } (${f.highestEdu || ""}) from ${f.collegeName || "my college"}, I have cultivated a strong foundation in core concepts and a persistent curiosity to solve meaningful problems. ${pgWhy}`;

    const academics = `\n\nAcademic Background\nI completed my ${f.highestEdu || ""} at ${f.collegeName || "my college"}, specializing in ${
      f.fieldOfStudy || "the field"
    }. ${f.relevantCourses ? `Key coursework such as ${f.relevantCourses} equipped me with essential analytical and technical skills. ` : ""}${f.gpa ? `I maintained a GPA of ${
      f.gpa
    } (${f.gradingScale}). ` : ""}${achievements}`;

    const body2 = [projects, internships, work].filter(Boolean).join(" ");
    const motivation = `\n\nWhy ${program} at ${uni}\n${uniWhy}`;
    const contribution = `\n\nFit & Contribution\n${contribute}`;
    const future = `\n\nFuture Goals\n${goal}`;
    const closing = `\n\nIn closing, I believe ${uni} provides the right environment to transform my potential into tangible impact. I look forward to the opportunity to learn, collaborate, and contribute to the ${program} community.\n\nSincerely,\n${name}`;

    return [intro, academics, body2, ec, community, motivation, contribution, future, closing].filter(Boolean).join("\n");
  };

  const handleGenerate = () => {
    const sop = buildSOP(form);
    setGenerated(sop);
    setStep(11);
    setTimeout(() => editorRef.current?.focus(), 10);
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* HERO (solid dark like your screenshot) */}
      <header className="w-full bg-[#0A1B2A] pt-12 pb-8">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-16 md:py-20 text-center text-white ">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.12)" }}>
            {/* simple doc icon */}
            <FormInput className="h-12 w-12 animate-pulse"/>
          </div>
          <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight">SOP Generator</h1>
          <p className="mt-3 text-white/80 text-base md:text-lg">Create a professional Statement of Purpose in 10 quick steps.</p>
        </div>
      </header>

      {/* BODY */}
      <main className="w-full max-w-[1400px] mx-auto px-6 py-10">
        {/* Stepper (circles connected like your reference) */}
        <div className="">
          <Stepper current={step} />
        </div>

        {/* Steps */}
        {step === 1 && (
          <Card>
            <SectionTitle title="Personal & Program Information" stepLabel="Step 1 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Your Full Name</Label>
                <Input placeholder="Eg. Alex Johnson" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div>
                <Label>Your Email</Label>
                <Input type="email" placeholder="name@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              <div>
                <Label>Your Phone Number</Label>
                <Input placeholder="Eg. 9876543210" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>
              <div>
                <Label>Target Country</Label>
                <Input placeholder="Eg. Canada" value={form.targetCountry} onChange={(e) => update("targetCountry", e.target.value)} />
              </div>
              <div>
                <Label>Target University/College Name</Label>
                <Input placeholder="Eg. University of Toronto" value={form.targetUniversity} onChange={(e) => update("targetUniversity", e.target.value)} />
              </div>
              <div>
                <Label>Target Program Name</Label>
                <Input placeholder="Eg. MS in Computer Science" value={form.targetProgram} onChange={(e) => update("targetProgram", e.target.value)} />
              </div>
            </div>
            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 2 && (
          <Card>
            <SectionTitle title="Academic Background" stepLabel="Step 2 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label required>Highest Education</Label>
                <SelectBox value={form.highestEdu} onChange={(e) => update("highestEdu", e.target.value)} error={errors.highestEdu}>
                  <option value="">Select</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>Diploma</option>
                  <option>Other</option>
                </SelectBox>
              </div>
              <div>
                <Label>University/College Name</Label>
                <Input value={form.collegeName} onChange={(e) => update("collegeName", e.target.value)} />
              </div>
              <div>
                <Label required>Field of Study</Label>
                <Input value={form.fieldOfStudy} onChange={(e) => update("fieldOfStudy", e.target.value)} error={errors.fieldOfStudy} />
              </div>
              <div>
                <Label>Relevant Courses</Label>
                <Input placeholder="Eg. Algorithms, Data Mining" value={form.relevantCourses} onChange={(e) => update("relevantCourses", e.target.value)} />
              </div>
              <div>
                <Label required>Grading Scale</Label>
                <SelectBox value={form.gradingScale} onChange={(e) => update("gradingScale", e.target.value)} error={errors.gradingScale}>
                  <option>Out of 10</option>
                  <option>Out of 4</option>
                  <option>Percentage</option>
                  <option>Other</option>
                </SelectBox>
              </div>
              <div>
                <Label required>GPA</Label>
                <Input placeholder="Eg. 8.5" value={form.gpa} onChange={(e) => update("gpa", e.target.value)} error={errors.gpa} />
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-6">
              <Label>Academic Achievements</Label>
              <AchievementInput items={form.achievements} onChange={(items) => update("achievements", items)} />
            </div>

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 3 && (
          <Card>
            <SectionTitle title="Project & Research Development" stepLabel="Step 3 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label required>Have you completed any significant projects?</Label>
                <SelectBox value={form.hasProjects} onChange={(e) => update("hasProjects", e.target.value as YesNo)}>
                  <option>No</option>
                  <option>Yes</option>
                </SelectBox>
              </div>
            </div>

            {form.hasProjects === "Yes" && (
              <Repeater
                title="Add Project"
                emptyHelper="Add at least one meaningful project."
                items={form.projects}
                onChange={(items) => update("projects", items)}
                template={{ title: "", summary: "", impact: "" }}
                fields={(item, set) => (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input value={item.title} onChange={(e) => set({ ...item, title: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Summary / What you did</Label>
                      <Input value={item.summary} onChange={(e) => set({ ...item, summary: e.target.value })} />
                    </div>
                    <div className="md:col-span-3">
                      <Label>Impact (optional)</Label>
                      <Input placeholder="Eg. Improved accuracy by 12%" value={item.impact || ""} onChange={(e) => set({ ...item, impact: e.target.value })} />
                    </div>
                  </div>
                )}
              />
            )}

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 4 && (
          <Card>
            <SectionTitle title="Internships & Training" stepLabel="Step 4 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Have you done internships or training?</Label>
                <SelectBox value={form.hasInternships} onChange={(e) => update("hasInternships", e.target.value as YesNo)}>
                  <option>No</option>
                  <option>Yes</option>
                </SelectBox>
              </div>
            </div>

            {form.hasInternships === "Yes" && (
              <Repeater
                title="Add Internship/Training"
                emptyHelper="Add your internship/training details."
                items={form.internships}
                onChange={(items) => update("internships", items)}
                template={{ org: "", role: "", summary: "" }}
                fields={(item, set) => (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Organization</Label>
                      <Input value={item.org} onChange={(e) => set({ ...item, org: e.target.value })} />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input value={item.role} onChange={(e) => set({ ...item, role: e.target.value })} />
                    </div>
                    <div className="md:col-span-1">
                      <Label>Summary</Label>
                      <Input value={item.summary} onChange={(e) => set({ ...item, summary: e.target.value })} />
                    </div>
                  </div>
                )}
              />
            )}

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 5 && (
          <Card>
            <SectionTitle title="Work Experience" stepLabel="Step 5 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label required>Have you worked in any professional role?</Label>
                <SelectBox value={form.hasWork} onChange={(e) => update("hasWork", e.target.value as YesNo)}>
                  <option>No</option>
                  <option>Yes</option>
                </SelectBox>
              </div>
            </div>

            {form.hasWork === "Yes" && (
              <Repeater
                title="Add Experience"
                emptyHelper="Add your most relevant roles."
                items={form.work}
                onChange={(items) => update("work", items)}
                template={{ company: "", role: "", duration: "", impact: "" }}
                fields={(item, set) => (
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label>Company</Label>
                      <Input value={item.company} onChange={(e) => set({ ...item, company: e.target.value })} />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input value={item.role} onChange={(e) => set({ ...item, role: e.target.value })} />
                    </div>
                    <div>
                      <Label>Duration</Label>
                      <Input placeholder="Eg. 2022–2024" value={item.duration} onChange={(e) => set({ ...item, duration: e.target.value })} />
                    </div>
                    <div>
                      <Label>Impact (optional)</Label>
                      <Input placeholder="Eg. Automated reporting pipeline" value={item.impact || ""} onChange={(e) => set({ ...item, impact: e.target.value })} />
                    </div>
                  </div>
                )}
              />
            )}

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 6 && (
          <Card>
            <SectionTitle title="Extra Curricular" stepLabel="Step 6 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label required>Have you been involved in extracurricular activities?</Label>
                <SelectBox value={form.hasEC} onChange={(e) => update("hasEC", e.target.value as YesNo)}>
                  <option>No</option>
                  <option>Yes</option>
                </SelectBox>
              </div>
            </div>

            {form.hasEC === "Yes" && (
              <Repeater
                title="Add Organization/Club"
                emptyHelper="Add clubs, sports, or leadership roles."
                items={form.ec}
                onChange={(items) => update("ec", items)}
                template={{ org: "", role: "", responsibility: "" }}
                fields={(item, set) => (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Organization/Club Name</Label>
                      <Input value={item.org} onChange={(e) => set({ ...item, org: e.target.value })} />
                    </div>
                    <div>
                      <Label>Your Role</Label>
                      <Input value={item.role} onChange={(e) => set({ ...item, role: e.target.value })} />
                    </div>
                    <div>
                      <Label>Your Responsibility</Label>
                      <Input value={item.responsibility} onChange={(e) => set({ ...item, responsibility: e.target.value })} />
                    </div>
                  </div>
                )}
              />
            )}

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 7 && (
          <Card>
            <SectionTitle title="Community Service" stepLabel="Step 7 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label required>Have you participated in community service?</Label>
                <SelectBox value={form.hasCommunity} onChange={(e) => update("hasCommunity", e.target.value as YesNo)}>
                  <option>No</option>
                  <option>Yes</option>
                </SelectBox>
              </div>
            </div>

            {form.hasCommunity === "Yes" && (
              <Repeater
                title="Add Community Service"
                emptyHelper="Add volunteer/community contributions."
                items={form.community}
                onChange={(items) => update("community", items)}
                template={{ org: "", role: "", impact: "" }}
                fields={(item, set) => (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Organization</Label>
                      <Input value={item.org} onChange={(e) => set({ ...item, org: e.target.value })} />
                    </div>
                    <div>
                      <Label>Your Role</Label>
                      <Input value={item.role} onChange={(e) => set({ ...item, role: e.target.value })} />
                    </div>
                    <div>
                      <Label>Impact</Label>
                      <Input placeholder="Eg. Mentored 20 students" value={item.impact} onChange={(e) => set({ ...item, impact: e.target.value })} />
                    </div>
                  </div>
                )}
              />
            )}

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 8 && (
          <Card>
            <SectionTitle title="Motivation for the Program" stepLabel="Step 8 of 10" />
            <div className="space-y-6">
              <MultiSelect
                required
                label="Why did you choose this program?"
                options={["Career opportunities", "Passion for the subject", "Research interests", "Curriculum", "Faculty", "Reputation", "Location", "Other"]}
                value={form.whyProgram}
                onChange={(v) => update("whyProgram", v)}
                placeholder="You can choose multiple"
                error={errors.whyProgram}
              />
              <TextArea placeholder="Explain your reason for choosing this program." value={form.whyProgramReason} onChange={(e) => update("whyProgramReason", e.target.value)} />
              <MultiSelect
                required
                label="Why This University?"
                options={["Research Opportunities", "Faculty", "Reputation", "Location", "Culture", "Placements", "Alumni", "Scholarship", "Other"]}
                value={form.whyUniversity}
                onChange={(v) => update("whyUniversity", v)}
                placeholder="You can choose multiple"
                error={errors.whyUniversity}
              />
              <TextArea placeholder="Explain your motivation for choosing this university." value={form.whyUniversityReason} onChange={(e) => update("whyUniversityReason", e.target.value)} />
            </div>

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 9 && (
          <Card>
            <SectionTitle title="Fit for the Program" stepLabel="Step 9 of 10" />
            <div className="space-y-6">
              <MultiSelect
                required
                label="How do you plan to contribute to the university?"
                options={["Research", "Leadership", "Academically", "Community Engagement", "Industry", "Sports", "Culture", "Mentorship"]}
                value={form.contribute}
                onChange={(v) => update("contribute", v)}
                placeholder="Select..."
                error={errors.contribute}
              />
              <TextArea placeholder="What skills or experiences make you a good fit for this course?" value={form.fitReason} onChange={(e) => update("fitReason", e.target.value)} />
            </div>

            <NavButtons onBack={() => setStep((Math.max(1, step - 1) as Step))} onNext={handleNext} />
          </Card>
        )}

        {step === 10 && (
          <Card>
            <SectionTitle title="Future Goals" stepLabel="Step 10 of 10" />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label required>What are your career goals after completing this program?</Label>
                <SelectBox value={form.careerGoal} onChange={(e) => update("careerGoal", e.target.value)} error={errors.careerGoal}>
                  <option value="">Choose one</option>
                  <option>Industry</option>
                  <option>Research</option>
                  <option>Entrepreneurship</option>
                  <option>PhD</option>
                  <option>Government / Public Sector</option>
                  <option>Teaching</option>
                </SelectBox>
              </div>
              <div>
                <Label>Notes (optional)</Label>
                <Input placeholder="Eg. AI product roles focusing on healthcare" value={form.careerNotes} onChange={(e) => update("careerNotes", e.target.value)} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <OutlineRedButton onClick={() => setStep(9 as Step)}>Back</OutlineRedButton>
              <PrimaryButton onClick={handleGenerate}>Show Results</PrimaryButton>
            </div>
          </Card>
        )}

        {step === 11 && (
          <Card>
            <SectionTitle title="Edit Your SOP" />
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: THEME.text }}>Format:</span>
                <div className="flex gap-2">
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="fmt" checked={downloadFormat === "txt"} onChange={() => setDownloadFormat("txt")} />
                    txt
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="fmt" checked={downloadFormat === "pdf"} onChange={() => setDownloadFormat("pdf")} />
                    pdf
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input type="radio" name="fmt" checked={downloadFormat === "word"} onChange={() => setDownloadFormat("word")} />
                    word
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: THEME.text }}>Font:</span>
                <SelectBox value={editorFont} onChange={(e) => setEditorFont(e.target.value)}>
                  <option>Helvetica</option>
                  <option>Arial</option>
                  <option>Inter</option>
                  <option>Georgia</option>
                  <option>Times New Roman</option>
                </SelectBox>
              </div>
            </div>

            <TextArea ref={editorRef as any} style={{ fontFamily: editorFont }} value={generated} onChange={(e) => setGenerated(e.target.value)} />

            <div className="flex items-center justify-between mt-6">
              <OutlineRedButton onClick={() => setStep(10 as Step)}>Back</OutlineRedButton>
              <PrimaryButton onClick={download}>Download</PrimaryButton>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

/* ---------- subcomponents ---------- */

function NavButtons({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center justify-between mt-8">
      <OutlineRedButton onClick={onBack}>Back</OutlineRedButton>
      <PrimaryButton onClick={onNext}>Next</PrimaryButton>
    </div>
  );
}

/* Achievements: show input only after clicking + Achievement */
function AchievementInput({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  const [adding, setAdding] = useState(false);
  const [val, setVal] = useState("");

  const confirmAdd = () => {
    const v = val.trim();
    if (!v) return;
    onChange([...items, v]);
    setVal("");
    setAdding(false);
  };

  return (
    <div>
      {!adding ? (
        <PrimaryButton type="button" onClick={() => setAdding(true)}>+ Achievement</PrimaryButton>
      ) : (
        <div className="flex gap-2 items-start">
          <div className="flex-1">
            <Input placeholder="Eg. Got 1st rank in Inter College Hackathon." value={val} onChange={(e) => setVal(e.target.value)} />
          </div>
          <PrimaryButton type="button" onClick={confirmAdd}>Add</PrimaryButton>
          <OutlineRedButton type="button" onClick={() => { setVal(""); setAdding(false); }}>Cancel</OutlineRedButton>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {items.map((a, i) => (
            <span key={i} className="inline-flex items-center gap-2 bg-green-50 text-green-700 ring-1 ring-green-200 px-3 py-1 rounded-full text-sm">
              {a}
              <button type="button" className="text-green-700/80 hover:text-green-900" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Repeater<T>({
  title,
  emptyHelper,
  template,
  items,
  onChange,
  fields,
}: {
  title: string;
  emptyHelper?: string;
  template: T;
  items: T[];
  onChange: (items: T[]) => void;
  fields: (item: T, set: (next: T) => void) => React.ReactNode;
}) {
  const add = () => onChange([...(items || []), JSON.parse(JSON.stringify(template))]);
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#0B0B2C]">{title}</h3>
        <PrimaryButton type="button" onClick={add}>+ Add</PrimaryButton>
      </div>
      {(!items || items.length === 0) && <p className="text-sm text-gray-500">{emptyHelper}</p>}
      <div className="space-y-4">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-2xl ring-1 ring-[#E5EBF0] p-4">
            {fields(it, (next) => onChange(items.map((x, i) => (i === idx ? next : x))))}
            <div className="flex justify-end mt-3">
              <button type="button" onClick={() => remove(idx)} className="text-sm" style={{ color: THEME.red }}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Stepper (circles + connectors) ---------- */
const STEPS_META: Array<{ key: Step; label: string }> = [
  { key: 1, label: "Step 1" },
  { key: 2, label: "Step 2" },
  { key: 3, label: "Step 3" },
  { key: 4, label: "Step 4" },
  { key: 5, label: "Step 5" },
  { key: 6, label: "Step 6" },
  { key: 7, label: "Step 7" },
  { key: 8, label: "Step 8" },
  { key: 9, label: "Step 9" },
  { key: 10, label: "Step 10" },
  { key: 11, label: "Result" },
];

function Stepper({ current }: { current: Step }) {
  const activeIdx = Math.min(11, current) - 1; // 0..10

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-3 min-w-[900px] px-1 select-none mt-12 mb-8">
        {STEPS_META.map((s, i) => {
          const isActive = i === activeIdx;
          const isCompleted = i < activeIdx; // previous steps done
          const showCheck = isCompleted || (s.key === 11 && current === 11);

          return (
            <React.Fragment key={s.key}>
              <div className="flex flex-col items-center shrink-0 w-[68px]">
                <div
                  className={cls(
                    "flex items-center justify-center w-12 h-12 rounded-full ring-2 transition-all",
                    isActive ? "ring-blue-500 shadow-lg" : isCompleted ? "ring-blue-500" : "ring-[#E5EBF0]"
                  )}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #8B5CF6 0%, #2563EB 100%)"
                      : isCompleted
                      ? THEME.blue
                      : "#E5EBF0",
                    color: isActive || isCompleted ? "#fff" : "#6B7280",
                    boxShadow: isActive ? "0 6px 16px rgba(37,99,235,0.35)" : undefined,
                  }}
                  aria-current={isActive ? "step" : undefined}
                >
                  {showCheck ? (
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
                      <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{i + 1}</span>
                  )}
                </div>
                <div className={cls("mt-2 text-xs", isActive ? "font-semibold text-[#0B0B2C]" : "text-gray-600")}>{s.label}</div>
              </div>

              {/* Connector */}
              {i < STEPS_META.length - 1 && (
                <div
                  className="h-[3px] rounded-full flex-1"
                  style={{
                    minWidth: 42,
                    background:
                      i < activeIdx
                        ? "linear-gradient(90deg, #2563EB 0%, #8B5CF6 100%)"
                        : "#E5EBF0",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* helpers */
function listToEnglish(arr: string[]) {
  if (arr.length === 1) return arr[0];
  const last = arr[arr.length - 1];
  return `${arr.slice(0, -1).join(", ")} and ${last}`;
}
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m] as string));
}
