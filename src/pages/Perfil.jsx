import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Header from '../components/Header'

const Perfil = () => {
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  return(
    <>
      <Header />
      <Form>
        <Form.Group>
          <Form.Label> Nome de Usuário:</Form.Label>
          <Form.Control 
            type={'text'} 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Nickname:</Form.Label>
          <Form.Control 
            type={'text'} 
            value={nickname} 
            onChange={e => setNickname(e.target.value)} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Email:</Form.Label>
          <Form.Control 
            type={'text'} 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Senha:</Form.Label>
          <Form.Control 
            type={'text'} 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
          />
        </Form.Group>
        <Button type={'Button'}> Salvar</Button>
      </Form>
    </>
  )
}

export default Perfil;