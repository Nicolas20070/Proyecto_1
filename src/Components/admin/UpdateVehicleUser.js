import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getVehicles, updateVehicleUser  } from '../../services/authService'; // Asume que tienes un servicio que maneja estas solicitudes
import Modal from '../cliente/ModalCliente'; // Importar el modal
import { motion } from 'framer-motion';
import Sidebar from './Slidebara';
import '../styles/Edit.css';

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

const colors = [
    'Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Gris', 'Amarillo',
    'Naranja', 'Rosa', 'Violeta', 'Marrón', 'Turquesa', 'Beige',
    'Dorado', 'Plateado', 'Cyan', 'Magenta', 'Lavanda', 'Oliva',
    'Verde claro', 'Verde oscuro', 'Rojo claro', 'Rojo oscuro',
    'Azul claro', 'Azul oscuro', 'Gris claro', 'Gris oscuro',
    'Marfil', 'Coral', 'Terracota', 'Mostaza', 'Fucsia'
];

function UpdateVehicleUser () {
    const { idvehiculo } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        marca: '',
        modelo: '',
        año: '',
        color: '',
        placa: '',
    });
    const [models, setModels] = useState([]);
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const data = await getVehicles(idvehiculo);
                setVehicle(data);
                const { marca, modelo } = data;
                setModels(Object.keys(vehicleData[marca] || {}));
                setYears(vehicleData[marca]?.[modelo] || []);
            } catch (error) {
                setError('Error al cargar los datos del vehículo.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [idvehiculo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });

        if (name === 'marca') {
            setModels(Object.keys(vehicleData[value] || {}));
            setYears([]); // Limpiar los años al cambiar la marca
        }

        if (name === 'modelo') {
            setYears(vehicleData[vehicle.marca]?.[value] || []);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVehicleUser (idvehiculo, vehicle);
            setModalMessage('Vehículo actualizado exitosamente.');
            setModalOpen(true);
            setTimeout(() => {
                navigate('/Vehiculos');
            }, 2000);
        } catch (error) {
            setError('Error al actualizar el vehículo.');
            setModalMessage('Error al actualizar el vehículo. Intenta nuevamente.');
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <div>Cargando datos del vehículo...</div>;
    }

    return (
        <div className="edit-profile-page">
            <Sidebar />
            <motion.div
                className="edit-profile-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '2rem', color: '#007bff', fontWeight: 'bold' }}
                >
                    Actualizar Vehículo
                </motion.h2>
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
                            <label htmlFor="marca">Marca:</label>
                            <select
                                id="marca"
                                name="marca"
                                value={vehicle.marca}
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
                                value={vehicle.modelo}
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
                                value={vehicle.año}
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
                                value={vehicle.color}
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
                    <motion.button
                        type="submit"
                        className="submit-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Actualizar Vehículo
                    </motion.button>
                </motion.form>
                <Modal isOpen={modalOpen} onClose={handleCloseModal} message={modalMessage} />
            </motion.div>
        </div>
    );
}

export default UpdateVehicleUser ;