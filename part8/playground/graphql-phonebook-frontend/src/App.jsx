import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'

const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

const App = () => {
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  if (result.loading) {
    return <div>loading...</div>
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      {result.data.allPersons.map(p => p.name).join(', ')}
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <Persons persons={result.data.allPersons} />
      <PhoneForm setError={notify}/>
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App