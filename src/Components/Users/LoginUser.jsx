import { useState } from 'react';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const LoginUser = () => {
    // Estado para manejar el mensaje de resultado del login
    const [loginMessage, setLoginMessage] = useState('');

    const onLoginUser = async (values) => {
        const bodyLoginUser = btoa(`${values.username}:${values.password}`);

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                "Authorization": `Basic ${bodyLoginUser}`
            }
        });

        if (!response.ok) {
            // Si la respuesta no es correcta, actualizamos el mensaje de error
            setLoginMessage("Inicio de sesión fallido. Usuario o contraseña incorrectos.");
            return;
        }

        const data = await response.json();

        // Guardamos el token en el localStorage
        localStorage.setItem('token', JSON.stringify(data.Token));
        setLoginMessage("Inicio de sesión exitoso."); // Mensaje de éxito
        console.log(data.Token);
    };

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Este es un campo requerido.')
            .min(4, 'Mínimo 4 caracteres.'),
        username: Yup.string()
            .min(4, 'Mínimo 4 caracteres.')
            .max(25, 'Máximo 25 caracteres.')
            .required('Este es un campo requerido.')
    });

    return (
        <>
            <Formik
                initialValues={{ password: '', username: '' }}
                validationSchema={ValidationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                }) => (
                    <form>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {errors.username && touched.username && errors.username}

                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}

                        <button 
                            type="button" 
                            onClick={() => onLoginUser(values)} 
                            disabled={values.username === '' || values.password === '' || !isValid}
                        >
                            iniciar sesión
                        </button>

                        {/* Mostrar el mensaje de login */}
                        {loginMessage && <p>{loginMessage}</p>}
                    </form>
                )}
            </Formik>
        </>
    );
}

export default LoginUser;
