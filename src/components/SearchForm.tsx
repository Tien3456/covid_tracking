import React, { useState } from 'react'

const SearchForm = () => {

    return (
        <div className="search-form container">
            <form>
                <div className="input-wrapper">
                    <input 
                        type="text" name="country" placeholder="Search 667 regions..." 
                        className="d-inline-block pl-48 py-16 pr-16 txt-grey-dark-color font-size-18"
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