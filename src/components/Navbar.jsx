import React from 'react';
// Importamos Link de react-router-dom
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo - Ahora envuelto en un Link que lleva al inicio */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            Conf<span className="text-gray-900">Manager</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {/* Reemplazamos las etiquetas <a> por <Link to="..."> */}
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                            Inicio
                        </Link>
                        <Link to="/conferencias" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">
                            Conferencias
                        </Link>

                        {/* AQUÍ ESTÁ EL BOTÓN DE LOGIN REAL */}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-semibold">
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