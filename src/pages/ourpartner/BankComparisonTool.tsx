// components/tools/BankComparisonTool.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Calculator, RotateCcw, CheckSquare, Edit3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* THEME */
const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
};

type BankKey =
  | "credila"
  | "auxilo"
  | "avanse"
  | "incred"
  | "mpower"
  | "prodigy"
  | "idfc"
  | "axis";

type BankRow = {
  key: BankKey;
  name: string;
  income: string;
  quantum: string;
  fundingMargin: string;
  roi: string;
};

/* Update logo paths to your assets */
const LOGOS: Record<BankKey, string> = {
  credila: "/assets/images/credila.gif",
  auxilo: "/assets/images/auxilo.png",
  avanse: "/assets/images/avanse.png",
  incred: "/assets/images/incred.png",
  mpower: "/assets/images/mpower.png",
  prodigy: "/assets/images/prodigy.png",
  idfc: "/assets/images/idfc.png",
  axis: "/assets/images/axis.png",
};

const DEFAULT_DATA: Record<BankKey, BankRow> = {
  credila: {
    key: "credila",
    name: "Credila",
    income: "₹25k+/month (co-applicant)",
    quantum: "Up to ₹1.5 Cr",
    fundingMargin: "90%–100% coverage (profile based)",
    roi: "10.5% – 13.5% p.a.",
  },
  auxilo: {
    key: "auxilo",
    name: "Auxilo",
    income: "₹25k+/month (co-applicant)",
    quantum: "Up to ₹1.5 Cr",
    fundingMargin: "Up to 100% including living costs",
    roi: "10.0% – 14.0% p.a.",
  },
  avanse: {
    key: "avanse",
    name: "Avanse",
    income: "₹20k+/month (co-applicant)",
    quantum: "Up to ₹1.5 Cr",
    fundingMargin: "Up to 100% incl. tuition + living",
    roi: "10.2% – 14.0% p.a.",
  },
  incred: {
    key: "incred",
    name: "InCred Finance",
    income: "₹25k+/month (co-applicant)",
    quantum: "Up to ₹1.0–1.5 Cr",
    fundingMargin: "Up to 100% (program dependent)",
    roi: "10.5% – 15.5% p.a.",
  },
  mpower: {
    key: "mpower",
    name: "MPOWER Financing",
    income: "No co-signer (international)",
    quantum: "Up to full cost of attendance (caps apply)",
    fundingMargin: "Up to 100% (school & program rules)",
    roi: "11% – 16% p.a. (variable, USD)",
  },
  prodigy: {
    key: "prodigy",
    name: "Prodigy Finance",
    income: "No co-signer (international)",
    quantum: "Up to 100% cost of attendance",
    fundingMargin: "Up to 100% (school list based)",
    roi: "11% – 16% p.a. (variable, USD)",
  },
  idfc: {
    key: "idfc",
    name: "IDFC FIRST Bank",
    income: "₹25k+/month (co-applicant)",
    quantum: "Up to ₹1.5 Cr",
    fundingMargin: "Up to 95%–100% (profile based)",
    roi: "9.5% – 13.5% p.a.",
  },
  axis: {
    key: "axis",
    name: "Axis Bank",
    income: "₹25k+/month (co-applicant)",
    quantum: "Up to ₹1.5 Cr",
    fundingMargin: "Up to 90%–100% (profile based)",
    roi: "10.0% – 14.5% p.a.",
  },
};

export default function BankComparisonTool() {
  const [data, setData] = useState<Record<BankKey, BankRow>>(DEFAULT_DATA);
  const [selected, setSelected] = useState<Record<BankKey, boolean>>({
    credila: true,
    auxilo: true,
    avanse: true,
    incred: false,
    mpower: false,
    prodigy: false,
    idfc: true,
    axis: true,
  });
  const [editing, setEditing] = useState(false);

  const selectedRows = useMemo(
    () =>
      (Object.keys(selected) as BankKey[])
        .filter((k) => selected[k])
        .map((k) => data[k]),
    [selected, data]
  );

  const toggle = (k: BankKey) => setSelected((s) => ({ ...s, [k]: !s[k] }));

  const selectAll = () =>
    setSelected({
      credila: true,
      auxilo: true,
      avanse: true,
      incred: true,
      mpower: true,
      prodigy: true,
      idfc: true,
      axis: true,
    });

  const clearAll = () =>
    setSelected({
      credila: false,
      auxilo: false,
      avanse: false,
      incred: false,
      mpower: false,
      prodigy: false,
      idfc: false,
      axis: false,
    });

  const resetAll = () => {
    setData(DEFAULT_DATA);
    setSelected({
      credila: true,
      auxilo: true,
      avanse: true,
      incred: false,
      mpower: false,
      prodigy: false,
      idfc: true,
      axis: true,
    });
    setEditing(false);
  };

  const onCellChange = (k: BankKey, field: keyof BankRow, value: string) => {
    setData((d) => ({ ...d, [k]: { ...d[k], [field]: value } }));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* HERO with gradient banner */}
      <section
        className="relative pt-32 pb-16 lg:pt-32 lg:pb-24 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: `url(/assets/images/tools-bg.webp)`,
        }}
      >
        {/* Dark overlay under content */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content above overlay */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
          <div className="text-center text-white space-y-3">
            <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 p-3">
              <Calculator className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              Bank Comparison Tool
            </h1>
            <p className="text-white/80">
              Choose banks and compare income criteria, quantum, funding &amp;
              margin, and interest.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <div className="w-full max-w-[1400px] mx-auto px-6 space-y-8">
          {/* Row 1: Selector */}
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
                Choose Banks to Compare
              </CardTitle>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing((e) => !e)}
                  className="px-3 py-1.5 rounded-xl text-sm border flex items-center gap-1"
                  style={{
                    borderColor: THEME.gray,
                    color: THEME.text,
                    background: "#fff",
                  }}
                  title="Toggle Edit"
                >
                  <Edit3 className="h-4 w-4" />
                  {editing ? "Done" : "Edit"}
                </button>
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
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={selectAll}
                  className="px-3 py-1.5 rounded-xl text-xs border"
                  style={{
                    borderColor: THEME.gray,
                    color: THEME.text,
                    background: "#fff",
                  }}
                >
                  Select All
                </button>
                <button
                  onClick={clearAll}
                  className="px-3 py-1.5 rounded-xl text-xs border"
                  style={{
                    borderColor: THEME.gray,
                    color: THEME.text,
                    background: "#fff",
                  }}
                >
                  Clear
                </button>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: THEME.text }}
                >
                  <CheckSquare className="h-4 w-4" />
                  Tick one or more banks below.
                </div>
              </div>

              {/* Bank checkboxes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {(Object.keys(data) as BankKey[]).map((k) => {
                  const isOn = !!selected[k];
                  return (
                    <label
                      key={k}
                      className="rounded-2xl border px-4 py-3 cursor-pointer select-none transition-all"
                      style={{
                        borderColor: isOn ? THEME.red : THEME.gray,
                        background: isOn ? "rgba(227,0,15,0.06)" : "#fff",
                        boxShadow: isOn
                          ? "0 6px 14px rgba(227,0,15,0.15)"
                          : "none",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={LOGOS[k]}
                            alt={data[k].name}
                            className="h-5 w-auto object-contain shrink-0"
                          />
                          <span
                            className="font-medium truncate"
                            style={{ color: THEME.text }}
                          >
                            {data[k].name}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isOn}
                          onChange={() => toggle(k)}
                          className="h-4 w-4"
                          style={{ accentColor: THEME.red }}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Row 2: Comparison */}
          <Card
            className="rounded-3xl"
            style={{
              borderColor: THEME.gray,
              borderWidth: 1,
              boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
              backgroundColor: "#fff",
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle
                className="text-base md:text-lg font-semibold"
                style={{ color: THEME.text }}
              >
                Comparison
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              {/* Empty state (shared) */}
              {selectedRows.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-500">
                  Select banks to compare.
                </div>
              ) : (
                <>
                  {/* DESKTOP/TABLE: unchanged */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr
                          className="text-left text-white"
                          style={{
                            background: `linear-gradient(135deg, ${THEME.blue} 0%, ${THEME.sky} 40%, ${THEME.red} 100%)`,
                          }}
                        >
                          {[
                            "Bank Name",
                            "Income",
                            "Quantum of Finance",
                            "Funding & Margin",
                            "Rate of Interest",
                          ].map((h) => (
                            <th
                              key={h}
                              className="py-3 px-4 whitespace-nowrap"
                              style={{
                                borderRight: "1px solid rgba(255,255,255,0.15)",
                              }}
                            >
                              <span className="font-semibold tracking-wide">
                                {h}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRows.map((row, idx) => {
                          const stripe = idx % 2 === 0 ? "#fff" : "#FAFBFC";
                          return (
                            <tr key={row.key} style={{ background: stripe }}>
                              <td
                                className="py-3 px-4 border-t"
                                style={{ borderColor: THEME.gray }}
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={LOGOS[row.key]}
                                    alt={row.name}
                                    className="h-5 w-auto object-contain"
                                  />
                                  {editing ? (
                                    <Input
                                      value={row.name}
                                      onChange={(e) =>
                                        onCellChange(
                                          row.key,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                    />
                                  ) : (
                                    <span className="font-medium">
                                      {row.name}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td
                                className="py-3 px-4 border-t"
                                style={{ borderColor: THEME.gray }}
                              >
                                {editing ? (
                                  <Input
                                    value={row.income}
                                    onChange={(e) =>
                                      onCellChange(
                                        row.key,
                                        "income",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  row.income
                                )}
                              </td>
                              <td
                                className="py-3 px-4 border-t"
                                style={{ borderColor: THEME.gray }}
                              >
                                {editing ? (
                                  <Input
                                    value={row.quantum}
                                    onChange={(e) =>
                                      onCellChange(
                                        row.key,
                                        "quantum",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  row.quantum
                                )}
                              </td>
                              <td
                                className="py-3 px-4 border-t"
                                style={{ borderColor: THEME.gray }}
                              >
                                {editing ? (
                                  <Input
                                    value={row.fundingMargin}
                                    onChange={(e) =>
                                      onCellChange(
                                        row.key,
                                        "fundingMargin",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  row.fundingMargin
                                )}
                              </td>
                              <td
                                className="py-3 px-4 border-t"
                                style={{ borderColor: THEME.gray }}
                              >
                                {editing ? (
                                  <Input
                                    value={row.roi}
                                    onChange={(e) =>
                                      onCellChange(
                                        row.key,
                                        "roi",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  row.roi
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE/CARDS: new */}
                  <div className="md:hidden px-4 pb-6 space-y-4">
                    {selectedRows.map((row) => (
                      <div
                        key={row.key}
                        className="rounded-2xl border p-4 shadow-sm"
                        style={{ borderColor: THEME.gray, background: "#fff" }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={LOGOS[row.key]}
                              alt={row.name}
                              className="h-5 w-auto object-contain shrink-0"
                            />
                            {editing ? (
                              <Input
                                className="h-8"
                                value={row.name}
                                onChange={(e) =>
                                  onCellChange(row.key, "name", e.target.value)
                                }
                              />
                            ) : (
                              <h3
                                className="font-semibold truncate"
                                style={{ color: THEME.text }}
                              >
                                {row.name}
                              </h3>
                            )}
                          </div>

                          {/* ROI pill */}
                          <div
                            className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                            style={{
                              background: "rgba(37,99,235,0.08)",
                              color: THEME.blue,
                              border: "1px solid rgba(37,99,235,0.15)",
                            }}
                          >
                            {editing ? (
                              <Input
                                className="h-7 w-[140px] text-xs"
                                value={row.roi}
                                onChange={(e) =>
                                  onCellChange(row.key, "roi", e.target.value)
                                }
                              />
                            ) : (
                              row.roi
                            )}
                          </div>
                        </div>

                        {/* Body fields */}
                        <div className="mt-4 grid grid-cols-1 gap-3">
                          {/* Income */}
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-xs text-gray-500">
                              Income
                            </span>
                            <div className="text-sm text-right max-w-[60%]">
                              {editing ? (
                                <Input
                                  value={row.income}
                                  onChange={(e) =>
                                    onCellChange(
                                      row.key,
                                      "income",
                                      e.target.value
                                    )
                                  }
                                  className="h-8"
                                />
                              ) : (
                                row.income
                              )}
                            </div>
                          </div>

                          {/* Quantum */}
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-xs text-gray-500">
                              Quantum of Finance
                            </span>
                            <div className="text-sm text-right max-w-[60%]">
                              {editing ? (
                                <Input
                                  value={row.quantum}
                                  onChange={(e) =>
                                    onCellChange(
                                      row.key,
                                      "quantum",
                                      e.target.value
                                    )
                                  }
                                  className="h-8"
                                />
                              ) : (
                                row.quantum
                              )}
                            </div>
                          </div>

                          {/* Funding & Margin */}
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-xs text-gray-500">
                              Funding &amp; Margin
                            </span>
                            <div className="text-sm text-right max-w-[60%]">
                              {editing ? (
                                <Input
                                  value={row.fundingMargin}
                                  onChange={(e) =>
                                    onCellChange(
                                      row.key,
                                      "fundingMargin",
                                      e.target.value
                                    )
                                  }
                                  className="h-8"
                                />
                              ) : (
                                row.fundingMargin
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
