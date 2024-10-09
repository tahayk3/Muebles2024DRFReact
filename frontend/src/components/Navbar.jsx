import React from "react";
import './Navbar.css';

const Navbar = () =>{
    return(
        <div className="navbar">
            <img src="/logo.png" alt="" />
            <a href="/">Inicio</a>
            <a className="login-navbar" href="/login">Iniciar sesión</a>
        </div>
    );
};

export default Navbar;