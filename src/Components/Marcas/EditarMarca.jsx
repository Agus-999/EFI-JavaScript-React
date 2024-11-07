import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarMarca = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener la marca por ID
  useEffect(() => {
    const fetchMarca = async () => {
      try {
        const response = await fetch(`http://localhost:5000/marcas/${id}`);
        if (!response.ok) {
          throw new Error('Marca no encontrada');
        }
        const data = await response.json();
        setNombre(data.nombre);
      } catch (error) {
        console.error('Error al obtener la marca:', error);
        setError(error.message);
      }
    };

    fetchMarca();
  }, [id]);

  // Actualizar la marca
  const updateMarca = async () => {
    if (!nombre) {
      setError('El nombre de la marca es obligatorio');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/marcas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        navigate('/marcas'); // Volver a la lista de marcas
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al actualizar la marca');
      }
    } catch (error) {
      console.error('Error al actualizar la marca:', error);
      setError('Error al actualizar la marca');
    }
  };

  return (
    <div>
      <h2>Editar Marca</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nuevo nombre de la marca"
      />
      <button onClick={updateMarca}>Guardar Cambios</button>
    </div>
  );
};

export default EditarMarca;
