import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
// for debug use directly to Mongo Atlas
// const baseUrl = "https://phonebook-lk.herokuapp.com/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data)
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data)
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
  remove,
};
