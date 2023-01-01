import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAndMembers } from "./store/board/actions/board.action";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
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
      <div className="box">
        {board.items &&
          board.items.map((item) => (
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
