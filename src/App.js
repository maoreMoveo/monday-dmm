import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllItems,
  getAllMemberFromBoard,
} from "./store/board/actions/board.action";
import _ from "lodash";
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  let boardByUser = null;
  useEffect(() => {
    monday.execute("valueCreatedForUser");
    // monday.get("context").then((res) => {});
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  useEffect(() => {
    if (context) {
      const { boardId } = context;
      if (!board.boardMembers && !board.items) {
        dispatch(getAllItems(boardId));
        dispatch(getAllMemberFromBoard(boardId));
      }
    }
  }, [dispatch, context, board]);

  const workingDatesWithWeekend = (maxDay, month, year) => {
    const arr = new Array(maxDay).fill(null);
    for (let i = 0; i < arr.length; i++) {
      const weekDay = new Date(`${month}, ${i}, ${year}`).getDay();
      if (weekDay === 5 || weekDay === 6) {
        // change to as const index array
        arr[i] = "weekend";
      }
    }
    return arr;
  };
  const filterDataByUserItems = () => {
    const date = new Date();
    const maxDayInMonthToCheck = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const sortItem = _.sortBy(board.items, ["person", "date4"]);
    const arrWeekandMonth = workingDatesWithWeekend(
      maxDayInMonthToCheck,
      month,
      year
    );
    const boardByUser = board.boardMembers.map((member) => {
      const allUserItems = _.filter(sortItem, { person: member.name });
      let userItemTemp = [...arrWeekandMonth];
      allUserItems.map((userItem) => {
        const itemDate = {
          day: +userItem.date4.slice(8),
          month: +userItem.date4.slice(5, 7),
          year: +userItem.date4.slice(0, 4),
        };
        //add only if date did not past through the requirement
        if (
          itemDate.day <= date.getDate() &&
          itemDate.month <= month &&
          itemDate.year <= year
        ) {
          userItemTemp[+itemDate.day - 1] = userItem;
        }
      });
      return {
        _id: member.id,
        person: member.name,
        userItems: userItemTemp,
      };
    });
    console.log("board by user");
    console.log(boardByUser);
    return boardByUser;
  };

  if (board && board.items && board.boardMembers) {
    boardByUser = filterDataByUserItems();
  }
  return (
    <div className="App">
      <div className="box">
        {boardByUser &&
          boardByUser.map((item) => (
            <div>
              <h1> user name:{item.person}</h1>
              <h1>total items:{item.userItems.length}</h1>
              <h1>
                total missed item:
                {item.userItems.filter((item) => !item).length}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
