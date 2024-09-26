import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Favts() {
  const [favHotels, setFavHotels] = useState([]);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const storedFavts = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favts = storedHotels.filter((hotel) =>
      storedFavts.includes(hotel.id)
    );
    setFavHotels(favts);
  }, []);

  return (
    <div>
      <h1>Hotéis Favoritos</h1>
      {favHotels.map((hotel) => (
        <div key={hotel.id} className="hotel-card">
          <img src={hotel.image} alt={hotel.name} />
          <h2>{hotel.name}</h2>
          <Link to={`/details/${hotel.id}`}>Ver Detalhes</Link>
        </div>
      ))}
      <Link to="/">Voltar à Lista</Link>
    </div>
  );
}
