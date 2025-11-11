import AnimateOnScroll from "@/components/AnimateOnScroll";
import SectionTitle from "@/components/SectionTitle";
import { useState } from "react";

const View360 = () => {
  const [activeTab, setActiveTab] = useState("all");

  const locations: Record<
    string,
    { src: string; title: string; subtitle: string }
  > = {
    Dilsukhnagar: {
      src: "https://www.google.com/maps/embed?pb=!4v1760515897382!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ052N21fY2c.!2m2!1d17.3692601595086!2d78.52138567492067!3f15.463848464555387!4f-3.5524557100136036!5f0.7820865974627469",
      title: "Dilsukhnagar Office",
      subtitle: "Location — Dilsukhnagar, Hyderabad",
    },
    Ameerpet: {
      src: "https://www.google.com/maps/embed?pb=!4v1760518863069!6m8!1m7!1sCAoSHENJQUJJaERrUzk3bTZYR3JXMHREbjRtS1VOQnM.!2m2!1d17.43119354453962!2d78.44547854458258!3f200!4f0!5f0.7820865974627469",
      title: "Ameerpet Office",
      subtitle: "Location — Ameerpet, Hyderabad",
    },
    "KPHB- JNTU": {
      src: "https://www.google.com/maps/embed?pb=!4v1760518780459!6m8!1m7!1sCAoSHENJQUJJaEFwY3RKdW40bmxYYTBFNHFTdDVuMzM.!2m2!1d17.49847161988275!2d78.38723216509213!3f0!4f0!5f0.7820865974627469",
      title: "KPHB - JNTU Office",
      subtitle: "Location — KPHB (near JNTU), Hyderabad",
    },
  };

  const tabs = ["all", ...Object.keys(locations)];

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <section className="pt-36 pb-20 text-center bg-gradient-to-b from-teal-950 to-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Virtual Office Tours
          </h1>
          <p className="text-xl text-gray-300">
            Take a 360° tour of our main offices across India
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 md:py-16 text-center">
        {/* Tabs */}
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white shadow-sm text-primary"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "all" ? "All" : tab}
            </button>
          ))}
        </div>

        {/* All Offices View */}
        {activeTab === "all" && (
          <section className="mt-12">
            {/* <SectionTitle
              title="Virtual Office Tours"
              subtitle="Take a 360° tour of our main offices across India"
            /> */}
            <AnimateOnScroll>
              <div className="mt-10 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src="https://vsourceadmissions.com/360View/"
                      title="All Offices Virtual Tour"
                      className="w-full h-full border-0 rounded-lg"
                      allow="accelerometer; gyroscope; fullscreen"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </section>
        )}

        {/* Individual Office View */}
        {activeTab !== "all" && (
          <section className="mt-12">
            <SectionTitle
              title={locations[activeTab].title}
              subtitle={locations[activeTab].subtitle}
            />
            <AnimateOnScroll>
              <div className="mt-10 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={locations[activeTab].src}
                      title={`${activeTab} 360° View`}
                      className="w-full h-full border-0 rounded-lg"
                      allow="accelerometer; gyroscope; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </section>
        )}
      </section>
    </div>
  );
};

export default View360;
