import React from 'react';
import '../Components/styles/TerminosCondiciones.css';

const TerminosCondiciones = () => {
  return (
    <div className="terms-container">
      <h1>Términos y Condiciones</h1>
      <p>
        Bienvenido a <span className="taller-name">MasterCenter</span>. Al utilizar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones:
      </p>
      <h2>1. Introducción</h2>
      <p>
        Estos Términos y Condiciones rigen el uso de los servicios proporcionados por <span className="taller-name">MasterCenter</span>,
        incluyendo cualquier sitio web, aplicaciones y otros servicios relacionados. Al acceder a nuestros servicios, aceptas cumplir con estos términos.
      </p>
      <h2>2. Servicios Ofrecidos</h2>
      <p>
        <span className="taller-name">MasterCenter</span> es un taller automotriz especializado en BMW y Mini Cooper. Ofrecemos:
        <ul>
          <li>Mantenimiento preventivo y correctivo.</li>
          <li>Reparaciones mecánicas y electrónicas especializadas.</li>
          <li>Diagnósticos avanzados con tecnología de última generación.</li>
          <li>Asesoramiento técnico personalizado.</li>
          <li>Venta de repuestos originales y certificados.</li>
        </ul>
        Nos reservamos el derecho de modificar o cancelar cualquier servicio sin previo aviso.
      </p>
      <h2>3. Responsabilidades del Cliente</h2>
      <p>
        Como cliente, aceptas proporcionar información precisa y veraz sobre tu vehículo. También te comprometes a:
        <ul>
          <li>Respetar los plazos establecidos para citas y recogida del vehículo.</li>
          <li>No utilizar nuestros servicios para fines ilícitos.</li>
          <li>Realizar los pagos correspondientes de manera oportuna.</li>
        </ul>
      </p>
      <h2>4. Garantías</h2>
      <p>
        Garantizamos la calidad de los servicios y repuestos proporcionados. Cualquier reclamación debe realizarse dentro de los 30 días posteriores al servicio.
        Las garantías no cubren daños ocasionados por mal uso del vehículo o intervención de terceros.
      </p>
      <h2>5. Propiedad Intelectual</h2>
      <p>
        Todo el contenido, marcas y logos presentes en nuestro sitio web son propiedad de <span className="taller-name">MasterCenter</span> y están protegidos
        por las leyes de propiedad intelectual. No está permitido reproducir, distribuir ni modificar este contenido sin autorización previa.
      </p>
      <h2>6. Política de Privacidad</h2>
      <p>
        Nos comprometemos a proteger tu información personal. Consulta nuestra <a href="/politica-de-privacidad">Política de Privacidad</a> para más detalles
        sobre cómo manejamos tus datos.
      </p>
      <h2>7. Modificaciones de los Términos</h2>
      <p>
        Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento. Las modificaciones serán notificadas mediante nuestro sitio web.
        El uso continuo de nuestros servicios implica la aceptación de los cambios.
      </p>
      <h2>8. Limitaciones de Responsabilidad</h2>
      <p>
        <span className="taller-name">MasterCenter</span> no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso de nuestros servicios,
        excepto cuando la ley lo exija.
      </p>
      <h2>9. Resolución de Disputas</h2>
      <p>
        Cualquier conflicto relacionado con nuestros servicios será resuelto mediante un proceso de mediación. Si no se llega a un acuerdo, las partes
        podrán recurrir a la jurisdicción ordinaria en Bogotá, Colombia.
      </p>
      <h2>10. Contacto</h2>
      <p>
        Si tienes preguntas o inquietudes, contáctanos:
      </p>
      <address>
        <span className="taller-name">MasterCenter</span> <br />
        Carrera 45 #123-45, Bogotá, Colombia <br />
        Teléfono: +57 320 123 4567 <br />
        Correo Electrónico: contacto@mastercenter.co
      </address>
    </div>
  );
};

export default TerminosCondiciones;
