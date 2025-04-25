import React from 'react'
import { gql, useQuery } from '@apollo/client'  
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { AUTHORS_QUERY } from '../queries'
const Authors = (props) => {
 
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
 
  const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $born: Int!) {
      editAuthor(name: $name, setBornTo: $born) {
        name  
        born
      }
    }`

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: AUTHORS_QUERY } ],  
    onError: (error) => {
      console.log('error', error) 
    },
  })
  const  result  = useQuery(AUTHORS_QUERY)
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const handleBirthYear = (event) => {  
    event.preventDefault()
    console.log('handle birth year...')
    console.log(name, born)
    updateAuthor({ variables: { name, born: Number(born) } })
    setName('') 
    setBorn('')
    console.log('update author...', name, born)
    
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form onSubmit={handleBirthYear}>
          <div>
          <select onChange={({ target }) => setName(target.value)}>
          {result.data.allAuthors.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
          </select>
          </div>
          <div>
            born <input value={born}   onChange={({ target }) => setBorn(target.value)} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
    
  )
}

export default Authors
