import React , {useState} from 'react'
import '../App.css'
import Axios from "axios"
import { useHistory } from 'react-router-dom'


export default function Login() {

    let history = useHistory()
    const [msgInfo, setMsgInfo] = useState("Preencha suas informações")
    const [userEmail, setUserEmail] = useState("")
    const [userPass, setUserPass] = useState("")

    const login = () => {
        Axios.post("http://localhost:3007/login", {
            userEmail: userEmail,
            userPass: userPass
        }).then((response) => {
            console.log(response)
            if(response.status === 200){

                /* GERAE TOKEN */
                sessionStorage.setItem('token', Math.random());
                sessionStorage.setItem('user', response.data.obj.userName)
                sessionStorage.setItem('email', response.data.obj.userEmail)
                sessionStorage.setItem('id', response.data.obj.id)
                console.log(sessionStorage.getItem('token'))

                history.push("/home")
            }       
        }).catch((error) =>{
            console.log(error)         
            setMsgInfo("Email e senha incorretos!")
          
        })
    }

    const handleRegister = () => {
        history.push('/cadastro');
    }
    
    return (
        <div className="App">
            <div className="container">

                <h1>Login</h1>
                <p>{msgInfo}</p>

                <div className="form">
                    <div className="input-field">
                        <input type="email" name="email" placeholder="E-mail" required onChange={ (e) => { setUserEmail(e.target.value) } } />
                    </div>
                    <div className="input-field">
                        <input type="password" name="senha" placeholder="Senha" required onChange={ (e) => { setUserPass(e.target.value) } } />
                    </div>
                    <div>
                        <input type="submit" onClick={ login } value="Entrar" />
                    </div>
                    <div className="criarConta">
                        <span>Não tem conta?</span>
                        <a onClick={handleRegister}> CADASTRE-SE</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

