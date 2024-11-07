import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VehiculosView from './VehiculosView';

const VehiculosContainer = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Error state to handle API issues
  const navigate = useNavigate();

  // Obtener todos los vehículos
  const fetchVehiculos = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        setError('No hay token de autenticación');
        navigate('/login'); // Redirigir al login si no hay token
        return;
      }

      const response = await fetch('http://localhost:5000/vehiculos', {
        method: 'GET',
        headers: {
          'Authorization': ` ${token}`
        }
      });
      

      if (!response.ok) {
        if (response.status === 401) {
          setError('No autorizado, por favor inicie sesión');
          navigate('/login'); // Redirigir al login si no está autorizado
        } else {
          setError('Error al cargar los vehículos');
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setVehiculos(data);
      setIsLoading(false);
    } catch (error) {
      setError('Hubo un error en la conexión');
      setIsLoading(false);
      console.error(error); // Para más detalles en la consola
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <VehiculosView vehiculos={vehiculos} />
    </div>
  );
};

export default VehiculosContainer;
