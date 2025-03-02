import { newAnecdote } from '../requests'
import { useMutation } from '@tanstack/react-query'
const AnecdoteForm = () => {

  const newNoteMutation = useMutation({ mutationFn: newAnecdote })
 

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes:0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
