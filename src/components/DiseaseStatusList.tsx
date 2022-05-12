import React, { useState, useMemo, useEffect, useRef } from 'react'
import DiseaseStatusItem from './DiseaseStatusItem'
import { IDiseaseStatusOfCountry } from '../interfaces/diseaseStatus'
import { flattenDiagnosticMessageText } from 'typescript'

interface IProps {
    diseaseStatuses: IDiseaseStatusOfCountry[],
    height: number | undefined,
    isHomePage: boolean
}

interface IState {
    coord: {
        top: undefined | number,
        left: undefined | number
    }
}

const DiseaseStatusList: React.FC<IProps> = (props) => {

    const [statusHeight, setStatusHeight] = useState<number>(0)
    const [coord, setCoord] = useState<IState['coord']>({
        top: undefined,
        left: undefined
    })
    const [width, setWidth] = useState<number | undefined>()
    const [fixedFirstChild, setFixedFirstChild] = useState<boolean>(false)

    const rootRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        setCoord({
            top: rootRef.current?.getBoundingClientRect()?.top,
            left: rootRef.current?.getBoundingClientRect()?.left
        })
        setWidth(rootRef.current?.scrollWidth)
    }, [])

    const sortedDiseaseStatuses = useMemo(() => {
        const sortedList = props.diseaseStatuses.sort((firstEl, secondEl) => secondEl.cases - firstEl.cases)
                                .map((el, i) => ({ ...el, index: i + 1}))
        const vn_status = sortedList.find(status => status.country.toLowerCase() === "vietnam")
        if(vn_status) {
            sortedList.unshift(vn_status)
        }
        return sortedList
    }, [JSON.stringify(props.diseaseStatuses)])

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        e.currentTarget.scrollTop > 30
            ? setFixedFirstChild(true)
            : setFixedFirstChild(false)
    }

    return (
        <div 
            className="disease-status-list mt-24 position-relative pb-36 bg-grey-main overflow-y-auto" 
            style={{ 
                height: props.height || "auto",
                paddingTop: props.isHomePage && fixedFirstChild ? statusHeight : 0
            }}
            ref={ rootRef }
            onScroll={ onScroll }
        >
            {
                sortedDiseaseStatuses.slice(0, 11).map((status, i) => (
                    <DiseaseStatusItem
                        key={ i }
                        diseaseStatus={ status }
                        isHomePage={ props.isHomePage }
                        setStatusHeight={ props.isHomePage &&  status.country.toLowerCase() === 'vietnam' ? setStatusHeight : undefined }
                        listCoord={ props.isHomePage && status.country.toLowerCase() === 'vietnam' ? coord : undefined }
                        listWidth={ props.isHomePage && status.country.toLowerCase() === 'vietnam' ? width : undefined }
                        isFixed={ props.isHomePage && status.country.toLowerCase() === 'vietnam' ? fixedFirstChild : undefined }
                    />
                ))
            }
        </div>
    )
}

export default DiseaseStatusList