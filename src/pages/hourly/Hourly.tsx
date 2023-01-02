import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
// import Button from "monday-ui-react-core/dist/Button";
import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import "./_hourly.scss";

const Hourly = () => {
  const board = useSelector((state: RootStore) => state.board);

  return (
    <div className="main-container">
      <nav>
        <div className="title">
          <h1>Hourly</h1>
        </div>
        <div className="controls">
          <Button>Set Auto R</Button>
        </div>
      </nav>
      <div className="hourly-calendar">
        {board.userItems &&
          board.userItems.map((item: any) => (
            <div>
              <h1> user name:{item.person}</h1>
              <h1>total items:{item.userItems.length}</h1>
              <h1>
                total missed item:
                {item.userItems.filter((item: any) => !item).length}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Hourly;
