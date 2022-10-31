import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

export default function SearchBar() {
    const context = useContext(AppContext)
    const [value,setValue]=useState('')
    const navigate=useNavigate()
    const handleClick = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate(`/search?cd clientq=${value}`)
        }
    }
    return (
        <div style={{ backgroundColor: context.dark ? '#2b2b2b' : '#fafafa', marginBottom: '22px', height: '45px', borderRadius: '7px' }}>
            <input value={value} onChange={(e)=>setValue(e.target.value)} type="text" style={{ backgroundColor: 'transparent', width: '100%', border: 'none', outline: 'none', color: 'inherit', padding: '0 9px', height: '100%' }} placeholder="Search" onKeyDown={(e) => { handleClick(e) }} />
        </div>
    )
}
