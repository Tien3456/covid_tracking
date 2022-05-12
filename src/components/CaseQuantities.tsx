import React, { useMemo } from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'

interface IProps {
    diseaseStatuses: IDiseaseStatusOfCountry[]
}

const CaseQuantities: React.FC<IProps> = (props) => {

    const caseQuantities = useMemo(() => {
        const initialQuantities = {
            total: 0,
            deaths: 0,
            recoveries: 0
        }
        return props.diseaseStatuses.reduce((quantities, status) => {
            return {
                total: quantities.total + status.cases,
                deaths: quantities.deaths + status.deaths,
                recoveries: quantities.recoveries + status.recovered
            }
        }, initialQuantities)
    }, [JSON.stringify(props.diseaseStatuses)])

    return (
        <div className="case-quantites container py-32">
            <div className="total-cases mb-24 txt-align-center">
                <span className="txt-pink-dark-color font-size-36 font-weight-700 mb-4">
                    { caseQuantities.total.toLocaleString() }
                </span>
            </div>
            <div className="d-flex align-center justify-center">
                <div className="d-flex direction-column justify-center align-center mr-16">
                    <span className="txt-primary-color font-size-20 font-size-28 font-weight-700 mb-4">
                        { caseQuantities.deaths.toLocaleString() }
                    </span>
                    <span className="txt-greyblue-main-color txt-transform-uppercase font-size-18 font-weight-700">
                        Deaths
                    </span>
                </div>
                <div className="d-flex direction-column justify-center align-center">
                    <span className="txt-primary-color font-size-20 font-size-28 font-weight-700 mb-4">
                        { caseQuantities.recoveries.toLocaleString() }
                    </span>
                    <span className="txt-greyblue-main-color txt-transform-uppercase font-size-18 font-weight-700">
                        Recoveries
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CaseQuantities