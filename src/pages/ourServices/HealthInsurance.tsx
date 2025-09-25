"use client";
import axios from "axios";
import React, { useMemo, useState } from "react";
import qs from "qs";
import { HealthInsurance } from "@/lib/types/OurService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
const query = qs.stringify({
  populate: {
    our_services: {
      on: {
        "fintech.insurance": {
          populate: {
            background_image: { fields: ["url", "name", "documentId"] },
            countrys: {
              populate: {
                providers: true,
                sections: {
                  populate: {
                    rows: {
                      populate: {
                        values: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
};
type CountryKey =
  | "United States"
  | "United Kingdom"
  | "Canada"
  | "France"
  | "Ireland"
  | "Australia"
  | "Germany"
  | "Other";

type Provider = {
  id: string; // slug
  name: string;
  // Optional real logo URL. If omitted, we render a clean monogram badge.
  logoUrl?: string;
};

type FeatureRow = {
  name: string;
  values: Record<string, string>; // key by provider.id
};

type FeatureSection = {
  section: string;
  rows: FeatureRow[];
};

type CountryData = {
  short: string; // short label for UI (USA, UK, etc.)
  currency: string; // "$", "£", "C$", "€", "A$"
  description: string;
  providersLine: string; // a sentence under description
  providers: Provider[];
  sections: FeatureSection[];
};
const cn = (...xs: (string | false | null | undefined)[]) =>
  xs.filter(Boolean).join(" ");

const Badge: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={cn(
      "rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);

const SectionCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div
    className={cn(
      "rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-5 md:p-7",
      className
    )}
    {...rest}
  >
    {children}
  </div>
);
const MonogramLogo: React.FC<{ name: string }> = ({ name }) => {
  const parts = name.split(" ");
  const mono =
    parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  return (
    <div
      className="h-12 w-28 md:h-14 md:w-32 rounded-xl grid place-items-center font-semibold text-white"
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,1) 0%, rgba(167,139,250,1) 100%)",
      }}
      aria-label={name}
      title={name}
    >
      {mono}
    </div>
  );
};

const LogoBadge: React.FC<{ provider: Provider }> = ({ provider }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Badge className="!p-3">
        {provider.logoUrl ? (
          <img
            src={provider.logoUrl}
            alt={provider.name}
            className="h-12 w-28 md:h-14 md:w-32 object-contain"
          />
        ) : (
          <MonogramLogo name={provider.name} />
        )}
      </Badge>
      <div className="text-xs md:text-sm text-gray-700 text-center max-w-[8rem]">
        {provider.name}
      </div>
    </div>
  );
};
const DATA: Record<CountryKey, CountryData> = {
  "United States": {
    short: "USA",
    currency: "$",
    description:
      "Health insurance in the U.S. is essential due to the high cost of medical services. International students mandatorily require either private insurance or university-sponsored plans. Coverage must meet the criteria of university and visa requirements. At vsource, we understand that studying abroad is not an easy journey. Having the right insurance can help you provide the safety and protection without thinking about finances. Our insurance team helps students find the most affordable and customised plans that suit the needs of individual student. We compare different options from reliable and trusted companies, so that every student can get the best deal without searching multiple options themselves and can focus on their studies.",
    providersLine:
      "Insurance Providers – Tata AIG, Bajaj Allianz, Niva Bupa, HDFC ERGO, Royal Sundaram, Star Health",
    providers: [
      { id: "tataaig", name: "Tata AIG" },
      { id: "bajaj", name: "Bajaj Allianz" },
      { id: "nivabupa", name: "Niva Bupa" },
      { id: "hdfc", name: "HDFC ERGO" },
      { id: "royal", name: "Royal Sundaram" },
      { id: "star", name: "Star Health" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Repatriation",
            values: {
              tataaig: "Included under Medical Expenses",
              bajaj: "Included under medical expenses",
              nivabupa: "Up to $2,500",
              hdfc: "Included under Medical Expenses",
              royal: "Up to $2,500",
              star: "Included under Medical Expenses",
            },
          },
          {
            name: "Medical Evacuation",
            values: {
              tataaig: "Up to $50,000",
              bajaj: "Up to $75,000",
              nivabupa: "Up to $100,000",
              hdfc: "Up to $75,000",
              royal: "Up to $50,000",
              star: "Up to $100,000",
            },
          },
          {
            name: "Dental Treatment",
            values: {
              tataaig: "Included up to $1,000",
              bajaj: "Optional Rider",
              nivabupa: "Up to $500",
              hdfc: "Up to $750",
              royal: "Included up to $1,000",
              star: "Optional Rider",
            },
          },
        ],
      },
      {
        section: "Personal Protection",
        rows: [
          {
            name: "Accidental Death & Dismemberment",
            values: {
              tataaig: "Up to $20,000",
              bajaj: "Up to $25,000",
              nivabupa: "Up to $25,000",
              hdfc: "Up to $20,000",
              royal: "Up to $15,000",
              star: "Up to $25,000",
            },
          },
          {
            name: "Baggage Loss",
            values: {
              tataaig: "Up to $1,000",
              bajaj: "Up to $1,200",
              nivabupa: "Up to $800",
              hdfc: "Up to $1,000",
              royal: "Up to $1,500",
              star: "Up to $1,200",
            },
          },
          {
            name: "Study Interruption",
            values: {
              tataaig: "Up to $5,000",
              bajaj: "Up to $7,500",
              nivabupa: "Up to $10,000",
              hdfc: "Up to $7,500",
              royal: "Up to $5,000",
              star: "Up to $10,000",
            },
          },
        ],
      },
    ],
  },

  "United Kingdom": {
    short: "UK",
    currency: "£",
    description:
      "In the UK, most international students pay the Immigration Health Surcharge (IHS) to access the NHS. Many still choose private insurance for faster access to specialists, dental/optical cover, or travel-related benefits.",
    providersLine:
      "Insurance Providers – AXA, Aviva, Bupa, Endsleigh, Allianz Assistance",
    providers: [
      { id: "axa", name: "AXA" },
      { id: "aviva", name: "Aviva" },
      { id: "bupa", name: "Bupa" },
      { id: "endsleigh", name: "Endsleigh" },
      { id: "allianzassist", name: "Allianz Assistance" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Repatriation",
            values: {
              axa: "Included under medical benefits",
              aviva: "Included",
              bupa: "Up to £2,000",
              endsleigh: "Included",
              allianzassist: "Up to £2,500",
            },
          },
          {
            name: "Medical Evacuation",
            values: {
              axa: "Up to £75,000",
              aviva: "Up to £50,000",
              bupa: "Up to £100,000",
              endsleigh: "Up to £60,000",
              allianzassist: "Up to £100,000",
            },
          },
        ],
      },
    ],
  },

  Canada: {
    short: "Canada",
    currency: "C$",
    description:
      "Canada requires proof of medical insurance for many study permits and provinces. Students often use provincial plans where eligible and add private coverage for gaps, travel and dental.",
    providersLine:
      "Insurance Providers – Manulife, Guard.me, Sun Life, Blue Cross, Allianz",
    providers: [
      { id: "manulife", name: "Manulife" },
      { id: "guardme", name: "Guard.me" },
      { id: "sunlife", name: "Sun Life" },
      { id: "bluecross", name: "Blue Cross" },
      { id: "allianz", name: "Allianz" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Repatriation",
            values: {
              manulife: "Included",
              guardme: "Included",
              sunlife: "C$2,000",
              bluecross: "Included",
              allianz: "C$2,500",
            },
          },
          {
            name: "Medical Evacuation",
            values: {
              manulife: "C$75,000",
              guardme: "C$100,000",
              sunlife: "C$60,000",
              bluecross: "C$75,000",
              allianz: "C$100,000",
            },
          },
        ],
      },
    ],
  },

  France: {
    short: "France",
    currency: "€",
    description:
      "Many students enroll in the French social security system (Assurance Maladie). Complementary private insurance covers co-pays, repatriation and travel protection.",
    providersLine: "Insurance Providers – ACS, APRIL, Allianz, AXA, CHAPKA",
    providers: [
      { id: "acs", name: "ACS" },
      { id: "april", name: "APRIL" },
      { id: "allianzfr", name: "Allianz" },
      { id: "axafr", name: "AXA" },
      { id: "chapka", name: "CHAPKA" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Repatriation",
            values: {
              acs: "Included",
              april: "Included",
              allianzfr: "€2,000",
              axafr: "Included",
              chapka: "€2,500",
            },
          },
          {
            name: "Medical Evacuation",
            values: {
              acs: "€60,000",
              april: "€75,000",
              allianzfr: "€100,000",
              axafr: "€60,000",
              chapka: "€100,000",
            },
          },
        ],
      },
    ],
  },

  Ireland: {
    short: "Ireland",
    currency: "€",
    description:
      "Non-EU students must have private medical insurance when studying in Ireland. Many pick policies that include GP visits, hospital care, and travel coverage.",
    providersLine:
      "Insurance Providers – VHI, Irish Life Health, Laya Healthcare, AXA",
    providers: [
      { id: "vhi", name: "VHI" },
      { id: "irishlife", name: "Irish Life Health" },
      { id: "laya", name: "Laya Healthcare" },
      { id: "axaire", name: "AXA" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Repatriation",
            values: {
              vhi: "Included",
              irishlife: "Included",
              laya: "€2,000",
              axaire: "€2,500",
            },
          },
          {
            name: "Medical Evacuation",
            values: {
              vhi: "€50,000",
              irishlife: "€75,000",
              laya: "€100,000",
              axaire: "€75,000",
            },
          },
        ],
      },
    ],
  },

  Australia: {
    short: "Australia",
    currency: "A$",
    description:
      "Overseas Student Health Cover (OSHC) is mandatory for student visas. Popular OSHC providers include Allianz Care, Medibank, nib, Bupa and ahm.",
    providersLine:
      "Insurance Providers – Allianz Care, ahm, nib, Medibank, Bupa",
    providers: [
      { id: "allianzcare", name: "Allianz Care" },
      { id: "ahm", name: "ahm OSHC" },
      { id: "nib", name: "nib OSHC" },
      { id: "medibank", name: "Medibank" },
      { id: "bupau", name: "Bupa" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Student Health Cover",
            values: {
              allianzcare: "Hospital + GP + Ambulance",
              ahm: "Hospital + Extras",
              nib: "Hospital + GP",
              medibank: "Hospital + GP + Dental (basic)",
              bupau: "Hospital + GP",
            },
          },
          {
            name: "Repatriation",
            values: {
              allianzcare: "Included",
              ahm: "Included",
              nib: "A$2,000",
              medibank: "Included",
              bupau: "A$2,500",
            },
          },
        ],
      },
    ],
  },

  Germany: {
    short: "Germany",
    currency: "€",
    description:
      "Germany offers statutory (public) and private insurance. Students commonly choose TK/AOK (public) or EDUCARE24/MAWISTA/DR-WALTER (private travel) for gap and travel protection.",
    providersLine:
      "Insurance Providers – TK, AOK, MAWISTA, DR-WALTER, HanseMerkur",
    providers: [
      { id: "tk", name: "TK" },
      { id: "aok", name: "AOK" },
      { id: "mawista", name: "MAWISTA" },
      { id: "drwalter", name: "DR-WALTER" },
      { id: "hanse", name: "HanseMerkur" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Repatriation",
            values: {
              tk: "Included",
              aok: "Included",
              mawista: "€2,000",
              drwalter: "Included",
              hanse: "€2,500",
            },
          },
          {
            name: "Medical Evacuation",
            values: {
              tk: "€75,000",
              aok: "€60,000",
              mawista: "€100,000",
              drwalter: "€75,000",
              hanse: "€100,000",
            },
          },
        ],
      },
    ],
  },

  Other: {
    short: "Other",
    currency: "$",
    description:
      "Compare international student insurance options. Benefits typically include medical treatment, evacuation, repatriation, and travel-related protections like baggage or study interruption.",
    providersLine:
      "Insurance Providers – Allianz, AXA, Aetna International, Cigna, IMG",
    providers: [
      { id: "allianzglobal", name: "Allianz" },
      { id: "axaintl", name: "AXA" },
      { id: "aetna", name: "Aetna International" },
      { id: "cigna", name: "Cigna" },
      { id: "img", name: "IMG" },
    ],
    sections: [
      {
        section: "Student Essentials",
        rows: [
          {
            name: "Repatriation",
            values: {
              allianzglobal: "Included",
              axaintl: "Included",
              aetna: "$2,000",
              cigna: "Included",
              img: "$2,500",
            } as any,
          },
        ],
      },
    ],
  },
};

/* =========================
   ACCORDION
   ========================= */
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" />
  </svg>
);

const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14" stroke="white" strokeWidth="2" />
  </svg>
);

const Accordion: React.FC<{
  title: string;
  open?: boolean;
  onToggle?: () => void;
}> = ({ title, open, onToggle, children }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <button
          onClick={onToggle}
          className="h-10 w-10 rounded-xl grid place-items-center"
          style={{ background: THEME.blue }}
          aria-label={open ? "Collapse" : "Expand"}
        >
          {open ? <MinusIcon /> : <PlusIcon />}
        </button>
      </div>
      {open && <div className="px-2 sm:px-4 pb-4">{children}</div>}
    </div>
  );
};

/* =========================
   GRID TABLE FOR FEATURES
   ========================= */
const FeatureGrid: React.FC<{
  providers: Provider[];
  rows: FeatureRow[];
}> = ({ providers, rows }) => {
  // first column (feature name) + N providers
  const cols = providers.length + 1;
  return (
    <div className="overflow-auto">
      {/* Header with provider logos */}
      <div
        className="min-w-[720px] grid gap-3 items-end"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(140px, 1fr))` }}
      >
        <div className="text-sm font-medium text-gray-600 px-3 py-2">
          Feature
        </div>
        {providers.map((p) => (
          <div key={p.id} className="flex justify-center">
            <LogoBadge provider={p} />
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((r) => (
        <div
          key={r.name}
          className="min-w-[720px] mt-4 grid gap-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(140px, 1fr))` }}
        >
          <div className="px-3 py-3 rounded-xl bg-gray-50 text-sm font-medium text-[#1e3a8a]">
            {r.name}
          </div>
          {providers.map((p) => (
            <div
              key={p.id}
              className="px-3 py-3 rounded-xl bg-gray-50 text-sm text-[#2563eb] font-medium text-center"
            >
              {r.values[p.id] ?? "—"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
const fetchHealthInasurance = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CMS_GLOBALURL}/api/our-service?${query}`
  );
  return data?.data?.our_services[0] || {};
};
/* =========================
   MAIN PAGE
   ========================= */
export default function HealthInasurance() {
  const countries = Object.keys(DATA) as CountryKey[];
  const [country, setCountry] = useState<CountryKey>("United States");

  const c = DATA[country];

  // Build a nice title tail color
  const highlight = {
    background:
      "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(10,156,249,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as React.CSSProperties;
  const { data, isLoading, isError, error } = useQuery<HealthInsurance>({
    queryKey: ["healthinsurance"],
    queryFn: fetchHealthInasurance,
  });
  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !data) {
    return <CreditCardSkeleton />;
  }
  return (
    <div
      className="min-h-screen"
      style={{ background: THEME.surface, color: THEME.text }}
    >
      {/* HERO */}
      <section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-36">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: `url(${
              data?.background_image?.url ||
              "/assets/images/ourservices-img.jpg"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black/70 md:bg-black/50" />
        </div>
        <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center md:items-start justify-center text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-white max-w-3xl">
            {data?.heading || "Health Insurance Compare"}
          </h1>
          <p className="text-white/90 mt-3 max-w-2xl">
            {data?.description ||
              "Pick a country to see student-friendly providers and benefit comparisons. Built for fast scanning and mobile-first browsing."}
          </p>
        </div>
      </section>

      {/* COMPARE SECTION */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-10 sm:px-6 lg:px-8 ">
        <SectionCard className="space-y-8">
          {/* Country dropdown */}
          <div className="text-center">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Select Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryKey)}
              className="w-full md:w-96 rounded-xl border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {countries.map((k) => (
                <option key={k} value={k}>
                  {DATA[k].short === "USA" ? "USA" : k}
                </option>
              ))}
            </select>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h2 className="text-xl md:text-3xl font-extrabold">
              Compare and Get the Best Insurance Plans for:{" "}
              <span style={highlight}>{c.short}</span>
            </h2>
            <p className="text-gray-700 leading-7 max-w-4xl mx-auto">
              {c.description}
            </p>
            <p className="text-sm md:text-base font-medium text-gray-800">
              {c.providersLine}
            </p>
          </div>

          {/* Comparison Table Title */}
          <div className="text-center">
            <h3 className="text-lg md:text-2xl font-extrabold">
              Insurance{" "}
              <span
                style={{
                  ...highlight,
                }}
              >
                Comparison Table
              </span>
            </h3>
          </div>

          {/* Accordion list */}
          <div className="space-y-5">
            {c.sections.map((section, idx) => (
              <AccordionSection
                key={section.section}
                providers={c.providers}
                title={section.section}
                rows={section.rows}
                defaultOpen={idx === 0}
              />
            ))}
          </div>

          {/* Footnote */}
          <p className="text-xs text-gray-500">
            * All figures are sample values for UI demonstration and can vary by
            plan, age, and coverage selections. Always review the official
            policy wording before purchase.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}

/* =========================
   Accordion wrapper per section
   ========================= */
const AccordionSection: React.FC<{
  title: string;
  providers: Provider[];
  rows: FeatureRow[];
  defaultOpen?: boolean;
}> = ({ title, providers, rows, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <Accordion title={title} open={open} onToggle={() => setOpen((o) => !o)}>
      <FeatureGrid providers={providers} rows={rows} />
    </Accordion>
  );
};
