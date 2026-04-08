import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditarConferencia = () => {
  const navigate = useNavigate();
  // Extraemos el ID de la conferencia de la URL
  const { id } = useParams();

  // 1. ESTADO DEL FORMULARIO (Inicia vacío)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    lugar: '',
    imagen: '',
    categoria: '',
    precio: '',
    ponente: ''
  });

  const [cargando, setCargando] = useState(true); // Empieza en true porque "descargará" datos
  const [guardando, setGuardando] = useState(false);
  const [exito, setExito] = useState(false);

  // 2. SIMULAR CARGA DE DATOS DESDE LA API
  useEffect(() => {
    // Cuando el componente carga, simulamos que le pedimos los datos al backend
    setTimeout(() => {
      // Estos serían los datos que nos devuelve el backend para la conferencia con este 'id'
      setFormData({
        titulo: "DevOps & Microservicios Summit 2026",
        descripcion: "El Summit anual de DevOps reúne a más de 5,000 profesionales de la tecnología de toda Latinoamérica.",
        fecha: "2026-05-15", // Formato YYYY-MM-DD necesario para inputs type="date"
        lugar: "Bogotá, Colombia (Híbrido)",
        imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        categoria: "Tecnología",
        precio: "150",
        ponente: "Ing. Sarah Johnson"
      });
      setCargando(false);
    }, 800); // Tarda menos de 1 segundo en cargar
  }, [id]);

  // 3. MANEJADOR DE CAMBIOS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 4. FUNCIÓN PARA GUARDAR CAMBIOS
  const handleSubmit = (e) => {
    e.preventDefault();
    setGuardando(true);

    // Simulamos guardar en la base de datos
    setTimeout(() => {
      console.log(`Conferencia ${id} actualizada con:`, formData);
      setGuardando(false);
      setExito(true);
      
      setTimeout(() => {
        // Al terminar, volvemos a la página de detalles de ESA conferencia
        navigate(`/conferencia/${id}`);
      }, 2000);
    }, 1500);
  };

  // Si los datos todavía se están "descargando", mostramos un mensaje de carga
  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-xl text-gray-500 font-medium animate-pulse">Cargando datos de la conferencia...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="mb-8 flex justify-between items-end">
        <div>
          <Link to={`/conferencia/${id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4 inline-block">
            ← Volver a los detalles
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Editar Conferencia</h1>
          <p className="text-gray-500 mt-1">Estás modificando el evento #{id}.</p>
        </div>
        
        {/* Botón rojo peligroso para eliminar */}
        <button className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-red-200">
          Eliminar Evento
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        
        {exito && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-700 px-6 py-4">
            <p className="font-medium">¡Los cambios se han guardado exitosamente!</p>
          </div>
        )}

        {/* El formulario es casi idéntico al de Crear, pero con los values llenos */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Conferencia *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

          </div>

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate(`/conferencia/${id}`)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className={`px-6 py-2 text-white rounded-lg font-medium transition-colors shadow-sm ${guardando ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
            >
              {guardando ? 'Guardando Cambios...' : 'Actualizar Conferencia'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditarConferencia;