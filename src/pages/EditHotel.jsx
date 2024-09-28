import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditHotel() {
  const { id } = useParams();
  const [hotelDados, setHotelDados] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const hotelEdit = storedHotels.find((hotel) => hotel.id === id);
    if (hotelEdit) {
      setHotelDados(hotelEdit);
    } else {
      alert('Hotel não encontrado');
      navigate('/');
    }
  }, [id, navigate]);

  const handleAddImageChange = (index, value) => {
    const newAddImages = [...hotelDados.addImages];
    newAddImages[index] = value;
    setHotelDados({ ...hotelDados, addImages: newAddImages });
  };

  const handleAddImageField = () => {
    setHotelDados({ ...hotelDados, addImages: [...hotelDados.addImages, ''] });
  };

  const handleRemoveImageField = (index) => {
    const newAddImages = hotelDados.addImages.filter((_, i) => i !== index);
    setHotelDados({ ...hotelDados, addImages: newAddImages });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelDados({ ...hotelDados, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
    const updatedHotels = storedHotels.map((hotel) =>
      hotel.id === id ? { ...hotelDados, price: parseFloat(hotelDados.price), aval: parseInt(hotelDados.aval, 10), addImages: hotelDados.addImages.filter((img) => img.trim() !== '') } : hotel
    );
    localStorage.setItem('hotels', JSON.stringify(updatedHotels));
    navigate('/');
  };

  if (!hotelDados) return <p>...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Hotel</h1>

      <label>
        Nome do Hotel:
        <input
          type="text"
          name="name"
          placeholder="Nome do Hotel"
          value={hotelDados.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Imagem Principal (URL):
        <input
          type="text"
          name="image"
          placeholder="URL da Imagem Principal"
          value={hotelDados.image}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Classificação:
        <select
          name="aval"
          value={hotelDados.aval}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Estrela{num > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </label>

      <label>
        Cidade:
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={hotelDados.cidade}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Estado:
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={hotelDados.estado}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Preço:
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={hotelDados.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Descrição:
        <textarea
          name="description"
          placeholder="Descrição do Hotel"
          value={hotelDados.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Imagens Adicionais (URLs):
        {hotelDados.addImages.map((img, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`URL da Imagem ${index + 1}`}
              value={img}
              onChange={(e) => handleAddImageChange(index, e.target.value)}
            />
            {hotelDados.addImages.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveImageField(index)}
                className="remove-image-button"
              >
                Remover
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddImageField}
          className="add-image-button"
        >
          Adicionar Imagem
        </button>
      </label>

      <label>
        Serviços:
        <input
          type="text"
          name="servicos"
          placeholder="Serviços oferecidos"
          value={hotelDados.servicos}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="save-button">
        Salvar Alterações
      </button>
    </form>
  );
}