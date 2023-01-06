import React from "react";
import UserCard from "./user-card/UserCard";
import UserDetails from "./user-details/UserDetails";
import "./_user-row.scss";
import _ from "lodash";
import { boardService } from "../../services/board.service";
import { User } from "../../types/user";
interface IPropsUserRow {
  member: any;
  startingDayIndex: number;
  endingDayIndex: number;
  daysInMonth: number;
}
const UserRow = ({
  member,
  startingDayIndex,
  endingDayIndex,
  daysInMonth,
}: IPropsUserRow) => {
  const month: number = new Date().getMonth() + 1;
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
          const userItem=member.userItems[idx+startingDayIndex]
          const isNotValid =
          userItem === null ||
            _.find(
              userItem,
              (slot: any) => slot.actual_hours === ""
            );
          const valid =
          userItem && userItem !== "weekend";
          if (startingDayIndex > member.userItems.length) {
            if (idx === 5 || idx === 6) {
              return <UserCard emptyWeekDay={false} />;
            }
            return <UserCard emptyWeekDay={true} />;
          }
          if (idx === 5 || idx === 6) {
            if (isNotValid) {
              return <UserCard isValid={false} emptyWeekDay={false} />;
            }
            if (valid) {
              return <UserCard isValid={true} emptyWeekDay={false} />;
            }
            return <UserCard emptyWeekDay={false} />;
          }
          if (isNotValid) {
            return <UserCard isValid={false} />;
          }
           return <UserCard isValid={true} />;
        })}
    </div>
  );
};

export default UserRow;
