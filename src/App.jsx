import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import Conferencias from './components/Conferencias';
import LandingConferencia from './components/LandingConferencia';

function App() {
    return (
        // BrowserRouter envuelve toda tu aplicación para habilitar la navegación
        <BrowserRouter>
            <Layout>
                {/* Routes define las diferentes páginas de tu app */}
                <Routes>
                    {/* Cuando la ruta es "/", muestra el Home */}
                    <Route path="/" element={<Home />} />

                    {/* Cuando la ruta es "/login", muestra el Login */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/conferencias" element={<Conferencias />} />
                    <Route path="/conferencia/:id" element={<LandingConferencia />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;