import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';
import Conferencias from './components/Conferencias';
import LandingConferencia from './components/LandingConferencia';
import CrearConferencia from './components/CrearConferencia';
import EditarConferencia from './components/EditarConferencia';
import EnviarArticulo from './components/EnviarArticulo';
import DetalleArticulo from './components/DetalleArticulo';

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
                    <Route path="/iniciar-sesion" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/conferencias" element={<Conferencias />} />
                    <Route path="/conferencia/:id" element={<LandingConferencia />} />
                    <Route path="/crear-conferencia" element={<CrearConferencia />} />
                    <Route path="/editar-conferencia/:id" element={<EditarConferencia />} />
                    <Route path="/enviar-articulo/:conferenciaId" element={<EnviarArticulo />} />
                    <Route path="/articulo/:id" element={<DetalleArticulo />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;