import React from 'react'
import '../App.css'
import { useHistory } from 'react-router-dom'
import Nav from '../components/Nav'


export default function Home() {
    
    let history = useHistory()

    return (
        <div>
            <Nav />
        </div>
    )
}

