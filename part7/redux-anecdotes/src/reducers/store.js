import { configureStore, createSlice } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import  anecdotesServcies  from '../services/anecdotes'
 const  anecdotesAtStart = [
  // 'If it hurts, do it more often',
  // 'Adding manpower to a late software project makes it later!',
  // Add more anecdotes...
]
 
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})
 

const initialAnecdotes = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialAnecdotes,
  reducers: {
    setAnecdotes(state, action) {
      // Map each anecdote to include id and votes
      return action.payload.map(anecdote => ({
        content: anecdote.content,
        id: anecdote.id, // or use a proper id if available
        votes: anecdote.votes
      })).sort((a, b) => b.votes - a.votes)
    },
    voteAnecdote(state, action) {
      const anecdote = action.payload
      const { id } = anecdote
      const anecdoteToChange = state.find(a => a.id === id)
      anecdoteToChange.votes += 1
      state.sort((a, b) => b.votes - a.votes)
    },
    newAnecdote(state, action) {
       state.push(action.payload)
       state.sort((a, b) => b.votes - a.votes) 
    },
    deleteAnecdoteStore(state, action) {
      const id = action.payload
      return state.filter(anecdote => anecdote.id !== id)
    } 

  }
})

export const { setAnecdotes, voteAnecdote, newAnecdote, deleteAnecdoteStore } = anecdoteSlice.actions

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

export const appendAnecdote = (content) => {
  return async dispatch => {
    const response = await anecdotesServcies.createAnecdote(content); 
    dispatch(newAnecdote(response))
  } 
}

export const initializeAnencdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdotesServcies.getAll() 
    console.log('in thunk',  anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
} 

export const handleVoteInDb = (anecdote) =>{
    return async dispatch =>  {
      const response = await anecdotesServcies.updateVote(anecdote)
      console.log('response' , response)
      dispatch(voteAnecdote(response))
    }
  
  }
export const handleDeleteInDb = (anecdote) => {
  return async dispatch => {
    await anecdotesServcies.deleteAnecdote(anecdote.id)
    dispatch(deleteAnecdoteStore(anecdote.id))
  }
} 

export const { setFilter } = filterSlice.actions

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice.reducer,
    filter: filterSlice.reducer,
    notification: notificationReducer

  }
})

export default store
