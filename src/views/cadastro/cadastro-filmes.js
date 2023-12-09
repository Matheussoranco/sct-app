import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import "../../custom.css";

import axios from "axios";
import { BASE_URL as BASE_URL1 } from "../../config/axios";
import { BASE_URL as BASE_URL2 } from "../../config/axios";
import { BASE_URL as BASE_URL3 } from "../../config/axios";

function CadastroFilmes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL1}/cinemas`;

  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [faixaEtaria, setFaixaEtaria] = useState("");
  const [duracao, setDuracao] = useState("");
  const [idCategoria, setIdCategoria] = useState(0);
  const [idProdutora, setIdProdutora] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setTitulo("");
      setSinopse("");
      setFaixaEtaria("");
      setDuracao("");
      setIdCategoria("");
      setIdProdutora("");
    } else {
      setId(dados.id);
      setTitulo(dados.titulo);
      setSinopse(dados.sinopse);
      setFaixaEtaria(dados.faixaEtaria);
      setDuracao(dados.duracao);
      setIdCategoria(dados.idCategoria);
      setIdProdutora(dados.idProdutora);
    }
  }

  async function salvar() {
    let data = { id, titulo, sinopse, faixaEtaria, duracao, idCategoria, idProdutora};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Filme cadastrado com sucesso!`);
          navigate(`../adm/listagem-filmes`);
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
          mensagemSucesso(`Filme alterado com sucesso!`);
          navigate(`../adm/listagem-filmes`);
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
    setTitulo(dados.titulo);
    setSinopse(dados.sinopse);
    setFaixaEtaria(dados.faixaEtaria);
    setDuracao(dados.duracao);
    setIdCategoria(dados.idCategoria);
    setIdProdutora(dados.idProdutora);
  }
 

  const [dadosCategoria, setDadosCategoria] = React.useState(null);
  const [dadosProdutora, setDadosProdutora] = React.useState(null);

useEffect(() => {
  axios.get(`${BASE_URL2}/categorias`).then((response) => {
    setDadosCategoria(response.data);
  });

  axios.get(`${BASE_URL3}/produtoras`).then((response) => {
    setDadosProdutora(response.data);
  });
  
}, []);

useEffect(() => {
  buscar(); // eslint-disable-next-line
}, [id]);

if (!dados) return null;

  return (
    <div className="listContainer">
      <Card title="Cadastro de Filmes">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Título: *" htmlFor="inputTitulo">
                <input
                  type="text"
                  id="inputTitulo"
                  value={titulo}
                  className="form-control"
                  name="titulo "
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Sinopse: *" htmlFor="inputSinopse">
                <input
                  type="text"
                  id="inputSinopse"
                  value={sinopse}
                  className="form-control"
                  name="sinopse"
                  onChange={(e) => setSinopse(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Faixa etária: *" htmlFor="inputFaixaEtaria">
                <select
                  id="inputFaixaEtaria"
                  value={faixaEtaria}
                  className="form-control"
                  name="faixaEtaria"
                  onChange={(e) => setFaixaEtaria(e.target.value)}
                >
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                </select>
              </FormGroup>
              <FormGroup
                label="Duração:"
                htmlFor="inputDuracao"
              >
                <input
                  type="time"
                  id="inputDuracao"
                  value={duracao}
                  className="form-control"
                  name="Duracao"
                  onChange={(e) => setDuracao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Categoria: *' htmlFor='selectCategoria'>
                <select
                  className='form-select'
                  id='selectCategoria'
                  name='idCategoria'
                  value={idCategoria}
                  onChange={(e) => setIdCategoria(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosCategoria.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Produtora: *' htmlFor='selectProdutora'>
                <select
                  className='form-select'
                  id='selectProdutora'
                  name='idProdutora'
                  value={idProdutora}
                  onChange={(e) => setIdProdutora(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosProdutora.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type="button"
                  className="btn btn-danger"
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

export default CadastroFilmes;
