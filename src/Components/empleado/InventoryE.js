import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Sidebar from './SlidebarE';
import { FaPencilAlt } from 'react-icons/fa';
import '../styles/Inventory.css'; // Asegúrate de tener un archivo CSS para los estilos

function InventarioE() {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleEditProfile = (userId) => {
    navigate(`/edit-inventory/${userId}`);
  };

  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const response = await axios.get("http://localhost:2071/api/inventory", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInventario(response.data);
      } catch (error) {
        console.error("Error al obtener el inventario:", error);
        setError("Error al obtener el inventario.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventario();
  }, []);

  if (loading) {
    return <div className="loading-message">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredInventario = inventario.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cantidad_en_stock.toString().includes(searchTerm.toLowerCase()) ||
    item.precio_compra.toString().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
      wrap: true,
      width: '200px',
    },
    {
      name: 'Descripción',
      selector: row => row.descripcion,
      sortable: true,
      wrap: true,
      width: '400px',
    },
    {
      name: 'Cantidad',
      selector: row => row.cantidad_en_stock,
      sortable: true,
      wrap: true,
      width: '200px',
    },
    {
      name: 'Precio',
      selector: row => row.precio_compra,
      sortable: true,
      wrap: true,
      width: '200px',
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
          Información de Inventario
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="usuarios-table-wrapper"
        >
          <DataTable
            columns={columns}
            data={filteredInventario}
            pagination
            highlightOnHover
            striped
            noDataComponent="No hay productos disponibles."
            responsive
            style={{ marginTop: '10px', fontSize: '0.8rem' }}
            customStyles={{
              table: {
                style: {
                  fontSize: '0.8rem',
                  maxWidth: '100%',
                },
              },
              head: {
                style: {
                  backgroundColor: '#f2f2f2',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  padding: '10px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
              },
              cells: {
                style: {
                  padding: '10px',
                  fontSize: '0.8rem',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  fontFamily: 'inherit',
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
    </div>
  );
}

export default InventarioE;
