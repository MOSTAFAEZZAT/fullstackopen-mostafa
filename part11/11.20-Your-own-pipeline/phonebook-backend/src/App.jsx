import { useEffect, useState } from 'react'
import axios from 'axios'
import phonebook from './services/phonebook'
import './index.css'
import Notification from './components/Notification'
import React from 'react';

const Filter = (props) => (
  <div>
    filter by name: <input onChange={props.onChange} />
  </div>
)

const PersonForm = (props) => (
  <>
    <div>
      name: <input onChange={props.onChangeName} />
    </div>

    <div>
      number: <input onChange={props.onChangeNumber} />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </>
)

const Persons = ({ person, handleDelete }) => (

  <p>
    {person.name}  {person.number} <button onClick={handleDelete}> delete</button>
  </p>

)

const App = () => {

  const [persons, setPersons] = useState([])
  const [name, setNewName] = useState('')
  const [number, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredPerson, setFilteredPerson] = useState({})
  const [sucessMessage, setSucessMessage] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {

    phonebook.getAll()
      .then(response => {
        setPersons(response.data);
      })
  }, [])

  const handleNewPerson = (event) => (
    setNewName(event.target.value)
  )

  const handleNewNumber = (event) => (
    setNewNumber(event.target.value)
  )

  const submitNewPerson = (event) => {

    event.preventDefault();

    const newPerson = { name, number };
    const existingPerson = persons.find(person => person.name === newPerson.name);
    vaildatePerson(existingPerson, newPerson);
  }

  const vaildatePerson = (existingPerson, newPerson) => {

    if (existingPerson) {

      if (existingPerson.number !== newPerson.number) {
        const confirm = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)
        if (confirm) {
          const updatedPerson = { ...existingPerson, number: newPerson.number };
          console.log('exist ', existingPerson)
          phonebook.updatePhonenumber(existingPerson.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(person =>
                person.id === existingPerson.id ? response.data : person
              ));
            }).catch(err => {
              seterrorMessage(`Information of ${name} has already been removed from the server`)
              console.error("Failed to update phone number:", err);
            });
        }
      }
      else {
        alert(`The phone number for ${newPerson.name} is already up to date.`);
      }
    } else {
      phonebook.addNewPerson(newPerson)
        .then(response => {
          console.log("New person added:", response.data);
          setPersons(persons.concat(response.data));
          setSucessMessage(`Added ${response.data.name}`)
          setTimeout(() => {
            setSucessMessage(null)
          }, 2000);
        }).catch(error => {
          console.error("Failed to add new person:", error);
          console.log(error.response.data.error)
          seterrorMessage(error.response.data.error)
        });
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebook.deletePerson(id)
        .then(response => {
          phonebook.getAll()
            .then(response => {
              setPersons(response.data);
            })
        }).catch(err => {
          console.log('fail', err)
          seterrorMessage(`Information of ${name} has already been removed from the server`)
        });
    }
  }

  const handleNameFilter = (event) => {

    setFilter(event.target.value)
    if (event.target.value.length === 0) {
      setFilteredPerson({});
      setFilter("");
    } else {

      const filtereddValueByName = persons.filter(person => {
        return person.name.toLowerCase().trim() === filter.toLowerCase().trim()
      })
      setFilteredPerson(filtereddValueByName);
    }
  }

  if (Object.keys(filteredPerson).length !== 0) {
    return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={sucessMessage} />

        <form onSubmit={submitNewPerson}>

          <Filter onChange={handleNameFilter} />

          <h3>add a new</h3>

          <PersonForm />

        </form>

        <h2>Numbers</h2>

        {
          filteredPerson.map(person => {
            return <Persons key={person.id} person={person} handleDelete={() => handleDelete(person.id, person.name)} />
          })
        }
      </div>
    )

  } else {
    return (
      <div>
        <h1>Phonebook</h1>

        <Notification errorMessage={errorMessage} sucessMessage={sucessMessage} />

        <form onSubmit={submitNewPerson}>

          <Filter onChange={handleNameFilter} />

          <h3>add a new</h3>

          <PersonForm onChangeName={handleNewPerson} onChangeNumber={handleNewNumber} />

        </form>

        <h2>Numbers</h2>
        {persons.map(person => {
          return <Persons key={person.id} person={person} handleDelete={() => handleDelete(person.id, person.name)} />
        })
        }
      </div>
    )
  }
}

export default App