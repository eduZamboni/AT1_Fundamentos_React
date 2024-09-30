import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Delete({ id }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este hotel?');
    if (!confirmDelete) return;

    try {
      const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
      const updatedHotels = storedHotels.filter((hotel) => hotel.id !== id);
      localStorage.setItem('hotels', JSON.stringify(updatedHotels));

      alert('Hotel excluído com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao excluir o hotel:', error);
      alert('Falha ao excluir o hotel. Por favor, tente novamente.');
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Excluir
    </button>
  );
}