import React from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>Contacto</h3>
                    <p>Dirección: Calle Falsa 123, Ciudad XYZ</p>
                    <p>Teléfono: +1 234 567 890</p>
                    <p>Email: contacto@tallermecanico.com</p>
                </div>
                <div className="footer-section">
                    <h3>Síguenos en Redes Sociales</h3>
                    <div className="social-buttons">
                        <Button icon="pi pi-facebook" className="social-button" aria-label="Facebook" />
                        <Button icon="pi pi-instagram" className="social-button" aria-label="Instagram" />
                        <Button icon="pi pi-twitter" className="social-button" aria-label="Twitter" />
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Horario de Atención</h3>
                    <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                    <p>Sábado: 9:00 AM - 2:00 PM</p>
                    <p>Domingo: Cerrado</p>
                </div>
            </div>
            <Divider />
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Taller Especializado BMW y Mini Cooper. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
