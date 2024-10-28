import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/ProfileA.css'; // Archivo CSS actualizado
import Sidebar from './Slidebara';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUserData(response.data);
            setLoadingUser(false);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setLoadingUser(false);
        });
    }, []);

    const handleEditProfile = () => {
        navigate('/edit-profileA');
    };

    if (loadingUser) {
        return (
            <motion.div
                className="loading-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Cargando...
            </motion.div>
        );
    }

    return (
        <div className="profile-page">
            <Sidebar />
            <motion.div
                className="profile-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="profile-header">
                    <motion.h1
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ fontSize: '3rem', color: '#007bff', fontWeight: 'bold', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    >
                    Perfil
                    </motion.h1>
                    <motion.button
                        className="profile-button"
                        onClick={handleEditProfile}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Editar Perfil
                    </motion.button>
                </div>
                <motion.table
                    className="profile-table"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <tbody>
                        <tr><th>Nombre</th><td>{userData.name}</td></tr>
                        <tr><th>Apellido</th><td>{userData.surname}</td></tr>
                        <tr><th>Correo Electrónico</th><td>{userData.email}</td></tr>
                        <tr><th>Dirección</th><td>{userData.address}</td></tr>
                        <tr><th>Teléfono</th><td>{userData.phone}</td></tr>
                    </tbody>
                </motion.table>
            </motion.div>
        </div>
    );
};

export default Profile;
