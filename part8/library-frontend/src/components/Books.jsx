import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_QUERY } from '../queries'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(BOOKS_QUERY)

  if (result.loading) {
    return <div>loading...</div>
  }
     console.log("books", result.data.allBooks)

  const allBooks = result.data?.allBooks || []

  const genres = [...new Set(allBooks.flatMap(book => book.genres))]
  const filteredBooks = selectedGenre
    ? allBooks.filter(book => book.genres.includes(selectedGenre))
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
            <tr key={a.id}>
              <td style={{ padding: '5px' }}>{a.title}</td>
              <td style={{ padding: '5px' }}>{a.author.name}</td>
              <td style={{ padding: '5px' }}>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{ marginRight: '5px' }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
