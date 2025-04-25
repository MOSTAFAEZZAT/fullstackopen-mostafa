import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { NEW_BOOK, BOOKS_QUERY } from '../queries'

const style = { 
  margin: '10px',  
}
 
const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(NEW_BOOK, {
    refetchQueries: [ { query: BOOKS_QUERY } ], // refetch the ALL_BOOKS query after adding a new book
    onError: (error) => {
      console.log('error', error)
    },
  })
   

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...') 
    console.log(title, author, published, genres)
    addBook({ variables: { title, author, published: Number(published), genres } }) 
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div style={style}>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook