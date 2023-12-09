import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL as  BASE_URL} from '../../config/axios2';
import { BASE_URL as  BASE_URL2} from '../../config/axios';

function CadastroSessoes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/sessoes`;

  const [id, setId] = useState('');
  const [idCinema, setIdCinema] = useState(0);
  const [idFilme, setIdFilme] = useState(0);
  const [idSala, setIdSala] = useState(0);
  const [idTipoDeExibicao, setTipoDeExibicao] = useState(0);
  const [idTipoDeTicket, setIdTipoDeTicket] = useState(0);
  const [dtExibicao, setDtExibicao] = useState('');
  const [horarioInicial, setHorarioInicial] = useState('');
  const [reservaAssentoMeia, setReservaAssentoMeia] = useState('');
 
 

  const [dados, setDados] = React.useState([]);

  async function salvar() {
    let data = { id, dtExibicao, horarioInicial, idTipoDeTicket,
      reservaAssentoMeia, idCinema, idFilme};
    
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`Sessão ${id} cadastrado com sucesso!`);
          navigate(`/adm/listagem-sessoes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`Sessão ${id} alterado com sucesso!`);
          navigate(`/adm/listagem-proprietarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if(idParam == null) return;
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setDtExibicao(dados.dtExibicao);
    setHorarioInicial(dados.horarioInicial);
    setIdTipoDeTicket(dados.idTipoDeTicket);
    setReservaAssentoMeia(dados.reservaAssentoMeia);
    setIdCinema(dados.idCinema);
    setIdFilme(dados.idFilme);

  }

  const [dadosCinemas, setDadosCinemas] = React.useState(null);
  const [dadosFilmes, setDadosFilmes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL2}/cinemas`).then((response) => {
      setDadosCinemas(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL2}/filmes`).then((response) => {
      setDadosFilmes(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosCinemas || !dadosFilmes) return null;

  const retornarListagem = () => navigate(`/adm/listagem-sessoes`);

  return (
    <div className='listContainer'>
      <Card title='Cadastro de Sessões'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
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
              <FormGroup label='filme: *' htmlFor='selecFilme'>
                <select
                  className='form-select'
                  id='selectFilme'
                  name='idFilme'
                  value={idFilme}
                  onChange={(e) => setIdFilme(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFilmes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='data de exibição: *' htmlFor='inputDTExibicao'>
                <input
                  type='date'
                  id='inputDTExibicao'
                  value={dtExibicao}
                  className='form-control'
                  name='dtExibicao '
                  onChange={(e) => setDtExibicao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Horário Inicial : *' htmlFor='inputHorarioInicial'>
                <input
                  type='time'
                  maxLength='11'
                  id='inputHorarioInicial'
                  value={horarioInicial}
                  className='form-control'
                  name='horarioInicial'
                  onChange={(e) => setHorarioInicial(e.target.value)}
                />
              </FormGroup>
             
              <FormGroup label='Reserva para assentos meia entrada:' htmlFor='inputReservaAssentoMeia'>
                <input
                  type="number" min="1" max="100"
                  id='inputReservaAssentoMeia'
                  value={reservaAssentoMeia}
                  className='form-control'
                  name='ReservaAssentoMeia '
                  onChange={(e) => setReservaAssentoMeia(e.target.value)}
                />
              </FormGroup>
             
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={retornarListagem}
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

export default CadastroSessoes;