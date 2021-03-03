import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Display = ({filtered}) => {

  const len = filtered.length

  if(len > 10) {
    return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
    )
  } else if(len === 0) {
    return (
      <div>
        <p>No matches</p>
      </div>
      )
  } else if(len > 1) {
    return (
    <div>
      {filtered.map(country =>
        <p key={country.name}>{country.name}</p>
      )}
    </div>
    )
  } else {
    const country = filtered[0]
    return (
      <div>
        <b>{country.name}</b>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <b>languages</b>
        <ul>
          {country.languages.map(lang =>
            <li key={lang.name}>{lang.name}</li>
          )}
        </ul>
        <div>
          <img src={country.flag} height="100"></img>
        </div>
      </div>
    )
  }
}

const App = () => {
  
  const [ countries, setCountries] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ country, setCountry ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setFiltered(response.data)
        console.log(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    const current = event.target.value 
    console.log(current)
    setCountry(current)
    const filter = countries.filter(country => country.name.toLowerCase().includes(current.toLowerCase()))
    setFiltered(filter)
  }

  return (
    <div>
      <div>
        find countries<input
        value={country} 
        onChange={handleCountryChange}/>
      </div>
      <Display filtered={filtered}/>
    </div>
  )

}

export default App