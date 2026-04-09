import React from 'react';
import '../styles/components/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-row">
                    <div>
                        <span className="footer-brand">
                            Conf<span className="footer-brand-muted">Manager</span>
                        </span>
                        <p className="footer-tagline">
                            Gestionando el conocimiento del futuro.
                        </p>
                    </div>
                    <div className="footer-copy">
                        &copy; {new Date().getFullYear()} Sistema de Conferencias. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
