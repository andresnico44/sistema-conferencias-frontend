import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            Conf<span className="navbar-logo-muted">Manager</span>
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Inicio
          </Link>
          <Link to="/conferencias" className="navbar-link">
            Conferencias
          </Link>
          <Link to="/crear-conferencia" className="navbar-link-create">
            <span className="navbar-link-create-icon">+</span> Crear Evento
          </Link>
          <div className="navbar-divider" aria-hidden="true" />
          <Link to="/iniciar-sesion" className="navbar-auth">
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="navbar-register">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
