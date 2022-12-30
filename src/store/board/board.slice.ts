import { createSlice } from "@reduxjs/toolkit";

interface initialStateI {
  boards: [] | null;
}

const initialState: initialStateI = {
  boards: null,
};

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
});

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
