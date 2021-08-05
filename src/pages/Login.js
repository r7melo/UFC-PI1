import React , {useState, useEffect } from 'react'
import '../App.css'
import Axios from "axios"

function Login() {

    const [movieName, setMovieName] = useState("")
    const [movieReview, setMovieReview] = useState("")

    const submitReview = () => {
        Axios.post("http://localhost:3001/api/login", {
          movieName: movieName,
          movieReview: movieReview
        }).then(() => {
          alert("Successfull insert")
        })
      }
    
    return (
        <div className="App">
            <div className="container">

                <h1>Login</h1>
                <p>Preencha suas informações</p>

                <form>
                    <div className="input-field">
                        <input type="email" name="email" placeholder="E-mail" required onChange={ (e) => { setMovieName(e.target.value) } } />
                    </div>
                    <div className="input-field">
                        <input type="password" name="senha" placeholder="Senha" required onChange={ (e) => { setMovieReview(e.target.value) } } />
                    </div>
                    <div>
                        <input type="submit" onClick={ submitReview } value="Entrar" />
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