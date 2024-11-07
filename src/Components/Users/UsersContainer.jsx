import { useState, useEffect } from "react";
import UsersView from "./UsersView";
import { useNavigate } from "react-router-dom";

const UserContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate();

    // Función para decodificar el token y verificar si el usuario es administrador
    const isAdmin = () => {
        if (!token) return false;
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.administrador === true;
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return false;
        }
    };

    useEffect(() => {
        // Redirige al usuario si no es administrador
        if (!isAdmin()) {
            setErrorMessage("Acceso denegado. Solo los administradores pueden ver esta página.");
            setLoadingData(false);
            return;
        }
        
        // Si es administrador, procede a cargar los datos
        getDataUsers();
    }, []);

    const getDataUsers = async () => {
        setLoadingData(true);
        try {
            const response = await fetch("http://localhost:5000/users", {
                headers: {
                    "Authorization": `${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 403) {
                    setErrorMessage("Solo los administradores pueden acceder a esta sección.");
                } else {
                    throw new Error("Error en la consulta");
                }
            } else {
                const jsonData = await response.json();
                setData(jsonData);
            }
        } catch (error) {
            console.error("Error en la API:", error);
            setErrorMessage("Error al cargar los datos");
        } finally {
            setLoadingData(false);
        }
    };

    const handleEdit = (userId) => {
        navigate(`/edit-user/${userId}`);
    };

    const handleDelete = async (userId) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:5000/users/${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    setData(data.filter(user => user.id !== userId));
                } else {
                    setErrorMessage("Error al eliminar el usuario");
                }
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                setErrorMessage("Error al eliminar el usuario");
            }
        }
    };

    return (
        <UsersView
            loadingData={loadingData}
            data={data}
            errorMessage={errorMessage}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
};

export default UserContainer;
