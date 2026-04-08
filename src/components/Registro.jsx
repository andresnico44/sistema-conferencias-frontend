import React from 'react';
import { Link } from 'react-router-dom';

const Registro = () => {
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

                    <form className="space-y-4">
                        {/* Fila de Nombres y Apellidos */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Andrés"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Niño"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Fila de Correo y Teléfono */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    placeholder="tu@correo.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input
                                    type="tel"
                                    placeholder="+57 300 000 0000"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                            <input
                                type="password"
                                placeholder="Mínimo 8 caracteres"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        {/* Tipo de Usuario */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cuenta</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-500"
                            >
                                <option>Asistente</option>
                                <option>Ponente / Speaker</option>
                                <option>Organizador</option>
                            </select>
                        </div>

                        {/* Checkbox de Términos */}
                        <div className="flex items-center mt-2">
                            <input type="checkbox" className="h-4 w-4 text-indigo-600" />
                            <label className="ml-2 block text-sm text-gray-600">
                                Acepto los <a href="#" className="text-indigo-600 hover:underline">Términos y Condiciones</a>
                            </label>
                        </div>

                        {/* Botón */}
                        <button
                            type="button"
                            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm mt-4 cursor-pointer"
                        >
                            Registrarse ahora
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