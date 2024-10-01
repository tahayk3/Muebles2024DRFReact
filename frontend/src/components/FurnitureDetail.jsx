import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModelViewer from "./ModelViewer";
import "./FurnitureDetail.css";
import ColorPicker from "./ColorPicker";
import Carousel from "./Carousel";

import { FaRulerHorizontal } from "react-icons/fa";
import { FaRulerVertical } from "react-icons/fa";
import { FaRuler } from "react-icons/fa6";

function FurnitureDetail() {
  //obtener id por medio de la url
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFurnitureDetail = async () => {
      try {
        const response = await axios.get(
          `https://muebles2024drfreactbackend-production.up.railway.app/api/furniture/${id}/`
        );
        setFurniture(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error al obtener datos de detalle de un mueble");
        setLoading(false);
      }
    };
    fetchFurnitureDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container-loader">
        <div className="loader"></div>
        <h3>cargando...</h3>
      </div>
    );
  }

  if (!furniture) {
    return <p>No se encontrar detalles de este mueble</p>;
  }

  const modelUrlString = furniture.model_3d.model_file_url.replace(/'/g, '"');
  const modelUrl = JSON.parse(modelUrlString);

  return (
    <div className="container-detail">
      <div className="header">
        <h1 class='txtelegantshadow'>{furniture.name}</h1>
      </div>

      <div className="container-information">
        <div className="perspective-text">
          <div className="perspective-line">
            <p></p>
            <p>{furniture.name}</p>
          </div>
          <div className="perspective-line">
            <p>{furniture.name}</p>
            <p>Varidad de colores</p>
          </div>
          <div className="perspective-line">
            <p>Varidad de colores</p>
            <p>Precio: Q {furniture.price}</p>
          </div>
          <div className="perspective-line">
            <p>Precio: Q {furniture.price}</p>
            <p>Stock: {furniture.stock}</p>
          </div>
          <div className="perspective-line">
            <p>Stock: {furniture.stock}</p>
            <p></p>
          </div>
        </div>
        <div className="description">
          <h2 className="title-description">Descripción</h2>
          <p className="description-description">{furniture.description}</p>
          <h2 className="title-description">Medidas</h2>
          <p className="description-body">
            <FaRulerHorizontal /> Ancho: {furniture.width} CM
          </p>
          <p className="description-body">
            <FaRulerVertical /> Altura: {furniture.height} CM
          </p>
          <p className="description-body">
            <FaRuler /> Profundidad: {furniture.depth} CM
          </p>
        </div>
      </div>

      <div className="carousel">
         <Carousel images={furniture.images} /> 
      </div>

      <h1 class='txtelegantshadow'>Modelo 3D</h1>


      <div>
        <ModelViewer modelUrl={modelUrl.url || ""} />
      </div>
    </div>
  );
}

export default FurnitureDetail;
