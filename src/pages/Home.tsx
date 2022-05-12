import React, { useMemo } from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import DiseaseStatusList from '../components/DiseaseStatusList'

interface IProps {
  diseaseStatuses: IDiseaseStatusOfCountry[],
  listHeight: number | undefined
}

const Home: React.FC<IProps> = (props) => {

  const sortedDiseaseStatuses = useMemo(() => {
    const sortedList = props.diseaseStatuses.sort((firstEl, secondEl) => secondEl.cases - firstEl.cases)
                            .map((el, i) => ({ ...el, index: i + 1}))
    const vn_status = sortedList.find(status => status.country.toLowerCase() === "vietnam")
    if(vn_status) {
        sortedList.unshift(vn_status)
    }
    return sortedList
}, [JSON.stringify(props.diseaseStatuses)])

  return (
    <DiseaseStatusList
      diseaseStatuses={ sortedDiseaseStatuses }
      isHomePage={ true }
      height={ props.listHeight }
    />
  )
}

export default Home