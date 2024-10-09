import React from "react";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"; // Outlet es necesario para renderizar las rutas hijas

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Outlet />{" "}{/* Aquí se renderizarán los componentes correspondientes a cada ruta */}
      </div>
    </>
  );
};

export default Layout;
