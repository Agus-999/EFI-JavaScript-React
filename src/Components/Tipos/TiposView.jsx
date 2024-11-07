// TiposView.jsx
import React from 'react';

const TiposView = ({
  tipos,
  nombre,
  setNombre,
  addTipo,
  deleteTipo,
  handleEdit,
  isLoading,
}) => {
  if (isLoading) return <p>Cargando tipos...</p>;

  return (
    <div>
      <h2>Gestión de Tipos</h2>

      {/* Formulario para agregar un nuevo tipo */}
      <div>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del tipo"
        />
        <button onClick={addTipo}>Agregar Tipo</button>
      </div>

      {/* Tabla para mostrar los tipos */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo.id}>
              <td>{tipo.id}</td>
              <td>{tipo.nombre}</td>
              <td>
                <button onClick={() => handleEdit(tipo.id)}>Editar</button>
                <button onClick={() => deleteTipo(tipo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TiposView;
