import React, { useState, useEffect, useRef } from 'react'
import covidTrackingRepository from './repositories/CovidTrackingRepository'
import { IDiseaseStatusOfCountry } from './interfaces/diseaseStatus'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import './styles/index.scss';

function App() {

  const [diseaseStatuses, setDiseaseStatuses] = useState<IDiseaseStatusOfCountry[]>([])
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

  const setUpdate = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    setUpdate.current = setInterval(() => {
      setShouldUpdate(true)
    }, 2000)
    return () => {
      if(setUpdate.current) {
        clearInterval(setUpdate.current)
      }
    }
  }, [])

  useEffect(() => {
    if(shouldUpdate) {
      setShouldUpdate(false)
      covidTrackingRepository
        .getAll()
        .then(res => setDiseaseStatuses(res.data))
        .catch(err => {})
    }
  }, [shouldUpdate])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home diseaseStatuses={ diseaseStatuses } />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;