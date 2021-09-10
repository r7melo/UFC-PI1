import React from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import ListTorneios from './pages/ListTorneios.jsx'
import ListEquipe from './pages/ListEquipe.jsx'
import Perfil from './pages/Perfil.jsx'
import OpenTorneio from './pages/OpenTorneio.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" exact={true} component={Home} />
        <Route path="/cadastro" exact={true}  component={Cadastro} />            
        <Route path="/list-torneios" exact={true}  component={ListTorneios} />            
        <Route path="/list-equipe" exact={true}  component={ListEquipe} />            
        <Route path="/perfil" exact={true}  component={Perfil} />            
        <Route path="/open-torneio/:id?" exact={true}  component={OpenTorneio} />            
      </Switch>
    </Router>
  )
}

export default App;
