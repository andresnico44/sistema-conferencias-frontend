import React from 'react';

const Login = () => {
    return (
        <div className="flex items-center justify-center py-10">
            {/* Contenedor principal de la tarjeta */}
            <div className="flex max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Lado izquierdo - Imagen (Se oculta en celulares, se muestra en pantallas medianas/grandes) */}
                <div className="hidden md:block w-1/2 bg-indigo-700 relative">
                    {/* Imagen de Unsplash sobre conferencias */}
                    <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Conferencia"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
                    />
                    {/* Texto sobre la imagen */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">Gestiona tus eventos</h2>
                        <p className="text-indigo-100 mt-2">
                            La plataforma más completa para organizar y asistir a conferencias de primer nivel.
                        </p>
                    </div>
                </div>

                {/* Lado derecho - Formulario maquetado */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar Sesión</h2>
                        <p className="text-sm text-gray-500">Por favor ingresa tus credenciales para continuar.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Campo Correo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="ejemplo@correo.com"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 cursor-not-allowed"
                                disabled // Deshabilitado porque es solo maquetación
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 cursor-not-allowed"
                                disabled
                            />
                        </div>

                        {/* Botón de Ingreso */}
                        <button
                            type="button"
                            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm mt-2 cursor-pointer"
                        >
                            Ingresar a la plataforma
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        ¿No tienes una cuenta? <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-800">Regístrate aquí</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;