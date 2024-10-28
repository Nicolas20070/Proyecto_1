import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Modal from '../Components/admin/Modal'; 
import './styles/Registro.css';
import logo1 from '../Components/Assets/servilogo.png';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [terms, setTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false); 

    const navigate = useNavigate();

    const validateForm = () => {
        let newError = '';
        // Validaciones de campos de formulario
        return newError;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setIsModalOpen(false);

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            setIsSuccess(false);
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await register({ email, password, name, surname, address, phone });
            if (response.message === 'Usuario registrado exitosamente') {
                setSuccessMessage('Registro exitoso.');
                setIsSuccess(true);
                setIsModalOpen(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setErrorMessage('Error: ' + response.message);
                setIsSuccess(false);
                setIsModalOpen(true);
            }
        } catch (error) {
            setErrorMessage('¡Este correo se encuentra en uso!');
            setIsSuccess(false);
            setIsModalOpen(true);
            console.log("Error: ", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div className='register-container'>
            <div className='registro-contenedor'>
                <div className='registro-menu'>
                    <button onClick={() => navigate('/')} className="volver-login">⬅ Volver</button>
                    <img src={logo1} alt="Logo" className="logo" />
                    <h1>¡Qué gusto verte por aquí!</h1>
                    <p>Regístrate para comenzar a usar nuestros servicios.</p>
                    <div className="registro-olvide">
                        ¿Ya tienes una cuenta?
                        <span><br />
                            <Link to="/login">Click Aquí</Link>
                        </span>
                    </div>
                </div>
                <div className="registro-formulario">
                    <form onSubmit={handleRegister}>
                        <div className="registro-header">
                            <div className="registro-titulo">Registro</div>
                        </div>
                        <div className="registro-entradas">
                            <div className="registro-entrada">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="surname">Apellido</label>
                                <input
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="address">Dirección</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    pattern="[0-9]*"
                                />
                            </div>
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
                            <div className="registro-entrada">
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="registro-terminos">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={terms}
                                    onChange={() => setTerms(!terms)}
                                    required
                                />
                                Acepto los <a href="/terminos" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>
                            </label>
                        </div>
                        <div className="registro-enviar">
                            <button type="submit" className="registro-boton">Registrarse</button>
                        </div>
                        {successMessage && <p className="registro-exito">{successMessage}</p>}
                    </form>
                </div>

                {isModalOpen && <Modal message={errorMessage || successMessage} onClose={closeModal} isSuccess={isSuccess} />}
            </div>
        </div>
    );
}

export default Register;
