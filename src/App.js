import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import AppSolution from "./AppSolution";
import { boardService } from "./services/board.service";
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
  let boardByUser=null
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
      //const board = await boardService.fetchBoard(boardId);
      if (!board.boardMembers && !board.items) {
        dispatch(getAllItems(boardId));
        dispatch(getAllMemberFromBoard(boardId));
      }
    }
  }, [dispatch, context, board]);

  // console.log(context);
  // console.log(board.boardMembers)
  // console.log(board.items)

  const calcWeekndDay = (maxDay, month, year) => {
    const arr =  new Array(maxDay).fill(null);
    // console.log(`${month}, ${31}, ${year}`);
    for (let i = 0; i < arr.length; i++) {
      const weekDay = new Date(`${month}, ${i}, ${year}`).getDay();
      if (weekDay === 5 || weekDay === 6) {
        arr[i] = "weekend";
      }
    }
    return arr;
  };
  const filterdata = () => {
    const date = new Date();
    const maxDayInMonthToCheck = date.getDate();
    const sortItem = _.sortBy(board.items, ["person", "date4"]);
    const arrWeekandMonth = calcWeekndDay(
      maxDayInMonthToCheck,
      date.getMonth() + 1,
      date.getFullYear()
    );
    console.log("new array with weekend");
    console.log(arrWeekandMonth);
    const boardByUser = board.boardMembers.map((member) => {
      // const arr= new Array([...arrWeekandMonth]);
      const allUserItems = _.filter(sortItem, { person: member.name });
      let arr=[...arrWeekandMonth];
      allUserItems.map((userItem) => {
        const itemDate = {
          day: +userItem.date4.slice(8),
          month: +userItem.date4.slice(5, 7),
          year: +userItem.date4.slice(0, 4),
        };
        //add only if it now past date
        if (
          itemDate.day <= date.getDate() &&
          itemDate.month <= date.getMonth() + 1 &&
          itemDate.year <= date.getFullYear()
        ) {
          arr[+itemDate.day-1] = userItem;
        }
      });
      return {
        _id: member.id,
        person: member.name,
        userItems: arr,
      };
    });
    console.log("board by user");
    console.log(boardByUser);
    return boardByUser;
  };

  if (board && board.items && board.boardMembers) {
    boardByUser= filterdata();
    
  }
  return (
    <div className="App">
      <div className="box">
        {boardByUser && boardByUser.map((item)=>
        <div>
           <h1> user name:{item.person}</h1>
           <h1>total items:{item.userItems.length}</h1>
           <h1>total missed item:{item.userItems.filter((item)=> !item ).length}</h1>
           </div>
        )}
      </div>
    </div>
  );
};

export default App;
