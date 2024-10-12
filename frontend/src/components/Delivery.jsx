import React from "react";
import "./Delivery.css";
import CarouselCity from "./CarouselCity";


const Delivery = () => {
  return (
    <div className="container-delivery">
      <div className="text-container">
        <h2>ENVIOS A TODO EL PAIS</h2>
        <CarouselCity/>
      </div>
      <div className="loop-wrapper">
        <div className="sun"></div>
        <div className="mountain"></div>
        <div className="hill"></div>
        <div className="tree"></div>
        <div className="tree"></div>
        <div className="tree"></div>
        <div className="rock"></div>
        <div className="truck"></div>
        <div className="wheels"></div>
      </div>
    </div>
  );
};

export default Delivery;
