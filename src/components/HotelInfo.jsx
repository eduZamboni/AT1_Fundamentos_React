import React from 'react';
import { Link } from 'react-router-dom';

export default function HotelInfo({ hotel, toggleFavorite, Delete }) {
  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <div>
        {hotel.addImages && hotel.addImages.length > 0 ? (
          hotel.addImages.map((image, index) => (
            <img key={index} src={image} alt={`Imagem ${index + 1}`} />
          ))
        ) : (
          <p>Sem imagens adicionais.</p>
        )}
      </div>
      <p>{hotel.cidade}, {hotel.estado}</p>
      <p>R${hotel.price}</p>
      <p>{hotel.services}</p>
      <button onClick={toggleFavorite}>Favorito</button>
      <Link to={`/edit/${hotel.id}`}>Editar</Link>
      {Delete}
      <Link to="/">Voltar à Lista</Link>
    </div>
  );
}