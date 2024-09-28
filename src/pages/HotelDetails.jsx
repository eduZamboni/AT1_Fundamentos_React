import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HotelInfo from '../components/HotelInfo';
import Delete from '../components/Delete';

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const selectedHotel = storedHotels.find((hotel) => hotel.id === id);
    setHotel(selectedHotel);
  }, [id]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (storedFavorites.includes(id)) {
      updatedFavorites = storedFavorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...storedFavorites, id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (!hotel) {
    return <p>Hotel não encontrado.</p>;
  }

  return (
    <div>
      <HotelInfo
        hotel={hotel}
        toggleFavorite={toggleFavorite}
        Delete={<Delete id={id} />}
      />
    </div>
  );
}