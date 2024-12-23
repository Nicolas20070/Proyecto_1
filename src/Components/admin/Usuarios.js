import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/authService';
import Sidebar from '../admin/Slidebara';
import DataTable from 'react-data-table-component';
import { motion } from 'framer-motion';
import '../styles/Usuarios.css';
import { FaPencilAlt } from 'react-icons/fa';

export const API_URL = "http://localhost:2071/api";

function InformacionUsuarios({ handleCardClick }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError("Error al obtener la información de usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditProfile = (userId) => {
    navigate(`/edit-profile-user/${userId}`);
  };

  if (loading) {
    return (
      <motion.div
        className="usuarios-container loading-message"
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
        className="usuarios-container error-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {error}
      </motion.div>
    );
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
      wrap: true,
      width: '130px',
    },
    {
      name: 'Apellido',
      selector: row => row.surname || "No disponible",
      sortable: true,
      wrap: true,
      width: '130px',
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      wrap: true,
      width: '220px',
      cell: row => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
          {row.email}
        </div>
      ),
    },
    {
      name: 'Dirección',
      selector: row => row.address || "No disponible",
      wrap: true,
      width: '220px',
    },
    {
      name: 'Teléfono',
      selector: row => row.phone || "No disponible",
      wrap: true,
      width: '110px',
    },
    {
      name: 'Rol',
      cell: row => (
        <span>
          {row.rol_id === 1 ? "Empleado" : row.rol_id === 2 ? "Cliente" : row.rol_id === 3 ? "Administrador" : "Desconocido"}
        </span>
      ),
      width: '125px',
    },
    {
      name: '',
      cell: row => (
        <button onClick={() => handleEditProfile(row.id)} className="edit-button">
          <FaPencilAlt />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
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
          Información de Usuarios
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
            data={filteredUsers}
            pagination
            highlightOnHover
            striped
            noDataComponent="No hay usuarios disponibles."
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
    </div>
  );
}

export default InformacionUsuarios;
