import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board/board.slice";

const rootReducer = combineReducers({
  board: boardReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type RootStore = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
