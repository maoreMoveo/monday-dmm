import React, { ChangeEvent, useState } from "react";
import "./_reminder-modal.scss";
//@ts-ignore
import { Icon, Loader } from "monday-ui-react-core";
//@ts-ignore
import { CloseSmall } from "monday-ui-react-core/icons";
import { boardService } from "../../../services/board.service";
import { useSelector } from "react-redux";
import { RootStore } from "../../../store/store";
import { Member } from "../../../types/member";
import { UserItem } from "../../../types/userItem";
import { User } from "../../../types/user";
import ModalMain from "./ModalMain";
import ModalSuccess from "./ModalSuccess";
import ModalControls from "./ModalControls";

interface IPropsReminder {
  handleToggleModal: () => void;
}

const ReminderModal = ({ handleToggleModal }: IPropsReminder) => {
  const board = useSelector((state: RootStore) => state.board);
  const [selectSendTo, setSelectSendTo] = useState("incomplete");
  const [finishedSending, setFinishedSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectSendTo(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try{
      if (selectSendTo === "incomplete") {
        await sendMessegeToUserWithIncompleteItems();
      } else {
        await sendMessegeToAllUserBoard();
      }
      setFinishedSending(true);
    }catch(err){
      console.log(err);
    }
  };

  const sendMessegeToAllUserBoard = async () => {
    if (!board.boardMembers) return;
    const res = await Promise.all(
      board.boardMembers.map(async (member: Member) => {
        const text = `Hi, ${member.name}
         This is a reminder from Hourly to log your hours.
         Please enter the board to log it in.
         (https://moveogroup.monday.com/boards/${board.board!.boardId}/)`;
        return await boardService.sendNotification(
          member.id.toString(),
          board.board!.boardId,
          text
        );
      })
    );
    if (res) console.log("all messege to everybody send");
  };

  const sendMessegeToUserWithIncompleteItems = async () => {
    if (!board.userItems) return;
    const arr: User[] = [];
    board.userItems.map((user: User) => {
      user.userItems.map((item: any) => {
         if(item==='weekend') return arr.push();
        if (!item) arr.push(user);
        else
          item.map((it: UserItem) => {
            if (it.actual_hours === "") arr.push(user);
          });
      });
    });
    const temparr = [...new Set(arr)];
    if(temparr.length===0) return
    const res = await Promise.all(
      temparr.map(async (userItem: User) => {
        const text = `Hi, ${userItem.person}
         This is a reminder from Hourly to log your hours.
         Please enter the board to log it in.
         (https://moveogroup.monday.com/boards/${board.board!.boardId}/)`;
        return await boardService.sendNotification(
          userItem._id.toString(),
          board.board!.boardId,
          text
        );
      })
    );
   if (res) console.log("all messege send");
  };
  if (!board)
    return (
      <div className="loader">
        <Loader size={40} />
      </div>
    );
  return (
    <div className="reminder-modal">
      <div className="close-modal" onClick={handleToggleModal}>
        <Icon
          iconType={Icon.type.SVG}
          icon={CloseSmall}
          iconLabel="x"
          iconSize={20}
        ></Icon>
      </div>

      {!loading ? (
        <ModalMain handleChange={handleChange} selectSendTo={selectSendTo} />
      ) : (
        <ModalSuccess finishedSending={finishedSending} />
      )}
      {!loading && (
        <ModalControls
          handleSubmit={handleSubmit}
          handleToggleModal={handleToggleModal}
        />
      )}
    </div>
  );
};

export default ReminderModal;
