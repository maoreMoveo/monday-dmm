import React from "react";
import { useSelector } from "react-redux";
import { Box } from "monday-ui-react-core";
import "./_board-details.scss";
import { boardService } from "../../services/board.service";

const BoardDetails = () => {
  const board = useSelector((state) => state.board);
  const boardMembers = useSelector((state) => state.board.boardMembers);
  const users = useSelector((state) => state.board.userItems);
  console.log(users, "users");

  const numberOfInvalidMembers =
    boardService.getUserIdsOfMissingItems(users).length;
  return (
    <Box className="board-details">
      <h2>{board.board.boardName}</h2>
      <div className="board-info">
        <p className="total-members">{boardMembers.length} Board Members</p>
        <p
          className={`${
            numberOfInvalidMembers === 0 ? "valid-member" : "total-missing-logs"
          }`}
        >
          {numberOfInvalidMembers} Members with missing entries
        </p>
      </div>
    </Box>
  );
};

export default BoardDetails;
