import { useState, useEffect, useRef } from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

const ScholarshipsSection = () => {
  const ukFlag = "https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?semt=ais_hybrid&w=740";
  const usaFlag = "https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg";

  const defaultStudentImage = "/assets/images/placeholder.jpg";

  const scholarshipsData = [
    { studentName: "HARIKA KADAR", amount: "₹41,04,848", country: "USA" },
    { studentName: "SAMAR AHMED MOHAMMAD", amount: "₹40,00,000", country: "UK" },
    { studentName: "PAVAN KUMAR REDDY VANIPENTA", amount: "₹40,00,000", country: "UK" },
    { studentName: "Kaushik Vijayakumar", amount: "₹40,00,000", country: "UK" },
    { studentName: "JAYANTH KRISHNA SAI BATTIPATI", amount: "₹39,54,535", country: "USA" },
    { studentName: "PRITHVI RAJ CILARAPU", amount: "₹38,00,000", country: "UK" },
    { studentName: "SOUMYA GOPAGONI", amount: "₹36,04,116", country: "UK" },
    { studentName: "SUNIL B", amount: "₹35,00,000", country: "UK" },
    { studentName: "THATIKONDA TEJASWINI", amount: "₹35,00,000", country: "UK" },
    { studentName: "YATHIN YADAV MEKALA", amount: "₹35,00,000", country: "UK" },
    { studentName: "Kunchala Jai Srihar", amount: "₹31,17,748", country: "USA" },
    { studentName: "SHERI MADHURI", amount: "₹30,97,058", country: "USA" }
    
  ];

  const studentImagePaths: Record<string, string> = {
    "HARIKA KADAR": "/assets/images/HARIKA KADAR (USA).png",
    "SAMAR AHMED MOHAMMAD": "/assets/images/MOHAMMED SAMAR AHMED.jpeg",
    "PAVAN KUMAR REDDY VANIPENTA": "/assets/images/pavan kumar reddy vanipenta (UK).jpeg",
    "Kaushik Vijayakumar": "/assets/images/KAUSHIK VIJAYA KUMAR (UK).jpeg",
    "JAYANTH KRISHNA SAI BATTIPATI": "/assets/images/JAYANTH KRISHNA SAI BATTIPATI.jpeg",
    "PRITHVI RAJ CILARAPU": "/assets/images/PRITHVI RAJ CILARAPU (UK).jpeg",
    "SOUMYA GOPAGONI": "/assets/images/SOUMYA GOPAGONI (UK).jpeg",
    "SUNIL B": "/assets/images/SUNIL BAPANPALLY University of east london .png ",
    "THATIKONDA TEJASWINI": "/assets/images/Thatikonda Tejaswini -- BPP.jpg",
    "YATHIN YADAV MEKALA": "/assets/images/YATHIN YADAV MEKALA (UK).jpeg",
    "Kunchala Jai Srihar": "/assets/images/Kunchala Jai Srihar.jpeg",
    "SHERI MADHURI": "/assets/images/SHERI MADHURI (USA).jpg"
    
    
    // Add additional images as needed
  };

  const tableRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    if (!autoScroll || !tableRef.current) return;

    const table = tableRef.current;
    const scrollHeight = table.scrollHeight;
    const clientHeight = table.clientHeight;

    if (scrollHeight <= clientHeight) return;

    const maxScroll = scrollHeight - clientHeight;
    let animationId: number;

    const scroll = () => {
      if (!tableRef.current) return;

      let newPos = scrollPos + 0.5;
      if (newPos >= maxScroll) {
        newPos = 0;
      }

      setScrollPos(newPos);
      tableRef.current.scrollTop = newPos;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [autoScroll, scrollPos]);

  const handleMouseEnter = () => setAutoScroll(false);
  const handleMouseLeave = () => setAutoScroll(true);

  return (
    <section className="py-8 md:py-10 text-lg">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="100% EDUCATIONAL LOANS DISBURSEMENT"
          subtitle="Our students consistently receive impressive scholarships from top destinations" 
        />

        <AnimateOnScroll>
          <div className="mt-4 max-w-4xl mx-auto">
            <div 
              ref={tableRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="border border-gray-300 rounded-xl shadow-xl overflow-hidden max-h-[450px] overflow-y-auto"
            >
              <table className="min-w-full divide-y divide-gray-200 text-base">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Country Logo
                    </th>
                    <th className="px-2 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Student Name
                    </th>
                    <th className="px-2 sm:px-6 py-4 text-left md:text-right text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Disbursement Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scholarshipsData.map((item, index) => {
                    const studentImage = studentImagePaths[item.studentName] || defaultStudentImage;
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-2 sm:px-6 py-3 sm:py-5">
                          <img 
                            src={item.country === "USA" ? usaFlag : ukFlag} 
                            alt={`${item.country} Flag`}
                            className="h-8 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-2 sm:px-6 py-3 sm:py-5">
                          <div className="flex items-center">
                            <img 
                              src={studentImage} 
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = defaultStudentImage;
                              }}
                              alt={item.studentName}
                              className="h-8 w-8 sm:h-12 sm:w-12 rounded-full mr-2 sm:mr-3 object-cover"
                            />
                            <span className="text-sm sm:text-base font-medium text-gray-900">{item.studentName}</span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-6 py-3 sm:py-5 text-left md:text-right text-sm sm:text-base font-semibold text-green-600">
                          {item.amount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ScholarshipsSection;