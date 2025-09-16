import React, { useState, useEffect } from "react";
import {
  FaUniversity,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PopupModal } from "react-calendly";

// Main component
const GoVirtual = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [openCalendly, setOpenCalendly] = useState(false);
  const [calendlyPrefill, setCalendlyPrefill] = useState(null);

  // Set today as default date on mount
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const getDayDetails = (date) => {
    const dayName = date.toLocaleString("en-us", { weekday: "short" });
    const dayNumber = date.getDate();
    return { day: dayName, date: dayNumber, fullDate: new Date(date) };
  };

  const getWeekDays = (start) => {
    const days = [];
    let date = new Date(start);
    for (let i = 0; i < 7; i++) {
      days.push(getDayDetails(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  const handlePreviousWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  const handleDayClick = (day) => {
    const isPastDay = day.fullDate < new Date().setHours(0, 0, 0, 0);
    const isSunday = day.day === "Sun";
    if (isPastDay || isSunday) return;

    setSelectedDate(day.fullDate);
    setCalendlyPrefill({ date: day.fullDate });
    setOpenCalendly(true);
  };

  const isPreviousWeekDisabled = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfCurrentWeek = new Date(currentWeekStart);
    startOfCurrentWeek.setHours(0, 0, 0, 0);
    return startOfCurrentWeek < today;
  };

  const calendlyUrl = "https://calendly.com/sriram9491/30min";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:flex-row md:justify-center md:items-center p-2">
      {/* Left Content */}
      <div className="flex-1 bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-t-none shadow-md p-6 md:p-10 flex flex-col justify-center max-w-full md:max-w-lg mx-auto md:mx-0 mb-3 md:mb-0">
        <div className="mb-6 flex items-center gap-2">
          <FaUniversity className="text-blue-600 text-xl" />
          <span className="text-xs font-bold tracking-wide text-blue-800 uppercase">Vsource FinTech Loans</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-800">
          Education Loans Simplified
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Secure your dreams of studying abroad with India's most flexible and transparent education loan partner.
        </p>
        <ul className="mb-7 space-y-3">
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-blue-500 mt-px" />
            <span className="text-sm text-gray-700">No collateral for eligible students</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-blue-500 mt-px" />
            <span className="text-sm text-gray-700">Lowest ROI & fast digital approvals</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheckCircle className="text-blue-500 mt-px" />
            <span className="text-sm text-gray-700">Funding for tuition, GIC, insurance, more</span>
          </li>
        </ul>
        <div className="mt-8">
          <span className="text-xs text-gray-400">
            Your privacy is guaranteed. 100% digital process.
          </span>
        </div>
      </div>

      {/* Right: Day Scheduler */}
      <div className="flex-1 bg-white max-w-full md:max-w-md w-full rounded-b-3xl md:rounded-r-3xl md:rounded-b-none shadow-md px-4 md:px-8 py-8 flex flex-col">
        <div className="flex items-center mb-2">
          <IoPersonCircleOutline className="w-10 h-10 rounded-full mr-3 text-gray-400" />
          <span className="font-bold text-base md:text-lg">
            Choose your meeting day
          </span>
        </div>
        {/* Week Selector */}
        <h3 className="text-gray-700 font-semibold mb-2 mt-2">Pick a Day</h3>
        <div className="flex items-center justify-between mb-3">
          <FaChevronLeft
            className={`text-gray-400 text-lg ${isPreviousWeekDisabled() ? "opacity-50" : "cursor-pointer hover:text-blue-500"}`}
            onClick={!isPreviousWeekDisabled() ? handlePreviousWeek : undefined}
          />
          <div className="flex space-x-1 overflow-x-auto">
            {weekDays.map((day) => {
              const isPastDay = day.fullDate < new Date().setHours(0, 0, 0, 0);
              const isSunday = day.day === "Sun";
              const isDisabled = isPastDay || isSunday;
              return (
                <button
                  key={day.date}
                  onClick={() => handleDayClick(day)}
                  disabled={isDisabled}
                  className={`flex flex-col items-center p-1.5 rounded-lg min-w-[42px] transition-colors text-sm
                    ${isDisabled
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : selectedDate?.getDate() === day.date
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border hover:bg-blue-50"
                    }`}
                >
                  <span className="text-xs">{day.day}</span>
                  <span className="font-bold mt-1">{day.date}</span>
                </button>
              );
            })}
          </div>
          <FaChevronRight
            className="text-gray-400 text-lg cursor-pointer hover:text-blue-500"
            onClick={handleNextWeek}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Available slots and meeting link will be shown after selecting the day.
        </p>
      </div>

      {/* Calendly Modal */}
      <PopupModal
        url={calendlyUrl}
        open={openCalendly}
        onModalClose={() => setOpenCalendly(false)}
        rootElement={document.getElementById("root")}
        prefill={calendlyPrefill}
        pageSettings={{ hideEventTypeDetails: false }}
      />
    </div>
  );
};

export default GoVirtual;
