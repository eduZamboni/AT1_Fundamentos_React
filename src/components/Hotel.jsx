import { Link } from 'react-router-dom';
import './Hotel.css';

export default function Hotel({ hotel, toggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(hotel.id);
  };

  return (
    <div className="hotel">
      <Link to={`/details/${hotel.id}`}>
        <img src={hotel.image} alt={hotel.name} />
        <h2>{hotel.name}</h2>
        <p>{'⭐'.repeat(hotel.aval)}</p>
        <p>{hotel.cidade}, {hotel.estado}</p>
        <p>R${hotel.price.toFixed(2)}</p>
      </Link>
      <button
        className={`favorite-button ${hotel.isFavorite ? 'favorited' : ''}`}
        onClick={handleFavoriteClick}
        title={hotel.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
      >
        {hotel.isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}