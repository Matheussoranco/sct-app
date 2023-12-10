import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { BASE_URL as BASE_URL1 } from '../../config/axios';
import "../../listagemFilmes.css"

const MovieSchedule = () => {
  const [selectedDate, setSelectedDate] = useState('2023-12-10');
  const [selectedSession, setSelectedSession] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You can perform additional actions when the date changes
  };

  const handleSessionChange = (session) => {
    setSelectedSession(session);
    // You can perform additional actions when the session changes
  };

  const [dadosFilmes, setDadosFilmes] = React.useState(null);

  useEffect(() => {
        // Fetch filmes
        axios.get(`${BASE_URL1}/filmes`).then((response) => {
        setDadosFilmes(response.data);
        });
  })

  if ( !dadosFilmes) return;

  return (
   
      <div className="listContainer">
        <div className="row">
          <div className="col">
            {/* Movie date picker */}
            <div id="pick-movie-date" >
            {dadosFilmes.map(movie =>
                <div key={movie.id} className="movie-result pick-wrapper d-md-flex">
                    <div style={{marginLeft: '2vh'}}>
                        <img src={movie.img} alt={`Movie ${movie.id}`}  style={{ width: '150px', height: '200px',}} />
                    </div>
                    <div style={{marginTop: '5vh'}}>
                        {movie.titulo}
                        <div style={{marginTop: '1vh',  textAlign:'center'}}>
                            {movie.duracao}
                         </div>
                    </div>
                    
                </div>    
            )}
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default MovieSchedule;

