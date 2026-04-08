import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { apiService } from '../services/api'; // Lo usaremos después cuando encendamos el backend

const CrearConferencia = () => {
  const navigate = useNavigate();

  // 1. ESTADO DEL FORMULARIO
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    imagen: '',
    categoria: 'Tecnología',
    precio: '0',
    ponente: ''
  });

  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);

  // 2. MANEJADOR DE CAMBIOS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. FUNCIÓN DE ENVÍO (Simulada por ahora)
  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    // Simulamos que enviamos los datos al backend y tarda 1.5 segundos en responder
    setTimeout(() => {
      console.log("Datos a enviar al backend:", formData);
      setCargando(false);
      setExito(true);
      
      // Redirigimos al listado después de mostrar el mensaje de éxito
      setTimeout(() => {
        navigate('/conferencias');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Encabezado */}
      <div className="mb-8">
        <Link to="/conferencias" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4 inline-block">
          ← Volver a conferencias
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Conferencia</h1>
        <p className="text-gray-500 mt-1">Completa los detalles para publicar un nuevo evento en la plataforma.</p>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        
        {/* Alerta de Éxito */}
        {exito && (
          <div className="bg-green-50 border-b border-green-200 text-green-700 px-6 py-4">
            <p className="font-medium flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ¡Conferencia creada exitosamente! Redirigiendo al catálogo...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          {/* Fila 1: Título (Ocupa todo el ancho) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Conferencia *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ej. Congreso Internacional de Inteligencia Artificial"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Fila 2: Descripción (Ocupa todo el ancho) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Escribe un breve resumen de lo que tratará el evento..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Fila 3: Cuadrícula de 2 columnas para detalles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del evento *</label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lugar o Modalidad *</label>
              <input
                type="text"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
                required
                placeholder="Ej. Bogotá (Presencial) o Zoom (Virtual)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-700"
              >
                <option value="Tecnología">Tecnología</option>
                <option value="Medicina">Medicina</option>
                <option value="Finanzas">Finanzas</option>
                <option value="Diseño">Diseño</option>
                <option value="Negocios">Negocios</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD) *</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
                placeholder="Ej. 50 (Pon 0 si es gratis)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ponente Principal *</label>
              <input
                type="text"
                name="ponente"
                value={formData.ponente}
                onChange={handleChange}
                required
                placeholder="Ej. Dr. Alan Turing"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen (Portada)</label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>

          {/* Botones de Acción */}
          <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/conferencias')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-sm ${cargando ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
            >
              {cargando ? 'Guardando...' : 'Crear Conferencia'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CrearConferencia;