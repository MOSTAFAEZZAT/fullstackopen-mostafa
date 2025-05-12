import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_QUERY } from '../queries'

const Books = ({favouriteGenre}) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(BOOKS_QUERY)

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks

  const genres = [...new Set(allBooks.flatMap(book => book.genres))]
  console.log('genres', favouriteGenre)
  const filteredBooks = favouriteGenre
    ? allBooks.filter(book => book.genres.includes(favouriteGenre))
    : allBooks

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && <p>Filtering by genre: <strong>{selectedGenre}</strong></p>}

      <table style={{ padding: '10px' }}>
        <thead>
          <tr>
            <th style={{ padding: '5px' }}>title</th>
            <th style={{ padding: '5px' }}>author</th>
            <th style={{ padding: '5px' }}>published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td style={{ padding: '5px' }}>{a.title}</td>
              <td style={{ padding: '5px' }}>{a.author.name}</td>
              <td style={{ padding: '5px' }}>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        
 
      </div>
    </div>
  )
}

export default Books
