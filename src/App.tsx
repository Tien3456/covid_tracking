import React, { useState, useEffect, useRef } from 'react'
import covidTrackingRepository from './repositories/CovidTrackingRepository'
import { IDiseaseStatusOfCountry } from './interfaces/diseaseStatus'
import { Routes, Route, Outlet } from 'react-router-dom'
import CaseQuantities from './components/CaseQuantities'
import SearchForm from './components/SearchForm'
import Home from './pages/Home'
import Search from './pages/Search'
import useDimension from './hooks/useDimension'
import './styles/index.scss';

function App() {

  const [diseaseStatuses, setDiseaseStatuses] = useState<IDiseaseStatusOfCountry[]>([])
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(true)
  const [headerHeight, setHeaderHeight] = useState<number | undefined>()
  
  const windowSize = useDimension()

  const setUpdate = useRef<null | ReturnType<typeof setInterval>>(null)
  const headerRef = useRef<null | HTMLElement>(null)

  useEffect(() => {
    return () => {
      if(setUpdate.current) {
        clearTimeout(setUpdate.current)
      }
    }
  }, [])

  useEffect(() => {
    setHeaderHeight(headerRef.current?.scrollHeight)
  }, [windowSize.width, windowSize.height])

  useEffect(() => {
    if(shouldUpdate) {
      setShouldUpdate(false)
      covidTrackingRepository
        .getAll()
        .then(res => setDiseaseStatuses(res.data))
        .catch(err => {})
    } else {
      setUpdate.current = setTimeout(() => {
        setShouldUpdate(true)
      }, 3 * 60 * 1000)
    }
  }, [shouldUpdate])

  return (
    <div 
      className="App overflow-hidden" 
      style={{
        width: windowSize.width || "auto",
        height: windowSize.height || "auto"
      }}
    >
      <Routes>
        <Route 
          path="/"
          element={
            <div className="container-fluid bg-grey-main height-100-percent">
              <header ref={ headerRef }>
                <CaseQuantities diseaseStatuses={ diseaseStatuses } />
                <SearchForm />
              </header>
              <Outlet />
            </div>
          }
        >
          <Route 
            path="" 
            element={
              <Home 
                diseaseStatuses={ diseaseStatuses }
                listHeight={ windowSize.height && headerHeight ? windowSize.height - headerHeight : undefined }
              />
            } 
          />
          <Route 
            path="search" 
            element={
              <Search 
                diseaseStatuses={ diseaseStatuses }
                listHeight={ windowSize.height && headerHeight ? windowSize.height - headerHeight : undefined }
              />
            } 
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;