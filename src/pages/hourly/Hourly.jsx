import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import "./_hourly.scss";
import Header from "../../components/header/Header";
import BoardDetails from "../../components/board-details/BoardDetails";
import UserDetails from "../../components/user-details/UserDetails";
import WeeklyCalendarDisplay from "../../components/weekly-calendar-display/WeeklyCalendarDisplay";

const Hourly = () => {
  const board = useSelector((state) => state.board);

  console.log("board");
  console.log(board);

  if (!board.board) return <h1>loading</h1>;
  return (
    <div className="main-container">
      <Header />
      <Flex className="hourly-calendar">
        <Box>
          <BoardDetails />
          {/* {board.boardMembers &&
            board.boardMembers.map((member) => (
              <UserDetails key={member.id} member={member} />
            ))} */}
        </Box>
        <Box>
          {/* <div className="">Calendar nav</div>
          <div>Calendar grid</div> */}
          <WeeklyCalendarDisplay />
        </Box>
        {/* {board.userItems &&
          board.userItems.map((item) => (
            <div>
              <h1> user name:{item.person}</h1>
              <h1>total items:{item.userItems.length}</h1>
              <h1>
                total missed item:
                {item.userItems.filter((item) => !item).length}
              </h1>
            </div>
          ))} */}
      </Flex>
    </div>
  );
};

export default Hourly;
