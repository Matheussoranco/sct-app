import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroSalas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/salas`;

  const [id, setId] = useState('');
  const [numSala, setNumSala] = useState('');
  const [numAssentos, setNumAssentos] = useState('');
  const [idCinema, setIdCinema] = useState(0);


  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNumSala('');
      setNumAssentos('');
      setIdCinema(0);
    } else {
      setId(dados.id);
      setNumSala(dados.numSala);
      setNumAssentos(dados.numAssentos);
      setIdCinema(dados.idCinema);
    }
  }

  /*async function salvar() {
    let data = { id, numSala, numAssentos, idCinema,};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Sala ${nome} cadastrada com sucesso!`);
          navigate(`/adm/listagem-salas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Sala ${numSala} alterada com sucesso!`);
          navigate(`/adm/listagem-salas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNumSala(dados.numSala);
    setNumAssentos(dados.numAssentos);
    setIdCinema(dados.idCinema);
  }*/

  const [dadosSalas, setDadosSalas] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/salas`).then((response) => {
      setDadosSalas(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosSalas) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Salas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Número da sala: *' htmlFor='inputNumSala'>
                <input
                  type='text'
                  id='inputNumSala'
                  value={numSala}
                  className='form-control'
                  name='NumSala'
                  onChange={(e) => setNumSala(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Numero de assentos: *' htmlFor='inputNumAssentos'>
                <input
                  type='text'
                  id='inputNumAssentos'
                  value={numAssentos}
                  className='form-control'
                  name='numAssentos'
                  onChange={(e) => setNumAssentos(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cinema:' htmlFor='selectCinema'>
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
              
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
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

export default CadastroSalas;