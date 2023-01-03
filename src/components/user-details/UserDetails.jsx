import React from "react";
import "./_user-details.scss";
import { Box } from "monday-ui-react-core";

const UserDetails = ({ member }) => {
  const getFirstNameFirstLetterAndLastNameFirstLatter = (name) => {
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1];
    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <Box className="user-details">
      <div className="user-avatar">
        {getFirstNameFirstLetterAndLastNameFirstLatter(member.name)}
      </div>
      <div className="user-name">
        <p>{member.name}</p>
      </div>
    </Box>
  );
};

export default UserDetails;
