import { Fragment } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const UsersView = ({ loadingData, data, errorMessage, onEdit, onDelete }) => {
    return (
        <Fragment>
            <h1>Usuarios</h1>
            {loadingData ? (
                <ProgressSpinner />
            ) : errorMessage ? (
                <h2>{errorMessage}</h2> // Mostrar mensaje de error
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button onClick={() => onEdit(user.id)}>Editar</button>
                                    {!user.is_admin && (
                                        <button onClick={() => onDelete(user.id)}>Eliminar</button>
                                    )}
                                    {user.is_admin && <span>No se puede eliminar al administrador</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Fragment>
    );
};

export default UsersView;
