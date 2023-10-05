import React, { useState, useRef } from "react";
import "bootswatch/dist/lux/bootstrap.css";
import NavbarItem from "./navbarItem";
import NavSearchBar from "./NavSearchBar";
import userImage from "./avatar.png"; // Replace with the path to your user image
import "../App.css";

function Navbar(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSearch = (searchQuery) => {
    // Handle the search action here with the searchQuery
    console.log("Searching for:", searchQuery);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setModalOpen(false);
    }
  };

  // Attach a click event listener to the document to handle clicks outside the modal
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownCinema"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Cinemas
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownCinema"
              >
                <a className="dropdown-item" href="/listagem-cinemas">
                  Cinemas
                </a>
                <a className="dropdown-item" href="/listagem-salas">
                  Salas
                </a>
                <a className="dropdown-item" href="/listagem-assentos">
                  Assentos
                </a>
                <a className="dropdown-item" href="/listagem-tipoDeAssento">
                  Tipos de assento
                </a>
                <a className="dropdown-item" href="/listagem-filmes">
                  Filmes
                </a>
                <a className="dropdown-item" href="/listagem-categorias">
                  Categorias
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownCinema"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sessões
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownCinema"
              >
                <a className="dropdown-item" href="/listagem-sessões">
                  Sessões
                </a>
                <a className="dropdown-item" href="/listagem-tipoDeExibicao">
                  Tipos de exibição
                </a>
                <a className="dropdown-item" href="/listagem-TipoDeTicket">
                  Tipos de ticket
                </a>
              </div>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-produtoras"
              label="Produtoras"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-proprietarios"
              label="Proprietários"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-usuarios"
              label="Usuários"
            />
          </ul>
          <NavSearchBar onSearch={handleSearch} />
        </div>
        <div className="navbar-nav ml-auto custom-right-content">
          <div
            ref={modalRef}
            className={`vertical-container ${modalOpen ? "open" : ""}`}
          >
            <button
              className="btn btn-secondary user-avatar-button"
              type="button"
              onClick={toggleModal}
            >
              <img src={userImage} alt="User" className="user-avatar" />
            </button>
            {modalOpen && (
              <div className="modal-form">
                {/* Add your modal content here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
