import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const token = JSON.parse(localStorage.getItem('token'));
    const { userId } = useParams(); // Obtiene el ID del usuario desde la URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${userId}`, {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al cargar los datos del usuario');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Error en la API:", error);
                setErrorMessage("Error al cargar los datos del usuario");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, token]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                navigate('/users'); // Redirige a la lista de usuarios después de la edición
            } else {
                throw new Error('Error al editar el usuario');
            }
        } catch (error) {
            console.error("Error al editar el usuario:", error);
            setErrorMessage("Error al editar el usuario");
        }
    };

    if (loading) return <h2>Cargando...</h2>;
    if (errorMessage) return <h2>{errorMessage}</h2>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar Usuario</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Guardar Cambios</button>
        </form>
    );
};

export default EditUser;
