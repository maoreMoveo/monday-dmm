import React from "react";
import "./_user-card.scss";
//@ts-ignore
import {  Icon } from "monday-ui-react-core";
//@ts-ignore
import {Check} from 'monday-ui-react-core/icons';
interface IPropsUserCard{
  isValid?: boolean | number;
  emptyWeekDay?: boolean| number;
}
const UserCard = ({ isValid = -1, emptyWeekDay = -1 }:IPropsUserCard) => {
  return (
    <div className="card">
      {isValid > 0 && (
        <div
          className={`card-content ${isValid ? "valid" : "invalid"} 
        }}`}
        >
         <Icon
          iconType={Icon.type.SVG}
          icon={Check}
          iconLabel="x"
          iconSize={24}
         style={{color:'#ffffff'}}
        ></Icon>
        </div>
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
