import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../cliente/ModalCliente'; // Import the modal
import { motion } from 'framer-motion';
import Sidebar from './Slidebara';
import '../styles/Edit.css';

const API_URL = 'http://localhost:2071/api'; // Base URL for the API

const EditProfileA = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        addressType: '', // For address type
        addressDetail: '', // For address details
        phone: '',
    });
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // Modal state
    const [modalMessage, setModalMessage] = useState(''); // Message for the modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/user/data`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData({
                    name: response.data.name,
                    surname: response.data.surname,
                    addressType: response.data.addressType || '', // Assuming address type
                    addressDetail: response.data.addressDetail || '', // Assuming address detail
                    phone: response.data.phone,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setModalMessage('Error al obtener los datos del usuario');
                setModalOpen(true);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validatePhone = (phone) => {
        const phonePattern = /^3\d{9}$/; // Phone must start with 3 and have 9 digits
        return phonePattern.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Validations
        if (!userData.name) {
            setModalMessage('¡El nombre debe ser obligatorio!');
            setModalOpen(true);
            return;
        }
        if (userData.name.length > 20) {
            setModalMessage('El nombre no puede exceder los 20 caracteres.');
            setModalOpen(true);
            return;
        }
        if (!userData.surname) {
            setModalMessage('¡El apellido debe ser obligatorio!');
            setModalOpen(true);
            return;
        }
        if (userData.surname.length > 20) {
            setModalMessage('El apellido no puede exceder los 20 caracteres.');
            setModalOpen(true);
            return;
        }
        if (!userData.addressType) {
            setModalMessage('Debes seleccionar un tipo de dirección.');
            setModalOpen(true);
            return;
        }
        if (!userData.addressDetail) {
            setModalMessage('¡La dirección debe ser obligatoria!');
            setModalOpen(true);
            return;
        }
        if (!userData.phone) {
            setModalMessage('¡El número debe ser obligatorio!');
            setModalOpen(true);
            return;
        }
        if (!validatePhone(userData.phone)) {
            setModalMessage('¡El número debe tener 9 dígitos y comenzar con 3!');
            setModalOpen(true);
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/user/update-profile`, {
                ...userData,
                address: `${userData.addressType} ${userData.addressDetail}`, // Combine address type and details
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Perfil actualizado exitosamente:', response.data);
            navigate('/ProfileA'); // Redirect to admin dashboard or desired page
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setModalMessage('Error al actualizar perfil');
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="edit-profile-page">
            <Sidebar />
            <motion.div
                className="edit-profile-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
            <button onClick={() => navigate('/ProfileA')}>Volver</button>      
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '2.5rem', color: '#007bff', fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)' }}
                >
                    Editar Perfil
                </motion.h1>
                {error && <p className="error-message">{error}</p>}
                <motion.form
                    onSubmit={handleSubmit}
                    className="profile-form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                maxLength={20}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Apellido</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={userData.surname}
                                onChange={handleChange}
                                maxLength={20}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="addressType">Tipo de Dirección</label>
                            <select
                                id="addressType"
                                name="addressType"
                                value={userData.addressType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un tipo de dirección</option>
                                <option value="Calle">Calle</option>
                                <option value="Avenida">Avenida</option>
                                <option value="Carrera">Carrera</option>
                                <option value="Diagonal">Diagonal</option>
                                <option value="Transversal">Transversal</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="addressDetail">Detalle de Dirección</label>
                            <input
                                type="text"
                                id="addressDetail"
                                name="addressDetail"
                                value={userData.addressDetail}
                                onChange={handleChange}
                                placeholder="Ej. 123, Ciudad"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <motion.button
                        type="submit"
                        className="submit-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Actualizar
                    </motion.button>
                </motion.form>
                <Modal isOpen={modalOpen} onClose={handleCloseModal} message={modalMessage} />
            </motion.div>
        </div>
    );
};

export default EditProfileA;
