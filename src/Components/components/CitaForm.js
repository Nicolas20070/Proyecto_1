// src/components/CitaForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CitaForm() {
  const [vehiculos, setVehiculos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [formData, setFormData] = useState({
    vehiculo_id: '',
    fecha: '',
    hora: '',
    servicio_id: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiculosRes, serviciosRes] = await Promise.all([
          axios.get('http://localhost:5000/api/vehiculos/1'), // Para el cliente 1
          axios.get('http://localhost:5000/api/servicios')
        ]);
        setVehiculos(vehiculosRes.data);
        setServicios(serviciosRes.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/citas', {
        ...formData,
        empleado_id: 2 // ID del empleado asignado por defecto
      });
      alert('Cita programada exitosamente');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={formData.vehiculo_id}
        onChange={(e) => setFormData({...formData, vehiculo_id: e.target.value})}
      >
        <option value="">Seleccione un vehículo</option>
        {vehiculos.map(vehiculo => (
          <option key={vehiculo.vehiculo_id} value={vehiculo.vehiculo_id}>
            {vehiculo.marca} {vehiculo.modelo} - {vehiculo.placa}
          </option>
        ))}
      </select>
      {/* Otros campos del formulario */}
      <button type="submit">Programar Cita</button>
    </form>
  );
}

export default CitaForm;
