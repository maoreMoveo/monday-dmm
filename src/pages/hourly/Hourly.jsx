import React from "react";
import { useSelector } from "react-redux";
// import Button from "monday-ui-react-core/dist/Button";
import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import "./_hourly.scss";
import { boardService } from "../../services/board.service";

const Hourly = () => {
  const board = useSelector((state) => state.board);

console.log('board')
console.log(board)

if( !board.board) return <h1>loading</h1>
  return (
    <div className="main-container">
      <nav>
        <div className="title">
          <h1>{board.board.boardName}</h1>
        </div>
        <div className="controls">
          <Button
            onClick={() =>
              boardService.sendNotification("", board.board.boardId, "ani pantera  ani era vcolam yeshenim")
            }
          >
            Set Auto R
          </Button>
        </div>
      </nav>
      <div className="hourly-calendar">
        {board.userItems &&
          board.userItems.map((item) => (
            <div>
              <h1> user name:{item.person}</h1>
              <h1>total items:{item.allUserItems.length}</h1>
              <h1>
                total missed item:
                {item.allUserItems.filter((item) => !item).length}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Hourly;
