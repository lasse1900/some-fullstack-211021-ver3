import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async ({ newObject }) => {
  const response = await axios({
    method: 'post',
    url: baseUrl,
    data: newObject,
    headers: { Authorization: token }
  })
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const update = async (id, data) => {
  const config = { headers: { Authorization: token } }
  const request = axios.put(`${baseUrl}/${id}`, data, config)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

export default { getAll, getById, create, setToken, update, remove }