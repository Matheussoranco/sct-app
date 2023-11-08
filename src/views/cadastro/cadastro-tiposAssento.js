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

function CadastrotipoAssento() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/tipoAssento`;

  const [id, setId] = useState('');
  const [tipo, setTipo] = useState('');

  const [dados, setDados] = React.useState([]);

  async function salvar() {
    let data = { id, tipo };
    
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then( () => {
          mensagemSucesso(`Tipo de Assento ${tipo} cadastrado com sucesso!`);
          navigate(`/adm/listagem-tipoAssento`);
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
          mensagemSucesso(`tipoAssento ${tipo} alterado com sucesso!`);
          navigate(`/adm/listagem-tipoAssento`);
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
    setTipo(dados.tipo);
  }

  const [dadosTipoAssento, setDadosAssentos] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/tipoAssento`).then((response) => {
      setDadosAssentos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  const retornarListagem = () => navigate(`/adm/listagem-tipoAssento`);

  return (
    <div className='listContainer'>
      <Card title='Cadastro de Tipos de Assentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Tipo: *' htmlFor='inputTipo'>
                <input
                  type='text'
                  id='inputTipo'
                  value={tipo}
                  className='form-control'
                  name='tipo'
                  onChange={(e) => setTipo(e.target.value)}
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

export default CadastrotipoAssento;