import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LandingConferencia = () => {
    // useParams() captura el ID de la URL (ej: /conferencia/1)
    const { id } = useParams();

    return (
        <div className="bg-white pb-12">

            {/* 1. SECCIÓN HERO (Cabecera Impactante) */}
            <div className="relative w-full h-[500px] bg-gray-900">
                {/* Imagen de fondo oscura */}
                <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Conferencia Hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />

                {/* Contenido del Hero centrado */}
                <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                    <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-600 bg-opacity-80 text-sm font-semibold tracking-wider mb-4 border border-indigo-400">
              Tecnología & Innovación
            </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                            DevOps & Microservicios Summit 2026
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Aprende a escalar aplicaciones modernas con los líderes de la industria. Un evento de 3 días lleno de workshops prácticos y networking.
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm font-medium">
                            <div className="flex items-center bg-gray-800 bg-opacity-50 px-4 py-2 rounded-lg backdrop-blur-sm">
                                📅 15 al 17 de Mayo, 2026
                            </div>
                            <div className="flex items-center bg-gray-800 bg-opacity-50 px-4 py-2 rounded-lg backdrop-blur-sm">
                                📍 Ágora Bogotá (Híbrido)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CUERPO DE LA PÁGINA (Dos columnas) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Columna Izquierda: Detalles y Agenda (70%) */}
                    <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca del evento</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                El Summit anual de DevOps reúne a más de 5,000 profesionales de la tecnología de toda Latinoamérica. Durante este evento exploraremos las últimas tendencias en orquestación de contenedores, arquitecturas serverless y, por supuesto, la evolución de los microservicios.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Nuestros ponentes incluyen ingenieros de empresas Top Tier que compartirán sus casos de éxito y fracaso reales trabajando en producción.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Agenda Principal</h2>

                            {/* Lista de Agenda Simulada */}
                            <div className="space-y-6">

                                {/* Item 1 */}
                                <div className="flex gap-4 border-b border-gray-100 pb-6">
                                    <div className="w-24 flex-shrink-0 text-sm font-bold text-indigo-600 pt-1">
                                        09:00 AM
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Keynote: El estado de los Microservicios</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-2">Ing. Sarah Johnson (Tech Lead)</p>
                                        <p className="text-gray-600 text-sm">Una visión global de cómo las grandes empresas están estructurando sus equipos y código este 2026.</p>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="flex gap-4">
                                    <div className="w-24 flex-shrink-0 text-sm font-bold text-indigo-600 pt-1">
                                        11:30 AM
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Workshop: Migrando de Monolito a React+Vue</h3>
                                        <p className="text-sm text-gray-500 mt-1 mb-2">Andrés Niño (Frontend Architect)</p>
                                        <p className="text-gray-600 text-sm">Taller práctico sobre cómo usar Webpack Module Federation para unir aplicaciones en distintos frameworks.</p>
                                    </div>
                                </div>

                            </div>
                        </section>

                    </div>

                    {/* Columna Derecha: Tarjeta Flotante de Compra (30%) */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Inscripción General</h3>
                            <p className="text-gray-500 text-sm mb-6">Acceso a los 3 días del evento presencial.</p>

                            <div className="text-4xl font-extrabold text-gray-900 mb-6">
                                $150 <span className="text-lg text-gray-500 font-normal">USD</span>
                            </div>

                            <ul className="space-y-3 mb-8 text-sm text-gray-600">
                                <li className="flex items-center">✓ Acceso a todas las charlas</li>
                                <li className="flex items-center">✓ Almuerzo y Coffee Breaks</li>
                                <li className="flex items-center">✓ Certificado de asistencia digital</li>
                                <li className="flex items-center">✓ Fiesta de Networking</li>
                            </ul>

                            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-md cursor-pointer">
                                Comprar Entrada
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Ventas seguras procesadas a través de Stripe.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default LandingConferencia;