import React from "react";
import {  Currency, ShieldCheck, UserCheck } from "lucide-react";

export default function GIC() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 text-gray-900">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-20 px-6 text-center">
        <Currency className="mx-auto mb-4 w-14 h-14" />
        <h1 className="text-xl md:text-3xl font-extrabold mb-4">
          Guaranteed Investment Certificate (GIC) for Students Abroad
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Understand the GIC – a secure financial investment required by some countries (especially Canada) to prove living expense funds while studying abroad.
        </p>
      </div>

      {/* What is GIC */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xl md:text-3xl font-bold mb-8 text-center text-green-900">What is a Guaranteed Investment Certificate (GIC)?</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-center text-gray-800 leading-relaxed">
          A GIC is a fixed-term investment offered by Canadian banks (and some other countries' financial institutions) aimed at international students. It provides proof of funds required for study permit applications and guarantees a fixed return on the deposited amount. This gives governments confidence you can cover living costs during your stay.
        </p>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: <ShieldCheck className="w-12 h-12 text-green-700 mx-auto mb-4" />,
              title: "Secure Investment",
              desc: "Your funds are safely held by a recognized bank/institution with guaranteed returns."
            },
            {
              icon: <UserCheck className="w-12 h-12 text-green-700 mx-auto mb-4" />,
              title: "Visa Requirement",
              desc: "Mandatory for student visa applications in countries like Canada to prove financial capability."
            },
            {
              icon: <Currency className="w-12 h-12 text-green-700 mx-auto mb-4" />,
              title: "Supports Living Expenses",
              desc: "The invested amount covers essential living costs such as accommodation, food, and transport."
            },
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              {icon}
              <h3 className="text-xl font-semibold mb-2 text-green-900">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>

        {/* Country Specific Notes */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-green-900 text-center">GIC Requirements by Country</h3>
          <ul className="list-disc list-inside text-gray-800 space-y-4 text-lg">
            <li><strong>Canada:</strong> Minimum CAD $22,895 required for study permit proof. Obtainable from banks like RBC, Scotiabank, and ICICI Canada.</li>
            <li><strong>UK, USA, Australia, Ireland, France, Germany:</strong> GIC is typically not mandatory but proof of funds through savings or scholarships is required.</li>
            <li>Check respective country immigration websites for specific financial requirements and alternative instruments accepted.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
