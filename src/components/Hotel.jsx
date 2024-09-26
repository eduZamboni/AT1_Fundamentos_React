import { Link } from 'react-router-dom';

export default function Card({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <h2 className="hotel-name">{hotel.name}</h2>
      <p className="hotel-class">{'⭐'.repeat(hotel.class)}</p>
      <p className="hotel-localizacao">{hotel.cidade}, {hotel.estado}</p>
      <p className="hotel-price">R${hotel.price}</p>
      <Link to={`/details/${hotel.id}`}>Ver Detalhes</Link>
    </div>
  );
};
