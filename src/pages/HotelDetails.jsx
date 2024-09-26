import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const selectedHotel = storedHotels.find((hotel) => hotel.id === id);
    setHotel(selectedHotel);
  }, [id]);

  const handleDelete = () => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const updatedHotels = storedHotels.filter((hotel) => hotel.id !== id);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    navigate('/');
  };

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
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <div>
        {hotel.additionalImages.map((image, index) => (
          <img key={index} src={image} alt={`Imagem ${index + 1}`} />
        ))}
      </div>
      <p>{hotel.city}, {hotel.state}</p>
      <p>R${hotel.price}</p>
      <p>{hotel.services}</p>
      <button onClick={toggleFavorite}>Favorito</button>
      <Link to={`/edit/${hotel.id}`}>Editar</Link>
      <button onClick={handleDelete}>Excluir</button>
      <Link to="/">Voltar à Lista</Link>
    </div>
  );
}