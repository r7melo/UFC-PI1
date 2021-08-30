import React,{useEffect , useState, useCallback} from 'react'
import '../App.css'
import { useHistory } from 'react-router-dom'
import Nav from '../components/Nav'

export default function Home() {
    let history = useHistory()
    const [token, setToken] = useState('')
    const verifSession = useCallback(() => {
        let provisory = sessionStorage.getItem('token')
        console.log(provisory)
        if(provisory === null || provisory === undefined){
            setToken(provisory)
            history.push('/');
        }else{
            setToken(provisory)
        }
    },[])

    useEffect(() => {
        verifSession();
    },[]);

    return (
        <div>
            <Nav />
        </div>
    )
}

