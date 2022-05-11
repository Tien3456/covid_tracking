import { useState, useEffect } from 'react'
import { IWindowSize } from '../interfaces/common'

const useDimension = () => {

    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}

export default useDimension