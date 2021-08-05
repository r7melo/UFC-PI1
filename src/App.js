import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Cadastro from './pages/Cadastro.js'

function App() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/Cadastro" component={Cadastro} />
    </Router>
  )
}

export default App;
