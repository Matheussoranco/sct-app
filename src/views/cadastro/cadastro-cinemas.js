import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

function CadastroCinemas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/cinemas`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [numSalas, setNumSalas] = useState('');
  const [telefone, setTelefone] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCnpj('');
      setEmail('');
      setNumSalas('');
      setTelefone('')
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCnpj(dados.cnpj);
      setEmail(dados.email);
      setNumSalas(dados.numSalas);
      setTelefone(dados.telefone);
    }
  }

  async function salvar() {
    let data = { id, nome, cnpj, email,
      numSalas, telefone};
    
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`Cinema ${id} cadastrado com sucesso!`);
          navigate(`/adm/listagem-cinemas`);
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
          mensagemSucesso(`Cinema ${id} alterado com sucesso!`);
          navigate(`/adm/listagem-cinemas`);
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
    setNome(dados.nome);
    setCnpj(dados.cnpj);
    setEmail(dados.email);
    setNumSalas(dados.numSalas);
    setTelefone(dados.telefone);
  }

  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='listContainer'>
      <Card title='Cadastro de Cinemas'>
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
              <FormGroup label='CNPJ: *' htmlFor='inputCnpj'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCnpj'
                  value={cnpj}
                  className='form-control'
                  name='cnpj'
                  onChange={(e) => setCnpj(e.target.value)}
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
              <FormGroup label='Número de salas:' htmlFor='inputNumSala'>
                <input
                  type='text'
                  id='inputNumSala'
                  value={numSalas}
                  className='form-control'
                  name='numSalas'
                  onChange={(e) => setNumSalas(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Telefone:' htmlFor='inputTelefone'>
                <input
                  type='text'
                  id='inputTelefone'
                  name='idTelefone'
                  className='form-control'
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
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

export default CadastroCinemas;