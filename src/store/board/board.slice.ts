import { createSlice } from "@reduxjs/toolkit";
import { getItemsAndMembers } from "./actions/board.action";
import { Member } from "../../types/member";
import { User } from "../../types/user";
import { Board } from "../../types/board";

interface initialStateI {
  board: Board | null;
  userItems: User[] | null;
  boardMembers: Member[] | null;
}

const initialState: initialStateI = {
  board: null,
  userItems: null,
  boardMembers: null,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemsAndMembers.fulfilled, (state, action) => {
      state.board= action.payload.board;
      state.userItems = action.payload.itemsByUser;
      state.boardMembers = action.payload.allMembers;
    });
  },
});

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
