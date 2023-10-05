import React from 'react';

import ListagemCinemas from './views/listagem-cinemas';
import ListagemFilmes from './views/listagem-filmes';
import ListagemSessoes from './views/listagem-sessoes';
import ListagemUsuarios from './views/listagem-usuarios';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/listagem-cinemas' element={<ListagemCinemas />} />
        <Route path='/listagem-filmes' element={<ListagemFilmes />} />
        <Route path='/listagem-sessoes' element={<ListagemSessoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;