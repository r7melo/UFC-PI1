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
            if(response.data[0] != null){
                console.log(response.data[0].nome)

                /* GERAE TOKEN */
                sessionStorage.setItem('token', Math.random());
                console.log(sessionStorage.getItem('token'))

                history.push("/")
            }
            else{
                setMsgInfo("Email e senha incorretos!")
            }
        })
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
                        <a href="Cadastro"> CADASTRE-SE</a>
                    </div>
                </div>

                <div className="footer">
                    <span className="or">ou entre com</span>
                    <div className="btn-social">
                        <div className="btn-social-google">
                            <i className="fab fa-google"></i>
                            <a href="">Google</a>
                        </div>
                        <div className="btn-social-facebook">
                            <i className="fab fa-facebook-f"></i>
                            <a href="">Facebook</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

