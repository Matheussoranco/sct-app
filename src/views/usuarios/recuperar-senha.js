import React, { useState } from 'react';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  
    
  async function salvar() {
    if(!email)
      mensagemErro("Preencha o email para recuprar a senha");
    else{
      mensagemSucesso("Email de recuperação de senha enviado com sucesso");
      retornar();
    }
      
    }
      
    const retornar = () =>window.location.href = "http://localhost:3000/";

  return (
    <div className='listContainer'>
      <Card title='Recuperar senha'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
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
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Enviar
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

export default RecuperarSenha;
