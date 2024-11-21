import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Sidebar from './Slidebara';
import { FaPencilAlt, FaTrashAlt, FaCalendarPlus } from 'react-icons/fa';
import '../styles/Usuarios.css';

function Citas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [formData, setFormData] = useState({
    id_cliente: '',
    id_empleado: '',
    fecha_hora: '',
    estado: 'Pendiente',
    motivo: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await axios.get("http://localhost:2071/api/citas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCitas(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
      setError("Error al obtener las citas.");
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const citaData = {
        ...formData,
        id_cliente: parseInt(formData.id_cliente),
        id_empleado: parseInt(formData.id_empleado)
      };

      if (editingCita) {
        await axios.put(`http://localhost:2071/api/citas/update/${editingCita.id}`, citaData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post("http://localhost:2071/api/citas/create", citaData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      fetchCitas();
      closeModal();
    } catch (error) {
      console.error("Error al guardar la cita:", error);
      setError("Error al guardar la cita.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
      try {
        await axios.delete(`http://localhost:2071/api/citas/delete/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchCitas();
      } catch (error) {
        console.error("Error al eliminar la cita:", error);
        setError("Error al eliminar la cita.");
      }
    }
  };

  const openModal = (cita = null) => {
    if (cita) {
      setFormData({
        id_cliente: cita.id_cliente?.toString() || '',
        id_empleado: cita.id_empleado?.toString() || '',
        fecha_hora: cita.fecha_hora || '',
        estado: cita.estado || 'Pendiente',
        motivo: cita.motivo || ''
      });
    }
    setEditingCita(cita);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCita(null);
    setFormData({
      id_cliente: '',
      id_empleado: '',
      fecha_hora: '',
      estado: 'Pendiente',
      motivo: ''
    });
  };

  const columns = [
    { name: 'ID', selector: row => row?.id, sortable: true },
    { name: 'Cliente', selector: row => row?.id_cliente, sortable: true },
    { name: 'Empleado', selector: row => row?.id_empleado, sortable: true },
    { 
      name: 'Fecha y Hora', 
      selector: row => row?.fecha_hora ? new Date(row.fecha_hora).toLocaleString() : '', 
      sortable: true 
    },
    { name: 'Estado', selector: row => row?.estado, sortable: true },
    { name: 'Motivo', selector: row => row?.motivo, sortable: true },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <FaPencilAlt className="icon edit-icon" onClick={() => openModal(row)} />
          <FaTrashAlt className="icon delete-icon" onClick={() => handleDelete(row.id)} />
        </>
      ),
    },
  ];

  const filteredCitas = citas.filter(cita => {
    if (!cita) return false;
    return (cita.id_cliente?.toString() || '').includes(searchTerm) || 
           (cita.id_empleado?.toString() || '').includes(searchTerm);
  });

  if (loading) return <div className="loading-message">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Gestión de Citas</h1>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar por ID de cliente o empleado"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => openModal()}>
            <FaCalendarPlus /> Nueva Cita
          </button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>{editingCita ? 'Editar Cita' : 'Crear Cita'}</h2>
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>ID Cliente:</label>
                  <input
                    type="number"
                    value={formData.id_cliente}
                    onChange={(e) => setFormData({ ...formData, id_cliente: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ID Empleado:</label>
                  <input
                    type="number"
                    value={formData.id_empleado}
                    onChange={(e) => setFormData({ ...formData, id_empleado: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fecha y Hora:</label>
                  <input
                    type="datetime-local"
                    value={formData.fecha_hora}
                    onChange={(e) => setFormData({ ...formData, fecha_hora: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estado:</label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="Reprogramada">Reprogramada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Motivo:</label>
                  <textarea
                    value={formData.motivo}
                    onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={closeModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <DataTable
          columns={columns}
          data={filteredCitas}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default Citas;