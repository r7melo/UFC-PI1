import React from 'react'
import '../App.css'

function Home() {
    return (
        <div>
            <nav>
                <div class="logo"><h1>Torne-IO</h1></div>
                <button>&#9776;</button>
                <ul class="navbar navbar-pills">
                    <li><a href="#">Meus torneios</a></li>
                    <li><a href="#">Equipe</a></li>
                    <li><a href="#">Perfil</a></li>
                    <li><a href="#">sair</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home

