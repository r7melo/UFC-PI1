import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Nav } from "react-bootstrap";

function Header() {
    const history = useHistory()
    const logout = () => {
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <>
            <Nav style={{display:'flex', justifyContent:'space-between'}}>
                <h1 onClick={() => history.push('/home')}>Torne-IO</h1>
                <div style={{display:'flex'}}>
                    <Nav.Item>
                        <Nav.Link href="javascript:void(0);" onClick={() => history.push('/list-torneios')}>Meus torneios</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="javascript:void(0);" onClick={() => history.push('/list-equipe')}>Equipe</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="javascript:void(0);" onClick={() => history.push('/perfil')} >Perfil</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="javascript:void(0);" onClick={logout}>Sair</Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
        </>
    )
}

export default Header;