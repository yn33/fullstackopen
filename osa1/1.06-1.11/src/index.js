import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, action}) => {
  return <button onClick={action}>{name}</button> 
}

const StatisticLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  function calculateTotal(good, neutral, bad) {
    return good + neutral + bad
  }

  function average(good, neutral, bad) {
    const all = calculateTotal(good, neutral, bad)
    const result = good - bad
    if (all == 0) {
      return 0
    }
    return result/all
  }

  function positives(good, neutral, bad) {
    const all = calculateTotal(good, neutral, bad)
    if(all == 0) {
      return 0
    }
    const result = good/all
    return result*100 
  }

  if(good == 0 && neutral == 0 && bad == 0) {
    return "No feedback given"
  }

  return (
    <div>
      <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={calculateTotal(good, neutral, bad)}/>
        <StatisticLine text="average" value={average(good, neutral, bad)}/>
        <StatisticLine text="positives" value={positives(good, neutral, bad) + " %"}/>
      </table>
    </div>
  )
  
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {setGood(good + 1)}
  const neutralClick = () => {setNeutral(neutral + 1)}
  const badClick = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" action={goodClick}/>
      <Button name="neutral" action={neutralClick}/>
      <Button name="bad" action={badClick}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
