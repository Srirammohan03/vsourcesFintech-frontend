import { useParams } from "react-router-dom";
import { partners, Partner } from "../../lib/partners"; // adjust path if needed

export default function PartnerDetails() {
  const { slug } = useParams<{ slug: string }>();

  const partner: Partner | undefined = partners.find((p) => p.slug === slug);

  if (!partner) {
    return <div className="text-center py-20">Partner not found</div>;
  }

  return (
    <section className="bg-surface pt-28 pb-16">
      <div className="w-full max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Logo / Image */}
        <div className="flex justify-center">
          <div className="bg-[#4338CA] p-10 rounded-2xl flex items-center justify-center">
            <img src={partner.logo} alt={partner.name} className="h-20 md:h-28" />
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {partner.name} Education Loan
          </h1>
          <p className="mt-3 text-lg text-gray-700">
            Unlock hassle-free education loan assistance with EpiCred!
          </p>

          {/* Features Row */}
          <div className="mt-6 flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-2">
              <span className="text-pink-500 text-xl">%</span>
              <div>
                <p className="font-semibold">Interest Rates</p>
                <p className="text-sm text-gray-600">{}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-xl">₹</span>
              <div>
                <p className="font-semibold">Service Charge</p>
                <p className="text-sm text-gray-600">Free of Cost</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500 text-xl">⚖</span>
              <div>
                <p className="font-semibold">Margin Money</p>
                <p className="text-sm text-gray-600">NIL</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-4">
            <a
              href="#"
              className="px-6 py-3 border-2 border-pink-500 text-pink-500 font-medium rounded-lg hover:bg-pink-50 transition"
            >
              Check Eligibility
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
