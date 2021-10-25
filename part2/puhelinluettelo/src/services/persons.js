import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => getAll().then((people) => people));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove };
