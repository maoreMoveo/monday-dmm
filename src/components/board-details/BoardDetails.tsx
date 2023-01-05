import React from "react";
import { useSelector } from "react-redux";
//@ts-ignore
import { Box,Loader } from "monday-ui-react-core";
import "./_board-details.scss";
import { boardService } from "../../services/board.service";
import { RootStore } from "../../store/store";
const BoardDetails = () => {
  const board = useSelector((state:RootStore) => state.board);
  const boardMembers = useSelector((state:RootStore) => state.board.boardMembers);
  const users = useSelector((state:RootStore) => state.board.userItems);
  console.log(users, "users");

  const numberOfInvalidMembers:number =
    boardService.getUserIdsOfMissingItems(users).length;
    if(!board.board || !boardMembers)
    return  (
      <div className="loader">
        <Loader size={40} />
      </div>
    );
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
