import React from "react";
import "./_user-card.scss";

const UserCard = ({ isValid = -1, emptyWeekDay = -1 }) => {
  return (
    <div className="card">
      {isValid > 0 && (
        <div
          className={`card-content ${isValid ? "valid" : "invalid"} 
        }}`}
        ></div>
      )}
      {!isValid && (
        <div>
          <div className="card-content invalid"></div>
        </div>
      )}
      {emptyWeekDay > 0 && <div className={`card-content week-day`}></div>}
      {!emptyWeekDay && (
        <div className="card-content week-end">
          <div className="cross"></div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
