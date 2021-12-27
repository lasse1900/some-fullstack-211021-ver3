import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingle = async (id) => {
  return getResponse(axios.get(`${baseUrl}/${id}`));
};

const create = async (anecdote) => {
  return getResponse(axios.post(baseUrl, anecdote));
};

const update = async (anecdote) => {
  console.log(`${baseUrl}/${anecdote.id}`);
  return getResponse(axios.put(`${baseUrl}/${anecdote.id}`, anecdote));
};

const getResponse = async (operation) => {
  const response = await operation;
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getSingle, create, update };