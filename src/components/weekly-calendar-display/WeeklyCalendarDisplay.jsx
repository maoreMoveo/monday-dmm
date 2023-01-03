import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./_weekly-calendar-display.scss";

const WeeklyCalendarDisplay = () => {
  const [startingDayIndex, setStartingDayIndex] = useState(0);
  const [endingDayIndex, setEndingDayIndex] = useState(7);
  const users = useSelector((state) => state.board.userItems);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = new Date().getMonth();
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
  const year = new Date().getFullYear();

  const getMaxDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getMaxDaysInMonth(month, year);
  const daysInMonthArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  console.log(daysInMonthArray);
  const handleNextWeek = () => {
    setStartingDayIndex(endingDayIndex + 1);
    setEndingDayIndex(endingDayIndex + 7);
  };
  console.log(startingDayIndex, "startingDayIndex");

  const handlePrevWeek = () => {
    if (startingDayIndex === 0) return;
    setStartingDayIndex(startingDayIndex - 7);
    setEndingDayIndex(endingDayIndex - 7);
  };

  return (
    <div className="weekly-calendar">
      <div className="calendar-header">
        <span className="arrow-left" onClick={handlePrevWeek}>
          ←
        </span>
        <p className="current-date">
          {months[month]} {year}
        </p>
        <span className="arrow-right" onClick={handleNextWeek}>
          →
        </span>
      </div>
      <div className="calendar-days-grid">
        <ul className="days clean-list">
          <li className="day">
            {days.map((day) => (
              <p>{day}</p>
            ))}
            {daysInMonthArray
              .slice(startingDayIndex, endingDayIndex)
              .map((day, index) => (
                // <p>{days[index]}</p>
                <p>{day}</p>
              ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeeklyCalendarDisplay;

// const WeeklyCalendarDisplay = () => {
//   return (
//     <div className="weekly-calendar">
//       <div className="calendar-header">
//         <p className="current-date">January 2023</p>
//         <div className="header-controls">
//           <span className="arrow-left">←</span>
//           <span className="arrow-right">→</span>
//         </div>
//       </div>
//       <div className="calendar-grid">
//         <ul className="weeks clean-list">
//           <li>Sun</li>
//           <li>Mon</li>
//           <li>Tue</li>
//           <li>Wud</li>
//           <li>Thu</li>
//           <li>Fri</li>
//           <li>Sat</li>
//         </ul>
//         <ul className="days clean-list">
//           <li className="day">1</li>
//           <li className="day">2</li>
//           <li className="day">3</li>
//           <li className="day">4</li>
//           <li className="day">5</li>
//           <li className="day">6</li>
//           <li className="day">7</li>
//           <li className="day">8</li>
//           <li className="day">9</li>
//           <li className="day">10</li>
//           <li className="day">11</li>
//           <li className="day">12</li>
//           <li className="day">13</li>
//           <li className="day">14</li>
//           <li className="day">15</li>
//           <li className="day">16</li>
//           <li className="day">17</li>
//           <li className="day">18</li>
//           <li className="day">19</li>
//           <li className="day">20</li>
//           <li className="day">21</li>
//           <li className="day">22</li>
//           <li className="day">23</li>
//           <li className="day">24</li>
//           <li className="day">25</li>
//           <li className="day">26</li>
//           <li className="day">27</li>
//           <li className="day">28</li>
//           <li className="day">29</li>
//           <li className="day">30</li>
//           <li className="day">31</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WeeklyCalendarDisplay;
