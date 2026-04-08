import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DetalleArticulo = () => {
  const { id } = useParams();

  // Simulamos los datos del artículo que vendrían de la API
  const articulo = {
    id: id,
    titulo: "Optimización de consultas en PostgreSQL usando índices avanzados",
    conferencia: "DevOps & Microservicios Summit 2026",
    autores: "Nicole Angarita, Andrés Niño",
    estado: "EN REVISIÓN", // Puede ser: EN REVISIÓN, ACEPTADO, RECHAZADO
    fechaEnvio: "07 de Abril, 2026",
    resumen: "Este artículo propone una metodología innovadora para estructurar índices B-Tree en bases de datos relacionales de gran escala. A través de pruebas en entornos de microservicios, demostramos una reducción del 40% en los tiempos de respuesta de lectura pesada.",
    archivoNombre: "optimizacion_postgres_2026.pdf"
  };

  // Lógica para asignar un color de "etiqueta" dependiendo del estado
  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'ACEPTADO': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'RECHAZADO': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200'; // EN REVISIÓN
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="mb-6">
        <Link to="/conferencias" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4 inline-block">
          ← Volver al catálogo
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        
        {/* Cabecera del Artículo */}
        <div className="bg-gray-50 border-b border-gray-200 p-6 md:p-8 flex flex-col md:flex-row justify-between md:items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Artículo #{articulo.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getEstadoColor(articulo.estado)}`}>
                {articulo.estado}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{articulo.titulo}</h1>
            <p className="text-gray-600 font-medium">Enviado a: <span className="text-indigo-600">{articulo.conferencia}</span></p>
          </div>
          
          <div className="text-left md:text-right text-sm text-gray-500 shrink-0">
            <p>Fecha de envío:</p>
            <p className="font-semibold text-gray-900">{articulo.fechaEnvio}</p>
          </div>
        </div>

        {/* Cuerpo de Detalles */}
        <div className="p-6 md:p-8 space-y-8">
          
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Autores</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">{articulo.autores}</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Resumen (Abstract)</h3>
            <p className="text-gray-700 leading-relaxed text-justify">{articulo.resumen}</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Documento Adjunto</h3>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                <span className="font-medium text-gray-900">{articulo.archivoNombre}</span>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center bg-white border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Descargar
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default DetalleArticulo;