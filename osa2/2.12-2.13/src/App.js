import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
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
        <img src={country.flag} height="100" alt=''></img>
      </div>
    </div>
  )
}

const Display = ({filtered}) => {

  const len = filtered.length
  const [show, setShow] = useState('')

  function getOnClick(country) {
    return () => setShow(country)
  }

  if(len > 10) {
    if(show !== '') {
      setShow('')
    }
    return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
    )
  } else if(len === 0) {
    if(show !== '') {
      setShow('')
    }
    return (
      <div>
        <p>No matches</p>
      </div>
      )
  } else if(len > 1) {
    if(show !== '') {
      return <Country country={show}/>
    } else {
      return (
        <div>
          {filtered.map(country =>
          <div key={country.name}>
            {country.name}
            <button onClick={getOnClick(country)}>show</button>      
          </div>
          )}
        </div>
      )
    }
  } else {
    if(show !== '') {
      setShow('')
    }
    return <Country country={filtered[0]}/>
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