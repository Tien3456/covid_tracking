import React, { useMemo } from 'react'
import DiseaseStatusItem from './DiseaseStatusItem'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'

interface IProps {
    diseaseStatuses: IDiseaseStatusOfCountry[],
    showMore: boolean
}

const DiseaseStatusList: React.FC<IProps> = (props) => {

    const sortedDiseaseStatuses = useMemo(() => {
        return props.diseaseStatuses.sort((firstEl, secondEl) => secondEl.cases - firstEl.cases)
    }, [JSON.stringify(props.diseaseStatuses)])

    return (
        <div className="disease-status-list overflow-y-auto">
            {
                sortedDiseaseStatuses.map((status, i) => (
                    <DiseaseStatusItem
                        key={ i }
                        diseaseStatus={ status }
                        index={ i }
                        showMore={ props.showMore }
                    />
                ))
            }
        </div>
    )
}

export default DiseaseStatusList