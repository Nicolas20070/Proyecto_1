import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import FloatingMenuClient from './SlidebarC';
import DataTable from 'react-data-table-component';
import { motion } from 'framer-motion';
import { FaPencilAlt } from 'react-icons/fa';
import '../styles/Vehiculos.css';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loadingVehicles, setLoadingVehicles] = useState(true);
    const [errorVehicles, setErrorVehicles] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/vehicles', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setVehicles(response.data);
            setLoadingVehicles(false);
        })
        .catch(error => {
            console.error('Error fetching vehicles:', error);
            setErrorVehicles('Error al obtener los vehículos.');
            setLoadingVehicles(false);
        });
    }, []);

    const handleUpdateVehicle = (idvehiculo) => navigate(`/edit-vehicle/${idvehiculo}`);

    if (loadingVehicles) {
        return (
            <motion.div
                className="loading-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Cargando vehículos...
            </motion.div>
        );
    }

    if (errorVehicles) {
        return (
            <motion.div
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {errorVehicles}
            </motion.div>
        );
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Año',
            selector: row => row.año,
            sortable: true,
            wrap: true,
            width: '100px',
        },
        {
            name: 'Color',
            selector: row => row.color || 'N/A',
            wrap: true,
            width: '100px',
        },
        {
            name: 'Placa',
            selector: row => row.placa,
            sortable: true,
            wrap: true,
            width: '150px',
        },
        {
            name: 'Acciones',
            cell: row => (
                <motion.button
                    onClick={() => handleUpdateVehicle(row.idvehiculo)}
                    className="edit-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FaPencilAlt />
                </motion.button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
        },
    ];

    return (
        <div className="vehiculos-content">
            <FloatingMenuClient />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="vehiculos-header"
            >
                <h2>Mis Vehículos</h2>
            </motion.div>
            <motion.input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            />
            <Link to="/add-vehicle" className="agregar-vehiculo">✚</Link>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="vehiculos-table-wrapper"
            >
                <DataTable
                    columns={columns}
                    data={filteredVehicles}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent="No hay vehículos disponibles."
                    responsive
                    customStyles={{
                        table: {
                            style: {
                                marginTop: '20px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '90%',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            },
                        },
                        head: {
                            style: {
                                backgroundColor: '#f2f2f2',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                fontSize: '1rem',
                            },
                        },
                        cells: {
                            style: {
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                fontSize: '0.9rem',
                            },
                        },
                    }}
                    paginationComponentOptions={{
                        rowsPerPageText: 'Filas por página',
                        rangeSeparatorText: 'de',
                        noRowsPerPage: false,
                        selectAllRowsItem: true,
                        selectAllRowsItemText: 'Todos',
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Vehicles;
