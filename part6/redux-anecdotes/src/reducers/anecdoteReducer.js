import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
      // Sort anecdotes by the number of votes after voting
      return state.slice().sort((a, b) => b.votes - a.votes)
    },  
    // Other reducers (e.g., createAnecdote, etc.) go here
  }
})

export const { vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer 
