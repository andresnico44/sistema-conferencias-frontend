import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-indigo-400">
              Conf<span className="text-white">Manager</span>
            </span>
                        <p className="text-gray-400 text-sm mt-1">
                            Gestionando el conocimiento del futuro.
                        </p>
                    </div>
                    <div className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Sistema de Conferencias. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;