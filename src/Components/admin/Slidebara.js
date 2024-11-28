import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Slidebara.css';

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Perfil', icon: '👤', onClick: () => window.location.href = '/ProfileA' },
    { label: 'Usuarios', icon: '👥', onClick: () => window.location.href = '/Usuarios' },
    { label: 'Vehículos', icon: '🚗', onClick: () => window.location.href = '/Vehiculos' },
    { label: 'Servicios', icon: '🔧', onClick: () => window.location.href = '/Servicios' },
    { label: 'Inventario', icon: '📦', onClick: () => window.location.href = '/Inventory' },
    { label: 'Volver al Menú', icon: '↩️', onClick: () => window.location.href = '/AdminDashboard' },
    { label: 'Cerrar Sesión', icon: '🚪', onClick: () => { localStorage.removeItem("token"); window.location.href = '/' } },
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

export default FloatingMenu;
