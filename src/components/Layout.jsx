import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// 'children' es un prop especial de React que representa el contenido dentro de las etiquetas del componente
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Contenido principal que tomará el espacio restante disponible */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;