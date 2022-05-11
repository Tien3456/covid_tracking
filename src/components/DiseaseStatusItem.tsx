import React from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import Moment from 'react-moment'
import 'moment/locale/vi'

interface IProps {
    diseaseStatus: IDiseaseStatusOfCountry,
    index: number,
    showMore: boolean
}

const DiseaseStatusItem: React.FC<IProps> = (props) => {

    return (
        <div className="disease-status-item d-flex align-center justify-space-between py-16">
            <div className="d-flex align-center">
                <div className="d-flex align-center mr-16">
                    <div className="order d-flex align-center justify-center bg-white-main mr-3">
                        <span className="txt-secondary-color font-size-12">{ props.index }</span>
                    </div>
                    <img 
                        src={ props.diseaseStatus.countryInfo.flag }
                        alt="flag"
                        width={ 40 }
                        height={ 24 }
                    />
                </div>
                <div className="d-flex direction-column justify-center">
                    <span className="txt-primary-color mb-8 font-size-18 font-weight-700">{ props.diseaseStatus.country }</span>
                    <span className="txt-secondary-color font-size-14">
                        <Moment fromNow locale="vi">
                            { new Date(props.diseaseStatus.updated) }
                        </Moment>
                    </span>
                </div>
            </div>
            <span className="txt-pink-dark-color font-size-18 font-weight-700">
                { props.diseaseStatus.cases }
            </span>
        </div>
    )
}

export default React.memo(DiseaseStatusItem)