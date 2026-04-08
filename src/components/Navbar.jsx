import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo del Sistema */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Conf<span className="text-gray-900">Manager</span>
            </Link>
          </div>
          
          {/* Enlaces de Navegación (Visibles en PC) */}
          <div className="hidden md:flex space-x-6 items-center">
            
            {/* Enlaces Generales */}
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
              Inicio
            </Link>
            
            <Link to="/conferencias" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
              Conferencias
            </Link>
            
            {/* --- NUEVO BOTÓN PARA CREAR CONFERENCIA --- */}
            {/* Le puse un fondo verde clarito para que destaque visualmente */}
            <Link to="/crear-conferencia" className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-md text-sm font-semibold transition-colors border border-emerald-200 shadow-sm flex items-center">
              <span className="mr-1 text-lg leading-none">+</span> Crear Evento
            </Link>
            {/* ------------------------------------------ */}
            
            {/* Línea separadora visual */}
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            
            {/* Enlaces de Autenticación */}
            <Link to="/iniciar-sesion" className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-semibold">
              Iniciar Sesión
            </Link>
            
            <Link to="/registro" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
              Registrarse
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;