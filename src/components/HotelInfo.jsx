import { Link } from 'react-router-dom';
import './HotelInfo.css';

export default function HotelInfo({ hotel, toggleFavorite, Delete }) {
  return (
    <div className="hotel-info">
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <div className="additional-images">
        {hotel.addImages && hotel.addImages.length > 0 ? (
          hotel.addImages.map((image, index) => (
            <img key={index} src={image} alt={`Imagem ${index + 1}`} />
          ))
        ) : (
          <p>Sem imagens adicionais.</p>
        )}
      </div>
      <p>{hotel.cidade}, {hotel.estado}</p>
      <p>R${hotel.price.toFixed(2)}</p>
      <p>{hotel.servicos}</p>
      <button onClick={toggleFavorite} className={`favorite-button ${hotel.isFavorite ? 'favorited' : ''}`}>
        {hotel.isFavorite ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
      </button>
      <Link to="/" className="back-link">Voltar à Lista</Link>
      <Link to={`/edit/${hotel.id}`} className="edit-link">Editar</Link>
      {Delete}
    </div>
  );
}