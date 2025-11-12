"use client";
import DelayedPopup from "@/components/DelayedPopup";
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
};

// ===== Utilities =====
const cn = (...xs: (string | false | null | undefined)[]) =>
  xs.filter(Boolean).join(" ");

type Frequency = "Never" | "Rarely" | "Sometimes" | "Often";
const FREQ_FACTOR: Record<Frequency, number> = {
  Never: 0,
  Rarely: 0.33,
  Sometimes: 0.66,
  Often: 1,
};

type CountryKey =
  | "United Kingdom"
  | "United States"
  | "Canada"
  | "France"
  | "Ireland"
  | "Australia"
  | "Germany";

type AccomType = "onCampus" | "shared" | "private" | "other";
type RestaurantTier = "budget" | "moderate" | "premium" | "luxury";
type LocationPref = "center" | "suburbs" | "custom";

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
};

// ===== Baselines by country (approximate, editable) =====
type LivingData = {
  code: string; // currency code
  cities: string[];
  universitiesByCity: Record<string, string[]>;
  living: {
    accommodation: { onCampus: number; shared: number; private: number }; // monthly per person
    transportPass: number; // monthly
    uberPerRide: number; // per ride
    foodCostPerMeal: {
      budget: number;
      moderate: number;
      premium: number;
      luxury: number;
    }; // eating-out
    groceriesMonthly: number; // baseline groceries (cook at home)
    homeElectricity: number; // typical monthly share
    homeWater: number; // typical monthly share
    homeInternet: number; // broadband home
    mobilePlan: number; // phone plan (step 7)
    fitnessMembership: number; // gym
    entertainmentBase: number; // misc
    clothingBase: number; // misc
  };
};

const DATA: Record<CountryKey, LivingData> = {
  "United Kingdom": {
    code: "GBP",
    cities: [
      "London",
      "Manchester",
      "Edinburgh",
      "Birmingham",
      "Glasgow",
      "Bristol",
      "Leeds",
      "Nottingham",
      "Sheffield",
      "Liverpool",
      "Other",
    ],
    universitiesByCity: {
      London: [
        "Imperial College London",
        "UCL",
        "King's College London",
        "LSE",
        "Queen Mary",
        "Other",
      ],
      Manchester: [
        "University of Manchester",
        "Manchester Metropolitan",
        "Other",
      ],
      Edinburgh: ["University of Edinburgh", "Heriot-Watt University", "Other"],
      Birmingham: ["University of Birmingham", "Aston University", "Other"],
      Glasgow: ["University of Glasgow", "Strathclyde", "Other"],
      Bristol: ["University of Bristol", "UWE Bristol", "Other"],
      Leeds: ["University of Leeds", "Leeds Beckett", "Other"],
      Nottingham: ["University of Nottingham", "Nottingham Trent", "Other"],
      Sheffield: ["University of Sheffield", "Sheffield Hallam", "Other"],
      Liverpool: ["University of Liverpool", "Liverpool John Moores", "Other"],
      Other: ["Other"],
    },
    living: {
      accommodation: { onCampus: 820, shared: 750, private: 1200 },
      transportPass: 95,
      uberPerRide: 12,
      foodCostPerMeal: { budget: 10, moderate: 16, premium: 25, luxury: 40 },
      groceriesMonthly: 160,
      homeElectricity: 45,
      homeWater: 25,
      homeInternet: 30,
      mobilePlan: 18,
      fitnessMembership: 35,
      entertainmentBase: 80,
      clothingBase: 70,
    },
  },
  "United States": {
    code: "USD",
    cities: [
      "New York",
      "Boston",
      "San Francisco",
      "Los Angeles",
      "Chicago",
      "Austin",
      "Seattle",
      "Atlanta",
      "Ann Arbor",
      "Pittsburgh",
      "Other",
    ],
    universitiesByCity: {
      "New York": ["NYU", "Columbia University", "CUNY", "Other"],
      Boston: [
        "Harvard University",
        "MIT",
        "Boston University",
        "Northeastern",
        "Other",
      ],
      "San Francisco": ["USF", "SFSU", "Other"],
      "Los Angeles": ["UCLA", "USC", "CSULA", "Other"],
      Chicago: [
        "University of Chicago",
        "Northwestern (Evanston)",
        "UIC",
        "Other",
      ],
      Austin: ["University of Texas at Austin", "Other"],
      Seattle: ["University of Washington", "Other"],
      Atlanta: ["Georgia Tech", "Emory University", "Other"],
      "Ann Arbor": ["University of Michigan", "Other"],
      Pittsburgh: [
        "Carnegie Mellon University",
        "University of Pittsburgh",
        "Other",
      ],
      Other: ["Other"],
    },
    living: {
      accommodation: { onCampus: 1100, shared: 950, private: 1600 },
      transportPass: 80,
      uberPerRide: 16,
      foodCostPerMeal: { budget: 12, moderate: 20, premium: 32, luxury: 55 },
      groceriesMonthly: 200,
      homeElectricity: 60,
      homeWater: 30,
      homeInternet: 55,
      mobilePlan: 35,
      fitnessMembership: 40,
      entertainmentBase: 110,
      clothingBase: 90,
    },
  },
  Canada: {
    code: "CAD",
    cities: [
      "Toronto",
      "Vancouver",
      "Montreal",
      "Calgary",
      "Ottawa",
      "Edmonton",
      "Waterloo",
      "Hamilton",
      "Quebec City",
      "Winnipeg",
      "Other",
    ],
    universitiesByCity: {
      Toronto: [
        "University of Toronto",
        "Ryerson/TMU",
        "York University",
        "Other",
      ],
      Vancouver: ["UBC", "Simon Fraser University", "Other"],
      Montreal: [
        "McGill University",
        "Université de Montréal",
        "Concordia",
        "Other",
      ],
      Calgary: ["University of Calgary", "Other"],
      Ottawa: ["University of Ottawa", "Carleton University", "Other"],
      Edmonton: ["University of Alberta", "Other"],
      Waterloo: ["University of Waterloo", "Wilfrid Laurier", "Other"],
      Hamilton: ["McMaster University", "Other"],
      "Quebec City": ["Laval University", "Other"],
      Winnipeg: ["University of Manitoba", "Other"],
      Other: ["Other"],
    },
    living: {
      accommodation: { onCampus: 900, shared: 800, private: 1300 },
      transportPass: 95,
      uberPerRide: 14,
      foodCostPerMeal: { budget: 11, moderate: 18, premium: 28, luxury: 48 },
      groceriesMonthly: 190,
      homeElectricity: 55,
      homeWater: 25,
      homeInternet: 60,
      mobilePlan: 35,
      fitnessMembership: 45,
      entertainmentBase: 95,
      clothingBase: 80,
    },
  },
  France: {
    code: "EUR",
    cities: [
      "Paris",
      "Lyon",
      "Toulouse",
      "Grenoble",
      "Lille",
      "Bordeaux",
      "Marseille",
      "Nantes",
      "Nice",
      "Strasbourg",
      "Other",
    ],
    universitiesByCity: {
      Paris: ["Sorbonne University", "Université Paris-Saclay", "PSL", "Other"],
      Lyon: ["Université de Lyon", "INSA Lyon", "EM Lyon", "Other"],
      Toulouse: ["Université Toulouse Capitole", "INP Toulouse", "Other"],
      Grenoble: ["Université Grenoble Alpes", "Grenoble INP", "Other"],
      Lille: ["Université de Lille", "Other"],
      Bordeaux: ["Université de Bordeaux", "KEDGE", "Other"],
      Marseille: ["Aix-Marseille University", "Other"],
      Nantes: ["Université de Nantes", "Other"],
      Nice: ["Université Côte d’Azur", "Other"],
      Strasbourg: ["Université de Strasbourg", "Other"],
      Other: ["Other"],
    },
    living: {
      accommodation: { onCampus: 750, shared: 700, private: 1150 },
      transportPass: 75,
      uberPerRide: 13,
      foodCostPerMeal: { budget: 10, moderate: 17, premium: 27, luxury: 45 },
      groceriesMonthly: 170,
      homeElectricity: 45,
      homeWater: 20,
      homeInternet: 30,
      mobilePlan: 20,
      fitnessMembership: 35,
      entertainmentBase: 85,
      clothingBase: 70,
    },
  },
  Ireland: {
    code: "EUR",
    cities: [
      "Dublin",
      "Cork",
      "Galway",
      "Limerick",
      "Waterford",
      "Maynooth",
      "Other",
    ],
    universitiesByCity: {
      Dublin: [
        "Trinity College Dublin",
        "University College Dublin",
        "Dublin City University",
        "TU Dublin",
        "Other",
      ],
      Cork: ["University College Cork", "Other"],
      Galway: ["University of Galway", "Other"],
      Limerick: ["University of Limerick", "Other"],
      Waterford: ["SETU (Waterford)", "Other"],
      Maynooth: ["Maynooth University", "Other"],
      Other: ["Other"],
    },
    living: {
      accommodation: { onCampus: 1000, shared: 900, private: 1400 },
      transportPass: 110,
      uberPerRide: 14,
      foodCostPerMeal: { budget: 12, moderate: 20, premium: 30, luxury: 50 },
      groceriesMonthly: 185,
      homeElectricity: 60,
      homeWater: 25,
      homeInternet: 35,
      mobilePlan: 25,
      fitnessMembership: 45,
      entertainmentBase: 100,
      clothingBase: 85,
    },
  },
  Australia: {
    code: "AUD",
    cities: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Canberra",
      "Gold Coast",
      "Other",
    ],
    universitiesByCity: {
      Sydney: [
        "University of Sydney",
        "UNSW Sydney",
        "UTS",
        "Macquarie University",
        "Other",
      ],
      Melbourne: [
        "University of Melbourne",
        "Monash University",
        "RMIT",
        "Swinburne",
        "Other",
      ],
      Brisbane: ["University of Queensland", "QUT", "Griffith", "Other"],
      Perth: ["University of Western Australia", "Curtin University", "Other"],
      Adelaide: ["University of Adelaide", "UniSA", "Other"],
      Canberra: ["ANU", "University of Canberra", "Other"],
      "Gold Coast": ["Griffith (Gold Coast)", "Bond University", "Other"],
      Other: ["Other"],
    },
    living: {
      accommodation: { onCampus: 1100, shared: 950, private: 1600 },
      transportPass: 120,
      uberPerRide: 16,
      foodCostPerMeal: { budget: 12, moderate: 20, premium: 32, luxury: 55 },
      groceriesMonthly: 200,
      homeElectricity: 65,
      homeWater: 30,
      homeInternet: 40,
      mobilePlan: 28,
      fitnessMembership: 50,
      entertainmentBase: 110,
      clothingBase: 95,
    },
  },
  Germany: {
    code: "EUR",
    cities: [
      "Munich",
      "Berlin",
      "Aachen",
      "Stuttgart",
      "Karlsruhe",
      "Heidelberg",
      "Hamburg",
      "Frankfurt",
      "Cologne",
      "Dresden",
      "Other",
    ],
    universitiesByCity: {
      Munich: ["TUM", "LMU Munich", "Other"],
      Berlin: ["TU Berlin", "HU Berlin", "FU Berlin", "Other"],
      Aachen: ["RWTH Aachen", "Other"],
      Stuttgart: ["University of Stuttgart", "Other"],
      Karlsruhe: ["KIT", "Other"],
      Heidelberg: ["Heidelberg University", "Other"],
      Hamburg: ["University of Hamburg", "Other"],
      Frankfurt: ["Goethe University", "Other"],
      Cologne: ["University of Cologne", "TH Köln", "Other"],
      Dresden: ["TU Dresden", "Other"],
      Other: ["Other"],
    },
    living: {
      accommodation: { onCampus: 700, shared: 600, private: 1000 },
      transportPass: 70,
      uberPerRide: 12,
      foodCostPerMeal: { budget: 9, moderate: 15, premium: 24, luxury: 40 },
      groceriesMonthly: 150,
      homeElectricity: 45,
      homeWater: 20,
      homeInternet: 25,
      mobilePlan: 15,
      fitnessMembership: 35,
      entertainmentBase: 80,
      clothingBase: 65,
    },
  },
};

// ===== UI Primitives =====
const StepBadge: React.FC<{
  active?: boolean;
  done?: boolean;
  index: number;
}> = ({ active, done, index }) => (
  <div
    className={cn(
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
    className={cn(
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

// ===== Page =====
export default function CompareCostOfLivingPage() {
  // Stepper
  const [step, setStep] = useState(1); // 1..7 then result (8)

  // Step 1 — Personal
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2 — Country, City, University
  const [country, setCountry] = useState<CountryKey>("United States");
  const [city, setCity] = useState<string>("New York");
  const [university, setUniversity] = useState<string>("NYU");
  const [customUniversity, setCustomUniversity] = useState<string>("");

  // Step 3 — Accommodation (exact like screenshot: cards + location)
  const [accomType, setAccomType] = useState<AccomType>("shared");
  const [roommateOption, setRoommateOption] = useState<
    "single" | "two" | "threePlus"
  >("two");
  const [locationPref, setLocationPref] = useState<LocationPref>("center");
  const [customKm, setCustomKm] = useState<number>(3);

  // Step 4 — Utilities (home)
  const [elecLevel, setElecLevel] = useState<"included" | "share" | "full">(
    "share"
  );
  const [waterLevel, setWaterLevel] = useState<"included" | "share" | "full">(
    "share"
  );
  const [broadband, setBroadband] = useState<boolean>(true);

  // Step 5 — Food (exact like screenshot: weekday chips + tiers)
  const [eatOutDays, setEatOutDays] = useState<string[]>(["Mon"]);
  const [restaurantTier, setRestaurantTier] =
    useState<RestaurantTier>("budget");

  // Step 6 — Transportation (exact like screenshot: image cards + frequency pills)
  const [walk, setWalk] = useState<Frequency>("Sometimes");
  const [bike, setBike] = useState<Frequency>("Rarely");
  const [publicTransport, setPublicTransport] = useState<Frequency>("Often");
  const [uber, setUber] = useState<Frequency>("Sometimes");

  // Step 7 — Miscellaneous (as screenshot: entertainment, clothing, mobile plan, fitness)
  const [entertainment, setEntertainment] = useState<Frequency>("Sometimes");
  const [clothing, setClothing] = useState<Frequency>("Rarely");
  const [mobilePlanUse, setMobilePlanUse] = useState<Frequency>("Often");
  const [fitness, setFitness] = useState<Frequency>("Rarely");

  // Helpers from country
  const cfg = DATA[country];
  const fmt = currencyFormatters[cfg.code];

  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  // Keep city & university lists in sync when country changes
  React.useEffect(() => {
    const firstCity = cfg.cities[0];
    setCity(firstCity);
    const firstUni = (cfg.universitiesByCity[firstCity] || ["Other"])[0];
    setUniversity(firstUni);
    setCustomUniversity("");
  }, [country]);

  React.useEffect(() => {
    const firstUni = (cfg.universitiesByCity[city] || ["Other"])[0];
    setUniversity(firstUni);
    setCustomUniversity("");
  }, [city]); // eslint-disable-line

  // ===== Cost Model (monthly) =====
  const costs = useMemo(() => {
    const L = cfg.living;

    // Accommodation base
    let base =
      accomType === "other"
        ? L.accommodation.shared
        : L.accommodation[accomType];

    // roommate factor (only for shared)
    if (accomType === "shared") {
      const factor =
        roommateOption === "single" ? 1 : roommateOption === "two" ? 0.8 : 0.65;
      base *= factor;
    }

    // location multiplier
    const locMult =
      locationPref === "center"
        ? 1.15
        : locationPref === "suburbs"
        ? 0.95
        : Math.max(0.85, 1.05 - (customKm || 0) * 0.01);
    const accomMonthly = base * locMult;

    // Utilities (home)
    const elec =
      elecLevel === "included"
        ? 0
        : elecLevel === "share"
        ? L.homeElectricity * 0.6
        : L.homeElectricity;
    const water =
      waterLevel === "included"
        ? 0
        : waterLevel === "share"
        ? L.homeWater * 0.6
        : L.homeWater;
    const internet = broadband ? L.homeInternet : 0;
    const utilitiesMonthly = elec + water + internet;

    // Food
    const perMeal = L.foodCostPerMeal[restaurantTier];
    const eatOutMonthly = eatOutDays.length * 4.3 * perMeal;
    const foodMonthly = L.groceriesMonthly + eatOutMonthly;

    // Transport
    const pass = L.transportPass * FREQ_FACTOR[publicTransport];
    const bikeMaintain = 8 * FREQ_FACTOR[bike];
    const uberRides = { Never: 0, Rarely: 2, Sometimes: 6, Often: 12 }[uber];
    const uberCost = uberRides * L.uberPerRide;
    const transportMonthly = pass + bikeMaintain + uberCost;

    // Misc
    const entertainmentMonthly =
      L.entertainmentBase * FREQ_FACTOR[entertainment];
    const clothingMonthly = L.clothingBase * FREQ_FACTOR[clothing];
    const mobileMonthly =
      L.mobilePlan *
      (mobilePlanUse === "Never"
        ? 0
        : mobilePlanUse === "Rarely"
        ? 0.7
        : mobilePlanUse === "Sometimes"
        ? 1
        : 1.2);
    const fitnessMonthly = L.fitnessMembership * FREQ_FACTOR[fitness];

    const miscMonthly =
      entertainmentMonthly + clothingMonthly + mobileMonthly + fitnessMonthly;

    const totalMonthly =
      accomMonthly +
      utilitiesMonthly +
      foodMonthly +
      transportMonthly +
      miscMonthly;

    const pie = [
      { name: "Accommodation", value: accomMonthly, color: THEME.blue },
      { name: "Food", value: foodMonthly, color: THEME.yellow },
      { name: "Transportation", value: transportMonthly, color: THEME.sky },
      {
        name: "Utilities",
        value: utilitiesMonthly + miscMonthly,
        color: THEME.red,
      }, // to mirror screenshot legend
    ];

    return {
      accomMonthly,
      utilitiesMonthly,
      foodMonthly,
      transportMonthly,
      miscMonthly,
      totalMonthly,
      totalYearly: totalMonthly * 12,
      pie,
    };
  }, [
    cfg,
    accomType,
    roommateOption,
    locationPref,
    customKm,
    elecLevel,
    waterLevel,
    broadband,
    restaurantTier,
    eatOutDays,
    publicTransport,
    bike,
    uber,
    entertainment,
    clothing,
    mobilePlanUse,
    fitness,
  ]);

  // Step nav / validation
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
  const isResult = step === 8;
  const goNext = () => setStep((s) => Math.min(8, s + 1));
  const goPrev = () => setStep((s) => Math.max(1, s - 1));

  const canNext = useMemo(() => {
    switch (step) {
      case 1:
        return name.trim().length >= 2 && /@/.test(email);
      case 2:
        return (
          Boolean(city) &&
          (Boolean(university) || customUniversity.trim().length > 2)
        );
      default:
        return true;
    }
  }, [step, name, email, city, university, customUniversity]);

  // Pills for frequency
  const FreqPills: React.FC<{
    value: Frequency;
    onChange: (v: Frequency) => void;
  }> = ({ value, onChange }) => (
    <div className="flex gap-2 mt-3 flex-wrap">
      {(["Never", "Rarely", "Sometimes", "Often"] as Frequency[]).map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
          className={cn(
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
      {/* HERO */}
      {/* HERO */}
      <section
        className="relative w-full pt-16 pb-12 bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: `url(/assets/images/tools-bg.webp)`, // <-- replace with your image
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Content above overlay */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            Compare Cost of Living in Countries for Study Abroad
          </h1>
          <p className="text-white/90 mt-3 max-w-3xl mx-auto">
            Walk through the 7 steps to estimate your <b>monthly</b> living cost
            by city and lifestyle. We break down accommodation, utilities, food,
            transport and more — then visualize it in a clean pie chart.
          </p>
        </div>
      </section>

      {/* STEPPER */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
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

      {/* CONTENT */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
        {!isResult && (
          <div className="grid grid-cols-1 gap-6">
            {/* STEP 1 */}
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
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Mobile Number</label>
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

            {/* STEP 2 */}
            {step === 2 && (
              <Card>
                <SectionTitle title="Country" />
                <div className="grid gap-6">
                  <div>
                    <label className="text-sm font-medium">
                      Select a country of your choice
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value as CountryKey)}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {(Object.keys(DATA) as CountryKey[]).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Select a city of your choice
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {cfg.cities.map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">University</label>
                      <select
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {(cfg.universitiesByCity[city] || ["Other"]).map(
                          (u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Custom university (optional)
                      </label>
                      <input
                        value={customUniversity}
                        onChange={(e) => setCustomUniversity(e.target.value)}
                        placeholder="Type your university name"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* STEP 3 — Accommodation (exact like screenshot) */}
            {step === 3 && (
              <Card>
                <SectionTitle
                  title="Accommodation"
                  subtitle="Choose accommodation type and proximity to the university/city center."
                />
                <div className="grid md:grid-cols-4 gap-4">
                  {(
                    [
                      {
                        key: "onCampus",
                        label: "On-Campus",
                        img: "https://images.unsplash.com/photo-1519455953755-af066f52f1ea?q=80&w=800&auto=format&fit=crop",
                        hint: "University-managed housing",
                      },
                      {
                        key: "shared",
                        label: "Shared Apartments",
                        img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop",
                        hint: "Private room in shared unit",
                      },
                      {
                        key: "private",
                        label: "Private Apartments",
                        img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
                        hint: "Studio / 1-bed",
                      },
                      {
                        key: "other",
                        label: "Others",
                        img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop",
                        hint: "Homestay / relatives, etc.",
                      },
                    ] as const
                  ).map((opt) => {
                    const active = accomType === opt.key;
                    const price =
                      opt.key === "other"
                        ? cfg.living.accommodation.shared
                        : cfg.living.accommodation[opt.key];
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setAccomType(opt.key)}
                        className={cn(
                          "text-left rounded-2xl border p-3 hover:shadow transition",
                          active
                            ? "border-transparent bg-indigo-50"
                            : "border-gray-300"
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={opt.img}
                          alt={opt.label}
                          className="h-28 w-full object-cover rounded-xl mb-3"
                        />
                        <div className="font-semibold">{opt.label}</div>
                        <div className="text-xs text-gray-600">{opt.hint}</div>
                        <div className="mt-2 text-xs text-gray-700">
                          ~{fmt(price)}/month (baseline)
                        </div>

                        {opt.key === "shared" && (
                          <div className="mt-3 space-y-1 text-sm">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="roommates"
                                checked={roommateOption === "single"}
                                onChange={() => setRoommateOption("single")}
                              />
                              Single occupancy
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="roommates"
                                checked={roommateOption === "two"}
                                onChange={() => setRoommateOption("two")}
                              />
                              2 roommates (cheaper)
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="roommates"
                                checked={roommateOption === "threePlus"}
                                onChange={() => setRoommateOption("threePlus")}
                              />
                              3-4 roommates (cheapest)
                            </label>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <div className="text-sm font-medium mb-2">
                    Where would you like to live?
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setLocationPref("center")}
                      className={cn(
                        "rounded-2xl border p-4 text-left",
                        locationPref === "center"
                          ? "bg-indigo-50 border-transparent"
                          : "border-gray-300"
                      )}
                    >
                      <div className="font-semibold">Within City Center</div>
                      <div className="text-xs text-gray-600">
                        Under 3 miles • Up to 30 mins walking
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLocationPref("suburbs")}
                      className={cn(
                        "rounded-2xl border p-4 text-left",
                        locationPref === "suburbs"
                          ? "bg-indigo-50 border-transparent"
                          : "border-gray-300"
                      )}
                    >
                      <div className="font-semibold">Within Suburbs</div>
                      <div className="text-xs text-gray-600">
                        Under 40 mins • Up to 120 mins of travel
                      </div>
                    </button>

                    <div
                      className={cn(
                        "rounded-2xl border p-4",
                        locationPref === "custom"
                          ? "bg-indigo-50 border-transparent"
                          : "border-gray-300"
                      )}
                    >
                      <label className="font-semibold block">
                        Custom Distance
                      </label>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          type="number"
                          min={1}
                          value={customKm}
                          onChange={(e) => {
                            setCustomKm(Number(e.target.value || 0));
                            setLocationPref("custom");
                          }}
                          className="w-24 rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-600">km</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        Lower distance → slightly higher rent.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* STEP 4 — Utilities */}
            {step === 4 && (
              <Card>
                <SectionTitle
                  title="Utilities (Home)"
                  subtitle="Estimate your share of home utilities."
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="font-medium">Electricity</div>
                    <div className="mt-3 grid gap-2">
                      {(["included", "share", "full"] as const).map((v) => (
                        <label
                          key={v}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="radio"
                            checked={elecLevel === v}
                            onChange={() => setElecLevel(v)}
                          />
                          {v === "included"
                            ? "Included in rent"
                            : v === "share"
                            ? `Shared (${fmt(
                                cfg.living.homeElectricity * 0.6
                              )}/mo)`
                            : `Pay full (${fmt(
                                cfg.living.homeElectricity
                              )}/mo)`}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Water</div>
                    <div className="mt-3 grid gap-2">
                      {(["included", "share", "full"] as const).map((v) => (
                        <label
                          key={v}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="radio"
                            checked={waterLevel === v}
                            onChange={() => setWaterLevel(v)}
                          />
                          {v === "included"
                            ? "Included in rent"
                            : v === "share"
                            ? `Shared (${fmt(cfg.living.homeWater * 0.6)}/mo)`
                            : `Pay full (${fmt(cfg.living.homeWater)}/mo)`}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Home Internet</div>
                    <div className="mt-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={broadband}
                          onChange={(e) => setBroadband(e.target.checked)}
                        />
                        Include broadband ({fmt(cfg.living.homeInternet)}/mo)
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Phone data plan is counted later in Miscellaneous.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* STEP 5 — Food (exact like screenshot) */}
            {step === 5 && (
              <Card>
                <SectionTitle
                  title="Food"
                  subtitle="How often do you eat out and what type of places?"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm font-medium">
                      How often do you eat out each week?
                    </div>
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
                              className={cn(
                                "px-3 py-2 rounded-xl border text-sm",
                                active
                                  ? "bg-indigo-600 text-white border-transparent"
                                  : "bg-white text-gray-700 border-gray-300"
                              )}
                            >
                              {d}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium">
                      What type of restaurants do you usually visit?
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {(
                        [
                          {
                            key: "budget",
                            label: "Budget · $",
                            img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=800&auto=format&fit=crop",
                          },
                          {
                            key: "moderate",
                            label: "Moderate · $$",
                            img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
                          },
                          {
                            key: "premium",
                            label: "Premium · $$$",
                            img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
                          },
                          {
                            key: "luxury",
                            label: "Luxury · $$$$",
                            img: "https://images.unsplash.com/photo-1559339352-5a1fa1cd58c1?q=80&w=800&auto=format&fit=crop",
                          },
                        ] as const
                      ).map((r) => {
                        const active = restaurantTier === r.key;
                        return (
                          <button
                            key={r.key}
                            type="button"
                            onClick={() => setRestaurantTier(r.key)}
                            className={cn(
                              "rounded-2xl border p-3 text-left",
                              active
                                ? "bg-indigo-50 border-transparent"
                                : "border-gray-300"
                            )}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={r.img}
                              alt={r.label}
                              className="h-24 w-full object-cover rounded-xl mb-3"
                            />
                            <div className="font-semibold">{r.label}</div>
                            <div className="text-xs text-gray-600">
                              ~{fmt(cfg.living.foodCostPerMeal[r.key])} per meal
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* STEP 6 — Transportation (exact like screenshot) */}
            {step === 6 && (
              <Card>
                <SectionTitle
                  title="Transportation"
                  subtitle="What would be your regular modes of commute?"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Walking",
                      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
                      value: walk,
                      set: setWalk,
                    },
                    {
                      title: "Bicycling",
                      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
                      value: bike,
                      set: setBike,
                    },
                    {
                      title: "Public Transportation",
                      img: "https://images.unsplash.com/photo-1557162244-1d9a5a1de126?q=80&w=800&auto=format&fit=crop",
                      value: publicTransport,
                      set: setPublicTransport,
                    },
                    {
                      title: "Uber / Taxi services",
                      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
                      value: uber,
                      set: setUber,
                    },
                  ].map((m) => (
                    <div key={m.title}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.img}
                        alt={m.title}
                        className="h-36 w-full object-cover rounded-xl"
                      />
                      <div className="mt-2 font-medium">{m.title}</div>
                      <FreqPills
                        value={m.value as Frequency}
                        onChange={m.set as any}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* STEP 7 — Misc */}
            {step === 7 && (
              <Card>
                <SectionTitle
                  title="Miscellaneous"
                  subtitle="Set monthly lifestyle ranges."
                />
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Entertainment",
                      img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
                      value: entertainment,
                      set: setEntertainment,
                    },
                    {
                      title: "Clothing",
                      img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop",
                      value: clothing,
                      set: setClothing,
                    },
                    {
                      title: "Mobile plans / Internet (phone)",
                      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
                      value: mobilePlanUse,
                      set: setMobilePlanUse,
                    },
                    {
                      title: "Fitness",
                      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
                      value: fitness,
                      set: setFitness,
                    },
                  ].map((m) => (
                    <div key={m.title}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.img}
                        alt={m.title}
                        className="h-36 w-full object-cover rounded-xl"
                      />
                      <div className="mt-2 font-medium">{m.title}</div>
                      <FreqPills
                        value={m.value as Frequency}
                        onChange={m.set as any}
                      />
                    </div>
                  ))}
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
                className={cn(
                  "px-6 py-3 rounded-xl font-medium text-white",
                  canNext ? "bg-[#7C3AED] hover:opacity-95" : "bg-gray-400"
                )}
              >
                {step === 7 ? "See Result" : "Next →"}
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {isResult && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <SectionTitle title="Cost of living for abroad (Monthly)" />
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
                      <Tooltip formatter={(v: any) => fmt(Number(v))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-gray-600">Accommodation</div>
                    <div className="text-right font-medium">
                      {fmt(costs.accomMonthly)}
                    </div>

                    <div className="text-gray-600">Food</div>
                    <div className="text-right font-medium">
                      {fmt(costs.foodMonthly)}
                    </div>

                    <div className="text-gray-600">Transportation</div>
                    <div className="text-right font-medium">
                      {fmt(costs.transportMonthly)}
                    </div>

                    <div className="text-gray-600">Utilities + Misc</div>
                    <div className="text-right font-medium">
                      {fmt(costs.utilitiesMonthly + costs.miscMonthly)}
                    </div>

                    <div className="col-span-2 border-t my-2" />

                    <div className="text-gray-800">Grand Total (Monthly)</div>
                    <div
                      className="text-right text-lg font-bold"
                      style={{ color: THEME.red }}
                    >
                      {fmt(costs.totalMonthly)}
                    </div>

                    <div className="text-gray-600">≈ per year</div>
                    <div className="text-right font-semibold">
                      {fmt(costs.totalYearly)}
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    City: <b>{city}</b> • Country: <b>{country}</b> •
                    University: <b>{customUniversity || university}</b>. Adjust
                    steps to refine your estimate.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
              >
                Start Over
              </button>

              <a
                href=""
                aria-label="Apply now"
                onClick={() => setShowPopup(true)}
                className="px-4 py-3 rounded-xl font-bold bg-red-600 text-white shadow-lg hover:brightness-105"
              >
                Apply Now
              </a>

              {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
