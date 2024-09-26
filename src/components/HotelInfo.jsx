import React from 'react';
import { Link } from 'react-router-dom';

export default function HotelInfo({ hotel, toggleFavorite, handleDelete }){
  const additionalImages = Array.isArray(hotel.additionalImages) ? hotel.additionalImages : [];

  return (
    <div className="hotel-details">
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <div className="additional-images">
        {additionalImages.length > 0 ? (
          additionalImages.map((image, index) => (
            <img key={index} src={image} alt={`Imagem ${index + 1}`} />
          ))
        ) : (
          <p>Sem imagens adicionais.</p>
        )}
      </div>
      <p>{hotel.city}, {hotel.state}</p>
      <p>R${hotel.price}</p>
      <p>{hotel.services}</p>
      <button onClick={toggleFavorite}>Favorito</button>
      <Link to={`/edit/${hotel.id}`} className="edit-link">Editar</Link>
      <button onClick={handleDelete}>Excluir</button>
      <Link to="/" className="back-link">Voltar à Lista</Link>
    </div>
  );
};
