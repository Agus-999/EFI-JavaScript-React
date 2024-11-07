import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CreateUser = () => {
    const [message, setMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));

    // Verificar si el usuario es administrador al cargar el componente
    useEffect(() => {
        if (token) {
            const tokenParts = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(tokenParts));
            setIsAdmin(decodedPayload.administrador || false);
        }
    }, [token]);

    const RegisterUser = async (values) => {
        const bodyRegisterUser = {
            username: values.username,
            password: values.password
        };

        try {
            const response = await axios.post(
                'http://localhost:5000/users',
                bodyRegisterUser,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                }
            );

            setMessage(`Usuario creado con éxito`);
            console.log("Usuario creado con éxito:", response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(`Error al crear el usuario: ${error.response.data.mensaje}`);
                console.error("Error al crear el usuario:", error.response.data);
            } else {
                setMessage(`Error: ${error.message || "Error desconocido"}`);
                console.error("Error:", error.message || "Error desconocido");
            }
        }
    };

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Contraseña es requerida')
            .min(4, 'La contraseña debe tener al menos 4 caracteres'),
        username: Yup.string()
            .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
            .max(255, 'El nombre de usuario no puede exceder los 255 caracteres')
            .required('El nombre de usuario es requerido')
    });

    if (!isAdmin) {
        return <div>No tienes permiso para crear usuarios.</div>;
    }

    return (
        <div>
            {message && <div>{message}</div>}
            <Formik
                initialValues={{ password: '', username: '' }}
                validationSchema={ValidationSchema}
                onSubmit={RegisterUser}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {errors.username && touched.username && <div>{errors.username}</div>}
                        
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            autoComplete="current-password"
                        />
                        {errors.password && touched.password && <div>{errors.password}</div>}
                        
                        <button 
                            type="submit" 
                            disabled={values.username === '' || values.password === '' || !isValid}
                        >
                            Aceptar
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default CreateUser;
