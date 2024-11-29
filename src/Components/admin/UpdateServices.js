import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Slidebara';
import '../styles/AgregarServicio.css';

function ActualizarServicio() {
    const { id } = useParams(); // Obtener el ID del servicio de la URL
    const [formData, setFormData] = useState({
        nombre_empleado: '',
        nombre_cliente: '',
        placa_vehiculo: '',
        nombre_servicio: '',
        descripcion: '',
        costo: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar los datos del servicio existente
    useEffect(() => {
        const fetchServicio = async () => {
            try {
                const response = await axios.get(`http://localhost:2071/api/servicios/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFormData(response.data);
            } catch (error) {
            }
        };
        fetchServicio();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:2071/api/servicios/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/AdminDashboard');
        } catch (error) {
            console.error('Error al actualizar el servicio:', error);
            setError(error.response?.data?.message || 'Error al actualizar el servicio');
        }
    };

    return (
        <div className="agregar-servicio-page">
            <Sidebar />
            <motion.div
                className="agregar-servicio-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button onClick={() => navigate('/Servicios')}>Volver</button>
                <h2>Actualizar Servicio</h2>
                {error && <motion.div className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
                <motion.form
                    onSubmit={handleSubmit}
                    className="agregar-servicio-form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre_empleado">Nombre del Empleado:</label>
                            <input
                                type="text"
                                id="nombre_empleado"
                                name="nombre_empleado"
                                value={formData.nombre_empleado}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre_cliente">Nombre del Cliente:</label>
                            <input
                                type="text"
                                id="nombre_cliente"
                                name="nombre_cliente"
                                value={formData.nombre_cliente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="placa_vehiculo">Placa del Vehículo:</label>
                            <input
                                type="text"
                                id="placa_vehiculo"
                                name="placa_vehiculo"
                                value={formData.placa_vehiculo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre_servicio">Nombre del Servicio:</label>
                            <input
                                type="text"
                                id="nombre_servicio"
                                name="nombre_servicio"
                                value={formData.nombre_servicio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="costo">Costo:</label>
                            <input
                                type="number"
                                id="costo"
                                name="costo"
                                value={formData.costo}
                                onChange={handleChange}
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Actualizar Servicio
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default ActualizarServicio;
