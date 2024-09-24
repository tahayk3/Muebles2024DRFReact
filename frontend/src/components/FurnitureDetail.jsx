import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModelViewer from "./ModelViewer";
import "./FurnitureDetail.css";
//import Carousel from "./Carousel";

function FurnitureDetail() {
  //obtener id por medio de la url
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFurnitureDetail = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.9:8000/api/furniture/${id}/`
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
    return <p>Cargando...</p>;
  }

  if (!furniture) {
    return <p>No se encontrar detalles de este mueble</p>;
  }

  const modelUrlString = furniture.model_3d.model_file_url.replace(/'/g, '"');
  const modelUrl = JSON.parse(modelUrlString);
  try {
    const modelUrl = JSON.parse(furniture.model_3d.model_file_url);
    <p>{modelUrl.url}</p>;
  } catch (error) {
    console.error("Error al parsear la URL del modelo 3D:", error);
  }

  return (
    <div className="container-detail">
      <div id="header">
        <h1>{furniture.name}</h1>
      </div>

      <div className="carousel">
        {/* <Carousel images={furniture.images} /> */}
      </div>

      <div className="container-information">
        <div className="perspective-text">
          <div class="perspective-line">
            <p></p>
            <p>{furniture.name}</p>
          </div>
          <div class="perspective-line">
            <p>{furniture.name}</p>
            <p>Varidad de colores</p>
          </div>
          <div class="perspective-line">
            <p>Varidad de colores</p>
            <p>Precio: Q {furniture.price}</p>
          </div>
          <div class="perspective-line">
            <p>Precio: Q {furniture.price}</p>
            <p>Stock: {furniture.stock}</p>
          </div>
          <div class="perspective-line">
            <p>Stock: {furniture.stock}</p>
            <p></p>
          </div>
        </div>
        <div className="description">
          <h2>Descripción</h2>
          <p>{furniture.description}</p>
        </div>
      </div>

      <h2>Modelo 3D personalizable</h2>
      <ModelViewer modelUrl={modelUrl.url || ""} />
    </div>
  );
}

export default FurnitureDetail;
