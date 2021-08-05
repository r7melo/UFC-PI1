import React from 'react'
import '../App.css'

function Nav() {
    return (
        <nav>
            <div className="logo"><h1>Torne-IO</h1></div>
            <button>&#9776;</button>
            <ul className="navbar navbar-pills">
                <li><a href="#">Meus torneios</a></li>
                <li><a href="#">Equipe</a></li>
                <li><a href="#">Perfil</a></li>
                <li><a href="#">sair</a></li>
            </ul>
        </nav>
    )
}

export default Nav