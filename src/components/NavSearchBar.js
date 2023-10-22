// NavSearchBar.js
import React, { useState } from 'react';
import "../App.css";

function NavSearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery); // Pass the search query to the parent component
    setSearchQuery('');
  };

  return (
    <form className='form-inline ml-auto' onSubmit={handleSearchSubmit}>
      <div className='input-group'>
        <input
          type='text'
          className='form-control nav-search-bar' // Add className to the input
          placeholder='Procurar'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className='input-group-append'>
          <div className='button-size'>
          <button  className='btn btn-outline-light nav-search-button ml-10' type='submit' >
            Procurar
          </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NavSearchBar;