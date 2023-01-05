import React, { useState } from "react";
import "./_reminder-modal.scss";
import { Button, Icon, Loader } from "monday-ui-react-core";
import { CloseSmall, Check } from "monday-ui-react-core/icons";
import { boardService } from "../../../services/board.service";
import { useSelector } from "react-redux";

const ReminderModal = ({ handleToggleModal }) => {
  const board = useSelector((state) => state.board);
  const [selectSendTo, setSelectSendTo] = useState("incomplete");
  const [finishedSending, setFinishedSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setSelectSendTo(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (selectSendTo === "incomplete") {
      await sendMessegeToUserWithIncompleteItems();
    } else {
      await sendMessegeToAllUserBoard();
    }
    setFinishedSending(true);
  };

  const sendMessegeToAllUserBoard = async () => {
    const res = await Promise.all(
      board.boardMembers.map(async (member) => {
        const text = `Hi, ${member.name}
         This is a reminder from Hourly to log your hours.
         Please enter the board to log it in.
         (https://moveogroup.monday.com/boards/${board.board.boardId}/)`;
        return await boardService.sendNotification(
          member.id.toString(),
          board.board.boardId,
          text
        );
      })
    );
    if (res) console.log("all messege  to everybody send");
  };

  const sendMessegeToUserWithIncompleteItems = async () => {
    const arr = [];
    board.userItems.map((user) => {
      user.userItems.map((item) => {
        if (!item) arr.push(user);
        else
          item.map((it) => {
            if (it.actual_hours === "") arr.push(user);
          });
      });
    });
    const temparr = [...new Set(arr)];
    const res = await Promise.all(
      temparr.map(async (userItem) => {
        const text = `Hi, ${userItem.person}
         This is a reminder from Hourly to log your hours.
         Please enter the board to log it in.
         (https://moveogroup.monday.com/boards/${board.board.boardId}/)`;
        return await boardService.sendNotification(
          userItem._id.toString(),
          board.board.boardId,
          text
        );
      })
    );
    if (res) console.log("all messege send");
  };

  return (
    <div className="reminder-modal">
      <div className="close-modal" onClick={handleToggleModal}>
        <Icon
          className="close-icon"
          iconType={Icon.type.SVG}
          icon={CloseSmall}
          iconLabel="x"
          iconSize={20}
        ></Icon>
      </div>

      {!loading ? (
        <div className="modal-main">
          <div className="modal-title">Send Reminder</div>
          <div className="modal-instruction">
            <p>
              Send your team members a reminder to make sure they don’t forget
              to log in their hours.
            </p>
          </div>
          <div className="send-who">
            <span>To:</span>
            <div className="send-who-selection">
              <div className="incomplete-members">
                <input
                  type="radio"
                  id="incomplete"
                  name="send-who"
                  value="incomplete"
                  onChange={(event) => handleChange(event)}
                  checked={selectSendTo === "incomplete"}
                />
                <label for="incomplete">Members with missing entries</label>
              </div>
              <div className="all-members">
                <input
                  type="radio"
                  id="all"
                  name="send-who"
                  value="all"
                  onChange={(event) => handleChange(event)}
                  checked={selectSendTo === "all"}
                />
                <label for="all">Everyone</label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-loading">
          {finishedSending && (
            <>
              <Icon
                clickable={false}
                iconType={Icon.type.SVG}
                icon={Check}
                iconLabel="V"
                iconSize={50}
              ></Icon>
              <span>Reminder Sent</span>
            </>
          )}
          {!finishedSending && <Loader size={40} />}
        </div>
      )}
      {!loading && (
        <div className="modal-controls">
          <div className="buttons">
            <Button
              color="primary-background-color"
              style={{ color: "#000" }}
              className="cancel"
              onClick={handleToggleModal}
            >
              Cancel
            </Button>
            <Button className="send" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderModal;
