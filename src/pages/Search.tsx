import React, { useState, useEffect, useRef, useCallback } from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import DiseaseStatusList from '../components/DiseaseStatusList'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  diseaseStatuses: IDiseaseStatusOfCountry[],
  listHeight: number | undefined
}

const Search: React.FC<IProps> = (props) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const [searchedList, setSearchedList] = useState<IDiseaseStatusOfCountry[]>([])

  const countryParam = searchParams.get('country')
  const filterListByCountryRef = useRef<null | ReturnType<typeof setTimeout>>(null)

  const filterListByCountry = useCallback(() => {
    if(countryParam) {
      const pattern = new RegExp(countryParam, 'i')
      const sortedList = props.diseaseStatuses.sort((firstEl, secondEl) => secondEl.cases - firstEl.cases)
                              .map((status, i) => ({...status, index: i + 1}))
      const filteredList = sortedList.filter(status => pattern.test(status.country))
      setSearchedList(filteredList)
    }
  }, [countryParam])

  useEffect(() => {
    return () => {
      if(filterListByCountryRef.current) {
        clearTimeout(filterListByCountryRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if(filterListByCountryRef.current) {
      clearTimeout(filterListByCountryRef.current)
    }
    filterListByCountryRef.current = setTimeout(() => {
      filterListByCountry()
    }, 800)
  }, [countryParam])

  return (
    <DiseaseStatusList
      diseaseStatuses={ searchedList }
      height={ props.listHeight }
      isHomePage={ false }
    />
  )
}

export default Search