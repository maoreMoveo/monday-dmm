import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import AppSolution from "./AppSolution";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const text = new AppSolution().state.settings.text;
  useEffect(() => {
    monday.execute("valueCreatedForUser");

monday.get('context').then((res)=>{
  console.log('context')
  console.log(res.data);
  console.log(res.data.boardId)
})
    monday.listen("context", (res) => {
    setContext(res.data);
    });

  }, []);
  
 
  return (
    <div className="App">
      <div className="box">
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default App;
