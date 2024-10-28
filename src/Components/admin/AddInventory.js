import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Slidebara';
import '../styles/AgregarServicio.css';

function AddInventory() {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        cantidad_en_stock: '',
        precio_compra: ''
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
            await axios.post('http://localhost:2071/api/inventory', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            navigate('/Inventory');
        } catch (error) {
            console.error("Error al agregar el inventario:", error);
            setError('Error al agregar el producto. Inténtalo de nuevo.');
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
                <h2>Agregar Inventario</h2>
                <motion.form
                    onSubmit={handleSubmit}
                    className="agregar-servicio-form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre del Producto:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="cantidad_en_stock">Cantidad en Stock:</label>
                            <input
                                type="number"
                                id="cantidad_en_stock"
                                name="cantidad_en_stock"
                                value={formData.cantidad_en_stock}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio_compra">Precio de Compra:</label>
                            <input
                                type="number"
                                id="precio_compra"
                                name="precio_compra"
                                value={formData.precio_compra}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                    </div>
                    {error && <motion.div className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Agregar Producto
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default AddInventory;
