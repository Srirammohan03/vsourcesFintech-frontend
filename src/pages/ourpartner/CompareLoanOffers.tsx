import React, { useMemo, useState } from "react";
import { Banknote } from "lucide-react";

// Replace this with your project's `cn` util if you have one
const cn = (...args: Array<string | false | null | undefined>) =>
    args.filter(Boolean).join(" ");

// Banks list with logos (replace logo paths with your assets)
const BANKS = [
    { name: "Credila", slug: "credila", defaultRate: 11.5, logo: "/assets/images/credila.gif" },
    { name: "Auxilo", slug: "auxilo", defaultRate: 12.25, logo: "/assets/images/auxilo.png" },
    { name: "Avanse", slug: "avanse", defaultRate: 12.0, logo: "/assets/images/avanse.png" },
    { name: "Incred Finance", slug: "incred-finance", defaultRate: 13.0, logo: "/assets/images/incred.png" },
    { name: "MPOWER Financing", slug: "mpower-financing", defaultRate: 10.75, logo: "/assets/images/mpower.png" },
    { name: "Prodigy Finance", slug: "prodigy-finance", defaultRate: 10.5, logo: "/assets/images/prodigy.png" },
    { name: "IDFC FIRST Bank", slug: "idfc-first-bank", defaultRate: 12.5, logo: "/assets/images/idfc.png" },
    { name: "Axis Bank", slug: "axis-bank", defaultRate: 12.75, logo: "/assets/images/axis.png" },
];

function formatCurrency(v: number) {
    if (!isFinite(v)) return "-";
    return v.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

function monthlyMortgagePayment(P: number, annualRatePct: number, years: number) {
    if (P <= 0 || years <= 0) return 0;
    const r = annualRatePct / 100 / 12; // monthly rate
    const n = years * 12;
    if (r === 0) return P / n;
    const numer = P * r * Math.pow(1 + r, n);
    const denom = Math.pow(1 + r, n) - 1;
    return numer / denom;
}

export default function CompareLoanOffers() {
    // Global inputs
    const [loanAmount, setLoanAmount] = useState<number>(1000000);
    const [termYears, setTermYears] = useState<number>(10);
    const [customRate, setCustomRate] = useState<number | "">("");
    const [useCustomRate, setUseCustomRate] = useState(false);

    // Extra monthly costs
    const [monthlyMortgageInsurance, setMonthlyMortgageInsurance] = useState<number>(0);
    const [monthlyEscrowTaxes, setMonthlyEscrowTaxes] = useState<number>(0);
    const [monthlyHomeInsurance, setMonthlyHomeInsurance] = useState<number>(0);

    // Choose which banks to include
    const [selectedBanks, setSelectedBanks] = useState<string[]>(BANKS.map((b) => b.slug));

    // UI helpers
    const toggleBank = (slug: string) => {
        setSelectedBanks((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
    };

    const banksToShow = useMemo(() => BANKS.filter((b) => selectedBanks.includes(b.slug)), [selectedBanks]);

    // Computations per bank
    const computed = useMemo(() => {
        return banksToShow.map((bank) => {
            const rate = useCustomRate && typeof customRate === "number" && customRate > 0 ? customRate : bank.defaultRate;
            const monthlyPI = monthlyMortgagePayment(loanAmount, rate, termYears);
            const totalMonthly = monthlyPI + monthlyMortgageInsurance + monthlyEscrowTaxes + monthlyHomeInsurance;
            const totalPaidOverTerm = totalMonthly * termYears * 12;
            const totalInterest = monthlyPI * termYears * 12 - loanAmount;

            return {
                bank: bank.name,
                logo: bank.logo,
                rate,
                monthlyPI,
                monthlyMortgageInsurance,
                monthlyEscrowTaxes,
                monthlyHomeInsurance,
                totalMonthly,
                totalPaidOverTerm,
                totalInterest,
            };
        });
    }, [banksToShow, loanAmount, termYears, monthlyMortgageInsurance, monthlyEscrowTaxes, monthlyHomeInsurance, useCustomRate, customRate]);

    // Small helper to download CSV
    const downloadCSV = () => {
        const headers = [
            "Bank",
            "Interest Rate (%)",
            "Monthly P&I",
            "Monthly Mortgage Insurance",
            "Monthly Taxes (escrow)",
            "Monthly Home Insurance",
            "Total Monthly Payment",
            "Total Paid Over Term",
            "Total Interest Paid",
        ];
        const rows = computed.map((c) => [
            c.bank,
            c.rate.toFixed(2),
            c.monthlyPI.toFixed(2),
            c.monthlyMortgageInsurance.toFixed(2),
            c.monthlyEscrowTaxes.toFixed(2),
            c.monthlyHomeInsurance.toFixed(2),
            c.totalMonthly.toFixed(2),
            c.totalPaidOverTerm.toFixed(2),
            c.totalInterest.toFixed(2),
        ]);
        const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "loan-comparison.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full">
            {/* HERO */}
           <section
        className="relative pt-32 pb-16 lg:pt-32 lg:pb-24 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: `url(/assets/images/tools-bg.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">Compare Loan Offers</h1>
                            <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-100/90">
                                Compare principal & interest, mortgage insurance, escrow and total monthly payments across partners — make
                                informed decisions quickly. Mobile-first and responsive.
                            </p>
                        </div>

                        <div className="w-full md:w-[420px] bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/6">
                                        <Banknote size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-100/80">Quick compare</div>
                                        <div className="font-semibold">Pick amount, term & see results</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.scrollTo({ top: 420, behavior: "smooth" })}
                                    className="px-3 py-2 rounded-md bg-white/6 hover:bg-white/10 text-white text-sm"
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TOOL & FORM */}
            <section className="w-full max-w-[1400px] mx-auto px-6 -mt-12 relative z-20">
                <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Inputs */}
                        <div className="col-span-1">
                            <div className="space-y-4">
                                {/* Loan inputs */}
                                <label className="text-sm font-medium text-slate-700">Loan amount</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border px-3 py-2 shadow-sm"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value || 0))}
                                    min={0}
                                />

                                <label className="text-sm font-medium text-slate-700">Term (years)</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={40}
                                    className="w-full rounded-lg border px-3 py-2 shadow-sm"
                                    value={termYears}
                                    onChange={(e) => setTermYears(Number(e.target.value || 0))}
                                />

                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        id="useCustomRate"
                                        type="checkbox"
                                        checked={useCustomRate}
                                        onChange={(e) => setUseCustomRate(e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    <label htmlFor="useCustomRate" className="text-sm">
                                        Use custom interest rate
                                    </label>
                                </div>

                                {useCustomRate && (
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Custom annual rate (%)</label>
                                        <input
                                            type="number"
                                            step={0.01}
                                            min={0}
                                            className="w-full rounded-lg border px-3 py-2 shadow-sm"
                                            value={customRate}
                                            onChange={(e) => setCustomRate(e.target.value === "" ? "" : Number(e.target.value))}
                                        />
                                    </div>
                                )}

                                <hr className="my-2" />

                                <label className="text-sm font-medium text-slate-700">Monthly mortgage insurance (₹)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border px-3 py-2 shadow-sm"
                                    value={monthlyMortgageInsurance}
                                    onChange={(e) => setMonthlyMortgageInsurance(Number(e.target.value || 0))}
                                />

                                <label className="text-sm font-medium text-slate-700">Monthly taxes / escrow (₹)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border px-3 py-2 shadow-sm"
                                    value={monthlyEscrowTaxes}
                                    onChange={(e) => setMonthlyEscrowTaxes(Number(e.target.value || 0))}
                                />

                                <label className="text-sm font-medium text-slate-700">Monthly home insurance (₹)</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border px-3 py-2 shadow-sm"
                                    value={monthlyHomeInsurance}
                                    onChange={(e) => setMonthlyHomeInsurance(Number(e.target.value || 0))}
                                />

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        onClick={() => {
                                            setLoanAmount(1000000);
                                            setTermYears(10);
                                            setCustomRate("");
                                            setUseCustomRate(false);
                                            setMonthlyMortgageInsurance(0);
                                            setMonthlyEscrowTaxes(0);
                                            setMonthlyHomeInsurance(0);
                                            setSelectedBanks(BANKS.map((b) => b.slug));
                                        }}
                                        className="px-3 py-2 rounded-md border"
                                    >
                                        Reset
                                    </button>

                                    <button onClick={downloadCSV} className="px-3 py-2 rounded-md bg-slate-800 text-white">
                                        Download CSV
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Banks filter */}
                        <div className="col-span-1">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Choose partners to compare</label>
                                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {BANKS.map((b) => (
                                        <button
                                            key={b.slug}
                                            onClick={() => toggleBank(b.slug)}
                                            className={cn(
                                                "relative flex flex-col sm:flex-row items-start sm:items-center gap-2 p-2 rounded-lg border min-h-[60px] text-sm",
                                                selectedBanks.includes(b.slug) ? "bg-slate-50 border-slate-300" : "bg-white"
                                            )}
                                        >
                                            {/* Logo */}
                                            <img
                                                src={b.logo}
                                                alt={b.name}
                                                className="w-16 h-8 object-contain sm:w-8 sm:h-8"
                                            />

                                            {/* Name */}
                                            <span className="truncate text-center sm:text-left">{b.name}</span>

                                            {/* Rate (mobile absolute top-right, desktop inline right) */}
                                            <span className="absolute top-2 right-2 text-xs text-slate-500 sm:static sm:ml-auto">
                                                {b.defaultRate}%
                                            </span>
                                        </button>

                                    ))}
                                </div>

                                <div className="mt-4">
                                    <label className="text-sm font-medium text-slate-700">Sort by</label>
                                    <select className="w-full rounded-lg border px-3 py-2 mt-2">
                                        <option value="recommended">Recommended (lowest total monthly)</option>
                                        <option value="rate">Lowest rate</option>
                                        <option value="monthly">Lowest monthly</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="col-span-1 lg:col-span-2">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Comparison results</h3>
                                    <div className="text-sm text-slate-500">Showing {computed.length} partner(s)</div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {computed.map((c) => (
                                        <article key={c.bank} className="p-4 rounded-xl border shadow-sm bg-white">
                                            <div className="flex flex-col sm:flex-row items-start gap-3 p-3 border rounded-xl bg-white">
                                                {/* Logo */}
                                                <div className="relative flex-shrink-0">
                                                    <div className="p-2 rounded-lg bg-slate-50 flex items-center justify-center">
                                                        <img
                                                            src={c.logo}
                                                            alt={c.bank}
                                                            className="w-28 h-12 sm:w-32 sm:h-14 object-contain"
                                                        />
                                                    </div>

                                                    {/* Rate (mobile top-right, desktop inline) */}
                                                    <div className=" sm:hidden block sm:ml-auto text-sm text-slate-600">
                                                        {c.rate.toFixed(2)}%
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 w-full">
                                                    {/* Bank name + rate (desktop) */}
                                                    <div className="flex items-center gap-2 sm:mb-2">
                                                        <h4 className="font-semibold text-slate-800 text-center sm:text-left">
                                                            {c.bank}
                                                        </h4>
                                                        <div className="hidden sm:block ml-auto text-sm text-slate-600">
                                                            {c.rate.toFixed(2)}%
                                                        </div>
                                                    </div>

                                                    {/* Monthly P&I */}
                                                    <div className="mt-2 text-sm text-slate-600">
                                                        Monthly P&I:{" "}
                                                        <span className="font-medium text-slate-800">
                                                            {formatCurrency(c.monthlyPI)}
                                                        </span>
                                                    </div>

                                                    {/* Details grid */}
                                                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                                        <div>
                                                            <div className="text-xs text-slate-500">Mortgage insurance</div>
                                                            <div className="font-medium">
                                                                {formatCurrency(c.monthlyMortgageInsurance)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-slate-500">Escrow / Taxes</div>
                                                            <div className="font-medium">
                                                                {formatCurrency(c.monthlyEscrowTaxes)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-slate-500">Home insurance</div>
                                                            <div className="font-medium">
                                                                {formatCurrency(c.monthlyHomeInsurance)}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-slate-500">Total monthly</div>
                                                            <div className="font-medium text-slate-800">
                                                                {formatCurrency(c.totalMonthly)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Footer actions */}
                                                    <div className="mt-3 flex items-center gap-3">
                                                        <a
                                                            href={`/our-partners/${c.bank.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                                            className="text-sm text-slate-600 hover:underline"
                                                        >
                                                            View partner
                                                        </a>

                                                        <button
                                                            onClick={() =>
                                                                navigator.clipboard.writeText(JSON.stringify(c, null, 2))
                                                            }
                                                            className="ml-auto text-xs px-2 py-1 rounded bg-slate-100 border"
                                                        >
                                                            Copy details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Small footer note */}
            <div className="w-full max-w-[1400px] mx-auto px-6 mt-4 text-sm text-slate-600">
                <p>
                    Notes: interest rates shown are defaults for quick comparison — replace them with live rates from partners or an
                    API. The calculation shows monthly principal & interest (P&amp;I), mortgage insurance, escrow (taxes) and home
                    insurance as separate line items and a combined total monthly payment.
                </p>
            </div>
        </div>
    );
}
