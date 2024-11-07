import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarVehiculo = () => {
  const { id } = useParams();
  const [modelo, setModelo] = useState('');
  const [anioFabricacion, setAnioFabricacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener el vehículo por ID
  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/vehiculos/${id}`);
        if (!response.ok) {
          throw new Error('Vehículo no encontrado');
        }
        const data = await response.json();
        setModelo(data.modelo);
        setAnioFabricacion(data.anio_fabricacion);
        setPrecio(data.precio);
        setMarcaId(data.marca_id);
        setTipoId(data.tipo_id);
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        setError(error.message);
      }
    };

    fetchVehiculo();
  }, [id]);

  // Actualizar el vehículo
  const updateVehiculo = async () => {
    if (!modelo || !anioFabricacion || !precio || !marcaId || !tipoId) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/vehiculos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelo,
          anio_fabricacion: anioFabricacion,
          precio,
          marca_id: marcaId,
          tipo_id: tipoId,
        }),
      });

      if (response.ok) {
        navigate('/vehiculos'); // Volver a la lista de vehículos
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al actualizar el vehículo');
      }
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
      setError('Error al actualizar el vehículo');
    }
  };

  return (
    <div>
      <h2>Editar Vehículo</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="text"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
        placeholder="Modelo"
      />
      <input
        type="number"
        value={anioFabricacion}
        onChange={(e) => setAnioFabricacion(e.target.value)}
        placeholder="Año de fabricación"
      />
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Precio"
      />
      <input
        type="text"
        value={marcaId}
        onChange={(e) => setMarcaId(e.target.value)}
        placeholder="ID de la Marca"
      />
      <input
        type="text"
        value={tipoId}
        onChange={(e) => setTipoId(e.target.value)}
        placeholder="ID del Tipo"
      />
      <button onClick={updateVehiculo}>Guardar Cambios</button>
    </div>
  );
};

export default EditarVehiculo;
