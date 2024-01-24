import React from 'react'
import useStorageState from '../hooks/useStorageState'

export default function Search({searchTerm,searching }) {
    
    function handelSearch(event) {
        searching(event.target.value)
    }

    return (
        <>
            <input 
            style={{margin:"1rem",padding:"0.5rem",fontSize:"16px"}}
            value={searchTerm} 
            onChange={handelSearch} 
            type="text" 
            placeholder='Enter a name' 
            />
        </>
    )
}
