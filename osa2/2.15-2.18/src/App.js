import React, { useState, useEffect } from 'react'
import services from './services/persons'

const Filter = ({filter, handleFilterChange}) => {
  return (
  <div>
    filter shown with <input
    value={filter} 
    onChange={handleFilterChange}/>
  </div>
  )
}

const NewForm = (props) => {
  return (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input 
        value={props.newName}
        onChange={props.handleNameChange}/>
    </div>
    <div>
      number: <input
      value={props.newNumber}
      onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>      
    </div>
  </form>
  )
}

const Numbers = ({filtered, handleDelete}) => {

  return (
  <div>
    {filtered.map(person =>
    <div key={person.name}>
      <>{person.name} {person.number}</>
      <button key={person.name} onClick={handleDelete(person)}>delete</button>
    </div>
    )}
  </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    services
      .getAll()
      .then(data => {
        console.log(data)
        setPersons(data)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleDelete = (deletePerson) => {
    return () => {
      const ask = window.confirm(`Delete ${deletePerson.name}?`)
      if(ask) {
        services
          .del(deletePerson.id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== deletePerson.id))
          })
      }
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log(newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (!persons.map(person => person.name).includes(newName)) {

      services
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })

    } else {
      const ask = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(ask) {
        const prev = persons.filter(person => person.name === newName)
        services
          .update(prev[0].id, newPerson)
          .then((data) => {
            setPersons(persons.map(person => person.id !== prev[0].id ? person : data))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const filtered = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <NewForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Numbers filtered={filtered} handleDelete={handleDelete}/>
    </div>
  )

}

export default App