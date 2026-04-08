import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api'; // Importamos el servicio que creamos

const Registro = () => {
  // 1. CREACIÓN DE ESTADOS (Variables para guardar la información)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    password: '',
    tipoCuenta: 'Asistente' // Valor por defecto
  });
  
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  // 2. FUNCIÓN PARA MANEJAR LOS CAMBIOS AL ESCRIBIR
  const handleChange = (e) => {
    // Esto captura el "name" del input y actualiza la variable correspondiente
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. FUNCIÓN QUE SE EJECUTA AL ENVIAR EL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página
    setError('');
    
    // Validación básica de front-end
    if (!terminosAceptados) {
      setError('Debes aceptar los Términos y Condiciones para continuar.');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setCargando(true);

    try {
      // Llamamos a nuestro microservicio a través de apiService
      const respuesta = await apiService.registro(formData);
      
      console.log("Usuario registrado con éxito:", respuesta);
      setExito(true);
      
      // Redirigimos al usuario al login después de 2 segundos
      setTimeout(() => {
        navigate('/iniciar-sesion');
      }, 2000);

    } catch (err) {
      setError('Ocurrió un error al registrar el usuario. Es posible que el correo ya exista.');
      console.error("Error completo:", err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col-reverse md:flex-row max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Lado izquierdo - Formulario de Registro */}
        <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Crea tu cuenta</h2>
            <p className="text-sm text-gray-500">
              Únete a la red de conferencias más grande. Completa tus datos para empezar.
            </p>
          </div>

          {/* ALERTAS VISUALES */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          {exito && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              ¡Registro exitoso! Redirigiendo al inicio de sesión...
            </div>
          )}

          {/* 4. EL FORMULARIO */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre" // ¡Importante para que el handleChange funcione!
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Andrés"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-gray-50"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Niño"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-gray-50"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-gray-50"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  placeholder="+57 300 000 0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cuenta</label>
              <select 
                name="tipoCuenta"
                value={formData.tipoCuenta}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-gray-50 text-gray-700"
              >
                <option value="Asistente">Asistente</option>
                <option value="Ponente">Ponente / Speaker</option>
                <option value="Organizador">Organizador</option>
              </select>
            </div>

            <div className="flex items-center mt-2">
              <input 
                type="checkbox" 
                checked={terminosAceptados}
                onChange={(e) => setTerminosAceptados(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer" 
              />
              <label className="ml-2 block text-sm text-gray-600">
                Acepto los <a href="#" className="text-indigo-600 hover:underline">Términos y Condiciones</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className={`w-full text-white font-semibold py-2.5 rounded-lg transition-colors mt-4 shadow-sm ${cargando ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'}`}
            >
              {cargando ? 'Enviando datos...' : 'Registrarse ahora'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta? <Link to="/iniciar-sesion" className="font-semibold text-indigo-600 hover:text-indigo-800">Inicia sesión aquí</Link>
          </div>
        </div>

        {/* Lado derecho - Imagen (Oculto en móviles) */}
        <div className="hidden md:block w-2/5 bg-gray-900 relative">
          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Networking"
            className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
            <h3 className="text-2xl font-bold mb-2">Conecta con expertos</h3>
            <p className="text-gray-300 text-sm">
              Accede a más de 500 conferencias anuales y expande tu red de contactos profesionales.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Registro;