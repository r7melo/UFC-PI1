import React , {useState} from 'react'
import Axios from "axios"

import { useHistory } from 'react-router-dom'


export default function Cadastro() {
    
    let history = useHistory()
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPass, setUserPass] = useState("")
    const [userBirthDay, setUserBirthday] = useState("")

    const cadastro = () => {
        Axios.post("http://localhost:3007/cadastro", {
            userName: userName,
            userEmail: userEmail,
            userPass: userPass,
            userBirthDay: userBirthDay,
        }).then((response) => {
            console.log(response)
            //history.push("/home")
        })
    }

    const handleRedirectLogin = () =>{
        history.push('/');
    }
    
    return (
        <div className="App">
            <div className="container">
                <h1>Cadastro</h1>
                <p>Insira os dados abaixo para proseguimos com a criação da sua conta</p>
                <div className="form">
                    <div class="input-field">
                        <input type="name" name="nome" placeholder="Nome completo" required onChange={ (e) => { setUserName(e.target.value) } } />
                    </div>
                    <div class="input-field">
                        <input type="email" name="email" placeholder="E-mail" required onChange={ (e) => { setUserEmail(e.target.value) } } />
                    </div>
                    <div class="input-field">
                        <input type="password" name="senha" placeholder="Senha" required onChange={ (e) => { setUserPass(e.target.value) } } />
                    </div>
                    <div class="input-field">
                        <label for="nascimento">Data de nascimento</label>
                        <input type="date" name="nascimento" placeholder="Data de nascimento" onChange={e => setUserBirthday(e.target.value)} required/>
                    </div>
                    <div>
                        <input type="submit" onClick={cadastro} value="Entrar"/>
                    </div>
                    <div class="entrarConta">
                        <span>Já tem conta?</span>
                        <a href="javascript:void(0);" onClick={handleRedirectLogin}> ENTRE AQUI</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

