import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import AppSolution from "./AppSolution";
import { boardService } from "./services/board.service";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const text = new AppSolution({}).state.settings.text;

  if (context) {
    (async () => {
      const { boardId } = context;
      const board = await boardService.fetchBoard(boardId);
      console.log(board, "in board app");
    })();
  }

  useEffect(() => {
    monday.execute("valueCreatedForUser");

    monday.get("context").then((res) => {
      console.log("context");
      console.log(res.data);
      console.log(res.data.boardId);
    });

    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  console.log(context);

  return (
    <div className="App">
      <div className="box">
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default App;
