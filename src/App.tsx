import React, { useState, useEffect, useRef } from 'react'
import covidTrackingRepository from './repositories/CovidTrackingRepository'
import { IDiseaseStatusOfCountry } from './interfaces/diseaseStatus'

function App() {

  const [countries, setCountries] = useState<IDiseaseStatusOfCountry[]>([])

  const fetchGetCountries = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    const MILLIS_UPDATING = 3 * 60 * 1000
    fetchGetCountries.current = setInterval(() => {
      covidTrackingRepository
        .getAll()
        .then(res => setCountries(res.data))
        .catch(err => {})
    }, MILLIS_UPDATING)
    
    return () => {
      if(fetchGetCountries.current) {
        clearInterval(fetchGetCountries.current)
      }
    }
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
