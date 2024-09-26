import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hotel from '../components/Hotel';

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [Criterio, setCriterio] = useState('');

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotels(storedHotels);
  }, []);

  const filtroHotel = hotels
    .filter((hotel) => 
      hotel.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (Criterio === 'price') {
        return a.price - b.price;
      } else if (Criterio === 'class') {
        return b.class - a.class;
      } else {
        return 0;
      }
    });

  return (
    <div>
      <h1>Lista de Hotéis</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquisar"
      />

        <select
          value={Criterio}
          onChange={(e) => setCriterio(e.target.value)}
          className="sort-select"
        >
          <option value="">Ordenar por</option>
          <option value="price">Preço</option>
          <option value="class">Classificação</option>
        </select>

      <div>
        {filtroHotel.length > 0 ? (
          filtroHotel.map((hotel) => (
            <Hotel key={hotel.id} hotel={hotel} />
          ))
        ) : (
          <p>Nenhum hotel encontrado.</p>
        )}
      </div>
      <Link to="/add">Adicionar Novo Hotel</Link>
      <Link to="/favorites">Ver Favoritos</Link> 
    </div>
  );
}