import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';

import { BASE_URL } from '../../config/axios';

function CadastroAssento() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/assentos`;


  const [id, setId] = useState('');
  const [idSala, setIdSala] = useState(0);
  const [numero, setNumero] = useState('');
  const [idTipoAssento, setIdTipoAssento] = useState(0);
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNumero('');
      setIdSala(0);
      setIdTipoAssento(0)
    } else {
      setId(dados.id);
      setNumero(dados.numero);
      setIdSala(dados.idSala);
      setIdTipoAssento(dados.idTipoAssento)
    }
  }

  async function salvar() {
    let data = { id, numero, idSala, idTipoAssento};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Assento cadastrado com sucesso!`);
          navigate(`../adm/listagem-assentos`);
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
          mensagemSucesso(`Assento alterado com sucesso!`);
          navigate(`../adm/listagem-assentos`);
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
    setIdSala(dados.idSala);
    setNumero(dados.numero);
    setIdTipoAssento(dados.idTipoAssento)
  }

  const [dadosTipoAssento, setDadosTipoAssento] = React.useState(null);
  const [dadosSalas, setDadosSalas] = React.useState(null);

 
  useEffect(() => {
    axios.get(`${BASE_URL}/tiposAssentos`).then((response) => {
      setDadosTipoAssento(response.data);
    });

    axios.get(`${BASE_URL}/salas`).then((response) => {
      setDadosSalas(response.data);
    });
    
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosSalas || !dadosTipoAssento ) return null;

  return (
    <div className='listContainer'>
      <Card title='Cadastro de Assentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
            <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='number'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Sala: *' htmlFor='selectSala'>
                <select
                  className='form-select'
                  id='selectSala'
                  name='idSala'
                  value={idSala}
                  onChange={(e) => setIdSala(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosSalas.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.numSala}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Tipo de assento: *' htmlFor='selectTipoDeAssento'>
                <select
                  className='form-select'
                  id='selectTipoDeAssento'
                  name='idTipoAssento'
                  value={idTipoAssento}
                  onChange={(e) => setIdTipoAssento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTipoAssento.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.tipo}
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

export default CadastroAssento;