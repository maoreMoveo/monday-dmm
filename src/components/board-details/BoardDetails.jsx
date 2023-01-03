import React from "react";
import { useSelector } from "react-redux";
import { Box } from "monday-ui-react-core";
import "./_board-details.scss";

const BoardDetails = () => {
  const board = useSelector((state) => state.board);
  const boardMembers = useSelector((state) => state.board.boardMembers);
  const users = useSelector((state) => state.board.userItems);
  console.log(users, "users");

  const missingLogs = users.reduce((acc, user) => {
    const missingFiledTasks = user.userItems.filter((item) => !item);
    return acc + missingFiledTasks.length;
  }, 0);

  const getCountOfMissingFiledHoursFromAllUsers = (users) => {
    let hoursCounter = 0;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      for (let j = 0; j < user.userItems.length; j++) {
        const item = user.userItems[j];
        if (!item) continue;
        for (let k = 0; k < item.length; k++) {
          const slot = item[k];
          if (!slot.actual_hours || slot.actual_hours === "0") {
            hoursCounter++;
          }
        }
      }
    }
    return hoursCounter;
  };
  const missingFiledHours = getCountOfMissingFiledHoursFromAllUsers(users);

  return (
    <Box className="board-details">
      <h2>{board.board.boardName}</h2>
      <div className="board-info">
        <p className="total-members">{boardMembers.length} Board Members</p>
        <p className="total-missing-logs">
          {/* {missingLogs + missingFiledHours} Members with missing logs */}
          {missingLogs + missingFiledHours} Tasks with missing logs
        </p>
      </div>
    </Box>
  );
};

export default BoardDetails;
