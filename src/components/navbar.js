import React from "react";
import "bootswatch/dist/lux/bootstrap.css";

import NavbarItem from "./navbarItem";
import NavSearchBar from "./NavSearchBar";

function Navbar(props) {
  const handleSearch = (searchQuery) => {
    // Handle the search action here with the searchQuery
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="/" className="navbar-brand">
          SCT
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-cinemas"
              label="Cinemas"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/listagem-Filmes" label="Filmes" />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-sessoes"
              label="Sessões"
            />
          </ul>

          <ul className="navbar-nav">
            <NavbarItem render="true" href="/listagem-cursos" label="Comprar" />
          </ul>
          <NavSearchBar onSearch={handleSearch} />
        </div>
        <div className="navbar-nav ml-auto custom-right-content">
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/login" label="Entrar" />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/" label="Sair" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
