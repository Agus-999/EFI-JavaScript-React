// EditarTipo.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarTipo = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener el tipo por ID
  useEffect(() => {
    const fetchTipo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tipos/${id}`);
        if (!response.ok) {
          throw new Error('Tipo no encontrado');
        }
        const data = await response.json();
        setNombre(data.nombre);
      } catch (error) {
        console.error('Error al obtener el tipo:', error);
        setError(error.message);
      }
    };

    fetchTipo();
  }, [id]);

  // Actualizar el tipo
  const updateTipo = async () => {
    if (!nombre) {
      setError('El nombre del tipo es obligatorio');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/tipos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        navigate('/tipos'); // Volver a la lista de tipos
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al actualizar el tipo');
      }
    } catch (error) {
      console.error('Error al actualizar el tipo:', error);
      setError('Error al actualizar el tipo');
    }
  };

  return (
    <div>
      <h2>Editar Tipo</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nuevo nombre del tipo"
      />
      <button onClick={updateTipo}>Guardar Cambios</button>
    </div>
  );
};

export default EditarTipo;
