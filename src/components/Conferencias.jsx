import React from 'react';
import { Link } from 'react-router-dom';

const Conferencias = () => {
    // Simulación de datos que vendrían de tus microservicios
    const eventos = [
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

    return (
        <div className="py-8">

            {/* 1. SECCIÓN SUPERIOR: Título y Buscador */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Conferencias Disponibles</h1>
                    <p className="text-gray-500 mt-1">Descubre y asiste a los mejores eventos de la industria.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    {/* Buscador maquetado */}
                    <input
                        type="text"
                        placeholder="Buscar por nombre o tema..."
                        className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 cursor-not-allowed"
                        disabled
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition cursor-not-allowed">
                        Buscar
                    </button>
                </div>
            </div>

            {/* 2. GRID DE TARJETAS (Cards) */}
            {/* Aquí usamos el Grid. 1 columna en móvil, 2 en md, 3 en lg, 4 en xl */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {/* Recorremos nuestro arreglo de eventos para dibujar una tarjeta por cada uno */}
                {eventos.map((evento) => (

                    <div key={evento.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">

                        {/* Imagen de la tarjeta */}
                        <div className="relative h-48 w-full">
                            <img
                                src={evento.imagen}
                                alt={evento.titulo}
                                className="w-full h-full object-cover"
                            />
                            {/* Etiqueta de Categoría (Píldora) */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                                {evento.categoria}
                            </div>
                        </div>

                        {/* Contenido de la tarjeta */}
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

                            {/* Pie de la tarjeta */}
                            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                    <span className="block font-semibold text-gray-700">Ponente:</span>
                                    {evento.ponente}
                                </div>

                                {/* Botón que nos llevará a la Landing Page (HU7) en el futuro */}
                                <Link
                                    to={`/conferencia/${evento.id}`}
                                    className="text-indigo-600 font-medium text-sm hover:text-indigo-800 hover:underline"
                                >
                                    Ver detalles →
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Conferencias;