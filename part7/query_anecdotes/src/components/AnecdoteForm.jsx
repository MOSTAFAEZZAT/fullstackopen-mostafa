import { newAnecdote } from '../requests'
import { useMutation } from '@tanstack/react-query'
import { useNotification, setNotification } from '../NotificationContext'

const AnecdoteForm = () => {

  const newNoteMutation = useMutation({ mutationFn: newAnecdote })
  const [notification, dispatch] = useNotification()


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.length < 5) {
      setNotification(dispatch, 'Anecdote must be at least 5 characters long')
      return
    }
    event.target.anecdote.value = ''
    console.log('new anecdote')
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
