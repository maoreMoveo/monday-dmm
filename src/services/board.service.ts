import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

const fetchBoard = async (id: string) => {
  //   monday
  //     .api(`query { boards(ids: ${id}) { id name } }`)
  //     .then((res) => {
  //       console.log(res.data); // log the API response
  //     })
  //     .catch((error) => {
  //       console.error(error); // log any errors
  //     });
  const query = `query {  
    boards(ids:${id}) {
      id
      items {
        id
        name
        column_values (ids: [date4, project_name,actual_hours,status,person,team_member7]) {
          id
           text
           # value
        }
      }
    
    } 
    }`;
  const res = await monday.api(query);
  console.log(' all board data')
  console.log(res.data)
  return res.data;
};
const fetchMembersOfBoard= async(id:string)=>{
  const query:string=`query {  
    boards(ids:${id}) {
      id
      subscribers {
        id
        name
      }
    } 
    }`;
const members= await monday.api(query);
console.log('data members sservice')
console.log(members)
return members.data;
}
export const boardService = {
  fetchBoard,
  fetchMembersOfBoard
};
