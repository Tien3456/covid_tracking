import React from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import DiseaseStatusList from '../components/DiseaseStatusList'

interface IProps {
  diseaseStatuses: IDiseaseStatusOfCountry[],
  listHeight: number | undefined
}

const Home: React.FC<IProps> = (props) => {

  return (
    <DiseaseStatusList
      diseaseStatuses={ props.diseaseStatuses }
      isHomePage={ true }
      height={ props.listHeight }
    />
  )
}

export default Home