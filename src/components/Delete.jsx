import { useNavigate } from 'react-router-dom';

export default function Delete({ id }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const updatedHotels = storedHotels.filter((hotel) => hotel.id !== id);
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    navigate('/');
  };

  return (
    <button onClick={handleDelete}>Excluir</button>
  );
}