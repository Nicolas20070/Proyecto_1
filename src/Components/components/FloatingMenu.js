import React, { useState } from 'react';
import './FloatingMenu.css';

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Dashboard', icon: '📊', onClick: () => window.location.href = '/dashboard' },
    { label: 'Usuarios', icon: '👥', onClick: () => window.location.href = '/usuarios' },
    { label: 'Inventario', icon: '📦', onClick: () => window.location.href = '/inventario' },
    { label: 'Servicios', icon: '🔧', onClick: () => window.location.href = '/servicios' },
    { label: 'Citas', icon: '📅', onClick: () => window.location.href = '/citas' },
  ];

  return (
    <div className="floating-menu-container">
      <button className="floating-button" onClick={toggleMenu}>
        {isOpen ? '✖' : '✚'}
      </button>
      {isOpen && (
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <button key={index} className="menu-item" onClick={item.onClick}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FloatingMenu;
