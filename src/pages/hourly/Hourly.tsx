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
import { RootStore } from "../../store/store";

const Hourly = () => {
  const board = useSelector((state:RootStore) => state.board);
  const [startingDayIndex, setStartingDayIndex] = useState<number>(0);
  const [endingDayIndex, setEndingDayIndex] = useState<number>(7);
  const month:number = new Date().getMonth();
  const year:number = new Date().getFullYear();
  const getMaxDaysInMonth = (month:number, year:number) => {
    return new Date(year, month, 0).getDate();
  };
  const daysInMonth:number = getMaxDaysInMonth(month, year);
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
