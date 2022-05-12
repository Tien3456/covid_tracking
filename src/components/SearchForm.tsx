import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {

    const navigate = useNavigate()

    const [country, setCountry] = useState<string>('')

    useEffect(() => {
        country
            ? navigate({
                pathname: '/search',
                search: `?country=${country}`
            })
            : navigate('/')
    }, [country])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.currentTarget.value)

    return (
        <div className="search-form container">
            <form>
                <div className="input-wrapper">
                    <input 
                        type="text" name="country" placeholder="Search 667 regions..." 
                        className="d-inline-block pl-48 py-16 pr-16 txt-grey-dark-color font-size-18"
                        onChange={ onChange }
                        value={ country }
                    />
                    <div className="icon-wrapper">
                        <i className="fa-solid fa-magnifying-glass txt-grey-dark-color font-size-14"></i>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchForm