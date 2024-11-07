import React from 'react';

const MarcasView = ({
  marcas,
  nombre,
  setNombre,
  addMarca,
  deleteMarca,
  handleEdit,
  isLoading,
}) => {
  if (isLoading) return <p>Cargando marcas...</p>;

  return (
    <div>
      <h2>Gestión de Marcas</h2>

      {/* Formulario para agregar una nueva marca */}
      <div>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la marca"
        />
        <button onClick={addMarca}>Agregar Marca</button>
      </div>

      {/* Tabla para mostrar las marcas */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.id}>
              <td>{marca.id}</td>
              <td>{marca.nombre}</td>
              <td>
                <button onClick={() => handleEdit(marca.id)}>Editar</button>
                <button onClick={() => deleteMarca(marca.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarcasView;
