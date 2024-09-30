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
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const updatedHotels = storedHotels.map((h) => {
      if (h.id === id) {
        return { ...h, isFavorite: !h.isFavorite };
      }
      return h;
    });
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));

    const updatedHotel = updatedHotels.find((h) => h.id === id);
    setHotel(updatedHotel);
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