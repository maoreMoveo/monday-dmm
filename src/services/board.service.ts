// @ts-ignore
import mondaySdk from "monday-sdk-js";
import _ from "lodash";
import { Member } from "../types/member";
import { User } from "../types/user";
import { UserItem } from "../types/userItem";
const monday = mondaySdk();

const fetchBoard = async (id: string) => {
  const settings = await monday.get("settings");

  console.log("setttttings");
  console.log(settings);
  const arrSettings: string[] = [
    Object.keys(settings.data.actualHours)[0],
    Object.keys(settings.data.date)[0],
    Object.keys(settings.data.person)[0],
    "status",
  ];
  console.log(arrSettings);
  const variables = {
    date4: Object.keys(settings.data.date)[0],
    actual_hours: Object.keys(settings.data.actualHours)[0],
    staus: "status",
    person: Object.keys(settings.data.person)[0],
  };
  console.log("setttttings array");
  console.log(variables);
  const query = `query  {
    boards(ids:${id}) {
      id
      name
      items {
        id
        name
        column_values(ids: [${arrSettings}]) {
          id
           text
           # value
        }
      }

    }
    }`;
  try {
    const res = await monday.api(query, { variables });
    console.log(res);
    return res.data;
  } catch (error) {
    return console.log(error);
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
const sendNotification = async (
  userId: string,
  boardId: number,
  textMessage: string
) => {
  let query = `mutation { create_notification (user_id:${userId} , target_id: ${boardId}, text: \"${textMessage}\", target_type: Project) { text } }`;
  try {
    await monday.api(query);
  } catch (err) {
    console.log(err);
  }
  console.log("send message");
};
const workingDatesWithWeekend = (
  maxDay: number,
  month: number,
  year: number
) => {
  const arr = new Array(maxDay).fill(null);
  for (let i = 0; i < arr.length; i++) {
    const weekDay = new Date(`${month}, ${i}, ${year}`).getDay();

    if (weekDay === 4 || weekDay === 5) {
      arr[i] = "weekend";
    }
  }

  return arr;
};

export const mapDataByUserItems = (allItems: any, allMembers: any) => {
  const date: Date = new Date();
  const maxDayInMonthToCheck = date.getDate();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const sortItem = _.sortBy(allItems, ["person", "date4"]);
  const arrWeekandMonth = workingDatesWithWeekend(
    maxDayInMonthToCheck,
    month,
    year
  );
  const boardByUser: User[] = allMembers.map((member: Member) => {
    const allUserItems: UserItem[] = _.filter(sortItem, {
      person: member.name,
    });
    let userItemTemp = [...arrWeekandMonth];
    allUserItems.map((userItem: UserItem) => {
      const itemDate = {
        day: +userItem.date4.slice(8),
        month: +userItem.date4.slice(5, 7),
        year: +userItem.date4.slice(0, 4),
      };
      if (
        itemDate.day <= date.getDate() &&
        itemDate.month === month &&
        itemDate.year === year
      ) {
        if (
          userItemTemp[+itemDate.day - 1] &&
          userItemTemp[+itemDate.day - 1] !== "weekend"
        ) {
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

const getUserIdsOfMissingItems = (users: User[] | null) => {
  if (!users) return [];
  const arr: number[] = [];
  users.map((user: User) => {
    user.userItems.map((item: any) => {
      if (!item) arr.push(user._id);
      else if (item && item !== "weekend") {
        item.map((it: UserItem) => {
          if (it.actual_hours === "") arr.push(user._id);
        });
      } else arr.push();
    });
  });
  return [...new Set(arr)];
  // const ids = [];
  // for (let i = 0; i < users.length; i++) {
  //   const user: User = users[i];
  //   for (let j = 0; j < user.userItems.length; j++) {
  //     const item: any = user.userItems[j];
  //     if(item==='weekend')return []
  //     if (!item) {
  //       ids.push(user._id);
  //       continue;
  //     }
  //     for (let k = 0; k < item.length; k++) {
  //       const slot: UserItem = item[k];
  //       if (!slot.actual_hours || slot.actual_hours === "0") {
  //         ids.push(user._id);
  //       }
  //     }
  //   }
  // }
  // return [...new Set(ids)];
};

export const boardService = {
  fetchBoard,
  fetchMembersOfBoard,
  mapDataByUserItems,
  sendNotification,
  workingDatesWithWeekend,
  getUserIdsOfMissingItems,
};
