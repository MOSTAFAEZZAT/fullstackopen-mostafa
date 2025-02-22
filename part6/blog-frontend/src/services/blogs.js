import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createBlog = async (newObject) => {
  try {
    console.log('token', token)
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    window.localStorage.clear()
  }
}

const updateLikes = async (id, newObject) => {
  try {
    const config = { headers: { Authorization: token } }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const deleteBlog = async (id) => {
  try {
    const config = { headers: { Authorization: token } }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, setToken, createBlog, updateLikes, deleteBlog }
