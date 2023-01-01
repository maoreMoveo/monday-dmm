import { createSlice } from "@reduxjs/toolkit";
import { getItemsAndMembers } from "./actions/board.action";

interface initialStateI {
  boards: [] | null;
  userItems: [] | null;
  boardMembers: [] | null;
}

const initialState: initialStateI = {
  boards: null,
  userItems: null,
  boardMembers: null,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemsAndMembers.fulfilled, (state, action) => {
      state.userItems = action.payload.itemsByUser;
      state.boardMembers = action.payload.allMembers;
    });
  },
});

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
