// components/tools/WeatherAbroad.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Cloud, RotateCcw, MapPin, Plus, Clock } from "lucide-react";
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

/** ---------- Helpers: Time & Format ---------- */
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function fmtLocal(utcMs: number, timeZone: string) {
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
function minsOfDay(date: Date, tz: string) {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hh = Number(p.find((x) => x.type === "hour")?.value ?? "0");
  const mm = Number(p.find((x) => x.type === "minute")?.value ?? "0");
  return hh * 60 + mm;
}
/** Given IST date-time, compute corresponding UTC ms */
function utcFromIst(ist: Date) {
  // interpret ist as in Asia/Kolkata time. We shift from "now" to desired IST minutes for that date.
  // Simpler: build ISO for IST target hour/min and then use Intl to get offset difference.
  // We’ll approximate by adjusting from current time difference of minutes-of-day.
  const now = Date.now();
  // minutes in IST now
  const istNowMin = minsOfDay(new Date(now), "Asia/Kolkata");
  const targetMin = ist.getHours() * 60 + ist.getMinutes();
  const deltaMin = targetMin - istNowMin;
  // but date might be different day; include difference of calendar days in IST:
  const dNow = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date(now));
  const dSel = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(ist);
  const dayNow = Number(dNow.find((p) => p.type === "day")?.value || "0");
  const monNow = Number(dNow.find((p) => p.type === "month")?.value || "0");
  const yrNow = Number(dNow.find((p) => p.type === "year")?.value || "0");
  const daySel = Number(dSel.find((p) => p.type === "day")?.value || "0");
  const monSel = Number(dSel.find((p) => p.type === "month")?.value || "0");
  const yrSel = Number(dSel.find((p) => p.type === "year")?.value || "0");
  const dateNowIST = new Date(
    `${yrNow}-${pad2(monNow)}-${pad2(dayNow)}T00:00:00Z`
  );
  const dateSelIST = new Date(
    `${yrSel}-${pad2(monSel)}-${pad2(daySel)}T00:00:00Z`
  );
  const dayDiff = Math.round(
    (dateSelIST.getTime() - dateNowIST.getTime()) / 86_400_000
  );
  const totalDeltaMin = deltaMin + dayDiff * 1440;
  return now + totalDeltaMin * 60_000;
}

/** ---------- Weather code → text/icon ---------- */
const WEATHER_TEXT: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle (light)",
  57: "Freezing drizzle (dense)",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain (light)",
  67: "Freezing rain (heavy)",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers (slight)",
  81: "Rain showers (moderate)",
  82: "Rain showers (violent)",
  85: "Snow showers (slight)",
  86: "Snow showers (heavy)",
  95: "Thunderstorm",
  96: "Thunderstorm (slight hail)",
  99: "Thunderstorm (heavy hail)",
};

/** ---------- Types ---------- */
type GeoPlace = {
  id?: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string;
};

type CityCard = {
  place: GeoPlace;
  tz: string; // resolved timezone
  hourly?: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weathercode: number[];
  };
  current?: {
    temperature: number;
    weathercode: number;
  };
};

/** ---------- Component ---------- */
export default function WeatherAbroad() {
  /** Banner padding control (as you asked earlier, you can tweak here) */
  const heroPad = "pt-20 pb-24 px-8 sm:px-12";

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<GeoPlace | null>(null);

  /** IST date & hour */
  const [istString, setIstString] = useState(() => {
    // HTML datetime-local format, default now in IST rounded to next 5 minutes
    const now = new Date();
    // Build IST parts
    const parts = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const y = parts.find((p) => p.type === "year")?.value ?? "2025";
    const m = parts.find((p) => p.type === "month")?.value ?? "01";
    const d = parts.find((p) => p.type === "day")?.value ?? "01";
    const hh = parts.find((p) => p.type === "hour")?.value ?? "00";
    const mm = parts.find((p) => p.type === "minute")?.value ?? "00";
    return `${y}-${m}-${d}T${hh}:${mm}`;
  });

  /** Added cities */
  const [cards, setCards] = useState<CityCard[]>([]);

  /** Fetch suggestions from Open-Meteo geocoding */
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setSuggestions([]);
      return;
    }
    const ctrl = new AbortController();
    (async () => {
      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          q
        )}&count=10&language=en&format=json`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = await res.json();
        const out: GeoPlace[] =
          data?.results?.map((r: any) => ({
            id: r.id,
            name: r.name,
            country: r.country,
            latitude: r.latitude,
            longitude: r.longitude,
            timezone: r.timezone,
          })) ?? [];
        setSuggestions(out);
      } catch (e) {
        /* ignore */
      }
    })();
    return () => ctrl.abort();
  }, [query]);

  /** Add selected city */
  const addCity = async () => {
    const place = selectedPlace;
    if (!place) return;
    if (cards.some((c) => c.place.id === place.id && place.id != null)) return;

    // Fetch forecast; timezone auto; we’ll store hourly for lookups.
    const fUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&hourly=temperature_2m,relative_humidity_2m,weathercode&current_weather=true&timezone=auto`;
    const res = await fetch(fUrl);
    const data = await res.json();

    const tz: string = data?.timezone || place.timezone || "UTC";
    const hourly = data?.hourly ?? undefined;
    const current = data?.current_weather
      ? {
          temperature: data.current_weather.temperature,
          weathercode: data.current_weather.weathercode,
        }
      : undefined;

    setCards((prev) => [
      ...prev,
      {
        place,
        tz,
        hourly,
        current,
      },
    ]);

    // reset UI
    setQuery("");
    setSuggestions([]);
    setSelectedPlace(null);
  };

  const removeCard = (id?: number) =>
    setCards((prev) => prev.filter((c) => c.place.id !== id));

  const resetAll = () => {
    setQuery("");
    setSuggestions([]);
    setSelectedPlace(null);
    setCards([]);
    // reset IST to now
    const now = new Date();
    const parts = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const y = parts.find((p) => p.type === "year")?.value ?? "2025";
    const m = parts.find((p) => p.type === "month")?.value ?? "01";
    const d = parts.find((p) => p.type === "day")?.value ?? "01";
    const hh = parts.find((p) => p.type === "hour")?.value ?? "00";
    const mm = parts.find((p) => p.type === "minute")?.value ?? "00";
    setIstString(`${y}-${m}-${d}T${hh}:${mm}`);
  };

  /** IST Date from input */
  const istDate = useMemo(() => {
    // Note: datetime-local string is interpreted as local.
    // We'll parse to a Date and treat hours/minutes as IST when we convert.
    const [datePart, timePart] = istString.split("T");
    const [Y, M, D] = datePart.split("-").map((s) => Number(s));
    const [h, m] = (timePart || "00:00").split(":").map((s) => Number(s));
    // Keep in local but we'll convert with utcFromIst
    const d = new Date();
    d.setFullYear(Y);
    d.setMonth((M || 1) - 1);
    d.setDate(D || 1);
    d.setHours(h || 0, m || 0, 0, 0);
    return d;
  }, [istString]);

  /** UTC timestamp that corresponds to IST selection */
  const utcTarget = useMemo(() => utcFromIst(istDate), [istDate]);

  /** Get hourly match for a given city's timezone */
  function pickHourlyAt(cardsItem: CityCard) {
    const tz = cardsItem.tz || "UTC";
    // get local Y-M-DTHH:00 string in that tz to match Open-Meteo ISO entries
    const dtf = new Intl.DateTimeFormat("sv-SE", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    });
    const p = dtf.formatToParts(new Date(utcTarget));
    const y = p.find((x) => x.type === "year")?.value ?? "2025";
    const m = p.find((x) => x.type === "month")?.value ?? "01";
    const d = p.find((x) => x.type === "day")?.value ?? "01";
    const hh = p.find((x) => x.type === "hour")?.value ?? "00";
    const isoHour = `${y}-${m}-${d}T${hh}:00`;

    const H = cardsItem.hourly;
    if (!H?.time) return null;
    const idx = H.time.indexOf(isoHour);
    if (idx === -1) return null;
    const temp = H.temperature_2m?.[idx];
    const rh = H.relative_humidity_2m?.[idx];
    const code = H.weathercode?.[idx];
    return {
      isoHour,
      temperature: temp,
      relativeHumidity: rh,
      weathercode: code,
    };
  }

  /** Banner ref for optional measurements */
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white min-h-screen">
      {/* HERO banner with gradient (padding tweakable via heroPad) */}

      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: `url(/assets/images/tools-bg.webp)`,
        }}
        ref={heroRef}
      >
        {/* Dark overlay under content */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center text-white space-y-3">
            <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 p-3">
              <Cloud className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Weather Check (Abroad)
            </h1>
            <p className="text-white/80">
              Search any city worldwide, pick an{" "}
              <span className="font-semibold">IST</span> date & hour, and see
              the local time and weather.
            </p>
          </div>
        </div>
      </section>

      {/* ONE-COLUMN CONTENT (no grids/columns) */}
      <section className="pb-16">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-10 space-y-8">
          {/* Input bar (search + datetime + add) */}
          <div
            className="w-full rounded-[24px] p-5 sm:p-6"
            style={{
              background: "#fff",
              boxShadow:
                "0 10px 35px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
              border: `1px solid ${THEME.gray}`,
            }}
          >
            {/* City search */}
            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                style={{ color: THEME.text }}
              >
                Select City
              </label>
              <div className="relative">
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedPlace(null);
                  }}
                  placeholder="Type city name (e.g., London, New York, Tokyo)"
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                {suggestions.length > 0 && (
                  <div
                    className="absolute z-10 left-0 right-0 mt-2 max-h-64 overflow-auto rounded-xl border bg-white"
                    style={{ borderColor: THEME.gray }}
                  >
                    {suggestions.map((s) => (
                      <button
                        key={s.id ?? `${s.name}-${s.latitude}-${s.longitude}`}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50"
                        style={{
                          color: THEME.text,
                          borderBottom: `1px solid ${THEME.gray}`,
                        }}
                        onClick={() => {
                          setSelectedPlace(s);
                          setQuery(`${s.name}, ${s.country}`);
                          setSuggestions([]);
                        }}
                        title={`${s.name}, ${s.country}`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 opacity-70" />
                          <span className="font-medium">{s.name}</span>
                          <span className="opacity-70">— {s.country}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* IST Date & Hour */}
            <div className="space-y-2 mt-6">
              <label
                className="text-sm font-medium"
                style={{ color: THEME.text }}
              >
                Select Date & Hour (IST)
              </label>
              <div className="relative">
                <Input
                  type="datetime-local"
                  value={istString}
                  onChange={(e) => setIstString(e.target.value)}
                  style={{ borderColor: THEME.gray, color: THEME.text }}
                />
                <Clock className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 opacity-60" />
              </div>
            </div>

            {/* Add City button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={addCity}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium"
                style={{
                  background:
                    "linear-gradient(135deg, #9333EA 0%, #2563EB 100%)",
                  color: "#fff",
                  boxShadow: "0 8px 18px rgba(37,99,235,0.25)",
                }}
                title="Add City"
              >
                <span>Add City</span>
                <Plus className="h-4 w-4" />
              </button>
              <Button
                variant="ghost"
                onClick={resetAll}
                className="ml-3 gap-2"
                style={{ color: THEME.sky }}
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          {/* Weather cards list (one column) */}
          <div className="space-y-5">
            {cards.length === 0 ? (
              <Card
                className="rounded-2xl"
                style={{
                  borderColor: THEME.gray,
                  borderWidth: 1,
                  backgroundColor: "#fff",
                }}
              >
                <CardContent className="py-8 text-center text-gray-500">
                  Add a city to view weather.
                </CardContent>
              </Card>
            ) : (
              cards.map((c) => {
                const localWhen = fmtLocal(utcTarget, c.tz || "UTC");
                const h = pickHourlyAt(c);
                const temp =
                  h?.temperature ?? c.current?.temperature ?? undefined;
                const code =
                  h?.weathercode ?? c.current?.weathercode ?? undefined;
                const label =
                  code != null ? WEATHER_TEXT[code] ?? "Weather" : "Weather";
                return (
                  <div
                    key={
                      c.place.id ??
                      `${c.place.name}-${c.place.latitude}-${c.place.longitude}`
                    }
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,206,20,1) 0%, rgba(255,230,120,1) 100%)",
                      boxShadow: "0 14px 32px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div className="px-5 sm:px-8 py-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div
                            className="text-xl sm:text-2xl font-extrabold truncate"
                            style={{ color: "#1f2937" }}
                            title={`${c.place.name}, ${c.place.country}`}
                          >
                            {c.place.name}, {c.place.country}
                          </div>
                          <div
                            className="text-sm opacity-80"
                            style={{ color: "#1f2937" }}
                          >
                            {c.tz}
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className="text-lg sm:text-2xl font-extrabold"
                            style={{ color: "#1f2937" }}
                          >
                            {localWhen}
                          </div>
                          <div
                            className="text-sm opacity-80"
                            style={{ color: "#1f2937" }}
                          >
                            IST → Local
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cloud
                            className="h-5 w-5"
                            style={{ color: "#1f2937" }}
                          />
                          <span
                            className="font-medium"
                            style={{ color: "#1f2937" }}
                          >
                            {label}
                          </span>
                        </div>
                        <div className="text-right">
                          {temp != null ? (
                            <div
                              className="text-xl font-bold"
                              style={{ color: "#1f2937" }}
                            >
                              {Math.round(temp)}°C
                            </div>
                          ) : (
                            <div
                              className="text-sm opacity-70"
                              style={{ color: "#1f2937" }}
                            >
                              — °C
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-center justify-end px-5 sm:px-8 py-3"
                      style={{ background: "rgba(255,255,255,0.35)" }}
                    >
                      <button
                        className="text-sm font-medium"
                        style={{ color: THEME.red }}
                        onClick={() => removeCard(c.place.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
