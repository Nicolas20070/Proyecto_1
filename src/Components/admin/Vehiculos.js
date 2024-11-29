import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminVehicles } from '../../services/authService';
import Sidebar from './Slidebara';
import DataTable from 'react-data-table-component';
import { motion } from 'framer-motion';
import { FaPencilAlt } from 'react-icons/fa';
import '../styles/Usuarios.css';

export const API_URL = "http://localhost:2071/api";

function Vehiculos() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await getAdminVehicles();
                setVehicles(data);
            } catch (error) {
                setError("Error al obtener los vehículos.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const handleUpdateVehicleUser = (idvehiculo) => {
        navigate(`/update-vehicle-user/${idvehiculo}`);
    };

    if (loading) {
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

    if (error) {
        return (
            <motion.div
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {error}
            </motion.div>
        );
    }

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.año.toString().includes(searchTerm.toLowerCase()) ||
        vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Año',
            selector: row => row.año,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Color',
            selector: row => row.color || 'N/A',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Placa',
            selector: row => row.placa,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <motion.button
                    onClick={() => handleUpdateVehicleUser(row.idvehiculo)}
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
        },
    ];

    return (
        <div className="usuarios-container">
            <Sidebar />
            <div className="usuarios-content">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="usuarios-title"
            >
              Información de Vehículos
            </motion.h2>
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
         </div>
        </div>
    );
}

export default Vehiculos;
