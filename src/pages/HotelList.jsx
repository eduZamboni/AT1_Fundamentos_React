import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hotel from '../components/Hotel';

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [criterio, setCriterio] = useState('');

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotels(storedHotels);
  }, []);

  const toggleFavorite = (id) => {
    const updatedHotels = hotels.map((hotel) => {
      if (hotel.id === id) {
        return { ...hotel, isFavorite: !hotel.isFavorite };
      }
      return hotel;
    });
    setHotels(updatedHotels);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
  };

  const sortOptions = {
    'price-desc': (a, b) => b.price - a.price,      // Preço do maior para o menor
    'price-asc': (a, b) => a.price - b.price,      // Preço do menor para o maior
    'aval-desc': (a, b) => b.aval - a.aval,        // Classificação do maior para o menor
    'aval-asc': (a, b) => a.aval - b.aval,        // Classificação do menor para o maior
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedHotels = criterio ? [...filteredHotels].sort(sortOptions[criterio]) : filteredHotels;

  return (
    <div className="hotel-list-container">
      <h1>Lista de Hotéis</h1>

      <div className="search-sort-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar"
          className="search-input"
        />

        <select
          value={criterio}
          onChange={(e) => setCriterio(e.target.value)}
          className="sort-select"
        >
          <option value="">Ordenar por</option>
          <option value="price-desc">Preço (Maior para o menor)</option>
          <option value="price-asc">Preço (Menor para o maior)</option>
          <option value="aval-desc">Classificação (Maior para o menor)</option>
          <option value="aval-asc">Classificação (Menor para o maior)</option>
        </select>
      </div>

      <div className="cards-container">
        {sortedHotels.length > 0 ? (
          sortedHotels.map((hotel) => (
            <Hotel key={hotel.id} hotel={hotel} toggleFavorite={toggleFavorite} />
          ))
        ) : (
          <p>Nenhum hotel encontrado.</p>
        )}
      </div>

      <div className="navigation-links">
        <Link to="/add" className="add-link">Adicionar Novo Hotel</Link>
        <Link to="/favorites" className="favorites-link">Ver Favoritos</Link>
      </div>
    </div>
  );
}