import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Slidebara.css';
import { useNavigate } from 'react-router-dom';

function FloatingMenuClient() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Perfil', icon: '👤', onClick: () => navigate('/Profile') },
    { label: 'Vehículos', icon: '🚗', onClick: () => navigate('/Vehicles') },
    { label: 'Servicios', icon: '🔧', onClick: () => navigate('/Services') },
    { label: 'Volver al Menú', icon: '↩️', onClick: () => window.location.href = '/ClientDashboard' },
    { label: 'Cerrar Sesión', icon: '🚪', onClick: () => { localStorage.removeItem("token"); navigate('/') } },
  ];

  return (
    <div className="floating-menu-container">
      <button className="floating-button" onClick={toggleMenu}>
        {isOpen ? '✖' : '✚'}
      </button>
      <AnimatePresence>
        {isOpen && (
          <div className="menu-items">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="menu-item-container"
              >
                <motion.button
                  className="menu-item"
                  onClick={item.onClick}
                  onMouseEnter={(e) => e.currentTarget.querySelector('.menu-label').style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.querySelector('.menu-label').style.opacity = 0}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <motion.span
                    className="menu-label"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FloatingMenuClient;
