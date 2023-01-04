import React from "react";
import "./_user-details.scss";
import { Box } from "monday-ui-react-core";
import { useSelector } from "react-redux";
import { boardService } from "../../../services/board.service";

const UserDetails = ({ member }) => {
  const users = useSelector((state) => state.board.userItems);

  const getFirstNameFirstLetterAndLastNameFirstLatter = (name) => {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    return `${firstName[0]}${lastName[0]}`;
  };

  const isMarkedUser = boardService
    .getUserIdsOfMissingItems(users)
    .includes(member._id);

  return (
    <Box className="user-details">
      <div className={`user-avatar ${isMarkedUser ? "marked-user" : ""}`}>
        {getFirstNameFirstLetterAndLastNameFirstLatter(member.person)}
      </div>
      <div className="user-name">
        <p>{member.person}</p>
      </div>
    </Box>
  );
};

export default UserDetails;
