import React from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import DiseaseStatusList from '../components/DiseaseStatusList'
import CaseQuantities from '../components/CaseQuantities'

interface IProps {
  diseaseStatuses: IDiseaseStatusOfCountry[]
}

const Home: React.FC<IProps> = (props) => {

  return (
    <div className="container-fluid bg-grey-main height-100-percent">
      <div className="container">
        <CaseQuantities diseaseStatuses={ props.diseaseStatuses } />
        <DiseaseStatusList
          diseaseStatuses={ props.diseaseStatuses }
          showMore={ false }
        />
      </div>
    </div>
  )
}

export default Home