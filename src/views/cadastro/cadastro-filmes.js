import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

//import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import "../../custom.css";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

function CadastroFilmes() {
  const { idParam } = useParams();

  //const navigate = useNavigate();

  const baseURL = `${BASE_URL}/cinemas`;

  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [faixaEtaria, setFaixaEtaria] = useState("");
  const [duracao, setDuracao] = useState("");
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setTitulo("");
      setSinopse("");
      setFaixaEtaria("");
      setDuracao("");
    } else {
      setId(dados.id);
      setTitulo(dados.titulo);
      setSinopse(dados.sinopse);
      setFaixaEtaria(dados.faixaEtaria);
      setDuracao(dados.duracao);
    }
  }

  return (
    <div className="listContainer">
      <Card title="Cadastro de Sessões">
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
              <Stack spacing={1} padding={1} direction="row">
                <button onClick={""} type="button" className="btn btn-success">
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
