import { createSlice } from "@reduxjs/toolkit";
import { getAllItems, getAllMemberFromBoard } from "./actions/board.action";
import { NullLiteral } from "@babel/types";

interface initialStateI {
  boards: [] | null;
  items: [] | null;
  boardMembers:[] | null|{};
}

const initialState: initialStateI = {
  boards: null,
  items: null,
  boardMembers:null
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllItems.fulfilled, (state, action) => {
      console.log(action.payload);
      state.items = action.payload;
    });
    builder.addCase(getAllMemberFromBoard.fulfilled, (state, action) => {
      console.log(action.payload);
      state.boardMembers = action.payload;
    });
   
  },
});

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
