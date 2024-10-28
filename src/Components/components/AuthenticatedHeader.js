import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthenticatedHeader.css';

function AuthenticatedHeader() {
    const navigate = useNavigate();
    const profileMenu = React.useRef(null);
    const start = <img alt="logo" src={require('../assets/logo.png')} height="100" className="mr-2" />;
    const end = (
        <div className="authenticated-menu-container">
            <Menu model={[
                { label: 'Perfil', icon: 'pi pi-user', command: () => { navigate('/perfil_admin'); } },
                { label: 'Configuración', icon: 'pi pi-cog' },
                { separator: true },
                { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => { navigate('/'); } }
            ]} popup ref={profileMenu} />
            <Button icon="pi pi-user" className="p-button-rounded p-button-text" onClick={(event) => profileMenu.current.toggle(event)} aria-label="Usuario" />
            <Avatar label="A" shape="circle" className="p-mr-2" />
        </div>
    );

    return (
        <Menubar start={start} end={end} className="authenticated-header-menubar" />
    );
}

export default AuthenticatedHeader;
