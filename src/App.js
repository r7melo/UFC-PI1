import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Cadastro from './pages/Cadastro.js'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/home" exact={true} component={Home} />
        <Route path="/cadastro" exact={true}  component={Cadastro} />            
      </Switch>
    </Router>
  )
}

export default App;
