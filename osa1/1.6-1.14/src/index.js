import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {setGood(good + 1)}
  const neutralClick = () => {setNeutral(neutral + 1)}
  const badClick = () => {setBad(bad + 1)}

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
      <h1>give feedback</h1>
      <button onClick={goodClick}>good</button> 
      <button onClick={neutralClick}>neutral</button> 
      <button onClick={badClick}>bad</button> 
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {calculateTotal(good, neutral, bad)}</p>
      <p>average {average(good, neutral, bad)}</p>
      <p>positive {positives(good, neutral, bad)} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
