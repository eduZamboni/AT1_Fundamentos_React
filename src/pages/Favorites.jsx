import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hotel from '../components/Hotel';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const favoriteHotels = storedHotels.filter((hotel) => hotel.isFavorite);
    setFavorites(favoriteHotels);
  }, []);

  const toggleFavorite = (id) => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const updatedHotels = storedHotels.map((hotel) => {
      if (hotel.id === id) {
        return { ...hotel, isFavorite: !hotel.isFavorite };
      }
      return hotel;
    });
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    const updatedFavorites = updatedHotels.filter((hotel) => hotel.isFavorite);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-container">
      <h1>Hotéis Favoritos</h1>

      <div className="cards-container">
        {favorites.length > 0 ? (
          favorites.map((hotel) => (
            <Hotel key={hotel.id} hotel={hotel} toggleFavorite={toggleFavorite} />
          ))
        ) : (
          <p>Você não tem nenhum hotel favorito.</p>
        )}
      </div>

      <div className="navigation-links">
        <Link to="/add" className="add-link">Adicionar Novo Hotel</Link>
        <Link to="/" className="back-link">Voltar para a Lista</Link>
      </div>
    </div>
  );
};