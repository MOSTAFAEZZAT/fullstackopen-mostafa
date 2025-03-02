import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, setFilter, initializeAnencdotes, handleVoteInDb } from '../reducers/store'
import { showNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { useEffect } from 'react'

function AnecdoteList() {

  useEffect(() => {
    dispatch(initializeAnencdotes()) 
  }, [])

  const anecdotes = useSelector(({ anecdotes, filter }) => 
    anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('Voting for anecdote with id:', anecdote) // Debugging
    dispatch(handleVoteInDb(anecdote))
    dispatch(showNotification(`You voted for '${anecdote.content}'`, 5))

  }

  const filterAnecdotes = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter))
  }
  console.log("AnecdoteList component rendered"); // Should log each time component renders

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />

      <input placeholder="Filter" onChange={filterAnecdotes} />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}  has {anecdote.votes}   
          <button onClick={() => vote(anecdote)}>
              vote
          </button>
           </div>  
        </div>
      )}
          
    </div>
  )
}

export default AnecdoteList
