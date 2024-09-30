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

  // Função para validar URLs
  const isValidURL = (string) => {
    const res = string.match(/^(https?:\/\/.*\.)/i);
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

    if (price === '') {
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
    console.log('Erros', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const newHotel = {
          id: Date.now().toString(),
          name: name.trim(),
          image: image.trim(),
          aval: parseInt(aval, 10),
          cidade: cidade.trim(),
          estado: estado.trim(),
          price: parseFloat(price),
          description: description.trim(),
          addImages: addImages.filter((img) => img.trim() !== ''),
          servicos: servicos.trim(),
          isFavorite: false,
        };

        const storedHotels = JSON.parse(localStorage.getItem('hotels')) || [];
        localStorage.setItem('hotels', JSON.stringify([...storedHotels, newHotel]));

        alert('Hotel cadastrado com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro', error);
        alert('Falha ao salvar o hotel. Por favor, tente novamente.');
      }
    } else {
      console.log('Validação falhou.');
      alert('Por favor, corrija os erros no formulário.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-hotel-form">
      <h1>Adicionar Novo Hotel</h1>

      <label>
        Nome do Hotel:
        <input
          type="text"
          placeholder="Nome do Hotel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? 'error-input' : ''}
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
          className={errors.image ? 'error-input' : ''}
          required
        />
        {errors.image && <span className="error-message">{errors.image}</span>}
      </label>

      <label>
        Classificação:
        <select
          value={aval}
          onChange={(e) => setAval(e.target.value)}
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
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className={errors.cidade ? 'error-input' : ''}
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
          className={errors.estado ? 'error-input' : ''}
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
          className={errors.price ? 'error-input' : ''}
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
          className={errors.description ? 'error-input' : ''}
          required
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </label>

      <label>
        Imagens Adicionais (URLs):
        {addImages.map((img, index) => (
          <div key={index} className="additional-image-field">
            <input
              type="text"
              placeholder={`URL da Imagem ${index + 1}`}
              value={img}
              onChange={(e) => handleAddImageChange(index, e.target.value)}
              className={errors[`addImages_${index}`] ? 'error-input' : ''}
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
          value={servicos}
          onChange={(e) => setServicos(e.target.value)}
          className={errors.servicos ? 'error-input' : ''}
          required
        />
        {errors.servicos && <span className="error-message">{errors.servicos}</span>}
      </label>

      <button type="submit" className="save-button">
        Salvar
      </button>
    </form>
  );
}