import React,{useEffect , useState, useCallback} from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'

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
            <Header />
        </div>
    )
}

