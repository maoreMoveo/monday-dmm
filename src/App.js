import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAndMembers } from "./store/board/actions/board.action";
import Hourly from "./pages/hourly/Hourly";
import _ from "lodash";
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const board = useSelector((state) => state.board);

  const dispatch = useDispatch();
  console.log("context:  ");
  console.log(context);

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      setContext(res.data);
    });
    //check with sss
    monday.listen("filter", (res) => {
      console.log('filter data');
      console.log(res );
    });
    monday.listen("itemIds", (res) => {
      console.log('person item to filter')
      console.log(res.data)
      if(board){
     console.log(filterbyPerson(res.data));
      }
    });
  }, []);

  //filter by person 
  const filterbyPerson = (arrPesronItem) => {
    // i need to check the length from the filterarray with personitem array
    //and if it bigger lenght  from the filterArray is will be to show all Items from redux
    let findUser = [];
    findUser = _.filter(board.userItems, (user) => {
     return _.find(user.allUserItems,(item) =>  item && _.find(item,(it) => it._id === arrPesronItem[0].toString()))});
     return findUser;
  };

  useEffect(() => {
    if (context ) {
      const { boardId } = context;
      if (!board.boardMembers && !board.items) {
        (async () => {
          await dispatch(getItemsAndMembers(boardId));
        })();
      }
    }
  }, [dispatch, context, board]);

    if(board.boardMembers){
      console.log('boarddddddd member')
        console.log(_.find(board.boardMembers,{'name':"Guy Rubinstein"}));
    }
  return (
    <div className="App">
      <Hourly />
    </div>
  );
};

export default App;
