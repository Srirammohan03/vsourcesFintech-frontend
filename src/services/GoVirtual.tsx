import React, { useState, useEffect } from "react";
import {
  FaRegClock,
  FaLink,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { PopupModal, useCalendlyEventListener } from "react-calendly";

const GoVirtual = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [openCalendly, setOpenCalendly] = useState(false);
  const [calendlyPrefill, setCalendlyPrefill] = useState(null);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

  const getDayDetails = (date) => {
    const dayName = date.toLocaleString("en-us", { weekday: "short" });
    const dayNumber = date.getDate();
    return { day: dayName, date: dayNumber, fullDate: date };
  };

  const getWeekDays = (start) => {
    const days = [];
    let date = new Date(start);
    for (let i = 0; i < 7; i++) {
      days.push(getDayDetails(new Date(date)));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];

    const slots = [];
    let startTime = new Date(selectedDate);
    startTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

    const endTimeLimit = new Date(selectedDate);
    endTimeLimit.setHours(17, 0, 0, 0); // End at 5:00 PM

    const now = new Date();

    while (
      startTime.getHours() < endTimeLimit.getHours() ||
      (startTime.getHours() === endTimeLimit.getHours() &&
        startTime.getMinutes() <= endTimeLimit.getMinutes())
    ) {
      if (startTime > now) {
        slots.push(
          startTime.toLocaleString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
      }
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return slots;
  };

  const timeSlots = getAvailableTimeSlots();

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
    if (day.day === "Sun" || day.fullDate < new Date().setHours(0, 0, 0, 0))
      return;
    setSelectedDate(day.fullDate);
    setSelectedTime(null);
  };

  const isPreviousWeekDisabled = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfCurrentWeek = new Date(currentWeekStart);
    startOfCurrentWeek.setHours(0, 0, 0, 0);
    return startOfCurrentWeek < today;
  };

  // convert "05:30 PM" + selectedDate -> a Date object with that exact time
  const combineDateAndTime = (baseDate, timeStr) => {
    if (!baseDate || !timeStr) return null;
    const [time, period] = timeStr.split(" "); // ["05:30", "PM"]
    const [hhStr, mmStr] = time.split(":");
    let hh = parseInt(hhStr, 10);
    const mm = parseInt(mmStr, 10);
    if (period === "PM" && hh !== 12) hh += 12;
    if (period === "AM" && hh === 12) hh = 0;
    const d = new Date(baseDate);
    d.setHours(hh, mm, 0, 0);
    return d;
  };

  // When user confirms, prepare Calendly prefill and open popup
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and a time to confirm.");
      return;
    }

    const prefillDate = combineDateAndTime(selectedDate, selectedTime);

    // Basic prefill — you can add name/email/customAnswers/guests as needed
    const prefill = {
      // name: "Invitee Name",
      // email: "invitee@example.com",
      date: prefillDate, // react-calendly accepts a Date object
      // customAnswers: { a1: "value" },
      // guests: ['other@example.com']
    };

    setCalendlyPrefill(prefill);
    setOpenCalendly(true);
  };

  // Listen to scheduled event so we can close popup / show confirmation
  useCalendlyEventListener({
    onEventScheduled: (e) => {
      // e.data.payload contains event & invitee URIs — you can use them to fetch data
      console.log("Calendly scheduled:", e.data);
      setOpenCalendly(false);
      // show success UI or call backend here if needed
      alert(
        "Thanks — your meeting is scheduled! Check your email for confirmation."
      );
    },
  });

  // Replace this with your own event type URL (copy from Calendly dashboard)
  const calendlyUrl = "https://calendly.com/your-calendly-username/30min";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="flex-1 p-8 border-r border-gray-200">
          <h2 className="text-sm text-gray-500 font-medium">
            Vsource Overseas Education
          </h2>
          <h1 className="text-3xl font-bold mt-1 mb-6">Meeting</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <FaRegClock className="mr-2" />
            <span>30 mins</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaLink className="mr-2" />
            <span>Web conferencing details provided upon confirmation.</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-8">
          <div className="flex items-center mb-4">
            <IoPersonCircleOutline className="w-10 h-10 rounded-full mr-3 text-gray-400" />
            <span className="font-bold text-lg">
              What day & time works best for you?
            </span>
          </div>

          {/* Week Selector */}
          <h3 className="text-gray-700 font-semibold mb-2">This week</h3>
          <div className="flex items-center justify-between mb-4">
            <FaChevronLeft
              className={`text-gray-400 ${
                isPreviousWeekDisabled()
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={handlePreviousWeek}
            />
            <div className="flex space-x-2">
              {weekDays.map((day) => {
                const isPastDay =
                  day.fullDate < new Date().setHours(0, 0, 0, 0);
                const isSunday = day.day === "Sun";
                const isDisabled = isPastDay || isSunday;
                return (
                  <button
                    key={day.date}
                    onClick={() => handleDayClick(day)}
                    disabled={isDisabled}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                      isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : selectedDate?.getDate() === day.date
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xs">{day.day}</span>
                    <span className="font-bold mt-1">{day.date}</span>
                  </button>
                );
              })}
            </div>
            <FaChevronRight
              className="text-gray-400 cursor-pointer"
              onClick={handleNextWeek}
            />
          </div>

          {/* Time Slots */}
          <h3 className="text-gray-700 font-semibold mb-2">Time Slots</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {timeSlots.length > 0 ? (
              timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 border ${
                    selectedTime === time
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {time}
                </button>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">
                No slots available for this day.
              </p>
            )}
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            disabled={!selectedDate || !selectedTime}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Calendly PopupModal (react-calendly) */}
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
