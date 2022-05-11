import React, { useMemo } from 'react'
import DiseaseStatusItem from './DiseaseStatusItem'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'

interface IProps {
    diseaseStatuses: IDiseaseStatusOfCountry[],
    showMore: boolean
}

const DiseaseStatusList: React.FC<IProps> = (props) => {

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
        <div className="disease-status-list overflow-y-auto py-24">
            {
                sortedDiseaseStatuses.slice(0, 11).map((status, i) => (
                    <DiseaseStatusItem
                        key={ i }
                        diseaseStatus={ status }
                        showMore={ props.showMore }
                    />
                ))
            }
        </div>
    )
}

export default DiseaseStatusList