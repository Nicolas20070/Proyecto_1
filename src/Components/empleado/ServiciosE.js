import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './SlidebarE';
import DataTable from 'react-data-table-component';
import { motion } from 'framer-motion';
import '../styles/Servicios.css';
import { FaPlus } from 'react-icons/fa';

function ServiciosE() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get("http://localhost:2071/api/servicios", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setServicios(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
        setError("Error al obtener los servicios.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

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

  const filteredServicios = servicios.filter(servicio =>
    servicio.nombre_empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.placa_vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.nombre_servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    servicio.costo.toString().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Encargado',
      selector: row => row.nombre_empleado,
      sortable: true,
      wrap: true,
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.nombre_empleado}</div>,
    },
    {
      name: 'Nombre',
      selector: row => row.nombre_cliente,
      sortable: true,
      wrap: true,
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.nombre_cliente}</div>,
    },
    {
      name: 'Placa',
      selector: row => row.placa_vehiculo,
      sortable: true,
      wrap: true,
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.placa_vehiculo}</div>,
    },
    {
      name: 'Servicio',
      selector: row => row.nombre_servicio,
      sortable: true,
      wrap: true,
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.nombre_servicio}</div>,
    },
    {
      name: 'Descripción',
      selector: row => row.descripcion,
      wrap: true,
      cell: row => <div style={{ padding: '10px', textAlign: 'left' }}>{row.descripcion}</div>,
    },
    {
      name: 'Precio',
      selector: row => row.costo,
      sortable: true,
      wrap: true,
      cell: row => <div style={{ padding: '10px', textAlign: 'right' }}>{row.costo}</div>,
    },
  ];

  return (
    <div className="servicios-content">
      <Sidebar />
      <motion.div
        className="servicios-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Información de Servicios - Empleado</h2>
      </motion.div>
      <motion.div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Link to="/agregar-servicioE" className="agregar-ser">
          <FaPlus />
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="servicios-table-wrapper"
      >
        <DataTable
          columns={columns}
          data={filteredServicios}
          pagination
          highlightOnHover
          striped
          noDataComponent="No hay servicios disponibles."
          responsive
          customStyles={{
            table: {
              style: {
                marginTop: '20px',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '90%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '15px',
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
}

export default ServiciosE;
  