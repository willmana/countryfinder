import React, { useState } from 'react'
import axios from 'axios'
import './App.css'


const List = ({ result }) => {
  result.sort()
  return (
    <div>
      Total of {result.length} countries found with population high enough
      <ul>
        {result.map((country, i) => {
          return (
            <li key={i}>
              {country}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const App = () => {
  const [pages, setPages] = useState(0)
  const [parameter, setParameter] = useState("")
  const [population, setPopulation] = useState(0)
  const [result, setResult] = useState([])

  const getResults = (event) => {
    setResult([])
    event.preventDefault()
    getPages(event)
    for (let index = 1; index < pages + 1; index++) {
      axios.get(`https://jsonmock.hackerrank.com/api/countries/search?name=${parameter}&page=${index}`).then(response => {
        for (let j = 0; j < 10; j++) {
          if (response.data.data[j] !== undefined) {
            if (response.data.data[j].population > population) {
              setResult(result => [...result, response.data.data[j].name])
            }
          }
        }
      })
    }
  }

  const getPages = (event) => {
    event.preventDefault()
    axios.get(`https://jsonmock.hackerrank.com/api/countries/search?name=${parameter}`).then(response => {
      setPages(pages => response.data.total_pages)
    }).catch(function (error) {
      console.log(error.response.status);
    })
  }

  const handleParameterChange = (event) => {
    setParameter(event.target.value)
    console.log(event.target.value);
  }

  const handlePopulationChange = (event) => {
    setPopulation(event.target.value)
    console.log(event.target.value);
  }

  return (
    <div>
      <form onSubmit={getResults}>
        <label>Substring of the country: </label>
        <input type="text" value={parameter} onChange={handleParameterChange} />
        <label> Minimum required population: </label>
        <input type="text" value={population} onChange={handlePopulationChange} />
        <button type="submit">
          Go!
        </button>
      </form>
      {result.length !== 0 &&
        <List result={result} />
      }


    </div>
  )
}


export default App