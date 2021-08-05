import React from 'react'
import '../App.css'

function Cadastro() {
    return (
        <div className="App">
            <div className="container">
                <h1>Cadastro</h1>
                <p>Insira os dados abaixo para proseguimos com a criação da sua conta</p>
                <form>
                    <div class="input-field">
                        <input type="name" name="nome" placeholder="Nome completo" required/>
                    </div>
                    <div class="input-field">
                        <input type="email" name="email" placeholder="E-mail" required/>
                    </div>
                    <div class="input-field">
                        <input type="password" name="senha" placeholder="Senha" required/>
                    </div>
                    <div class="input-field">
                        <input type="password" name="senha" placeholder="Confirme sua senha" required/>
                    </div>
                    <div class="input-field">
                        <label for="nascimento">Data de nascimento</label>
                        <input type="date" name="nascimento" placeholder="Data de nascimento" required/>
                    </div>
                    <div>
                        <input type="submit" value="Entrar"/>
                    </div>
                    <div class="entrarConta">
                        <span>Já tem conta?</span>
                        <a href="Login">ENTRE AQUI</a>
                    </div>
                    </form>
            </div>
        </div>
    )
}

export default Cadastro