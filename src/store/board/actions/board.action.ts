import { createAsyncThunk } from "@reduxjs/toolkit";
import { boardService } from "../../../services/board.service";
export const getAllItems = createAsyncThunk(
    "board/getAllItemsBoard",
    async (id:string) => {
      const res:any = await boardService.fetchBoard(id);
      const allItems= res.boards[0].items.map((item:any)=>{
        const obj= item.column_values.reduce((obj:any, item:any) => Object.assign(obj, { [item.id]: item.text }), {})
        const itemObj={
          _id: item.id,
          name: item.name,
          ...obj
        }
        return itemObj;
        });
      return allItems;
    }
  );
  export const getAllMemberFromBoard= createAsyncThunk('board/getAllMembersBoard',async(id:string)=>{
    const res:any= await boardService.fetchMembersOfBoard(id);
    console.log('members');
    console.log(res);
     return res.boards[0].subscribers;
  })
  