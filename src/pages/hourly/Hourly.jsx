import React, { useState } from "react";
import { useSelector } from "react-redux";
//@ts-ignore
import { Box, Flex, Loader } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import "./_hourly.scss";
import Header from "../../components/header/Header";
import BoardDetails from "../../components/board-details/BoardDetails";
import WeeklyCalendarDisplay from "../../components/weekly-calendar-display/WeeklyCalendarDisplay";
import UserRow from "../../components/user/UserRow";

const Hourly = () => {
  const board = useSelector((state) => state.board);
  const [startingDayIndex, setStartingDayIndex] = useState(0);
  const [endingDayIndex, setEndingDayIndex] = useState(7);
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const getMaxDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  const daysInMonth = getMaxDaysInMonth(month, year);
  const handleNextWeek = () => {
    if (endingDayIndex <= 28) {
      setEndingDayIndex((prev) => prev + 7);
      setStartingDayIndex((prev) => prev + 7);
    }
    if (endingDayIndex === 28) {
      setEndingDayIndex(daysInMonth);

      return;
    }
  };
  const handlePrevWeek = () => {
    if (startingDayIndex === 0) return;
    if (endingDayIndex === daysInMonth) {
      setEndingDayIndex(28);
      setStartingDayIndex((prev) => prev - 7);

      return;
    }
    setStartingDayIndex((prev) => prev - 7);
    setEndingDayIndex((prev) => prev - 7);
  };

  if (!board.board)
    return (
      <div className="loader">
        <Loader size={40} />
      </div>
    );
  return (
    <div className="main-container">
      <Header />
      <Flex className="hourly-calendar">
        <Box className="header-container">
          <BoardDetails />
          <WeeklyCalendarDisplay
            startingDayIndex={startingDayIndex}
            endingDayIndex={endingDayIndex}
            handlePrevWeek={handlePrevWeek}
            handleNextWeek={handleNextWeek}
            month={month}
            year={year}
            daysInMonth={daysInMonth}
          />
        </Box>
        <Box className="users-container">
          {board.userItems &&
            board.userItems.map((member) => (
              <UserRow
                key={member._id}
                member={member}
                startingDayIndex={startingDayIndex}
                endingDayIndex={endingDayIndex}
                daysInMonth={daysInMonth}
              />
            ))}
        </Box>
      </Flex>
    </div>
  );
};

export default Hourly;
