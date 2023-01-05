import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardService } from "../../../services/board.service";
import { Board } from "../../../types/board";
import { Member } from "../../../types/member";
import { User } from "../../../types/user";
export const getBoardData = async (id: string) => {
  const res: any = await boardService.fetchBoard(id);
  const allItems = res.boards[0].items.map((item: any) => {
    const obj = item.column_values.reduce(
      (obj: any, item: any) => Object.assign(obj, { [item.id]: item.text }),
      {}
    );
    const itemObj = {
      _id: item.id,
      name: item.name,
      ...obj,
    };
    return itemObj;
  });
  return {boardId: res.boards[0].id, allItems: allItems, boardName:res.boards[0].name };
};
export const getAllMemberFromBoard = async (id: string) => {
  const res: any = await boardService.fetchMembersOfBoard(id);
  return res.boards[0].subscribers;
};

export const getItemsAndMembers = createAsyncThunk(
  "board/getAllItemsAndMembers",
  async (id: string) => {
    const board:Board = await getBoardData(id);
    console.log("all items", board.allItems);

    const allMembers:Member[] = await getAllMemberFromBoard(id);
    console.log("all members", allMembers);

    const itemsByUser:User[] = boardService.mapDataByUserItems(
      board.allItems,
      allMembers
    );
    console.log("all items by user");
    console.log(itemsByUser);
    return {
      board,
      itemsByUser,
      allMembers,
    };
  }
);
