import React from "react";
import CalendarHeader from "./CalendarHeader";
import DayCard from "./DayCard";
import "./_weekly-calendar-display.scss";

const WeeklyCalendarDisplay = ({
  month,
  year,
  startingDayIndex,
  endingDayIndex,
  handleNextWeek,
  handlePrevWeek,
  daysInMonth,
}) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonthArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="weekly-calendar">
      <CalendarHeader
        handleNextWeek={handleNextWeek}
        handlePrevWeek={handlePrevWeek}
        months={months}
        month={month}
        year={year}
        start={startingDayIndex + 1}
        end={endingDayIndex}
      />
      <div className="calendar-days-grid">
        <DayCard
          days={days}
          daysInMonthArray={daysInMonthArray}
          startingDayIndex={startingDayIndex}
          endingDayIndex={endingDayIndex}
          month={month}
          year={year}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendarDisplay;
