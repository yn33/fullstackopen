import React, { useState } from 'react'

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

const Numbers = ({filtered}) => {
  return (
  <div>
    {filtered.map(person =>
    <p key={person.name}>{person.name} {person.number}</p>
    )}
  </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Test Name', number: '999999999'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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

  const addPerson = (event) => {
    event.preventDefault()
    console.log(newName)
    
    if (!persons.map(person => person.name).includes(newName)) {

      const newPerson = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
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
        <Numbers filtered={filtered}/>
    </div>
  )

}

export default App