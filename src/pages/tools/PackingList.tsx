import React, { useMemo, useState } from "react";
import {
  FileText,
  Shirt,
  Laptop,
  HeartPulse,
  School,
  Boxes,
  ShoppingCart,
  CheckCircle2,
  List,
  Plus,
} from "lucide-react";

const THEME = {
  red: "#E3000F",
  blue: "#2563EB",
  yellow: "#FFCE14",
  sky: "#0A9CF9",
  gray: "#E5EBF0",
  surface: "#FFFCFB",
  text: "#3A3A3A",
};

type Status = "not_needed" | "need_to_buy" | "owned";

type Item = {
  id: string;
  label: string;
  status: Status;
};

type CategoryKey =
  | "Documents"
  | "Clothing"
  | "Electronics"
  | "Health"
  | "School supplies"
  | "Miscellaneous";

const IconByCategory: Record<CategoryKey, React.ComponentType<any>> = {
  Documents: FileText,
  Clothing: Shirt,
  Electronics: Laptop,
  Health: HeartPulse,
  "School supplies": School,
  Miscellaneous: Boxes,
};

const initialData: Record<CategoryKey, string[]> = {
  Documents: [
    "Passport",
    "Visa",
    "Acceptance Letter",
    "International Student ID",
    "Travel Insurance",
    "Immunization records",
    "Bank Statements",
    "Scholarship documents",
    "Certified copies of academic transcripts",
    "Driver's license",
    "Birth certificate (copy)",
    "Passport photos",
  ],
  Clothing: [
    "Weather-appropriate jackets",
    "Comfortable walking shoes",
    "Formal attire for events",
    "Casual everyday wear",
    "Underwear and socks",
    "Pajamas",
    "Swimwear",
    "Athletic clothing",
    "Accessories (belts etc.)",
    "Cultural/religious clothing",
    "Rain gear",
    "Warm layers (sweaters, hoodies)",
  ],
  Electronics: [
    "Laptop and charger",
    "Smartphone and charger",
    "Power adapters",
    "Portable battery pack",
    "Headphones",
    "E-reader",
    "Camera",
    "USB flash drive",
    "Portable hard drive",
    "Scientific calculator",
    "Alarm clock",
    "Portable speaker",
  ],
  Health: [
    "Prescription medications",
    "First-aid kit",
    "Toiletries (brush,paste, etc.)",
    "Eyeglasses/contact lenses and solutions",
    "Sunscreen",
    "Insect repellent",
    "Feminine hygiene products",
    "Vitamins/supplements",
    "Hand sanitizer",
    "Face masks",
    "Nail clippers",
    "Deodorant",
  ],
  "School supplies": [
    "Notebooks and pens",
    "Backpack",
    "Textbooks (if required beforehand)",
    "Laptop sleeve",
    "Sticky notes",
    "Highlighters",
    "Index cards",
    "Planner/calendar",
    "Stapler and paper clips",
    "Printer (if needed)",
    "Graphing paper",
    "Ruler and protractor",
  ],
  Miscellaneous: [
    "Travel pillow",
    "Photos from home",
    "Language dictionary or app",
    "Reusable water bottle",
    "Small gifts from home country",
    "Portable luggage scale",
    "Travel locks",
    "Umbrella",
    "Bedroom slippers",
    "Reusable shopping bag",
    "Playing cards or small games",
    "Journal or diary",
  ],
};

function seedItems(list: string[]): Item[] {
  return list.map((label, i) => ({
    id: `${label}-${i}`,
    label,
    status: "not_needed",
  }));
}

const statusLabel: Record<Status, string> = {
  not_needed: "Not Needed",
  need_to_buy: "Need to Buy",
  owned: "Owned",
};

const statusPillClass: Record<Status, string> = {
  not_needed:
    "bg-slate-100 text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300",
  need_to_buy:
    "bg-amber-50 text-amber-700 ring-1 ring-amber-200 hover:ring-amber-300",
  owned:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:ring-emerald-300",
};

const statusCycle: Record<Status, Status> = {
  not_needed: "need_to_buy",
  need_to_buy: "owned",
  owned: "not_needed",
};

const gradientBtn =
  "relative inline-flex items-center justify-center px-5 py-3 rounded-xl text-white font-medium shadow transition active:scale-[0.99] bg-gradient-to-r from-fuchsia-500 to-indigo-600 hover:from-fuchsia-600 hover:to-indigo-700";

const cardClass =
  "rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition";

export default function PackingList() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("Documents");

  const [data, setData] = useState<Record<CategoryKey, Item[]>>(() => {
    const o = {} as Record<CategoryKey, Item[]>;
    (Object.keys(initialData) as CategoryKey[]).forEach((k) => {
      o[k] = seedItems(initialData[k]);
    });
    return o;
  });

  const [newItem, setNewItem] = useState("");

  const currentItems = data[activeTab];

  const summary = useMemo(() => {
    const needToBuy = currentItems.filter((i) => i.status === "need_to_buy").length;
    const owned = currentItems.filter((i) => i.status === "owned").length;
    const total = currentItems.length;
    return { needToBuy, owned, total };
  }, [currentItems]);

  function toggleStatus(id: string) {
    setData((prev) => {
      const next = { ...prev };
      next[activeTab] = next[activeTab].map((i) =>
        i.id === id ? { ...i, status: statusCycle[i.status] } : i
      );
      return next;
    });
  }

  function quickSet(id: string, status: Status) {
    setData((prev) => {
      const next = { ...prev };
      next[activeTab] = next[activeTab].map((i) =>
        i.id === id ? { ...i, status } : i
      );
      return next;
    });
  }

  function addItem() {
    const label = newItem.trim();
    if (!label) return;
    setData((prev) => ({
      ...prev,
      [activeTab]: [
        ...prev[activeTab],
        { id: `${label}-${Date.now()}`, label, status: "not_needed" },
      ],
    }));
    setNewItem("");
  }

  function resetTab() {
    setData((prev) => ({
      ...prev,
      [activeTab]: seedItems(initialData[activeTab]),
    }));
  }

  function exportCSV() {
    const rows = [["Item", "Status"]];
    currentItems.forEach((i) => rows.push([i.label, statusLabel[i.status]]));
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab.replace(/\s+/g, "_")}_packing_list.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: THEME.surface, color: THEME.text }}
    >
      {/* HERO / BANNER ONLY has the gradient */}
        <section
        className="relative pt-32 pb-16 lg:pt-32 lg:pb-24 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: `url(/assets/images/tools-bg.jpg)`,
        }}
      >
        {/* Dark overlay under content */}
        <div className="absolute inset-0 bg-black/50 z-0" />

          <div className="w-full max-w-[1400px] mx-auto px-6 py-10  pt-12 relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Student Packing List
          </h1>
          <p className="text-white/80 mt-2 text-center">
            Organize your essentials before you travel abroad for education.
          </p>
        </div>0
      </section>

      {/* MAIN BODY (light surface) */}
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
  {/* white container that “connects” under the banner */}
  <div className="bg-white rounded-t-3xl shadow-lg px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
    {/* Top Nav */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <nav className="flex flex-wrap gap-2 sm:gap-3">
        {(Object.keys(initialData) as CategoryKey[]).map((k) => {
          const Icon = IconByCategory[k];
          const active = activeTab === k;
          return (
            <button
              key={k}
              onClick={() => setActiveTab(k)}
              className={
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm sm:text-base border transition " +
                (active
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-50 border-slate-200 hover:bg-white")
              }
            >
              <Icon className="h-4 w-4" />
              {k}
            </button>
          );
        })}
      </nav>
    </div>

    {/* Content Section */}
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Packing List */}
      <section className="lg:col-span-8 xl:col-span-9">
        <header className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            Your Packing List
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Add Item"
              className="flex-1 sm:w-64 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={addItem}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </header>

        {/* Items */}
        <div className="space-y-3">
          {currentItems.map((item) => {
            const CatIcon = IconByCategory[activeTab];
            return (
              <div key={item.id} className={cardClass + " p-3 sm:p-4"}>
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="shrink-0 rounded-xl bg-slate-100 p-2">
                    <CatIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {item.label}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className={
                          "rounded-full px-3 py-1 text-xs sm:text-sm transition " +
                          statusPillClass[item.status]
                        }
                      >
                        {statusLabel[item.status]}
                      </button>
                      <div className="flex flex-wrap items-center gap-2 ml-1">
                        <button
                          onClick={() => quickSet(item.id, "owned")}
                          className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs sm:text-sm text-emerald-700 hover:bg-emerald-100"
                        >
                          <CheckCircle2 className="h-4 w-4" /> Owned
                        </button>
                        <button
                          onClick={() => quickSet(item.id, "need_to_buy")}
                          className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs sm:text-sm text-amber-700 hover:bg-amber-100"
                        >
                          <ShoppingCart className="h-4 w-4" /> Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Right: Summary */}
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className={cardClass + " p-5 sticky top-32"}>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm sm:text-base">Need To Buy</span>
              </div>
              <span className="text-base sm:text-lg font-semibold">{summary.needToBuy}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm sm:text-base">Already Owned</span>
              </div>
              <span className="text-base sm:text-lg font-semibold">{summary.owned}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5" />
                <span className="text-sm sm:text-base">Total Items</span>
              </div>
              <span className="text-base sm:text-lg font-semibold">{summary.total}</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3">
            <button onClick={exportCSV} className={gradientBtn}>
              Export list
            </button>
            <button
              onClick={resetTab}
              className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium hover:bg-slate-50 active:scale-[0.99]"
            >
              Reset (This Tab)
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</div>

    </div>
  );
}
