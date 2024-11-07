// TiposContainer.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TiposView from './TiposView';

const TiposContainer = () => {
  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener todos los tipos
  const fetchTipos = async () => {
    try {
      const response = await fetch('http://localhost:5000/tipos');
      const data = await response.json();
      setTipos(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener los tipos:', error);
    }
  };

  // Agregar un nuevo tipo
  const addTipo = async () => {
    try {
      const response = await fetch('http://localhost:5000/tipos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        fetchTipos(); // Refrescar la lista
        setNombre(''); // Limpiar el input
      } else {
        console.error('Error al agregar el tipo');
      }
    } catch (error) {
      console.error('Error al agregar el tipo:', error);
    }
  };

  // Eliminar un tipo
  const deleteTipo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tipos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTipos(); // Refrescar la lista
      } else {
        console.error('Error al eliminar el tipo');
      }
    } catch (error) {
      console.error('Error al eliminar el tipo:', error);
    }
  };

  // Navegar a la página de edición
  const handleEdit = (id) => {
    navigate(`/editar-tipo/${id}`);
  };

  // Cargar los tipos al montar el componente
  useEffect(() => {
    fetchTipos();
  }, []);

  return (
    <TiposView
      tipos={tipos}
      nombre={nombre}
      setNombre={setNombre}
      addTipo={addTipo}
      deleteTipo={deleteTipo}
      handleEdit={handleEdit}
      isLoading={isLoading}
    />
  );
};

export default TiposContainer;
