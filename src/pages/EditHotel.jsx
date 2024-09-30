import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditHotel() {
  const { id } = useParams();
  const [hotelDados, setHotelDados] = useState(null);
  const [errors, setErrors] = useState({});
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

  // Função para validar URLs
  const isValidURL = (string) => {
    const res = string.match(/^(https?:\/\/.*\.)/i);
    return res !== null;
  };

  const validateForm = () => {
    const newErrors = {};

    // Nome do Hotel
    if (!hotelDados.name.trim()) {
      newErrors.name = 'O nome do hotel é obrigatório.';
    }

    // Imagem Principal
    if (!hotelDados.image.trim()) {
      newErrors.image = 'A URL da imagem principal é obrigatória.';
    } else if (!isValidURL(hotelDados.image.trim())) {
      newErrors.image = 'A URL da imagem principal é inválida.';
    }

    // Cidade
    if (!hotelDados.cidade.trim()) {
      newErrors.cidade = 'A cidade é obrigatória.';
    }

    // Estado
    if (!hotelDados.estado.trim()) {
      newErrors.estado = 'O estado é obrigatório.';
    }

    // Preço
    if (hotelDados.price === '') {
      newErrors.price = 'O preço é obrigatório.';
    } else if (isNaN(hotelDados.price) || parseFloat(hotelDados.price) < 0) {
      newErrors.price = 'O preço deve ser um número positivo.';
    }

    // Descrição
    if (!hotelDados.description.trim()) {
      newErrors.description = 'A descrição é obrigatória.';
    }

    // Serviços
    if (!hotelDados.servicos.trim()) {
      newErrors.servicos = 'Os serviços são obrigatórios.';
    }

    // Imagens Adicionais
    hotelDados.addImages.forEach((img, index) => {
      if (img.trim() && !isValidURL(img.trim())) {
        newErrors[`addImages_${index}`] = `A URL da imagem ${index + 1} é inválida.`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const updatedHotel = {
          ...hotelDados,
          price: parseFloat(hotelDados.price),
          aval: parseInt(hotelDados.aval, 10),
          addImages: hotelDados.addImages.filter((img) => img.trim() !== ''),
        };

        const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
        const updatedHotels = storedHotels.map((hotel) =>
          hotel.id === id ? updatedHotel : hotel
        );
        localStorage.setItem('hotels', JSON.stringify(updatedHotels));

        alert('Hotel editado com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro ao salvar o hotel:', error);
        alert('Falha ao salvar o hotel. Por favor, tente novamente.');
      }
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  };

  if (!hotelDados) return <p>...</p>;

  return (
    <form onSubmit={handleSubmit} className="edit-hotel-form">
      <h1>Editar Hotel</h1>

      <label>
        Nome do Hotel:
        <input
          type="text"
          name="name"
          placeholder="Nome do Hotel"
          value={hotelDados.name}
          onChange={handleChange}
          className={errors.name ? 'error-input' : ''}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </label>

      <label>
        Imagem Principal (URL):
        <input
          type="text"
          name="image"
          placeholder="URL da Imagem Principal"
          value={hotelDados.image}
          onChange={handleChange}
          className={errors.image ? 'error-input' : ''}
          required
        />
        {errors.image && <span className="error-message">{errors.image}</span>}
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
          className={errors.cidade ? 'error-input' : ''}
          required
        />
        {errors.cidade && <span className="error-message">{errors.cidade}</span>}
      </label>

      <label>
        Estado:
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={hotelDados.estado}
          onChange={handleChange}
          className={errors.estado ? 'error-input' : ''}
          required
        />
        {errors.estado && <span className="error-message">{errors.estado}</span>}
      </label>

      <label>
        Preço:
        <input
          type="number"
          name="price"
          placeholder="Preço"
          value={hotelDados.price}
          onChange={handleChange}
          className={errors.price ? 'error-input' : ''}
          required
        />
        {errors.price && <span className="error-message">{errors.price}</span>}
      </label>

      <label>
        Descrição:
        <textarea
          name="description"
          placeholder="Descrição do Hotel"
          value={hotelDados.description}
          onChange={handleChange}
          className={errors.description ? 'error-input' : ''}
          required
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </label>

      <label>
        Imagens Adicionais (URLs):
        {hotelDados.addImages.map((img, index) => (
          <div key={index} className="additional-image-field">
            <input
              type="text"
              placeholder={`URL da Imagem ${index + 1}`}
              value={img}
              onChange={(e) => handleAddImageChange(index, e.target.value)}
              className={errors[`addImages_${index}`] ? 'error-input' : ''}
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
            {errors[`addImages_${index}`] && (
              <span className="error-message">{errors[`addImages_${index}`]}</span>
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
          className={errors.servicos ? 'error-input' : ''}
          required
        />
        {errors.servicos && <span className="error-message">{errors.servicos}</span>}
      </label>

      <button type="submit" className="save-button">
        Salvar Alterações
      </button>
    </form>
  );
}