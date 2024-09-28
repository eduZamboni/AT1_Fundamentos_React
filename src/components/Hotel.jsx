import { Link } from 'react-router-dom';

export default function Hotel({ hotel }) {
  return (
    <Link to={`/details/${hotel.id}`}>
      <div>
        <img src={hotel.image} alt={hotel.name} />
        <h2>{hotel.name}</h2>
        <p>{'⭐'.repeat(hotel.aval)}</p>
        <p>{hotel.cidade}, {hotel.estado}</p>
        <p>R${hotel.price}</p>
      </div>
    </Link>
  );
};
