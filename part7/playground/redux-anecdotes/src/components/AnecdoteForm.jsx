import { useDispatch } from 'react-redux'
import { newAnecdote, appendAnecdote } from '../reducers/store'
import { showNotification } from '../reducers/notificationReducer'
import anecdotesServices from '../services/anecdotes'

function AnecdoteForm() {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    // dispatch(newAnecdote(content))
    // const response = await anecdotesServices.createAnecdote(content);
    dispatch(appendAnecdote(content))
    dispatch(showNotification(`A new anecdote '${content}' created!`, 5))
    event.target.anecdote.value = ''  // Clear input after submission

  }

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
