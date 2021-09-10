import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal, Table} from 'react-bootstrap'
import Header from '../components/Header'
import close from '../assets/close.svg'
import pencil from '../assets/pencil.svg'
import { api } from '../services/api';

const ListEquipe = () => {
  const [show, setShow] = useState(false);
  const [nomeEquipe, setNomeEquipe] = useState('')
  const [siglaEquipe, setSiglaEquipe] = useState('')
  const [equipes, setEquipes] = useState([])
  const [torneios, setTorneios] = useState([])
  const [torneio, setTorneio] = useState('')
  const handleSubmit = async () => {
    let obj = {
      nome_time: nomeEquipe,
      sigla: siglaEquipe,
      cod_torneio: torneio,
    }
    let res = await api.post('/add-equipe', obj)

    if(res.data.message === 'sucesso'){
      window.location.reload()
    }
  }

  const getEquipes = useCallback(async () => {
    let { data } = await api.get('/equipes')
    setEquipes(data.equipes)
  },[])

  const getTorneios = useCallback(async ()=>{
    const res = await api.get('/torneios');
    setTorneios(res.data.torneios);
  },[])

  const handleDelete = async (id) => {
    let { data } = await api.post(`/delete-equipe/${id}`)

    if(data.message === 'sucesso'){
      window.location.reload()
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getEquipes();
    getTorneios();
  },[getEquipes])
  return (
    <>
      <Header />
      <Button variant="primary" onClick={handleShow}>
       Criar Equipe
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Nome da Equipe</th>
            <th>Sigla da Equipe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {equipes.map( equipe => {
            return(
              <tr key={equipe.cod_time}>
                <td>{equipe.nome_time}</td>
                <td>{equipe.sigla}</td>
                <td>
                  <a href="javascript:void(0);" style={{marginRight:10}}>
                    <img src={pencil} alt="Editar" width={20} />
                  </a>
                  <a href="javascript:void(0);">
                    <img src={close} alt="Deletar" onClick={() => handleDelete(equipe.cod_time)} width={20} />
                  </a>
                </td>
              </tr>

            )
          })}
          
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Equipe</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId={'nome_equipe'}>
              <Form.Label>Nome da Equipe:</Form.Label>
              <Form.Control 
                type={'text'} 
                placeholder={'Minha Equipe'} 
                value={nomeEquipe}
                onChange={e => setNomeEquipe(e.target.value)}  
              />
            </Form.Group>

            <Form.Group controlId={'sigla_equipe'}>
              <Form.Label>Sigla da Equipe: </Form.Label>
              <Form.Control 
                type={'text'} 
                placeholder={'MEQ'} 
                value={siglaEquipe}
                onChange={e => setSiglaEquipe(e.target.value)}
              />
            </Form.Group>         

            <Form.Label>Torneio:</Form.Label>
            <Form.Select value ={torneio} onChange={e => setTorneio(e.target.value)}>
              <option value={''}>-- Selecione --</option>
              {torneios.map(torneio => {
                return(
                  <option value={torneio.cod_torneio}>{torneio.nome_torneio}</option>
                )
              })}
            </Form.Select>   
            
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

export default ListEquipe;