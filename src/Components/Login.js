import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import email_icon from '../Components/Assets/email.png';
import password_icon from '../Components/Assets/password.png';
import logo from '../Components/Assets/logo.png';
import { login } from '../services/authService';
import Modal from './admin/Modal';
import './styles/Login.css';
import logo1 from '../Components/Assets/servilogo.png';

const Login = ({ setUserRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setIsModalOpen(false);

        if (!validateEmail(email)) {
            setErrorMessage('Por favor, ingresa un correo válido.');
            setIsSuccess(false);
            setIsModalOpen(true);
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            setIsSuccess(false);
            setIsModalOpen(true);
            return;
        }

        try {
            const data = await login(email, password);
            setUserRole(data.user.rol_id);
            setSuccessMessage('Inicio de sesión exitoso.');
            setIsSuccess(true);
            setIsModalOpen(true);

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (err) {
            setErrorMessage('Correo o contraseña incorrectos.');
            setIsSuccess(false);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div className='login-container'>
            <div className='registro-contenedor'>
                <div className='registro-menu'>
                    <button onClick={() => navigate('/')} className="volver-home">⬅ Volver</button>
                    <img src={logo1} alt="Logo" className="logo" />
                    <h1>¡Bienvenido de nuevo!</h1>
                    <p>Inicia sesión para continuar.</p>
                    <div className="registro-olvide">
                        ¿No tienes una cuenta?
                        <span><br />
                            <Link to="/register">Click Aquí</Link>
                        </span>
                    </div>
                </div>
                <div className="registro-formulario">
                    <form onSubmit={handleLogin}>
                        <div className="registro-header">
                            <div className="registro-titulo">Ingreso</div>
                        </div>
                        <div className="registro-entradas">
                            <div className="registro-entrada">
                                <label htmlFor="email">Correo</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="registro-olvide">
                            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                        </div>
                        <div className="registro-enviar">
                            <button type="submit" className="registro-boton">Iniciar Sesión</button>
                        </div>
                        {successMessage && <p className="registro-exito">{successMessage}</p>}
                    </form>
                </div>

                {isModalOpen && (
                    <Modal
                        message={errorMessage || successMessage}
                        onClose={closeModal}
                        isSuccess={isSuccess}
                    />
                )}
            </div>
        </div>
    );
};

export default Login;
