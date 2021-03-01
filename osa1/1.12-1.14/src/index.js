import React, { useState } from 'react'
import ReactDOM from 'react-dom'

var votes = [0, 0, 0, 0, 0, 0]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [selectedVotes, setSelectedVotes] = useState(0)
  const [most, setMost] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

  const setRandom = () => {
    const random = Math.round(Math.random()*5)
    setSelected(random)
    setSelectedVotes(votes[random])
  }

  const vote = () => {
    const mostVotes = votes[most]
    votes[selected] += 1
    setSelectedVotes(votes[selected])
    if (votes[selected] > mostVotes) {
      setMost(selected)
      setMostVotes(votes[selected])
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {selectedVotes} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={setRandom}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[most]}</p>
      <p>has {mostVotes} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
