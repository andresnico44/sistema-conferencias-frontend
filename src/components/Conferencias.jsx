import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Conferencias = () => {
    // Array original con todas las conferencias
    const eventosOriginales = [
        {
            id: 1,
            titulo: "DevOps & Microservicios Summit 2026",
            fecha: "15 de Mayo, 2026",
            lugar: "Bogotá, Colombia (Híbrido)",
            imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            categoria: "Tecnología",
            precio: "Gratis",
            ponente: "Ing. Sarah Johnson"
        },
        {
            id: 2,
            titulo: "Futuro de la IA en la Salud",
            fecha: "22 de Junio, 2026",
            lugar: "Evento Virtual",
            imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            categoria: "Medicina",
            precio: "$50 USD",
            ponente: "Dr. Alan Turing Jr."
        },
        {
            id: 3,
            titulo: "Fintech Innovation Forum",
            fecha: "10 de Agosto, 2026",
            lugar: "Medellín, Colombia",
            imagen: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            categoria: "Finanzas",
            precio: "$120 USD",
            ponente: "Carlos Slim"
        },
        {
            id: 4,
            titulo: "Diseño UX/UI Moderno",
            fecha: "05 de Septiembre, 2026",
            lugar: "Cúcuta, Colombia",
            imagen: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            categoria: "Diseño",
            precio: "Gratis",
            ponente: "Laura Gómez"
        }
    ];

    // ESTADOS
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [eventosFiltrados, setEventosFiltrados] = useState(eventosOriginales);

    // FUNCIÓN DE BÚSQUEDA
    const handleBuscar = () => {
        // Si la barra está vacía, mostramos todos los eventos
        if (terminoBusqueda.trim() === '') {
            setEventosFiltrados(eventosOriginales);
            return;
        }

        // Convertimos a minúsculas para que la búsqueda no sea sensible a mayúsculas
        const busquedaMinuscula = terminoBusqueda.toLowerCase();

        // Filtramos el arreglo original
        const resultados = eventosOriginales.filter((evento) => {
            const tituloMinuscula = evento.titulo.toLowerCase();
            const categoriaMinuscula = evento.categoria.toLowerCase();

            // Retorna true si el término de búsqueda está en el título O en la categoría
            return tituloMinuscula.includes(busquedaMinuscula) || categoriaMinuscula.includes(busquedaMinuscula);
        });

        setEventosFiltrados(resultados);
    };

    // Permite buscar al presionar la tecla "Enter" en el input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    };

    // FUNCIÓN PARA LIMPIAR LA BÚSQUEDA
    const handleLimpiar = () => {
        setTerminoBusqueda(''); // Borramos el texto
        setEventosFiltrados(eventosOriginales); // Restauramos todas las tarjetas
    };

    return (
        <div className="py-8">

            {/* 1. SECCIÓN SUPERIOR: Título y Buscador */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Conferencias Disponibles</h1>
                    <p className="text-gray-500 mt-1">Descubre y asiste a los mejores eventos de la industria.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">

                    {/* Contenedor relativo para posicionar la 'X' adentro del input */}
                    <div className="relative w-full md:w-72">
                        <input
                            type="text"
                            value={terminoBusqueda}
                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Buscar por nombre o tema..."
                            // padding derecho extra (pr-10) para que el texto no se superponga con la X
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        />

                        {/* Botón 'X' para limpiar. Solo visible si hay texto */}
                        {terminoBusqueda.length > 0 && (
                            <button
                                type="button"
                                onClick={handleLimpiar}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                aria-label="Limpiar búsqueda"
                            >
                                {/* Icono de X (SVG de Heroicons) */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <button
                        onClick={handleBuscar}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
                    >
                        Buscar
                    </button>
                </div>
            </div>

            {/* 2. GRID DE TARJETAS (Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Recorremos el arreglo FILTRADO */}
                {eventosFiltrados.length > 0 ? (
                    eventosFiltrados.map((evento) => (
                        <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">

                            <div className="relative h-48 w-full">
                                <img
                                    src={evento.imagen}
                                    alt={evento.titulo}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                                    {evento.categoria}
                                </div>
                            </div>

                            <div className="p-5 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-sm text-indigo-600 font-semibold">{evento.fecha}</p>
                                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-md">
                    {evento.precio}
                  </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    {evento.titulo}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 flex-grow">
                                    📍 {evento.lugar}
                                </p>

                                <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                                    <div className="text-xs text-gray-500">
                                        <span className="block font-semibold text-gray-700">Ponente:</span>
                                        {evento.ponente}
                                    </div>

                                    <Link
                                        to={`/conferencia/${evento.id}`}
                                        className="text-indigo-600 font-medium text-sm hover:text-indigo-800 hover:underline"
                                    >
                                        Ver detalles →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Mensaje cuando no hay resultados de búsqueda
                    <div className="col-span-full py-12 text-center">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron conferencias</h3>
                        <p className="text-gray-500">Prueba buscando con otros términos o palabras clave.</p>
                        <button
                            onClick={handleLimpiar}
                            className="mt-4 text-indigo-600 hover:underline font-medium"
                        >
                            Ver todas las conferencias
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Conferencias;