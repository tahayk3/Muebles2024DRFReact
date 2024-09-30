import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FurnitureList.css";
import "./paginacion.css";
import { GiClick } from "react-icons/gi";
import { HiCursorClick } from "react-icons/hi";
import { FaRulerHorizontal } from "react-icons/fa";
import { FaRulerVertical } from "react-icons/fa";
import { FaRuler } from "react-icons/fa6";

const FurnitureList = () => {
  const [furniture, setFurniture] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchFurniture = async (url, pageChange = 0) => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setFurniture(data.results);
    setNextPage(data.next);
    setPreviousPage(data.previous);
    setLoading(false);

    // Actualiza la página actual
    setCurrentPage(currentPage + pageChange);
  };

  useEffect(() => {
    fetchFurniture("https://muebles2024drfreactbackend.onrender.com/api/furniture/");
  }, []);

  return (
    <div>
      {loading ? (
        <div className="container-loader">
          <div className="loader"></div>
          <h3> cargando...</h3>
        </div>
      ) : (
        <>
          <marquee  direction="left" scrollamount="13">
            <h2><GiClick />              Clic en la imagen para más información              <HiCursorClick /></h2>
          </marquee>

          <div className="container">
            {furniture.length > 0 ? (
              furniture.map((item) => (
                <div
                  className="card"
                  key={item.id}
                  onClick={() => navigate(`/furniture/${item.id}`)}
                >
                  <div className="card-image">
                    <img src={item.images[0].image_url} />
                  </div>
                  <div className="card-text">
                    <p className="card-meal-type">Mueble nuevo y armado</p>
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-body"><FaRulerHorizontal/> Ancho: {item.width} CM</p>
                    <p className="card-body"><FaRulerVertical/> Altura: {item.height} CM</p>
                    <p className="card-body"><FaRuler/> Profundidad: {item.depth} CM</p>
                  </div>
                  <div className="card-price">Q{item.price}</div>
                </div>
              ))
            ) : (
              <p>No se encontraron muebles</p>
            )}
          </div>

          {/* Paginacion */}

          <div className="pagination-container">
            {previousPage && (
              <button
                className="button"
                onClick={() => fetchFurniture(previousPage, -1)}
              >
                Anterior
              </button>
            )}

            {nextPage && (
              <button
                className="button"
                onClick={() => fetchFurniture(nextPage, 1)}
              >
                Siguiente
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FurnitureList;
