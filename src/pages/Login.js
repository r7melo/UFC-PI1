import React from 'react'
import '../App.css'

function Login() {
    
    return (
        <div className="App">
            <div className="container">

                <h1>Login</h1>
                <p>Preencha suas informações</p>

                <form>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="E-mail" required />
                    </div>
                    <div className="input-field">
                        <input type="password" name="senha" placeholder="Senha" required />
                    </div>
                    <div>
                        <input type="submit" value="Entrar" />
                    </div>
                    <div className="criarConta">
                        <span>Não tem conta?</span>
                        <a href="Cadastro">CADASTRE-SE</a>
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

export default Login