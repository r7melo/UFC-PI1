import React from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'

function Nav() {
    const history = useHistory()
    const logout = () => {
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <nav>
            <div className="logo"><h1>Torne-IO</h1></div>
            <button>&#9776;</button>
            <ul className="navbar navbar-pills">
                <li><a href="#">Meus torneios</a></li>
                <li><a href="#">Equipe</a></li>
                <li><a href="#">Perfil</a></li>
                <li><a href="javascript:void(0);" onClick={logout} >sair</a></li>
            </ul>
        </nav>
    )
}

export default Nav