import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddHotel() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(1);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [additionalImages, setAdditionalImages] = useState(['', '', '', '']);
  const [services, setServices] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHotel = {
      id: Date.now().toString(),
      name,
      image,
      rating,
      city,
      state,
      price: parseFloat(price),
      description,
      additionalImages,
      services,
    };

    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    localStorage.setItem('hotels', JSON.stringify([...storedHotels, newHotel]));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adicionar Novo Hotel</h1>
      <input
        type="text"
        placeholder="Nome do Hotel"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}