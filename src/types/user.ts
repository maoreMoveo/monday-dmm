import { UserItem } from "./userItem";
export type User = {
  person: string;
  userItems: UserItem[];
  _id: number;
};
