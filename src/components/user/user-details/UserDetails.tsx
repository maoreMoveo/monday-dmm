import React from "react";
import "./_user-details.scss";
//@ts-ignore
import { Box } from "monday-ui-react-core";
import { useSelector } from "react-redux";
import { boardService } from "../../../services/board.service";
import { User } from "../../../types/user";
import { RootStore } from "../../../store/store";
interface IPropsUserDetails{
  member:User
}
const UserDetails = ({ member }:IPropsUserDetails) => {
  const users = useSelector((state:RootStore) => state.board.userItems);

  const getFirstNameFirstLetterAndLastNameFirstLatter = (name:string) => {
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
