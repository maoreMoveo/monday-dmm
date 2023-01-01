import React from "react";
import { useState, useEffect } from "react";
import "./assets/styles/styles.scss";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAndMembers } from "./store/board/actions/board.action";

const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  console.log('context:  ')
  console.log(context)

  useEffect(() => {
    monday.execute("valueCreatedForUser");
    monday.listen("context", (res) => {
      console.log('listen')
      setContext(res.data);
    });
   
  }, []);
  const send=()=>{
    let query = "mutation { create_notification (user_id: 37057233, target_id: 3720367995, text: \"This is a reminder to fill out the actual hours!\", target_type: Project) { text } }";

fetch ("https://api.monday.com/v2", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIxNDE5NTAzNSwidWlkIjozNzA1NzMxOCwiaWFkIjoiMjAyMi0xMi0yOFQxMDoxOTo0OS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTEwMjMyOCwicmduIjoidXNlMSJ9.1Oib9J6fdJD8vcN93Nfv-Uu2Vsd-5BDiqpJTGjZLOho'

   },
   body: JSON.stringify({
     query : query
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));
  }

  useEffect(() => {
    if (context) {
      const { boardId } = context;
      if (!board.boardMembers && !board.items) {
        (async () => {
          await dispatch(getItemsAndMembers(boardId));
        })();
      }
    }
  }, [dispatch, context, board]);

  console.log(board.items);
  console.log(board.boardMembers);
  return (
    <div className="App">
      <div className="box">
        {board.userItems &&
          board.userItems.map((item) => (
            <div key={item._id}>
              <h1> user name:{item.person}</h1>
              <h1>total items:{item.userItems.length}</h1>
              <h1>
                total missed item:
                {item.userItems.filter((item) => !item).length}
              </h1>
              <button onClick={()=> send()}>send email</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
