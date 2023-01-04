import React from "react";
import { Box } from "monday-ui-react-core";
import "./_day-card.scss";

const DayCard = ({
  days,
  startingDayIndex,
  endingDayIndex,
  daysInMonthArray,
}) => {
  const today = new Date().getDate();
  return (
    <Box className="day-cards-container">
      {days.map((day, index) => (
        <div
          key={index}
          className={`day-card ${
            index + 1 === today && today >= startingDayIndex ? "marked-day" : ""
          }`}
        >
          <span className="day-name">{day}</span>
          <span className="day-num">
            {daysInMonthArray.slice(startingDayIndex, endingDayIndex)[index]}
          </span>
        </div>
      ))}
    </Box>
  );
};

export default DayCard;
