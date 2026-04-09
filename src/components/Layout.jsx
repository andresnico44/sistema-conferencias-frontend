import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/components/layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-root">
            <Navbar />
            <main className="layout-main">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
