import React, { useEffect } from 'react'
import covidTrackingRepository from './repositories/CovidTrackingRepository'

function App() {

  useEffect(() => {
    covidTrackingRepository
      .getAll()
      .then(res => console.log(res))
      .catch(err => {})
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
