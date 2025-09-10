// components/tools/TimeZoneConverter.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, RotateCcw, Trash2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** ===== Theme (yours) ===== */
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
};

/** Try to get all IANA zones from the browser; fallback to a useful subset */
const FALLBACK_ZONES = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Hong_Kong",
  "Asia/Seoul",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Moscow",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Sao_Paulo",
  "Africa/Johannesburg",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

const ALL_ZONES: string[] =
  (typeof (Intl as any).supportedValuesOf === "function"
    ? (Intl as any).supportedValuesOf("timeZone")
    : FALLBACK_ZONES) as string[];

/** Build a light "region" picker from the first segment of zones (e.g. Asia, Europe...) */
const REGIONS = Array.from(
  new Set(
    ALL_ZONES.map((z) => z.split("/")[0]).filter(
      (r) => !["Etc", "UTC", "GMT"].includes(r)
    )
  )
).sort();

/** Pretty labels */
function zoneToCityLabel(zone: string) {
  const parts = zone.split("/");
  const city = parts[parts.length - 1]
    .replaceAll("_", " ")
    .replaceAll("-", " ");
  const region = parts[0];
  return { city, region, label: `${city} — ${region}` };
}

/** Extract hour & minute in a time zone from a UTC timestamp */
function getZonedHM(utcMs: number, timeZone: string) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts = fmt.formatToParts(new Date(utcMs));
  const hh = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const mm = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return { hh, mm, minutesOfDay: hh * 60 + mm };
}

/** Get India (Asia/Kolkata) minutes-of-day for a UTC timestamp */
function indiaMinutesOfDay(utcMs: number) {
  return getZonedHM(utcMs, "Asia/Kolkata").minutesOfDay;
}

/**
 * Given a slider value (minutes-of-day in India), return a UTC timestamp that
 * corresponds to *that* time in India (today).
 *
 * We do this by taking "now", reading India's current minutes-of-day, and
 * shifting the UTC timestamp by the delta to the desired slider minutes.
 */
function utcForIndiaMinutesToday(sliderMinutes: number) {
  const now = Date.now();
  const indiaNow = indiaMinutesOfDay(now);
  const delta = sliderMinutes - indiaNow; // minutes
  return now + delta * 60_000;
}

/** Format date-time nicely in a given zone */
function fmtFull(utcMs: number, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(utcMs));
}

/** A tiny searchable list component for zones (no grids/columns used) */
function SearchableSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return options.slice(0, 200);
    return options.filter((z) => z.toLowerCase().includes(s)).slice(0, 200);
  }, [q, options]);

  return (
    <div className="w-full space-y-2">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        style={{ borderColor: THEME.gray, color: THEME.text }}
      />
      <div
        className="max-h-64 overflow-auto rounded-xl border"
        style={{ borderColor: THEME.gray, background: "#fff" }}
      >
        <button
          className={`w-full text-left px-3 py-2 border-b`}
          style={{
            borderColor: THEME.gray,
            color: THEME.text,
            background: value ? "#FAFAFB" : "#fff",
          }}
          onClick={() => onChange("")}
        >
          — Choose —
        </button>
        {filtered.map((z) => {
          const { label } = zoneToCityLabel(z);
          const active = z === value;
          return (
            <button
              key={z}
              className={`w-full text-left px-3 py-2 border-b hover:bg-gray-50`}
              style={{
                borderColor: THEME.gray,
                color: THEME.text,
                background: active ? "rgba(37,99,235,0.08)" : "#fff",
              }}
              onClick={() => onChange(z)}
              title={z}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type CityCard = {
  zone: string;
};

export default function TimeZoneConverter() {
  /** ------- UI state ------- */
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [cityZone, setCityZone] = useState<string>("");
  const [cards, setCards] = useState<CityCard[]>([
    { zone: "Asia/Kolkata" },
    { zone: "Europe/London" },
    { zone: "America/New_York" },
  ]);

  /** slider in minutes-of-day (India) */
  const [sliderMin, setSliderMin] = useState<number>(
    indiaMinutesOfDay(Date.now())
  );

  /** current UTC timestamp for the slider’s Indian time */
  const utcForSlider = useMemo(
    () => utcForIndiaMinutesToday(sliderMin),
    [sliderMin]
  );

  /** Derived lists */
  const regionZones = useMemo(() => {
    if (!regionFilter) return ALL_ZONES;
    return ALL_ZONES.filter((z) => z.startsWith(regionFilter + "/"));
  }, [regionFilter]);

  /** actions */
  const addCity = () => {
    const z = cityZone || (regionZones[0] ?? "");
    if (!z) return;
    if (cards.some((c) => c.zone === z)) return;
    setCards((prev) => [...prev, { zone: z }]);
  };

  const removeCard = (z: string) =>
    setCards((prev) => prev.filter((c) => c.zone !== z));

  const resetAll = () => {
    setCards([{ zone: "Asia/Kolkata" }]);
    setRegionFilter("");
    setCityZone("");
    setSliderMin(indiaMinutesOfDay(Date.now()));
  };

  /** Banner height handling (purely a cosmetic touch) */
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!heroRef.current) return;
  }, []);

  /** Helper text for slider labels */
  const minsToHHMM = (m: number) => {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* HERO banner with gradient only here */}
      <section className="bg-gradient-to-b from-[#002855] to-[#1a1a1a] py-12 sm:py-16 mb-8" ref={heroRef}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-6">
          <div className="text-center text-white space-y-3">
            <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 p-3">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Time Zone Converter
            </h1>
            <p className="text-white/80">
              Set an Indian time (IST) and instantly view the local time across cities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Content: one column, mobile-first; no grids/columns */}
      <section className="pb-16">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls card */}
          <Card
            className="rounded-3xl"
            style={{
              backgroundColor: "#ffffff",
              borderColor: THEME.gray,
              borderWidth: 1,
              boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
            }}
          >
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle
                className="text-xl md:text-[20px] font-semibold"
                style={{ color: THEME.text }}
              >
                Pick City or Filter by Region
              </CardTitle>
              <Button
                variant="ghost"
                onClick={resetAll}
                className="gap-2 text-sm md:text-base"
                style={{ color: THEME.sky }}
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Region "country-like" filter (continents/areas) */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: THEME.text }}>
                  Region (to narrow the list)
                </label>
                <select
                  className="w-full rounded-xl border px-3 py-2"
                  style={{ borderColor: THEME.gray, color: THEME.text, background: "#fff" }}
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <option value="">All Regions</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Searchable time-zone list */}
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: THEME.text }}>
                  Select City (IANA time zone)
                </label>
                <SearchableSelect
                  value={cityZone}
                  onChange={setCityZone}
                  placeholder="Type to search (e.g., London, New_York, Tokyo)"
                  options={regionZones}
                />
              </div>

              {/* Add City button */}
              <div className="flex justify-end">
                <button
                  onClick={addCity}
                  className="px-4 py-2 rounded-xl font-medium"
                  style={{
                    background: "linear-gradient(135deg, #9333EA 0%, #2563EB 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 18px rgba(37,99,235,0.25)",
                  }}
                >
                  Add City
                </button>
              </div>

              {/* Slider (00:00–23:59 hrs in India) */}
              <div className="space-y-2">
                <div
                  className="flex justify-between text-sm"
                  style={{ color: THEME.text }}
                >
                  <span>00:00 hrs (IST)</span>
                  <span>23:59 hrs (IST)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1439}
                  step={1}
                  value={sliderMin}
                  onChange={(e) => setSliderMin(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: THEME.blue }}
                />
                <div
                  className="text-right text-sm font-medium"
                  style={{ color: THEME.text }}
                >
                  Selected IST time: {minsToHHMM(sliderMin)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* City cards list */}
          <div className="space-y-5">
            {cards.map(({ zone }) => {
              const { city, region } = zoneToCityLabel(zone);
              const when = fmtFull(utcForSlider, zone);
              return (
                <div
                  key={zone}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,206,20,1) 0%, rgba(255,230,120,1) 100%)",
                    boxShadow: "0 14px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between px-5 sm:px-8 py-6">
                    <div className="min-w-0">
                      <div
                        className="text-xl sm:text-2xl font-extrabold truncate"
                        style={{ color: "#1f2937" }}
                        title={`${city}, ${region}`}
                      >
                        {city}, {region}
                      </div>
                      <div className="text-sm sm:text-base opacity-80" style={{ color: "#1f2937" }}>
                        {zone}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-lg sm:text-2xl font-extrabold"
                        style={{ color: "#1f2937" }}
                      >
                        {when}
                      </div>
                    </div>
                  </div>

                  {/* footer actions */}
                  <div
                    className="flex items-center justify-end px-5 sm:px-8 py-3"
                    style={{ background: "rgba(255,255,255,0.35)" }}
                  >
                    <button
                      onClick={() => removeCard(zone)}
                      className="inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color: THEME.red }}
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
