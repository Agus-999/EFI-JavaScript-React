import React from 'react';

const VehiculosView = ({ vehiculos }) => {
  if (!Array.isArray(vehiculos)) {
    return <div>No hay vehículos disponibles</div>; // Handle case when 'vehiculos' is not an array
  }

  return (
    <div>
      <h2>Listado de Vehículos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.nombre}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.anio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehiculosView;
