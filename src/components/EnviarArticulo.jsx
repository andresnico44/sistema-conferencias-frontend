import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EnviarArticulo = () => {
  const { conferenciaId } = useParams(); // Para saber a qué conferencia enviamos el artículo
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    resumen: '',
    autores: '',
  });
  
  // Estado específico para el archivo
  const [archivo, setArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar la selección del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!archivo) {
      alert("Por favor, adjunta un archivo en formato PDF o Word.");
      return;
    }

    setCargando(true);

    // Aquí en el futuro usarías FormData() para enviar archivos binarios a la API
    setTimeout(() => {
      console.log("Artículo enviado:", formData, "Archivo:", archivo.name);
      setCargando(false);
      setExito(true);
      
      setTimeout(() => {
        // Redirigimos al detalle del artículo (ficticio ID 99)
        navigate('/articulo/99');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to={`/conferencia/${conferenciaId}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-4 inline-block">
          ← Volver a la conferencia
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Enviar Artículo / Ponencia</h1>
        <p className="text-gray-500 mt-1">Sube tu propuesta para la conferencia #{conferenciaId}.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden p-6 md:p-8">
        {exito && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
            ¡Tu artículo ha sido enviado con éxito para revisión!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título del Artículo *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autores (separados por coma) *</label>
            <input
              type="text"
              name="autores"
              value={formData.autores}
              onChange={handleChange}
              required
              placeholder="Ej. Nicole Angarita, Andrés Niño"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resumen (Abstract) *</label>
            <textarea
              name="resumen"
              value={formData.resumen}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* COMPONENTE DE SUBIDA DE ARCHIVOS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Documento Adjunto (PDF, DOCX) *</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-indigo-400 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {/* Icono de subida */}
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold text-indigo-600">Haz clic para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max. 10MB)</p>
                </div>
                {/* Input oculto */}
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {/* Muestra el nombre del archivo si ya se seleccionó uno */}
            {archivo && (
              <div className="mt-3 flex items-center text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-2 rounded-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                Archivo seleccionado: {archivo.name}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={cargando}
              className={`px-8 py-3 text-white rounded-lg font-bold shadow-sm transition-colors ${cargando ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
            >
              {cargando ? 'Subiendo documento...' : 'Enviar Artículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnviarArticulo;