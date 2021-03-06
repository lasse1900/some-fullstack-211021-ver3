import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const update = (id, data) => {
  const config = { headers: { Authorization: token } }

  const request = axios.put(`${baseUrl}/${id}`, data, config)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default { getAll, create, update, remove, setToken }
