import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';
import { Save } from '@mui/icons-material';

function CadastroSalas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/salas`;

  const [id, setId] = useState('');
  const [idCinema, setIdCinema] = useState(0);
  const [numSala, setNumSala] = useState('');
  const [numAssentos, setNumAssentos] = useState('');


  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdCinema('');
      setNumSala('');
      setNumAssentos('');
    } else {
      
      setId(dados.id);
      setIdCinema(dados.idCinema);
      setNumSala(dados.numSala);
      setNumAssentos(dados.numAssentos);
    }
  }


  async function salvar() {
    let data = { id, idCinema, numSala, numAssentos };
    
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`Sala ${numSala} cadastrada com sucesso!`);
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
        .then( () => {
          mensagemSucesso(`Sala ${numSala} alterada com sucesso!`);
          navigate(`/adm/listagem-salas`);
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
    setIdCinema(dados.idCinema);
    setNumSala(dados.numSala);
    setNumAssentos(dados.numAssentos);
  }

  const [dadosCinemas, setDadosCinemas] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/cinemas`).then((response) => {
      setDadosCinemas(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosCinemas) return null;

  return (
    <div className='listContainer'>
      <Card title='Cadastro de Salas'>
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
              <FormGroup label='Numero da sala: *' htmlFor='inputNumSala'>
                <input
                  type='text'
                  id='inputNumSala'
                  value={numSala}
                  className='form-control'
                  name='numSala'
                  onChange={(e) => setNumSala(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Número de assentos: *' htmlFor='inputNumAssentos'>
                <input
                  type='text'
                  id='inputNumAssentos'
                  value={numAssentos}
                  className='form-control'
                  name='numAssentos'
                  onChange={(e) => setNumAssentos(e.target.value)}
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