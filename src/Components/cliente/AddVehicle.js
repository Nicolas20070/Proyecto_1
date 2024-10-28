import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingMenuClient from './SlidebarC';
import '../styles/AgregarServicio.css';

const vehicleData = {
    BMW: {
        'Serie 1': [2010, 2011, 2012, 2013, 2014, 2015],
        'Serie 3': [2012, 2013, 2014, 2015, 2016, 2017],
        'Serie 5': [2015, 2016, 2017, 2018, 2019, 2020],
        'X1': [2013, 2014, 2015, 2016, 2017, 2018],
        'X3': [2016, 2017, 2018, 2019, 2020, 2021]
    },
    'Mini Cooper': {
        'Mini Hatch': [2010, 2011, 2012, 2013, 2014, 2015],
        'Mini Countryman': [2013, 2014, 2015, 2016, 2017, 2018],
        'Mini Clubman': [2016, 2017, 2018, 2019, 2020, 2021]
    }
};

const colors = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco'];

function AddVehicle() {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        año: '',
        color: '',
        placa: ''
    });
    const [models, setModels] = useState([]);
    const [years, setYears] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'marca') {
            setModels(Object.keys(vehicleData[value] || {}));
            setYears([]);
        } else if (name === 'modelo') {
            setYears(vehicleData[formData.marca][value] || []);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const placaPattern = /^[A-Z]{3}-\d{3}$/; // Restricción de formato de placa
        if (!placaPattern.test(formData.placa)) {
            setError('La placa debe tener el formato ABC-123.');
            return;
        }
        try {
            await axios.post('http://localhost:2071/api/vehicles', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            navigate('/Vehicles');
        } catch (error) {
            console.error("Error al agregar el vehículo:", error);
            setError('Error al agregar el vehículo. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="agregar-servicio-page">
            <FloatingMenuClient />
            <motion.div
                className="agregar-servicio-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Agregar Vehículo</h2>
                <motion.form
                    onSubmit={handleSubmit}
                    className="agregar-servicio-form"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="marca">Marca:</label>
                            <select
                                id="marca"
                                name="marca"
                                value={formData.marca}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una marca</option>
                                {Object.keys(vehicleData).map(brand => (
                                    <option key={brand} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modelo">Modelo:</label>
                            <select
                                id="modelo"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un modelo</option>
                                {models.map(model => (
                                    <option key={model} value={model}>
                                        {model}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="año">Año:</label>
                            <select
                                id="año"
                                name="año"
                                value={formData.año}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un año</option>
                                {years.map(year => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="color">Color:</label>
                            <select
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona un color</option>
                                {colors.map(color => (
                                    <option key={color} value={color}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="placa">Placa:</label>
                            <input
                                type="text"
                                id="placa"
                                name="placa"
                                value={formData.placa}
                                onChange={handleChange}
                                placeholder="ABC-123"
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
                        Agregar Vehículo
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}

export default AddVehicle;
