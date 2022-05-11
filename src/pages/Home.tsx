import React from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import DiseaseStatusList from '../components/DiseaseStatusList'
import CaseQuantities from '../components/CaseQuantities'
import SearchForm from '../components/SearchForm'

interface IProps {
  diseaseStatuses: IDiseaseStatusOfCountry[]
}

const Home: React.FC<IProps> = (props) => {

  return (
    <div className="container-fluid bg-grey-main height-100-percent">
        <CaseQuantities diseaseStatuses={ props.diseaseStatuses } />
        <SearchForm />
        <DiseaseStatusList
          diseaseStatuses={ props.diseaseStatuses }
          showMore={ false }
        />
    </div>
  )
}

export default Home