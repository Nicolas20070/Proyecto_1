import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();

    const items = [
        { label: 'Inicio', icon: 'pi pi-home', className: 'menu-item-custom', command: () => { document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); } },
        { label: 'Servicios', icon: 'pi pi-briefcase', className: 'menu-item-custom', command: () => { document.getElementById('services').scrollIntoView({ behavior: 'smooth' }); } },
        { label: 'Acerca de Nosotros', icon: 'pi pi-info-circle', className: 'menu-item-custom', command: () => { document.getElementById('about').scrollIntoView({ behavior: 'smooth' }); } },
    ];

    const start = <img alt="logo" src={require('../Assets/logo.png')} height="90" className="logo" />;
    const end = (
        <div className="menu-item-custom2-container">
            <Button label="Iniciar Sesión" icon="pi pi-sign-in" className="menu-item-custom2" onClick={() => navigate('/login')} />
            <Button label="Registrarse" icon="pi pi-user-plus" className="menu-item-custom2" onClick={() => navigate('/register')} />
        </div>
    );

    return (
        <div className="header-container">
            <Menubar model={items} start={start} end={end} className="header-menubar" />
        </div>
    );
}

export default Header;
