"use client";
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

/**
 * Suggested route (Next.js App Router):
 *   app/tools/cost-of-study-abroad/page.tsx
 * Or use as a standalone component anywhere in your app.
 */

// ===== Theme (provided) =====
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
};

// ===== Helpers & Types =====
const classNames = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

type Country =
  | "United Kingdom"
  | "United States"
  | "Canada"
  | "France"
  | "Ireland"
  | "Australia"
  | "Germany";

type Level = "UG" | "PG";

type Frequency = "Never" | "Rarely" | "Sometimes" | "Often";

const FREQ_FACTOR: Record<Frequency, number> = {
  Never: 0,
  Rarely: 0.33,
  Sometimes: 0.66,
  Often: 1,
};

const currencyFormatters: Record<string, (n: number) => string> = {
  USD: (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(n),
  GBP: (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "GBP",
    }).format(n),
  CAD: (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "CAD",
    }).format(n),
  EUR: (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "EUR",
    }).format(n),
  AUD: (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "AUD",
    }).format(n),
  INR: (n) =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "INR",
    }).format(n),
};

// Rough FX → INR (1 unit of currency to INR). Adjust as needed.
const FX_TO_INR: Record<string, number> = {
  USD: 83,
  GBP: 105,
  CAD: 61,
  EUR: 90,
  AUD: 56,
};

// Convert a local amount to an INR string + local string side-by-side
const fmtBoth = (amountLocal: number, localCode: string) => {
  const toInr =
    localCode === "INR"
      ? amountLocal
      : amountLocal * (FX_TO_INR[localCode] ?? 1);
  const fmtLocal =
    currencyFormatters[localCode]?.(amountLocal) ?? amountLocal.toFixed(2);
  const fmtInr = currencyFormatters["INR"](toInr);
  return `${fmtInr} • ${fmtLocal}`;
};

// Country baseline data (approximate contemporary student budgets; editable)
const COUNTRY_DATA: Record<
  Country,
  {
    code: string; // currency code
    universities: string[]; // extend this list freely
    living: {
      accommodation: {
        onCampus: number;
        shared: number;
        private: number;
      }; // monthly
      transportPass: number; // monthly
      uberPerRide: number; // per ride
      foodCostPerMeal: {
        budget: number;
        moderate: number;
        premium: number;
        luxury: number;
      }; // eat-out cost per meal
      mobileInternet: number; // monthly typical
      fitnessMembership: number; // monthly typical
      entertainmentBase: number; // monthly base used with frequency factor
      clothingBase: number; // monthly base used with frequency factor
    };
    avgTuition: { UG: number; PG: number }; // yearly averages for placeholders
  }
> = {
  "United Kingdom": {
    code: "GBP",
    universities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "UCL",
      "University of Edinburgh",
      "King's College London",
      "University of Manchester",
      "University of Bristol",
      "University of Warwick",
      "University of Glasgow",
      "Other (type manually)",
    ],
    living: {
      accommodation: { onCampus: 820, shared: 750, private: 1200 },
      transportPass: 95,
      uberPerRide: 12,
      foodCostPerMeal: { budget: 10, moderate: 16, premium: 25, luxury: 40 },
      mobileInternet: 35,
      fitnessMembership: 35,
      entertainmentBase: 80,
      clothingBase: 70,
    },
    avgTuition: { UG: 18500, PG: 20000 },
  },
  "United States": {
    code: "USD",
    universities: [
      "Harvard University",
      "Stanford University",
      "MIT",
      "UC Berkeley",
      "University of Michigan",
      "NYU",
      "Carnegie Mellon University",
      "Georgia Tech",
      "UCLA",
      "University of Texas at Austin",
      "Other (type manually)",
    ],
    living: {
      accommodation: { onCampus: 1100, shared: 950, private: 1600 },
      transportPass: 80,
      uberPerRide: 16,
      foodCostPerMeal: { budget: 12, moderate: 20, premium: 32, luxury: 55 },
      mobileInternet: 55,
      fitnessMembership: 40,
      entertainmentBase: 110,
      clothingBase: 90,
    },
    avgTuition: { UG: 26000, PG: 28000 },
  },
  Canada: {
    code: "CAD",
    universities: [
      "University of Toronto",
      "UBC",
      "McGill University",
      "University of Alberta",
      "University of Waterloo",
      "McMaster University",
      "Western University",
      "Queen's University",
      "University of Ottawa",
      "Simon Fraser University",
      "Other (type manually)",
    ],
    living: {
      accommodation: { onCampus: 900, shared: 800, private: 1300 },
      transportPass: 95,
      uberPerRide: 14,
      foodCostPerMeal: { budget: 11, moderate: 18, premium: 28, luxury: 48 },
      mobileInternet: 60,
      fitnessMembership: 45,
      entertainmentBase: 95,
      clothingBase: 80,
    },
    avgTuition: { UG: 21000, PG: 23000 },
  },
  France: {
    code: "EUR",
    universities: [
      "Sorbonne University",
      "Université Paris-Saclay",
      "École Polytechnique",
      "Université Grenoble Alpes",
      "Université de Lyon",
      "Other (type manually)",
    ],
    living: {
      accommodation: { onCampus: 750, shared: 700, private: 1150 },
      transportPass: 75,
      uberPerRide: 13,
      foodCostPerMeal: { budget: 10, moderate: 17, premium: 27, luxury: 45 },
      mobileInternet: 30,
      fitnessMembership: 35,
      entertainmentBase: 85,
      clothingBase: 70,
    },
    avgTuition: { UG: 3000, PG: 5000 },
  },
  Ireland: {
    code: "EUR",
    universities: [
      "Trinity College Dublin",
      "University College Dublin",
      "University College Cork",
      "National University of Ireland Galway",
      "University of Limerick",
      "Dublin City University",
      "Other (type manually)",
    ],
    living: {
      accommodation: { onCampus: 1000, shared: 900, private: 1400 },
      transportPass: 110,
      uberPerRide: 14,
      foodCostPerMeal: { budget: 12, moderate: 20, premium: 30, luxury: 50 },
      mobileInternet: 35,
      fitnessMembership: 45,
      entertainmentBase: 100,
      clothingBase: 85,
    },
    avgTuition: { UG: 18000, PG: 20000 },
  },
  Australia: {
    code: "AUD",
    universities: [
      "University of Melbourne",
      "Australian National University",
      "University of Sydney",
      "UNSW Sydney",
      "Monash University",
      "University of Queensland",
      "Other (type manually)",
    ],
    living: {
      accommodation: { onCampus: 1100, shared: 950, private: 1600 },
      transportPass: 120,
      uberPerRide: 16,
      foodCostPerMeal: { budget: 12, moderate: 20, premium: 32, luxury: 55 },
      mobileInternet: 40,
      fitnessMembership: 50,
      entertainmentBase: 110,
      clothingBase: 95,
    },
    avgTuition: { UG: 24000, PG: 26000 },
  },
  Germany: {
    code: "EUR",
    universities: [
      "Technical University of Munich",
      "LMU Munich",
      "RWTH Aachen University",
      "Heidelberg University",
      "KIT",
      "TU Berlin",
      "Other (type manually)",
    ],
    living: {
      accommodation: { onCampus: 700, shared: 600, private: 1000 },
      transportPass: 70,
      uberPerRide: 12,
      foodCostPerMeal: { budget: 9, moderate: 15, premium: 24, luxury: 40 },
      mobileInternet: 25,
      fitnessMembership: 35,
      entertainmentBase: 80,
      clothingBase: 65,
    },
    avgTuition: { UG: 1500, PG: 2000 },
  },
};

const PROGRAMS = [
  "Computer Science",
  "Data Science",
  "Business Administration",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Biotechnology",
  "Design & UX",
  "Economics",
  "Media & Communication",
  "Other",
];

const DURATIONS = ["1 year", "1.5 years", "2 years", "3 years", "4 years"]; // tuition is yearly

// ===== UI Primitives =====
const StepBadge: React.FC<{
  active?: boolean;
  done?: boolean;
  index: number;
}> = ({ active, done, index }) => (
  <div
    className={classNames(
      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border",
      done
        ? "bg-white border-white text-white"
        : active
        ? "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white border-transparent shadow"
        : "bg-gray-300 text-gray-700 border-transparent"
    )}
    style={
      done
        ? { background: THEME.gray, color: THEME.text, borderColor: THEME.gray }
        : undefined
    }
  >
    {done ? "✓" : index}
  </div>
);

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={classNames(
      "rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-4 md:p-6",
      className
    )}
    {...props}
  />
);

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mb-5">
    <h2
      className="text-xl md:text-2xl font-semibold"
      style={{ color: THEME.text }}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm md:text-base text-gray-600 mt-1">{subtitle}</p>
    )}
  </div>
);

// ===== Main Component =====
export default function CostOfStudyAbroadPage() {
  // Stepper
  const [step, setStep] = useState<number>(1); // 1..7 then result

  // Step 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2
  const [country, setCountry] = useState<Country>("United States");
  const [university, setUniversity] = useState<string>("");
  const [customUniversity, setCustomUniversity] = useState<string>("");

  // Step 3
  const [level, setLevel] = useState<Level>("UG");
  const [program, setProgram] = useState<string>(PROGRAMS[0]);
  const [duration, setDuration] = useState<string>(DURATIONS[2]);
  const [tuition, setTuition] = useState<number>(
    COUNTRY_DATA[country].avgTuition[level]
  ); // editable yearly

  // Step 4 — Accommodation
  const [accomType, setAccomType] = useState<
    "onCampus" | "shared" | "private" | "other"
  >("shared");

  // Step 5 — Food
  const [eatOutDays, setEatOutDays] = useState<string[]>([]); // weekdays selected (mon–sun)
  const [restaurantTier, setRestaurantTier] = useState<
    "budget" | "moderate" | "premium" | "luxury"
  >("budget");

  // Step 6 — Transport
  const [walk, setWalk] = useState<Frequency>("Sometimes");
  const [bike, setBike] = useState<Frequency>("Rarely");
  const [publicTransport, setPublicTransport] = useState<Frequency>("Often");
  const [uber, setUber] = useState<Frequency>("Sometimes");

  // Step 7 — Misc
  const [entertainment, setEntertainment] =
    useState<Frequency>("Sometimes");
  const [clothing, setClothing] = useState<Frequency>("Rarely");
  const [mobileInternet, setMobileInternet] =
    useState<Frequency>("Often");
  const [fitness, setFitness] = useState<Frequency>("Rarely");

  // Update tuition placeholder when country/level change
  React.useEffect(() => {
    setTuition(COUNTRY_DATA[country].avgTuition[level]);
    setUniversity("");
    setCustomUniversity("");
  }, [country, level]);

  const currency = COUNTRY_DATA[country].code;
  const fmtLocal = currencyFormatters[currency];

  // ===== Cost Model (monthly → yearly) =====
  const costs = useMemo(() => {
    const baseline = COUNTRY_DATA[country].living;

    // Accommodation monthly
    const accomMonthly =
      accomType === "other"
        ? baseline.accommodation.shared // assume shared by default for "other"
        : baseline.accommodation[accomType];

    // Food monthly (eat-out only, assumes self-cook groceries covered in misc)
    const foodPerMeal = baseline.foodCostPerMeal[restaurantTier];
    const weeklyEatOutCount = eatOutDays.length;
    const foodMonthly = weeklyEatOutCount * 4.3 * foodPerMeal; // weekly to monthly (≈4.3 weeks)

    // Transport monthly
    const transportPass = baseline.transportPass * FREQ_FACTOR[publicTransport];
    const bikeMaintain = 8 * FREQ_FACTOR[bike];
    const uberMonthlyRides = { Never: 0, Rarely: 2, Sometimes: 6, Often: 12 }[
      uber
    ];
    const uberMonthly = uberMonthlyRides * baseline.uberPerRide;
    const transportMonthly = transportPass + bikeMaintain + uberMonthly; // walking assumed free

    // Misc monthly
    const entertainmentMonthly =
      baseline.entertainmentBase * FREQ_FACTOR[entertainment];
    const clothingMonthly = baseline.clothingBase * FREQ_FACTOR[clothing];

    const mobileInternetMonthly =
      baseline.mobileInternet *
      (mobileInternet === "Never"
        ? 0
        : mobileInternet === "Rarely"
        ? 0.7
        : mobileInternet === "Sometimes"
        ? 1
        : 1.2);
    const fitnessMonthly = baseline.fitnessMembership * FREQ_FACTOR[fitness];

    const livingMonthly =
      accomMonthly +
      foodMonthly +
      transportMonthly +
      entertainmentMonthly +
      clothingMonthly +
      mobileInternetMonthly +
      fitnessMonthly;
    const livingYearly = livingMonthly * 12;
    const totalYearly = livingYearly + (Number.isFinite(tuition) ? tuition : 0);

    const pie = [
      { name: "Accommodation", value: accomMonthly * 12, color: THEME.red },
      { name: "Food", value: foodMonthly * 12, color: THEME.sky },
      { name: "Transportation", value: transportMonthly * 12, color: THEME.blue },
      {
        name: "Miscellaneous",
        value:
          (entertainmentMonthly +
            clothingMonthly +
            mobileInternetMonthly +
            fitnessMonthly) *
          12,
        color: THEME.yellow,
      },
    ];

    return {
      accomMonthly,
      foodMonthly,
      transportMonthly,
      entertainmentMonthly,
      clothingMonthly,
      mobileInternetMonthly,
      fitnessMonthly,
      livingMonthly,
      livingYearly,
      totalYearly,
      pie,
    };
  }, [
    country,
    accomType,
    restaurantTier,
    eatOutDays,
    publicTransport,
    bike,
    uber,
    entertainment,
    clothing,
    mobileInternet,
    fitness,
    tuition,
  ]);

  const stepsLabels = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
    "Result",
  ];

  const goNext = () => setStep((s) => Math.min(s + 1, 8));
  const goPrev = () => setStep((s) => Math.max(1, s - 1));

  const isResult = step === 8;

  // Simple validators per step (minimal, expandable)
  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return name.trim().length >= 2 && /@/.test(email);
      case 2: {
        const uniOk = university || customUniversity.trim().length > 2;
        return Boolean(country) && uniOk;
      }
      case 3:
        return tuition > 0 && Boolean(program);
      default:
        return true;
    }
  }, [
    step,
    name,
    email,
    country,
    university,
    customUniversity,
    tuition,
    program,
  ]);

  // Reusable pills
  const FreqPills: React.FC<{
    value: Frequency;
    onChange: (f: Frequency) => void;
  }> = ({ value, onChange }) => (
    <div className="flex gap-2 mt-3 flex-wrap">
      {(["Never", "Rarely", "Sometimes", "Often"] as Frequency[]).map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
          className={classNames(
            "px-3 py-1.5 rounded-full text-sm border",
            value === f
              ? "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white border-transparent"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: THEME.surface, color: THEME.text }}
    >
      {/* Hero */}
      <div className="w-full bg-gradient-to-b from-[#002855] to-[#1a1a1a] pt-16 pb-12">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Cost of Study Abroad
          </h1>
          <p className="text-white/90 mt-3 max-w-3xl mx-auto">
            Fill the steps to estimate your yearly budget. We include living
            costs (shown in the pie chart) and add tuition to present a complete
            yearly total.
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="w-full max-w-[1400px] mx-auto px-6 -mt-8">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-2 overflow-auto">
            {stepsLabels.map((label, i) => {
              const index = i + 1;
              const active = step === index;
              const done = step > index;
              return (
                <div key={label} className="flex items-center gap-3 min-w-max">
                  <StepBadge
                    index={index < 8 ? index : 7}
                    active={active}
                    done={done && index < 8}
                  />
                  <div className="text-xs md:text-sm text-gray-700">
                    {label}
                  </div>
                  {i < stepsLabels.length - 1 && (
                    <div className="w-10 md:w-24 h-[2px] bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
        {!isResult && (
          <div className="grid grid-cols-1 gap-6">
            {step === 1 && (
              <Card>
                <SectionTitle title="Personal Information" />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="email"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">
                      Mobile Number
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <SectionTitle title="University" />
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Select a country
                    </label>
                    <select
                      value={country}
                      onChange={(e) =>
                        setCountry(e.target.value as Country)
                      }
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {Object.keys(COUNTRY_DATA).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">
                        Which university/college?
                      </label>
                      <select
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">
                          Select college/university
                        </option>
                        {COUNTRY_DATA[country].universities.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        If your university isn't listed, choose "Other (type
                        manually)" or type below.
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Custom university (optional)
                      </label>
                      <input
                        value={customUniversity}
                        onChange={(e) =>
                          setCustomUniversity(e.target.value)
                        }
                        placeholder="Type your university name"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <SectionTitle title="Program Details" />
                <div className="grid gap-4">
                  <div className="flex gap-4">
                    {(["UG", "PG"] as Level[]).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLevel(l)}
                        className={classNames(
                          "rounded-2xl px-5 py-3 border",
                          level === l
                            ? "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white border-transparent"
                            : "bg-white border-gray-300 text-gray-700"
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">
                        Program Name
                      </label>
                      <select
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {PROGRAMS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Program Duration
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {DURATIONS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Tuition Fee (per year)
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="number"
                          min={0}
                          value={tuition}
                          onChange={(e) =>
                            setTuition(Number(e.target.value) || 0)
                          }
                          className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          {COUNTRY_DATA[country].code}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        ≈ {fmtBoth(tuition, COUNTRY_DATA[country].code)} per
                        year
                      </p>
                      <p className="text-xs text-gray-500">
                        Placeholder auto-fills typical averages for {level}. You
                        can edit.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <SectionTitle
                  title="Accommodation"
                  subtitle="Choose your housing preference. Costs below are monthly estimates for the selected country."
                />
                <div className="grid md:grid-cols-3 gap-4">
                  {([
                    { key: "onCampus", label: "On-Campus", hint: "University housing" },
                    { key: "shared", label: "Shared Apartment", hint: "Room in a shared place" },
                    { key: "private", label: "Private Apartment", hint: "Studio/1-bed" },
                  ] as const).map((opt) => {
                    const active = accomType === opt.key;
                    const price =
                      COUNTRY_DATA[country].living.accommodation[
                        opt.key as "onCampus" | "shared" | "private"
                      ];
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setAccomType(opt.key as any)}
                        className={classNames(
                          "text-left rounded-2xl border p-4 hover:shadow transition",
                          active
                            ? "border-transparent bg-indigo-50"
                            : "border-gray-300"
                        )}
                      >
                        <div className="font-semibold">{opt.label}</div>
                        <div className="text-sm text-gray-600">{opt.hint}</div>
                        <div className="mt-2 text-sm">
                          {fmtBoth(price, COUNTRY_DATA[country].code)}/month
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            )}

            {step === 5 && (
              <Card>
                <SectionTitle
                  title="Food"
                  subtitle="How often do you eat out and what kind of places do you go to?"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium">
                      Select eat-out weekdays (multiple)
                    </label>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (d) => {
                          const active = eatOutDays.includes(d);
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() =>
                                setEatOutDays((prev) =>
                                  prev.includes(d)
                                    ? prev.filter((x) => x !== d)
                                    : [...prev, d]
                                )
                              }
                              className={
                                active
                                  ? "px-3 py-2 rounded-xl border text-sm bg-indigo-600 text-white border-transparent"
                                  : "px-3 py-2 rounded-xl border text-sm bg-white border-gray-300"
                              }
                            >
                              {d}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      We count {eatOutDays.length} selected day(s) per week.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Typical restaurant type
                    </label>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {([
                        { key: "budget", label: "Budget $" },
                        { key: "moderate", label: "Moderate $$" },
                        { key: "premium", label: "Premium $$$" },
                        { key: "luxury", label: "Luxury $$$$" },
                      ] as const).map((r) => (
                        <button
                          key={r.key}
                          type="button"
                          onClick={() => setRestaurantTier(r.key)}
                          className={classNames(
                            "rounded-2xl border p-4 text-left",
                            restaurantTier === r.key
                              ? "bg-indigo-50 border-transparent"
                              : "border-gray-300"
                          )}
                        >
                          <div className="font-semibold">{r.label}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            ~
                            {fmtBoth(
                              COUNTRY_DATA[country].living.foodCostPerMeal[
                                r.key
                              ],
                              COUNTRY_DATA[country].code
                            )}{" "}
                            per meal
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {step === 6 && (
              <Card>
                <SectionTitle
                  title="Transportation"
                  subtitle="Set your usual usage frequency for each mode."
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-medium">Walking 🚶‍♀️</div>
                    <FreqPills value={walk} onChange={setWalk} />
                    <p className="text-xs text-gray-500 mt-2">
                      Walking is free; included for completeness.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">Bicycling 🚲</div>
                    <FreqPills value={bike} onChange={setBike} />
                    <p className="text-xs text-gray-500 mt-2">
                      Covers small maintenance ~
                      {fmtBoth(8, COUNTRY_DATA[country].code)}/mo when used
                      often.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">Public Transportation 🚌</div>
                    <FreqPills
                      value={publicTransport}
                      onChange={setPublicTransport}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Typical monthly pass:{" "}
                      {fmtBoth(
                        COUNTRY_DATA[country].living.transportPass,
                        COUNTRY_DATA[country].code
                      )}
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">Uber / Taxi 🚕</div>
                    <FreqPills value={uber} onChange={setUber} />
                    <p className="text-xs text-gray-500 mt-2">
                      We estimate 0/2/6/12 rides ×{" "}
                      {fmtBoth(
                        COUNTRY_DATA[country].living.uberPerRide,
                        COUNTRY_DATA[country].code
                      )}{" "}
                      per month.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {step === 7 && (
              <Card>
                <SectionTitle title="Miscellaneous" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-medium">Entertainment 🎬</div>
                    <FreqPills
                      value={entertainment}
                      onChange={setEntertainment}
                    />
                  </div>
                  <div>
                    <div className="font-medium">Clothing 👗</div>
                    <FreqPills value={clothing} onChange={setClothing} />
                  </div>
                  <div>
                    <div className="font-medium">Mobile plan / Internet 📶</div>
                    <FreqPills
                      value={mobileInternet}
                      onChange={setMobileInternet}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Typical:{" "}
                      {fmtBoth(
                        COUNTRY_DATA[country].living.mobileInternet,
                        COUNTRY_DATA[country].code
                      )}
                      /mo
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">Fitness 🏋️‍♀️</div>
                    <FreqPills value={fitness} onChange={setFitness} />
                    <p className="text-xs text-gray-500 mt-2">
                      Membership:{" "}
                      {fmtBoth(
                        COUNTRY_DATA[country].living.fitnessMembership,
                        COUNTRY_DATA[country].code
                      )}
                      /mo
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Nav */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
                disabled={step === 1}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canNext}
                className={classNames(
                  "px-6 py-3 rounded-xl font-medium text-white",
                  canNext ? "bg-[#7C3AED] hover:opacity-95" : "bg-gray-400"
                )}
              >
                {step === 7 ? "See Result" : "Next →"}
              </button>
            </div>
          </div>
        )}

        {isResult && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <SectionTitle
                title="Your Estimated Yearly Cost"
                subtitle="The pie chart shows living costs only. Tuition is added to the grand total below."
              />
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={costs.pie}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                      >
                        {costs.pie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: any) =>
                          fmtBoth(Number(v), COUNTRY_DATA[country].code)
                        }
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-gray-600">Accommodation</div>
                    <div className="text-right font-medium">
                      {fmtBoth(
                        costs.accomMonthly * 12,
                        COUNTRY_DATA[country].code
                      )}
                    </div>
                    <div className="text-gray-600">Food</div>
                    <div className="text-right font-medium">
                      {fmtBoth(
                        costs.foodMonthly * 12,
                        COUNTRY_DATA[country].code
                      )}
                    </div>
                    <div className="text-gray-600">Transportation</div>
                    <div className="text-right font-medium">
                      {fmtBoth(
                        costs.transportMonthly * 12,
                        COUNTRY_DATA[country].code
                      )}
                    </div>
                    <div className="text-gray-600">Miscellaneous</div>
                    <div className="text-right font-medium">
                      {fmtBoth(
                        (costs.entertainmentMonthly +
                          costs.clothingMonthly +
                          costs.mobileInternetMonthly +
                          costs.fitnessMonthly) *
                          12,
                        COUNTRY_DATA[country].code
                      )}
                    </div>
                    <div className="col-span-2 border-t my-2"></div>
                    <div className="text-gray-600">Living Expense (Yearly)</div>
                    <div className="text-right font-semibold">
                      {fmtBoth(
                        costs.livingYearly,
                        COUNTRY_DATA[country].code
                      )}
                    </div>
                    <div className="text-gray-600">Tuition (Yearly)</div>
                    <div className="text-right font-semibold">
                      {fmtBoth(tuition, COUNTRY_DATA[country].code)}
                    </div>
                    <div className="col-span-2 border-t my-2"></div>
                    <div className="text-gray-800">Grand Total (Yearly)</div>
                    <div
                      className="text-right text-lg font-bold"
                      style={{ color: THEME.red }}
                    >
                      {fmtBoth(
                        costs.totalYearly,
                        COUNTRY_DATA[country].code
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Note: These are estimates based on your selections for{" "}
                    {country}. Adjust tuition or frequencies to refine results.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
              >
                Start Over
              </button>
              <a
                href="#apply"
                className="px-6 py-3 rounded-xl font-semibold text-white"
                style={{ background: THEME.red }}
              >
                Apply for Loan
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
