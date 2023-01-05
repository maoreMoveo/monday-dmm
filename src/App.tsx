import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
//@ts-ignore
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAndMembers } from "./store/board/actions/board.action";
import Hourly from "./pages/hourly/Hourly";
import { AppDispatch, RootStore } from "./store/store";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const board = useSelector((state:RootStore) => state.board);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res:any) => {
      setContext(res.data);
    });
  }, []);

  useEffect(() => {
    if (context) {
      const { boardId } = context;
      if (!board.boardMembers && !board.userItems) {
        (async () => {
           dispatch(getItemsAndMembers(boardId));
        })();
      }
    }
  }, [dispatch, context, board]);


  return (
    <div className="App">
      <Hourly />
    </div>
  );
};

export default App;
