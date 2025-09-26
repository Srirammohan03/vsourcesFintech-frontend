import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import qs from "qs";
import { HealthInsurance } from "@/lib/types/OurService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
type CountryKey = string;

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
  const { data, isLoading, isError, error } = useQuery<HealthInsurance>({
    queryKey: ["healthinsurance"],
    queryFn: fetchHealthInasurance,
  });

  const DATA = useMemo(() => {
    if (!data?.countrys || !Array.isArray(data.countrys)) {
      return {}; // ✅ Return empty object instead of undefined
    }

    return data.countrys.reduce((acc, country) => {
      if (!country) return acc; // safety check

      acc[country.name] = {
        short: country.short ?? "",
        currency: country.currency ?? "",
        description: country.description ?? "",
        providersLine: country.providersLine ?? "",
        providers: Array.isArray(country.providers)
          ? country.providers.map((p) => ({
              id: p.providerId,
              name: p.name,
            }))
          : [],
        sections: Array.isArray(country.sections)
          ? country.sections.map((s) => ({
              section: s.section ?? "",
              rows: Array.isArray(s.rows)
                ? s.rows.map((r) => ({
                    name: r.name ?? "",
                    values: Array.isArray(r.values)
                      ? r.values.reduce((vacc, val) => {
                          vacc[val.providerId] = val.value;
                          return vacc;
                        }, {} as Record<string, string>)
                      : {},
                  }))
                : [],
            }))
          : [],
      };

      return acc;
    }, {} as Record<CountryKey, CountryData>);
  }, [data]);

  const countries = useMemo(() => Object?.keys(DATA) as CountryKey[], [DATA]);

  const [country, setCountry] = useState<CountryKey>("United States");

  useEffect(() => {
    if (countries.length > 0 && !countries.includes(country)) {
      setCountry(countries[0]);
    }
  }, [countries, country]);

  const c = DATA[country];

  if (!c) {
    return null; // or some fallback
  }

  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !data) {
    return <CreditCardSkeleton />;
  }

  // Build a nice title tail color
  const highlight = {
    background:
      "linear-gradient(90deg, rgba(124,58,237,1) 0%, rgba(10,156,249,1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as React.CSSProperties;

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
          <div className="text-center flex flex-col items-center">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Select Country
            </label>
            <div className="w-full md:w-96 px-3 py-2 ">
              <Select
                value={country}
                onValueChange={(value) => setCountry(value as CountryKey)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((k) => (
                    <SelectItem key={k} value={k}>
                      {DATA[k].short === "USA" ? "USA" : k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <h2 className="text-xl md:text-3xl font-extrabold">
              Compare and Get the Best Insurance Plans for:{" "}
              <span style={highlight}>{c.short}</span>
            </h2>
            <p className="text-gray-700 sm:max-w-4xl sm:mx-auto tracking-tight text-left sm:text-justify">
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
