import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MarcasView from './MarcasView';

const MarcasContainer = () => {
  const [marcas, setMarcas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener todas las marcas
  const fetchMarcas = async () => {
    try {
      const response = await fetch('http://localhost:5000/marcas');
      const data = await response.json();
      setMarcas(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener las marcas:', error);
    }
  };

  // Agregar una nueva marca
  const addMarca = async () => {
    try {
      const response = await fetch('http://localhost:5000/marcas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        fetchMarcas(); // Refrescar la lista
        setNombre(''); // Limpiar el input
      } else {
        console.error('Error al agregar la marca');
      }
    } catch (error) {
      console.error('Error al agregar la marca:', error);
    }
  };

  // Eliminar una marca
  const deleteMarca = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/marcas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMarcas(); // Refrescar la lista
      } else {
        console.error('Error al eliminar la marca');
      }
    } catch (error) {
      console.error('Error al eliminar la marca:', error);
    }
  };

  // Navegar a la página de edición
  const handleEdit = (id) => {
    navigate(`/editar-marca/${id}`);
  };

  // Cargar las marcas al montar el componente
  useEffect(() => {
    fetchMarcas();
  }, []);

  return (
    <MarcasView
      marcas={marcas}
      nombre={nombre}
      setNombre={setNombre}
      addMarca={addMarca}
      deleteMarca={deleteMarca}
      handleEdit={handleEdit}
      isLoading={isLoading}
    />
  );
};

export default MarcasContainer;
