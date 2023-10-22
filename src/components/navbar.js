import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "bootswatch/dist/lux/bootstrap.css";
import NavbarItem from "./navbarItem";
import NavSearchBar from "./NavSearchBar";
import userImage from "./avatar.png"; // Replace with the path to your user image
import "../App.css";



function Navbar(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  //const navigate = useNavigate();
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
            <NavbarItem render="true" href="/listagem-cinemas" label="Cinemas" />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/listagem-Filmes" label="Filmes" />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/listagem-sessoes" label="Sessões" />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/Comprar" label="Comprar" />
          </ul>
          <NavSearchBar onSearch={handleSearch} />
        </div>
        <div className="navbar-nav ml-auto custom-right-content">
          <div ref={modalRef} className={`vertical-container ${modalOpen ? "open" : ""}`}>
            <button
              className="btn btn-secondary user-avatar-button"
              type="button"
              onClick={toggleModal}
            >
              <img src={userImage} alt="User" className="user-avatar" />
            </button>
            {modalOpen && (
             <div className="modal-form">
             <form>
               <div className="form-group">
                 <label htmlFor="email">Email</label>
                 <input
                   type="email"
                   className="form-control form-control-sm"
                   id="email"
                   placeholder="Email"
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="password">Senha</label>
                 <input
                   type="password"
                   className="form-control form-control-sm"
                   id="password"
                   placeholder="Senha"
                 />
               </div>
               <div className="mt-2"> {/* Add margin-top to create space */}
                 <button
                   type="submit"
                   className="btn btn-secondary btn-sm border border-dark"
                   onClick={toggleModal}
                 >
                   Entrar
                 </button>
                 <button
                   type="button"
                   className="btn btn-secondary btn-sm border border-dark"
                   onClick={() => (window.location.href = 'http://localhost:3000/cadastro')}
                 >
                   Criar conta
                 </button>
               </div>
             
             </form>
           </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;