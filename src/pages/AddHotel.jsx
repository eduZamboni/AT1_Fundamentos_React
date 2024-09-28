import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddHotel() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [aval, setAval] = useState(1);
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [addImages, setAddImages] = useState(['', '', '', '']);
  const [servicos, setServicos] = useState('');

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleAddImageChange = (index, value) => {
    const newAddImages = [...addImages];
    newAddImages[index] = value;
    setAddImages(newAddImages);
  };

  const handleAddImageField = () => {
    setAddImages([...addImages, '']);
  };

  const handleRemoveImageField = (index) => {
    const newAddImages = addImages.filter((_, i) => i !== index);
    setAddImages(newAddImages);
  };

  const isValidURL = (string) => {
    const res = string.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i);
    return res !== null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'O nome do hotel é obrigatório.';
    }

    if (!image.trim()) {
      newErrors.image = 'A URL da imagem principal é obrigatória.';
    } else if (!isValidURL(image.trim())) {
      newErrors.image = 'A URL da imagem principal é inválida.';
    }

    if (!cidade.trim()) {
      newErrors.cidade = 'A cidade é obrigatória.';
    }

    if (!estado.trim()) {
      newErrors.estado = 'O estado é obrigatório.';
    }

    if (!price) {
      newErrors.price = 'O preço é obrigatório.';
    } else if (isNaN(price) || parseFloat(price) < 0) {
      newErrors.price = 'O preço deve ser um número positivo.';
    }

    if (!description.trim()) {
      newErrors.description = 'A descrição é obrigatória.';
    }

    if (!servicos.trim()) {
      newErrors.servicos = 'Os serviços são obrigatórios.';
    }

    addImages.forEach((img, index) => {
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
      const newHotel = {
        id: Date.now().toString(),
        name,
        image,
        aval: parseInt(aval, 10),
        cidade,
        estado,
        price: parseFloat(price),
        description,
        addImages: addImages.filter((img) => img.trim() !== ''),
        servicos,
      };

      const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
      localStorage.setItem('hotels', JSON.stringify([...storedHotels, newHotel]));
      navigate('/');
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Adicionar Novo Hotel</h1>

      <label>
        Nome do Hotel:
        <input
          type="text"
          placeholder="Nome do Hotel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </label>

      <label>
        Imagem Principal (URL):
        <input
          type="text"
          placeholder="URL da Imagem Principal"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        {errors.image && <span className="error-message">{errors.image}</span>}
      </label>

      <label>
        Classificação:
        <select value={aval} onChange={(e) => setAval(e.target.value)}>
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
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />
        {errors.cidade && <span className="error-message">{errors.cidade}</span>}
      </label>

      <label>
        Estado:
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />
        {errors.estado && <span className="error-message">{errors.estado}</span>}
      </label>

      <label>
        Preço:
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {errors.price && <span className="error-message">{errors.price}</span>}
      </label>

      <label>
        Descrição:
        <textarea
          placeholder="Descrição do Hotel"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </label>

      <label>
        Imagens Adicionais (URLs):
        {addImages.map((img, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`URL da Imagem ${index + 1}`}
              value={img}
              onChange={(e) => handleAddImageChange(index, e.target.value)}
            />
            {addImages.length > 1 && (
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
        <button type="button" onClick={handleAddImageField} >
          Adicionar Imagem
        </button>
      </label>

      <label>
        Serviços:
        <input
          type="text"
          placeholder="Serviços oferecidos"
          value={servicos}
          onChange={(e) => setServicos(e.target.value)}
          required
        />
        {errors.servicos && <span className="error-message">{errors.servicos}</span>}
      </label>

      <button type="submit">Salvar</button>
    </form>
  );
}