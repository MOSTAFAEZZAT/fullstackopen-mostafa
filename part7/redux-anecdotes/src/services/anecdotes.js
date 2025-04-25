import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const obj  = {content, votes:0}
  console.log('content', content)
  const response = await axios.post(baseUrl, obj)
  return response.data

} 

const updateVote = async ( anecdote ) => {
  const {id} = anecdote
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  };
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}
const deleteAnecdote = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
} 

export default { getAll, createAnecdote, updateVote, deleteAnecdote }