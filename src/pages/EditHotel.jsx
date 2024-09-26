import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditHotel() {
  const { id } = useParams();
  const [hotelDados, sethotelDados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const hotelEdit = storedHotels.find((hotel) => hotel.id === id);
    if (hotelEdit) {
      sethotelDados(hotelEdit);
    } else {
        alert('Hotel não encontrado');
        navigate('/');
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const updatedHotels = storedHotels.map((hotel) =>
      hotel.id === id ? hotelDados : hotel
    );
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    navigate('/');
  };

  if (!hotelDados) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Hotel</h1>
      <input
        type="text"
        placeholder="Nome do Hotel"
        value={hotelDados.name}
        onChange={(e) =>
          sethotelDados({ ...hotelDados, name: e.target.value })
        }
        required
      />

      <button type="submit">Salvar Alterações</button>
    </form>
  );
}