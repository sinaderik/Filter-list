import React from 'react'
import useStorageState from '../hooks/useStorageState'

export default function Search({searchTerm,searching }) {
    
    function handelSearch(event) {
        searching(event.target.value)
    }

    return (
        <>
            <input value={searchTerm} onChange={handelSearch} type="text" placeholder='Enter a name' />
        </>
    )
}
