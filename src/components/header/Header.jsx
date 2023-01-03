import React from "react";
import { boardService } from "../../services/board.service";
import { Button } from "monday-ui-react-core";
import { useSelector } from "react-redux";
import "./_header.scss";

const Header = () => {
  const board = useSelector((state) => state.board);
  return (
    <header>
      <div className="header-demarcation">
        <div className="title">
          <h1>Hourly</h1>
        </div>
        <div className="controls">
          <Button
            className="set-reminder"
            onClick={() =>
              boardService.sendNotification(
                "",
                board.board.boardId,
                "ani pantera  ani era vcolam yeshenim"
              )
            }
          >
            Send Reminder
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
