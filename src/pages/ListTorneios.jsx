import React, { useEffect, useState, useCallback } from 'react'
import { Button, Form, Modal, Table} from 'react-bootstrap'
import Header from '../components/Header'
import close from '../assets/close.svg'
import pencil from '../assets/pencil.svg'
import { api } from '../services/api'
import open from '../assets/open.svg'
import { useHistory } from 'react-router'

const ListTorneios = () => {
  const [show, setShow] = useState(false);
  const [quantEquipe, setQuantEquipe] = useState('') 
  const [nomeTorneio, setNomeTorneio] = useState('') 
  const [premiacao, setPremiacao] = useState('') 
  const [torneios, setTorneios] = useState([]);
  const history = useHistory()

  const handleSubmit = async () => {
    const obj = {
      nome_torneio: nomeTorneio,
      quant_times: quantEquipe,
      premiacao,
    }
    const res = await api.post('/add-torneio', obj);
    if(res.data.message === 'Salvo com sucesso'){
      document.location.reload()
    }
  }
  const getTorneios = useCallback(async ()=>{
    const res = await api.get('/torneios');
    setTorneios(res.data.torneios);
  },[])

  const deleteTorneio = async (id) =>{
    let {data} = await api.post('/delete-torneio', {id})
    console.log(data)
    if(data.message === 'sucesso'){
      document.location.reload()
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getTorneios();
  },[getTorneios])
  return (
    <>
      <Header />
      <Button variant="primary" onClick={handleShow}>
       Criar Torneio
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Nome do Torneio</th>
            <th>Status do Torneio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {torneios.map( torneio => {
            return(
              <tr key={torneio.cod_torneio}>
                <td>{torneio.nome_torneio}</td>
                <td>Em andamento</td>
                <td>
                  <a 
                    href="javascript:void(0);" 
                    onClick={() => history.push(`/open-torneio/${torneio.cod_torneio}`)} 
                    style={{marginRight: 10}}
                  >
                    <img src={open} alt="Abrir" />
                  </a>
                  <a 
                    href="javascript:void(0);" 
                    style={{marginRight: 10}}
                  >
                    <img src={pencil} alt="Editar" width={20} />
                  </a>
                  <a 
                    href="javascript:void(0);" 
                    onClick={() => {deleteTorneio(torneio.cod_torneio)}}
                  >
                    <img src={close} alt="Excluir" width={20} />
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Torneio</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId={'nome_torneio'}>
              <Form.Label>Nome do Torneio:</Form.Label>
              <Form.Control 
                type={'text'} 
                placeholder={'Meu torneio'} 
                value={nomeTorneio} 
                onChange={e => setNomeTorneio(e.target.value)}
              />
            </Form.Group>

         
            <Form.Label>Quantidade de equipes</Form.Label>
            <Form.Select 
              controlId={'quant_equipe'} 
              value={quantEquipe} 
              onChange={e => setQuantEquipe(e.target.value)}
            >
              <option value="">-- Selecione --</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </Form.Select>
            
            <Form.Group controlId={'nome_torneio'}>
              <Form.Label>Premiação:</Form.Label>
              <Form.Control 
                type={'text'} 
                placeholder={'R$ 0,00'} 
                value={premiacao} 
                onChange={e => setPremiacao(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListTorneios;