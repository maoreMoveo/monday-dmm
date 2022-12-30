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
  const res = await monday.api(`query { boards(ids: ${id}) { id name } }`);
  return res.data;
};

export const boardService = {
  fetchBoard,
};
