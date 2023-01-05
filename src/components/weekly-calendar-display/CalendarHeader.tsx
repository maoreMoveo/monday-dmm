import React from "react";
//@ts-ignore
import { default as rightIcon } from "../../assets/images/right.png";
//@ts-ignore
import { default as leftIcon } from "../../assets/images/left.png";
import "./_calendar-header.scss";
interface IPropsCalendar{
  handlePrevWeek:()=>void
  handleNextWeek:()=>void
  months:string[]
  month:number
  year:number
  start:number
  end:number
}
const CalendarHeader = ({
  handlePrevWeek,
  handleNextWeek,
  months,
  month,
  year,
  start,
  end,
}:IPropsCalendar) => {
  return (
    <div className="calendar-header">
      <img
        className="icon"
        src={leftIcon}
        alt="leftIcon"
        onClick={handlePrevWeek}
      />
      <p className="current-date">
        {months[month].slice(0, 3)} {`${start} - ${end},`} {year}
      </p>
      <img
        className="icon"
        src={rightIcon}
        alt="rightIcon"
        onClick={handleNextWeek}
      />
    </div>
  );
};

export default CalendarHeader;
