import React, { useState, useEffect, useRef } from 'react'
import covidTrackingRepository from './repositories/CovidTrackingRepository'
import { IDiseaseStatusOfCountry } from './interfaces/diseaseStatus'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import './styles/index.scss';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
