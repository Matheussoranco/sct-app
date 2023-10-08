import React from 'react';

import ListagemCinemas from './views/listagem-cinemas';
import ListagemFilmes from './views/listagem-filmes';
import ListagemSessoes from './views/listagem-sessoes';
import ListagemUsuarios from './views/listagem-usuarios';
import ListagemAssentos from './views/listagem-assentos';
import ListagemCategorias from './views/listagem-categorias';
import ListagemProdutoras from './views/listagem-produtoras';
import ListagemProprietarios from './views/listagem-proprietarios';
import ListagemSalas from './views/listagem-salas';
import ListagemTiposAssento from './views/listagem-tiposAssento';
import ListagemTiposExibicao from './views/listagem-tiposExibicao';
import ListagemTiposTicket from './views/listagem-tiposTicket';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adm/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/adm/listagem-cinemas' element={<ListagemCinemas />} />
        <Route path='/adm/listagem-filmes' element={<ListagemFilmes />} />
        <Route path='/adm/listagem-sessoes' element={<ListagemSessoes />} />
        <Route path='/adm/listagem-assetos' element={<ListagemAssentos />} />
        <Route path='/adm/listagem-categorias' element={<ListagemCategorias />} />
        <Route path='/adm/listagem-produtoras' element={<ListagemProdutoras />} />
        <Route path='/adm/listagem-proprietarios' element={<ListagemProprietarios />} />
        <Route path='/adm/listagem-salas' element={<ListagemSalas />} />
        <Route path='/adm/listagem-tiposAssento' element={<ListagemTiposAssento />} />
        <Route path='/adm/listagem-tiposExibicao' element={<ListagemTiposExibicao />} />
        <Route path='/adm/listagem-tiposTicket' element={<ListagemTiposTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;