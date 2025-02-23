import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient   } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
const App = () => {


  const queryClient = useQueryClient()

  const handleVoteMutation = useMutation({
  mutationFn: updateAnecdote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  },
    
  })
  const handleVote = (anecdote) => {
    handleVoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )


  if(result.isLoading){
    return <div>Data is Loading</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
