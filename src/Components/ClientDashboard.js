import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { motion } from 'framer-motion';
import Footer from './components/Footer';
import FloatingMenuClient from './cliente/SlidebarC';
import imgIcono1 from '../Components/Assets/icono1.png';
import imgFrenos from '../Components/Assets/servicios/revisionfrenos.jpg';
import imgAlineacion from '../Components/Assets/servicios/alineacion.jpg';
import imgTransmision from '../Components/Assets/servicios/transmision.jpg';
import imgMotor from '../Components/Assets/servicios/reparacionmotores.jpg';
import imgCambioAceite from '../Components/Assets/servicios/cambioaceite.jpg';
import imgSuspension from '../Components/Assets/servicios/suspencion.png';
import imgPort100 from '../Components/Assets/productos/Pastillas.jpg';
import imgPort101 from '../Components/Assets/productos/bateria.jpg';
import imgPort102 from '../Components/Assets/productos/productoneumatico.jpg';
import imgPort103 from '../Components/Assets/productos/led.jpg';
import imgPort104 from '../Components/Assets/productos/anticongelante.jpg';
import imgPort105 from '../Components/Assets/productos/kit.png';
import imgPort106 from '../Components/Assets/productos/cambioaceite.jpg';
import imgPort109 from '../Components/Assets/productos/filtro.jpg';
import '../Components/styles/AdminDashboard.css';

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
      <h2 className="titulo">Servicio de calidad para Tu Auto</h2>
      <Carousel value={aboutTexts} itemTemplate={itemTemplate} numVisible={1} numScroll={1} autoplayInterval={10000} showIndicators={false} />
    </section>
  );
};

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

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    { src: imgPort102, alt: "Imagen 12", text: "Neumáticos" },
    { src: imgPort103, alt: "Imagen 13", text: "Luces LED" },
    { src: imgPort104, alt: "Imagen 14", text: "Anticongelante" },
    { src: imgPort105, alt: "Imagen 15", text: "Kit de herramientas" },
    { src: imgPort106, alt: "Imagen 5", text: "Aceite de motor" },
    { src: imgPort109, alt: "Imagen 9", text: "Filtro de aceite" },
    { src: imgPort100, alt: "Imagen 10", text: "Pastillas de freno" },
    { src: imgPort101, alt: "Imagen 11", text: "Batería de automotriz" },
  ];

  const itemTemplate = (image) => (
    <div className="imagen-port">
      <img src={image.src} alt={image.alt} />
      <div className="hover-galeria">
        <img src={imgIcono1} alt="Icono" />
        <p>{image.text}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="content">
        <FloatingMenuClient />
        <motion.div 
          id="home" 
          className="banner"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Bienvenido</h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Explora nuestros servicios y manten tu vehículo en excelente estado.
          </motion.p>
        </motion.div>
        <section id="about" className="about-us">
          <AboutUs />
        </section>
        
        <section id="services" className="services">
          <Services />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
