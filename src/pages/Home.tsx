import React from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import DiseaseStatusList from '../components/DiseaseStatusList'

interface IProps {
  diseaseStatuses: IDiseaseStatusOfCountry[]
}

const Home: React.FC<IProps> = (props) => {
  return (
    <div className="container-fluid bg-grey-main height-100-percent">
      <div className="container">
        <DiseaseStatusList
          diseaseStatuses={ props.diseaseStatuses }
          showMore={ false }
        />
      </div>
    </div>
  )
}

export default Home