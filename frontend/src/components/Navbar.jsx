import React, {useState} from "react";
import './Navbar.css';

const Navbar = () =>{
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    }

    return(
        <>
        <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? "✖": "☰"}
        </button>
        <div className={`navbar ${isOpen ? "open" : ""}`}>
            <img src="/logo.png" alt="" />
            <a href="/">Inicio</a>
            <a className="login-navbar" href="/login">Iniciar sesión</a>
        </div>
        </>

    );
};

export default Navbar;