import React, { SetStateAction, Dispatch, useEffect, useRef } from 'react'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import Moment from 'react-moment'

interface IProps {
    diseaseStatus: IDiseaseStatusOfCountry,
    isHomePage: boolean,
    setStatusHeight?: Dispatch<SetStateAction<number>>,
    listCoord?: {
        top: number | undefined,
        left: number | undefined
    }
    listWidth?: number,
    isFixed?: boolean
}

const DiseaseStatusItem: React.FC<IProps> = (props) => {

    const rootRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if(props.setStatusHeight) {
            props.setStatusHeight(rootRef.current?.scrollHeight || 0)
        }
    }, [])

    return (
        <div 
            className={`disease-status-item container d-flex align-center justify-space-between py-16 ${props.listCoord && props.isFixed ? "position-fixed bg-grey-main" : ""}`}
            ref={ rootRef }
            style={
                props.listCoord && props.isFixed
                    ? {
                        top: props.listCoord.top,
                        left: props.listCoord.left,
                        width: props.listWidth ? props.listWidth - 12 : "auto"
                    }
                    : {}
            }
        >
            <div className="d-flex align-center">
                <div className="d-flex align-center mr-16">
                    <div className="order d-flex align-center justify-center bg-white-main mr-3">
                        <span className="txt-secondary-color font-size-12">{ props.diseaseStatus?.index }</span>
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
                        <Moment fromNow>
                            { new Date(props.diseaseStatus.updated) }
                        </Moment>
                    </span>
                    {
                        !props.isHomePage &&
                            <div className="d-flex align-center mt-8">
                                <div className="death-cases">
                                    <span className="txt-grey-dark-color font-size-14">Deaths:&nbsp;</span>
                                    <span className="txt-pink-dark-color font-size-14">{ props.diseaseStatus.deaths.toLocaleString() }</span>
                                </div>
                                <div className="recovered-cases ml-16">
                                    <span className="txt-grey-dark-color font-size-14">Recoveries:&nbsp;</span>
                                    <span className="txt-pink-dark-color font-size-14">{ props.diseaseStatus.recovered.toLocaleString() }</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <span className="txt-pink-dark-color font-size-18 font-weight-700">
                { props.diseaseStatus.cases.toLocaleString() }
            </span>
        </div>
    )
}

export default React.memo(DiseaseStatusItem)