import React from "react";
import UserCard from "./user-card/UserCard";
import UserDetails from "./user-details/UserDetails";
import "./_user-row.scss";
import _ from "lodash";
import { boardService } from "../../services/board.service";

const UserRow = ({ member, startingDayIndex, endingDayIndex, daysInMonth }) => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const daysInMonthArray = boardService.workingDatesWithWeekend(
    daysInMonth,
    month,
    year
  );

  return (
    <div className="row">
      <UserDetails member={member} />
      {daysInMonthArray
        .slice(startingDayIndex, endingDayIndex)
        .map((day, idx) => {
          if (idx === 5 || idx === 6) {
            return <UserCard emptyWeekDay={false} />;
          }
          if (startingDayIndex > member.userItems.length) {
            return <UserCard emptyWeekDay={true} />;
          }
          if (
            member.userItems[idx] === null ||
            _.find(member.userItems[idx], (slot) => slot.actual_hours === "")
          ) {
            return <UserCard isValid={false} />;
          }

          if (!member.userItems[idx]) return <UserCard emptyWeekDay={true} />;
          return <UserCard isValid={true} />;
        })}
    </div>
  );
};

export default UserRow;
