import React from "react";

import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"; // Outlet es necesario para renderizar las rutas hijas
import Footer from "./Footer";
import Delivery from "./Delivery";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Delivery/>
        <Outlet />{" "}{/* Aquí se renderizarán los componentes correspondientes a cada ruta */}
      </div>

      <Footer/>
    </>
  );
};

export default Layout;
