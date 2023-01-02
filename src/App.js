import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAndMembers } from "./store/board/actions/board.action";
import Hourly from "./pages/hourly/Hourly";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  console.log("context:  ");
  console.log(context);

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      console.log("listen");
      setContext(res.data);
    });
  }, []);
 

  useEffect(() => {
    if (context) {
      const { boardId } = context;
      if (!board.boardMembers && !board.items) {
        (async () => {
          await dispatch(getItemsAndMembers(boardId));
        })();
      }
    }
  }, [dispatch, context, board]);

  console.log(board.items);
  console.log(board.boardMembers);
  return (
    <div className="App">
      <Hourly />
    </div>
  );
};

export default App;
