import { useState } from 'react'
import { 
  BrowserRouter as Router,
  Routes, Route, Link 
} from 'react-router-dom'
import About from './components/About'
import CreateNew from './components/CreateAnecdote'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'

const padding = {
  paddingRight: 5
}
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)

 
const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


const App = () => {
  const [notification, setNotification] = useState('')
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created!`)
    console.log(anecdotes)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    
  }
/* 
  const match = useMatch('/notes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null */
    
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
    <div>
      <h1>Software anecdotes</h1>
      {notification && <Notification message={notification} />}
      
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes}/>} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
    <Footer />
    </div>
    </Router>
  )
}

export default App
