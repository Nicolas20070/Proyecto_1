import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Slidebara';
import '../styles/AgregarServicio.css';

function AgregarServicio() {
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        nombre_empleado: '',
        placa_vehiculo: '',
        nombre_servicio: '',
        descripcion: '',
        costo: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2071/api/servicios', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            navigate('/servicios');
        } catch (error) {
            console.error("Error al agregar el servicio:", error);
            setError('Error al agregar el servicio. Inténtalo de nuevo.');
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
                <h2>Agregar Servicio</h2>
                <motion.form
                    onSubmit={handleSubmit}
                    className="agregar-servicio-form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form-row">
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
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows="4"
                            required
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
                            required
                        />
                    </div>
                    {error && <motion.div className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Agregar Servicio
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default AgregarServicio;
