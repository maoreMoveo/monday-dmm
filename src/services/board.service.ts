import mondaySdk from "monday-sdk-js";
import _ from "lodash";
const monday = mondaySdk();

const fetchBoard = async (id: string) => {
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
  try {
    const res = await monday.api(query);
    console.log(" all board data");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const fetchMembersOfBoard = async (id: string) => {
  const query: string = `query {  
    boards(ids:${id}) {
      id
      subscribers {
        id
        name
      }
    } 
    }`;
  try {
    const members = await monday.api(query);
    return members.data;
  } catch (error) {
    console.log(error);
  }
};

const _workingDatesWithWeekend = (
  maxDay: number,
  month: number,
  year: number
) => {
  const arr = new Array(maxDay).fill(null);
  for (let i = 0; i < arr.length; i++) {
    const weekDay = new Date(`${month}, ${i}, ${year}`).getDay();
    if (weekDay === 5 || weekDay === 6) {
      // change to as const index array
      arr[i] = "weekend";
    }
  }
  return arr;
};

export const filterDataByUserItems = (allItems: any, allMembers: any) => {
  const date = new Date();
  const maxDayInMonthToCheck = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const sortItem = _.sortBy(allItems, ["person", "date4"]);
  const arrWeekandMonth = _workingDatesWithWeekend(
    maxDayInMonthToCheck,
    month,
    year
  );
  const boardByUser = allMembers.map((member: any) => {
    const allUserItems = _.filter(sortItem, { person: member.name });
    let userItemTemp = [...arrWeekandMonth];
    allUserItems.map((userItem) => {
      const itemDate = {
        day: +userItem.date4.slice(8),
        month: +userItem.date4.slice(5, 7),
        year: +userItem.date4.slice(0, 4),
      };
      //add only if date did not past through the requirement
      if (
        itemDate.day <= date.getDate() &&
        itemDate.month <= month &&
        itemDate.year <= year
      ) {
        if (userItemTemp[+itemDate.day - 1]) {
          userItemTemp[+itemDate.day - 1] = [
            ...userItemTemp[+itemDate.day - 1],
            userItem,
          ];
        } else {
          userItemTemp[+itemDate.day - 1] = [userItem];
        }
      }
    });
    return {
      _id: member.id,
      person: member.name,
      userItems: userItemTemp,
    };
  });
  return boardByUser;
};

export const boardService = {
  fetchBoard,
  fetchMembersOfBoard,
  filterDataByUserItems,
};
