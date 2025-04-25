import { gql, useQuery } from '@apollo/client'
import {BOOKS_QUERY} from '../queries'

const Books = (props) => {


  const  result  = useQuery(BOOKS_QUERY)
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(result)
   return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
