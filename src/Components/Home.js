import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { motion } from 'framer-motion';
import Header from './components/Header.js'
import Footer from './components/Footer.js'

// Redes
import FacebookIcon from '../Components/Assets/redes/facebook.png';
import InstagramIcon from '../Components/Assets/redes/Instagram.png';
import WhatsappIcon from '../Components/Assets/redes/whatsapp.png';
import TiktokIcon from '../Components/Assets/redes/tiktok.jpg';

// Servicios imagenes
import imgFrenos from '../Components/Assets/servicios/revisionfrenos.jpg';
import imgAlineacion from '../Components/Assets/servicios/alineacion.jpg';
import imgTransmision from '../Components/Assets/servicios/transmision.jpg';
import imgMotor from '../Components/Assets/servicios/reparacionmotores.jpg';
import imgCambioAceite from '../Components/Assets/servicios/cambioaceite.jpg';
import imgSuspension from '../Components/Assets/servicios/suspencion.png';

import '../Components/styles/Home.css';

const AboutUs = () => {
    const aboutTexts = [
        "En Master Center Plus, somos especialistas en el cuidado y mantenimiento de vehículos BMW y Mini Cooper. Ofrecemos un servicio integral para asegurar que tu coche funcione a la perfección.",
        "Nuestra experiencia y repuestos de alta calidad garantizan el mejor rendimiento para tu BMW o Mini Cooper. Cada detalle cuenta para mantener la excelencia de tu vehículo.",
        "En Master Center Plus, valoramos tu tiempo. Te ofrecemos un servicio rápido, confiable y con la precisión que un vehículo de alta gama merece, sin largas esperas."  
      ];

    const itemTemplate = (text) => (
        <motion.div
            className="contenido-textos"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
        >
            <p>{text}</p>
        </motion.div>
    );

    return (
        <section className="contenedor sobre-nosotros">
            <h2 className="titulo">Servicio Rápido y Eficiente para Tu Auto</h2>
            <Carousel value={aboutTexts} itemTemplate={itemTemplate} numVisible={1} numScroll={1} autoplayInterval={10000} showIndicators={false} />
        </section>
    );
};

// Función para el componente Services
const Services = () => {
    const services = [
        { img: imgFrenos, title: "Revisión de Frenos", description: "Incluye la revisión de pastillas, discos, pinzas y el sistema ABS." },
        { img: imgAlineacion, title: "Alineación y Balanceo", description: "Servicio de alineación de ruedas y balanceo." },
        { img: imgTransmision, title: "Reparación de Transmisión", description: "Diagnóstico y reparación de la caja de cambios." },
        { img: imgCambioAceite, title: "Cambio de Aceite", description: "Cambio de aceite y filtro para mantener el motor." },
        { img: imgSuspension, title: "Revisión de Suspensión", description: "Inspección y reparación de amortiguadores." },
        { img: imgMotor, title: "Reparación de Motor", description: "Reparación completa del motor." },
    ];

    const itemTemplate = (service) => (
        <div className="imagen-serv">
            <img src={service.img} alt={service.title} />
            <div className="hover-serv">
                <h3>{service.title}</h3>
            </div>
        </div>
    );

    return (
        <section className="servicios">
            <div className="contenedor-servicios">
                <h2 className="titulo-servicios">Nuestros Servicios</h2>
                <Carousel value={services} itemTemplate={itemTemplate} numVisible={3} numScroll={1} showIndicators={false} autoplayInterval={3000} />
            </div>
        </section>
    );
};

// Componente principal Home
function Home() {
    return (
        <div className="App">
            <Header />
            <div id="home" className="banner">
                <h1>Bienvenido a master center +</h1>
            </div>

            {/* Carrusel de Acerca de Nosotros */}
            <section id="about" className="about-us">
                <AboutUs />
            </section>

            {/* Carrusel de Servicios */}
            <section id="services" className="services">
                <Services />
            </section>

            <Footer />
        </div>
    );
}

export default Home;
