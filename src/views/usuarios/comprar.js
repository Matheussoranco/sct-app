import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';


function CadastroCompra() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idCinema, setIdCinema] = useState(0);
  const [idSessao, setIdSessao] = useState(0);
  const [idAssento, setIdAssento] = useState(0);
  const [idTipoDeTicket, setIdTipoDeTicket] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [idFormasDePagamento, setIdFormaDePagamento] = useState(0);
  const [valor, setValor] = useState('');

  const [dados, setDados] = React.useState([]);


  function inicializar(sessao){
 
    let valorInteira;

    if(quantidade && dadosTiposTicket && idTipoDeTicket )
      valorInteira = 30;
      setValor( quantidade*valorInteira);
  }

  const retornar = () => window.location.href = "http://localhost:3000/";

  async function salvar() {
    let data = {
      nome: nome,
      email: email,
      idCinema: idCinema,
      idSessao: idSessao,
      idAssento: idAssento,
      idTipoDeTicket: idTipoDeTicket,
      quantidade: quantidade,
      idFormasDePagamento: idFormasDePagamento,
    }
    
    let dadoNaoPreenchido = Object.keys(data).find(key => {
      return data[key] == null || data[key] == ''
    });
    
    if(dadoNaoPreenchido)
      mensagemErro("Dados faltando");
    else{
      mensagemSucesso("Compra realizada com sucesso");
  
      retornar();
    }
      
  }

  async function buscar() {
    try {
      const response = await axios.get(`${BASE_URL}`);
      setDados(response.data);
      setDtExibicao(response.data.data);
      setHorarioInicial(response.data.horario);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, show a message, or perform other actions
    }
  }

  const [dadosCinemas, setDadosCinemas] = React.useState(null);
  const [dadosSessoes, setDadosSessoes] = React.useState(null);
  const [dadosAssentos, setDadosAssentos] = React.useState(null);
  const [dadosTiposTicket, setDadosTiposTicket] = React.useState(null);
  const [dadosFormasDePagamento, setDadosFormaDePagamento] = React.useState(null);

  useEffect(() => {
    // Fetch cinemas
    axios.get(`${BASE_URL}/cinemas`).then((response) => {
      setDadosCinemas(response.data);
    });
  

    axios.get(`${BASE_URL}/sessoes`).then((response) => {
      setDadosSessoes(response.data);
    });

    axios.get(`${BASE_URL}/assentos`).then((response) => {
      setDadosAssentos(response.data);
    });

    axios.get(`${BASE_URL}/tiposTickets`).then((response) => {
      setDadosTiposTicket(response.data);
    });

    axios.get(`${BASE_URL}/formaPagamentos`).then((response) => {
      setDadosFormaDePagamento(response.data);
    });
  }, []);

  useEffect(() => {
    if(idSessao){
      let sessao = dadosSessoes.find(sessao => sessao.id == idSessao);
      inicializar();
    }
  })
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  

  if (!dados) return null;
  if (!dadosCinemas || !dadosSessoes || !dadosAssentos || 
      !dadosTiposTicket || !dadosFormasDePagamento ) return null;

  return (
    <div className='listContainer'>
      <Card title='Comprar'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cinema: *' htmlFor='selectCinema'>
                <select
                  className='form-select'
                  id='selectCinema'
                  name='idCinema'
                  value={idCinema}
                  onChange={(e) => setIdCinema(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosCinemas.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Sessão: *' htmlFor='selecSessao'>
                <select
                  className='form-select'
                  id='selectSessao'
                  name='idSessao'
                  value={idSessao}
                  onChange={(e) => setIdSessao(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosSessoes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.dtExibicao + " " + dado.horarioInicial}
                    </option>
                  ))}
                </select>
              </FormGroup>
              
              
              <FormGroup label='Assento: *' htmlFor='selecAssento'>
                <select
                  className='form-select'
                  id='selectAssento'
                  name='idAssento'
                  value={idAssento}
                  onChange={(e) => setIdAssento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosAssentos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.numero}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Tipo De ticket: *' htmlFor='selecTipoTicket'>
                <select
                  className='form-select'
                  id='selecTipoTicket'
                  name='Tipo de ticket'
                  value={idTipoDeTicket}
                  onChange={(e) => setIdTipoDeTicket(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTiposTicket.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.tipo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Quantidade de tickets: *' htmlFor='inputQuant'>
                <input
                  type='number'
                  id='inputQuant'
                  value={quantidade}
                  className='form-control'
                  name='quant'
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/\D/g, '');
                    setQuantidade(sanitizedValue)
                  }
                }
                  pattern="[0-9]*"
                />
              </FormGroup>
              <FormGroup label='Forma De Pagamento: *' htmlFor='selecFormPag'>
                <select
                  className='form-select'
                  id='FormaDePag'
                  name='Forma de pagamento'
                  value={idFormasDePagamento}
                  onChange={(e) => setIdFormaDePagamento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFormasDePagamento.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Valor: ' htmlFor='inputValor'>
                <input
                  type='number'
                  step="0.01"
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='Valor '
                  onChange={(e) => setDtExibicao(e.target.value)}
                  readOnly 
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Comprar
                </button>
                <button
                  onClick={retornar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroCompra;