import fetchData from "@/helpers/fetchData";

const getData = async (query, dataName, variables = {}, token) => {
  let data = "";
  if (token) {
    data = await fetchData(
      query,
      {
        variables,
      },
      "",
      token
    );
  } else {
    data = await fetchData(query, {
      variables,
    });
  }
  return data.data[dataName];
};

export default getData;
