import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardService } from "../../../services/board.service";
export const getAllItems = async (id: string) => {
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
  return allItems;
};
export const getAllMemberFromBoard = async (id: string) => {
  const res: any = await boardService.fetchMembersOfBoard(id);
  console.log("members");
  console.log(res);
  return res.boards[0].subscribers;
};

export const getItemsAndMembers = createAsyncThunk(
  "board/getAllItemsAndMembers",
  async (id: string) => {
    const allItems = await getAllItems(id);
    console.log("all items", allItems);

    const allMembers = await getAllMemberFromBoard(id);
    console.log("all members", allMembers);

    const itemsByUser = boardService.filterDataByUserItems(
      allItems,
      allMembers
    );
    console.log("all items by user");
    console.log(itemsByUser);
    return {
      itemsByUser,
      allMembers,
    };
  }
);
