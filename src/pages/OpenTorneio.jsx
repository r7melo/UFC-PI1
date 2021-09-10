import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header'
import { api } from '../services/api';
import { Form, Modal, Button } from 'react-bootstrap';
const OpenTorneio = () => {
  const { id } = useParams()
  const [times, setTimes] = useState([])
  const [numVitorias, setNumVitorias] = useState([])
  const [partida, setPartida] = useState([])
  const [selectedWin, setSelectedWin] = useState('')

  const getTorneio = useCallback( async () =>{
    let { data } = await api.get(`/torneio-by-id/${id}`)
    console.log(data.torneio)
    verifTam(data.torneio)
    setTimes(data.torneio)
  },[])

  const verifTam = (grupo) => {
    if(grupo.length === 16){
      setNumVitorias([4, 3, 2, 1, 0])
    }else if(grupo.length === 8){
      setNumVitorias([3, 2, 1, 0])
    }else if(grupo.length === 4){
      setNumVitorias([2, 1, 0])
    }else if(grupo.length === 2){
      setNumVitorias([1, 0])
    }

  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (index, rodada) => {
    switch(rodada){
      case 1:
        let finalistas = times.filter(time => {return time.quant_vitorias >= numVitorias[1]})
        setPartida(finalistas)
        break;
      case 2:
        let semifinalistas = times.filter(time => {return time.quant_vitorias >= numVitorias[2]})
        console.log(semifinalistas)
        if(index==0){
          setPartida([semifinalistas[index],semifinalistas[index+1]])
        }else{
          setPartida([semifinalistas[index+1], semifinalistas[index+2]])
        }
        break;
      case 3:
        let quartas = times.filter(time => {return time.quant_vitorias >= numVitorias[3]})
        if(index==0){
          setPartida([quartas[index],quartas[index+1]])
        }else{
          setPartida([quartas[index+1], quartas[index+2]])
        }
        break;
      case 4:
        let oitavas = times.filter(time => {return time.quant_vitorias >= numVitorias[4]})
        if(index==0){
          setPartida([oitavas[index],oitavas[index+1]])
        }else{
          setPartida([oitavas[index+1], oitavas[index+2]])
        }
        break;
    }

    setShow(true);
  };

  const handleUpdateVitoria = async () => {
    let obj = {
      id: selectedWin,
      quant_vitorias: times.filter(time => {return time.cod_time === Number(selectedWin)})[0].quant_vitorias
    }
    console.log(selectedWin)
    let res = await api.post(`/atualiza-time`, obj)

    if(res.data.message === 'sucesso'){
      window.location.reload()
    }
  }

  useEffect(() => {
    getTorneio()
    console.log(numVitorias)
  },[getTorneio])
  return(
    <>
      <Header />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Partida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Selecione o vencedor</Form.Label>
          <Form.Select value={selectedWin} onChange={e => setSelectedWin(e.target.value)}>
            <option value="">-- Selecione --</option>
            {partida.map(time => {
              return (
                <option value={time.cod_time}>{time.nome_time}</option>
              )
            })}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleUpdateVitoria}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
        <main style={{textAlign: 'center'}}>
        <p onClick={() => handleShow(0, 1)}>
          {times.filter(time => {return time.quant_vitorias >= numVitorias[0]}).length ?
            times.filter(time => {return time.quant_vitorias >= numVitorias[0]})[0].nome_time 
            : 'Aguardando resultado'
          }
        </p>

        <p>
          <span style={{marginRight:10}} onClick={() => handleShow(0, 2)}>
          {times.filter(time => {return time.quant_vitorias >= numVitorias[1]}).length ?
            times.filter(time => {return time.quant_vitorias >= numVitorias[1]})[0].nome_time 
            : 'Aguardando resultado'
          }
          </span>
          <span onClick={() => handleShow(1, 2)}>
          {times.filter(time => {return time.quant_vitorias >= numVitorias[1]}).length > 1 ?
            times.filter(time => {return time.quant_vitorias >= numVitorias[1]})[1].nome_time 
            : 'Aguardando resultado'
          }
          </span>
        </p>

        {times.length === 4 ?
          <p>
            <span style={{marginRight:10}} onClick={() => handleShow(0, 3)}>
              {times.filter(time => {return time.quant_vitorias >= numVitorias[2]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[2]})[0]?.nome_time 
                : 'Aguardando resultado'
              }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 3)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[2]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[2]})[1]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(2, 3)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[2]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[2]})[2]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(3, 3)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[2]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[2]})[3]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
          </p>
        : ''
        }
        {times.length === 8 ? 
          <p>
            <span style={{marginRight:10}} onClick={() => handleShow(0, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[0]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[1]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[2]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[3]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[4]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[5]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[6]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}} onClick={() => handleShow(1, 4)}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[3]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[3]})[7]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
          </p>
          : ''
        }
        {times.length === 16 ? 
          <p>  
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[0]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[1]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[2]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[3]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[4]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[5]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[6]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[7]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[8]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[9]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[10]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[11]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[12]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[13]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[14]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            <span style={{marginRight:10}}>
            {times.filter(time => {return time.quant_vitorias >= numVitorias[4]}).length ?
                times.filter(time => {return time.quant_vitorias >= numVitorias[4]})[15]?.nome_time 
                : 'Aguardando resultado'
            }
            </span>
            
          </p>
          :''  
        }
      </main>
        

    </>
  )
}

export default OpenTorneio;