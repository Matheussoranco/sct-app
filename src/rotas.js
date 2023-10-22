import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";

import ListagemCinemas from "./views/listagem/listagem-cinemas";
import ListagemFilmes from "./views/listagem/listagem-filmes";
import ListagemSessoes from "./views/listagem/listagem-sessoes";
import ListagemUsuarios from "./views/listagem/listagem-usuarios";
import ListagemAssentos from "./views/listagem/listagem-assentos";
import ListagemCategorias from "./views/listagem/listagem-categorias";
import ListagemProdutoras from "./views/listagem/listagem-produtoras";
import ListagemProprietarios from "./views/listagem/listagem-proprietarios";
import ListagemSalas from "./views/listagem/listagem-salas";
import ListagemTiposAssento from "./views/listagem/listagem-tiposAssento";
import ListagemTiposExibicao from "./views/listagem/listagem-tiposExibicao";
import ListagemTiposTicket from "./views/listagem/listagem-tiposTicket";
import ListagemAdministradores from "./views/listagem/listagem-administradores";
import ListagemFormasPagamento from "./views/listagem/listagem-formasPagamento";

import CadastroCinemas from "./views/cadastro/cadastro-cinemas";
import CadastroSessoes from "./views/cadastro/cadastro-sessoes";
import CadastroFilmes from "./views/cadastro/cadastro-filmes";
import CadastroUsuarios from "./views/cadastro/cadastro-usuarios";



function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/adm/cadastro/cadastro-cinemas/:idParam?"
          element={<CadastroCinemas />}
        />
        <Route
          path="/adm/cadastro/cadastro-sessoes/:idParam?"
          element={<CadastroSessoes />}
        />
        <Route
          path="/adm/cadastro/cadastro-filmes/:idParam?"
          element={<CadastroFilmes />}
        />
        <Route
          path="/cadastro/:idParam?"
          element={<CadastroUsuarios />}
        />


        <Route path="/adm/listagem-usuarios" element={<ListagemUsuarios />} />
        <Route path="/adm/listagem-cinemas" element={<ListagemCinemas />} />
        <Route path="/adm/listagem-filmes" element={<ListagemFilmes />} />
        <Route path="/adm/listagem-sessoes" element={<ListagemSessoes />} />
        <Route path="/adm/listagem-assentos" element={<ListagemAssentos />} />
        <Route
          path="/adm/listagem-categorias"
          element={<ListagemCategorias />}
        />
        <Route
          path="/adm/listagem-produtoras"
          element={<ListagemProdutoras />}
        />
        <Route
          path="/adm/listagem-proprietarios"
          element={<ListagemProprietarios />}
        />
        <Route path="/adm/listagem-salas" element={<ListagemSalas />} />
        <Route
          path="/adm/listagem-tiposAssento"
          element={<ListagemTiposAssento />}
        />
        <Route
          path="/adm/listagem-tiposExibicao"
          element={<ListagemTiposExibicao />}
        />
        <Route
          path="/adm/listagem-tiposTicket"
          element={<ListagemTiposTicket />}
        />
        <Route
          path="/adm/listagem-administradores"
          element={<ListagemAdministradores />}
        />
        <Route
          path="/adm/listagem-formasPagamento"
          element={<ListagemFormasPagamento />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
