import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

//import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

function CadastroSessoes() {
  const { idParam } = useParams();

  //const navigate = useNavigate();

  const baseURL = `${BASE_URL}/cinemas`;

  const [id, setId] = useState('');
  const [dtExibicao, setDTExibicao] = useState('');
  const [horarioInicial, setHorarioInicial] = useState('');
  const [valorTicketInteiro, setValorTicketInteiro] = useState('');
  const [reservaAssentoMeia, setReservaAssentoMeia] = useState('');
  const [descontoMeia, setDescontoMeia] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDTExibicao('');
      setHorarioInicial('');
      setValorTicketInteiro('');
      setReservaAssentoMeia('');
      setDescontoMeia('')
    } else {
      setId(dados.id);
      setDTExibicao(dados.dtExibicao);
      setHorarioInicial(dados.horarioInicial);
      setValorTicketInteiro(dados.valorTicketInteiro);
      setReservaAssentoMeia(dados.reservaAssentoMeia);
      setDescontoMeia(dados.descontoMeia);
    }
  }

  return (
    <div className='listContainer'>
      <Card title='Cadastro de Sessões'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='data de exibição: *' htmlFor='inputDTExibicao'>
                <input
                  type='date'
                  id='inputDTExibicao'
                  value={dtExibicao}
                  className='form-control'
                  name='dtExibicao '
                  onChange={(e) => setDTExibicao(e.target.value)}
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
              <FormGroup label='Valor Ticket Inteiro: *' htmlFor='inputValorTicketInteiro'>
                <input
                  min="1" 
                  step="any"
                  type='number'
                  id='inputValorTicketInteiro'
                  value={valorTicketInteiro}
                  className='form-control'
                  name=' ValorTicketInteiro'
                  onChange={(e) => setValorTicketInteiro(e.target.value)}
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
              <FormGroup label='Desconto para meia entrada:' htmlFor='inputDescontoMeia'>
                <input
                  type="number" min="1" max="100"
                  id='inputDescontoMeia'
                  name='DescontoMeia'
                  className='form-control'
                  value={descontoMeia}
                  onChange={(e) => setDescontoMeia(e.target.value)}
                />
             
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={''}
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

export default CadastroSessoes;