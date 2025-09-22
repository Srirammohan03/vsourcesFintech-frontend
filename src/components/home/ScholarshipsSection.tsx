import { useState, useEffect, useRef } from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";
import { LoanDisbursementBlock, Scholarship } from "@/lib/types/LandingPage";

type Prop = { loan: LoanDisbursementBlock; isLoading: boolean };

const ScholarshipsSection: React.FC<Prop> = ({ loan, isLoading }) => {
  const flagMap: Record<string, string> = {
    USA: "https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg",
    UK: "https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?semt=ais_hybrid&w=740",
    Canada: "https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.png",
    France: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    Ireland: "https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg",
  };

  const defaultFlag = "/assets/images/placeholder-flag.png";
  const defaultStudentImage = "/assets/images/default-student.png";

  const currencyMap: Record<string, string> = {
    USA: "USD",
    UK: "GBP",
    Canada: "CAD",
    France: "EUR",
    Ireland: "EUR",
  };

  const tableRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  // auto-scroll effect
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

  if (isLoading) {
    return (
      <section className="py-8 md:py-10 text-lg">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500">Loading scholarships...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-10 text-lg">
      <div className="container mx-auto px-6">
        <SectionTitle title={loan.title} subtitle={loan.sub_title} />

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
                  {loan.scholarship?.map((item: Scholarship) => {
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Country Flag */}
                        <td className="px-2 sm:px-6 py-3 sm:py-5">
                          <img
                            src={flagMap[item.country] || defaultFlag}
                            alt={`${item.country} Flag`}
                            className="h-8 w-12 object-cover rounded"
                          />
                        </td>

                        {/* Student */}
                        <td className="px-2 sm:px-6 py-3 sm:py-5">
                          <div className="flex items-center">
                            <img
                              src={item.image?.url || defaultStudentImage}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  defaultStudentImage;
                              }}
                              alt={item.student_name}
                              className="h-8 w-8 sm:h-12 sm:w-12 rounded-full mr-2 sm:mr-3 object-cover"
                            />
                            <span className="text-sm sm:text-base font-medium text-gray-900">
                              {item.student_name}
                            </span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-2 sm:px-6 py-3 sm:py-5 text-left md:text-right text-sm sm:text-base font-semibold text-green-600">
                          {(() => {
                            const num = Number(item.amount.replace(/[^0-9]/g, ""));
                            if (isNaN(num)) return item.amount; 
                            return `₹${new Intl.NumberFormat("en-IN").format(num)}`;
                          })()}
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
