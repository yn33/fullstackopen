import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = props => {

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

  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {calculateTotal(props.good, props.neutral, props.bad)}</p>
      <p>average {average(props.good, props.neutral, props.bad)}</p>
      <p>positive {positives(props.good, props.neutral, props.bad)} %</p>
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
      <button onClick={goodClick}>good</button> 
      <button onClick={neutralClick}>neutral</button> 
      <button onClick={badClick}>bad</button> 
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
