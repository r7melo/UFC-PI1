import React , {useState} from 'react'
import '../App.css'
import Axios from "axios"
import {useNavigation} from "@react-navigation/native"

export default function Login() {

    const navigation = useNavigation()
    const [userName, setUserName] = useState("")
    const [userPass, setUserPass] = useState("")

    const verificaitionLogin = () => {
        Axios.post("http://localhost:3007/api/verificaitionLogin", {
            userName: userName,
            userPass: userPass
        }).then((response) => {
            console.log(response.data[0])

            
        })
    }
    
    return (
        <div className="App">
            <div className="container">

                <h1>Login</h1>
                <p>Preencha suas informações</p>

                <form>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="E-mail" required onChange={ (e) => { setUserName(e.target.value) } } />
                    </div>
                    <div className="input-field">
                        <input type="password" name="senha" placeholder="Senha" required onChange={ (e) => { setUserPass(e.target.value) } } />
                    </div>
                    <div>
                        <input type="submit" onClick={ verificaitionLogin } value="Entrar" />
                    </div>
                    <div className="criarConta">
                        <span>Não tem conta?</span>
                        <a href="Cadastro"> CADASTRE-SE</a>
                    </div>
                </form>

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

