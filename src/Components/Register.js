import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import Modal from '../Components/admin/Modal';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
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
    const [errorMessages, setErrorMessages] = useState({
        name: '',
        surname: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrorMessages = {
            name: '',
            surname: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: ''
        };

        // Validar nombre (solo letras)
        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
            newErrorMessages.name = 'El nombre solo puede contener letras.';
        }

        // Validar apellido (solo letras)
        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(surname)) {
            newErrorMessages.surname = 'El apellido solo puede contener letras.';
        }

        // Validar dirección
        const addressPattern = /^[A-Za-z0-9\s#.-]+$/;
        if (!address || !addressPattern.test(address)) {
            newErrorMessages.address = 'La dirección no es válida.';
        }

        // Validar teléfono (debe empezar con 3 y tener 10 dígitos)
        const phonePattern = /^3\d{9}$/; // Cambiado para que empiece con 3 y tenga 10 dígitos
        if (!phone || !phonePattern.test(phone)) {
            newErrorMessages.phone = 'El teléfono debe ser un número válido que empiece con 3 y tenga 10 dígitos.';
        }

        // Validar correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            newErrorMessages.email = 'El correo electrónico no es válido.';
        }

        // Validar contraseña
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!password || !passwordPattern.test(password)) {
            newErrorMessages.password = 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número.';
        }

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            newErrorMessages.confirmPassword = 'Las contraseñas no coinciden.';
        }

        // Verificar que se acepten los términos y condiciones
        if (!terms) {
            newErrorMessages.terms = 'Debes aceptar los términos y condiciones.';
        }

        setErrorMessages(newErrorMessages);
        return Object.values(newErrorMessages).some(msg => msg !== '');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessages({
            name: '',
            surname: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: ''
        });
        setSuccessMessage('');
        setIsModalOpen(false);

        const hasErrors = validateForm();
        
        if (hasErrors) {
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
                setErrorMessages(prev => ({ ...prev, general: 'Error: ' + response.message }));
                setIsSuccess(false);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error: ", error);
            setErrorMessages(prev => ({ ...prev, general: '¡Este correo se encuentra en uso!' }));
            setIsSuccess(false);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessages({
            name: '',
            surname: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: ''
        });
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
                                <InputText id="name" name="name" value={name} placeholder="Ej: Juan" onChange={(e) => { 
                                    setName(e.target.value); 
                                    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                                        setErrorMessages(prev => ({ ...prev, name: 'El nombre solo puede contener letras.' }));
                                    } else {
                                        setErrorMessages(prev => ({ ...prev, name: '' }));
                                    }
                                }} required />
                                {errorMessages.name && <p className='error-message'>{errorMessages.name}</p>}
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="surname">Apellido</label>
                                <InputText id="surname" name="surname" value={surname} placeholder="Ej: Pérez" onChange={(e) => { 
                                    setSurname(e.target.value); 
                                    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value)) {
                                        setErrorMessages(prev => ({ ...prev, surname: 'El apellido solo puede contener letras.' }));
                                    } else {
                                        setErrorMessages(prev => ({ ...prev, surname: '' }));
                                    }
                                }} required />
                                {errorMessages.surname && <p className='error-message'>{errorMessages.surname}</p>}
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="address">Dirección</label>
                                <InputText id="address" name="address" value={address} placeholder="Ej: Calle 123, Ciudad" onChange={(e) => { 
                                    setAddress(e.target.value); 
                                    if (!/^[A-Za-z0-9\s#.-]*$/.test(e.target.value)) {
                                        setErrorMessages(prev => ({ ...prev, address: 'La dirección no es válida.' }));
                                    } else {
                                        setErrorMessages(prev => ({ ...prev, address: '' }));
                                    }
                                }} required />
                                {errorMessages.address && <p className='error-message'>{errorMessages.address}</p>}
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="phone">Teléfono</label>
                                <InputText id="phone" name="phone" value={phone} placeholder="Ej: 3123456789" onChange={(e) => { 
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setPhone(value); 
                                    if (!/^3\d{9}$/.test(value)) {
                                        setErrorMessages(prev => ({ ... prev, phone: 'El teléfono debe ser un número válido que empiece con 3 y tenga 10 dígitos.' }));
                                    } else {
                                        setErrorMessages(prev => ({ ...prev, phone: '' }));
                                    }
                                }} required />
                                {errorMessages.phone && <p className='error-message'>{errorMessages.phone}</p>}
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="email">Correo</label>
                                <InputText id="email" name="email" value={email} placeholder="Ej: ejemplo@correo.com" onChange={(e) => { 
                                    setEmail(e.target.value); 
                                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                                        setErrorMessages(prev => ({ ...prev, email: 'El correo electrónico no es válido.' }));
                                    } else {
                                        setErrorMessages(prev => ({ ...prev, email: '' }));
                                    }
                                }} required />
                                {errorMessages.email && <p className='error-message'>{errorMessages.email}</p>}
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="password">Contraseña</label>
                                <Password 
                                    id="password" 
                                    name="password" 
                                    value={password} 
                                    placeholder="Ej: Contraseña123" 
                                    onChange={(e) => { 
                                        setPassword(e.target.value); 
                                        if (e.target.value.length > 0 && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value)) {
                                            setErrorMessages(prev => ({ ...prev, password: 'La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un número.' }));
                                        } else {
                                            setErrorMessages(prev => ({ ...prev, password: '' }));
                                        }
                                    }} 
                                    toggleMask 
                                />
                                {errorMessages.password && <p className='error-message'>{errorMessages.password}</p>}
                            </div>
                            <div className="registro-entrada">
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <Password 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    value={confirmPassword} 
                                    placeholder="Repite tu contraseña" 
                                    onChange={(e) => { 
                                        setConfirmPassword(e.target.value); 
                                        if (e.target.value !== password) {
                                            setErrorMessages(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden.' }));
                                        } else {
                                            setErrorMessages(prev => ({ ...prev, confirmPassword: '' }));
                                        }
                                    }} 
                                    toggleMask 
                                />
                                {errorMessages.confirmPassword && <p className='error-message'>{errorMessages.confirmPassword}</p>}
                            </div>
                        </div>
                        <div className="registro-terminos">
                            <Checkbox inputId="terms" checked={terms} onChange={() => { 
                                setTerms(!terms); 
                                if (!terms) {
                                    setErrorMessages(prev => ({ ...prev, terms: 'Debes aceptar los términos y condiciones.' }));
                                } else {
                                    setErrorMessages(prev => ({ ...prev, terms: '' }));
                                }
                            }} required />
                            Acepto los 
                            <a href="/terminos" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a> 
                            {errorMessages.terms && <p className='error-message'>{errorMessages.terms}</p>}
                        </div>
                        <div className="registro-enviar">
                            <Button type="submit" label="Registrarse" className="registro-boton" />
                        </div>
                        {successMessage && (
                            <p className='success-message'>{successMessage}</p>
                        )}
                    </form>
                </div>

                {isModalOpen && (
                    <Modal message={errorMessages.general || successMessage} onClose={closeModal} isSuccess={isSuccess} />
                )}
            </div>
        </div>
    );
}

export default Register;