import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                Bienvenido a ConfManager
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-10">
                La plataforma líder para descubrir, organizar y asistir a las mejores conferencias del mundo.
            </p>
            <div className="flex space-x-4">

                {/* 2. Cambiamos <button> por <Link> y añadimos to="/conferencias" */}
                <Link
                    to="/conferencias"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Explorar Conferencias
                </Link>

            </div>
        </div>
    );
};

export default Home;