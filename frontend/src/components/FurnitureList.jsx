import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FurnitureList.css";
import "./paginacion.css";
import { GiClick } from "react-icons/gi";
import { HiCursorClick } from "react-icons/hi";
import { FaRulerHorizontal, FaRulerVertical, FaRuler } from "react-icons/fa";

const FurnitureList = () => {
  const [furniture, setFurniture] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchFurniture = async (url, pageChange = 0) => {
    setLoading(true);

    // Verificar y reemplazar http con https si es necesario
    const secureUrl = url.startsWith('http://')
      ? url.replace('http://', 'https://')
      : url;

    try {
      const response = await fetch(secureUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFurniture(data.results);
      // Convertir next y previous a https si vienen en http
      setNextPage(data.next ? data.next.replace('http://', 'https://') : null);
      setPreviousPage(data.previous ? data.previous.replace('http://', 'https://') : null);
    } catch (error) {
      console.error('Error fetching furniture:', error);
    } finally {
      setLoading(false);
      setCurrentPage(currentPage + pageChange);
    }
  };

  useEffect(() => {
    fetchFurniture("https://muebles2024drfreactbackend-production.up.railway.app/api/furniture/");
  }, []);

  return (
    <div>
      {loading ? (
        <div className="container-loader">
          <div className="loader"></div>
          <h3>cargando...</h3>
        </div>
      ) : (
        <>
          <marquee direction="left" scrollamount="13">
            <h2>
              <GiClick /> Clic en la imagen para más información <HiCursorClick />
            </h2>
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
                    <img src={item.images[0].image_url} alt={item.name} />
                  </div>
                  <div className="card-text">
                    <p className="card-meal-type">Mueble nuevo y armado</p>
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-body"><FaRulerHorizontal /> Ancho: {item.width} CM</p>
                    <p className="card-body"><FaRulerVertical /> Altura: {item.height} CM</p>
                    <p className="card-body"><FaRuler /> Profundidad: {item.depth} CM</p>
                  </div>
                  <div className="card-price">Q{item.price}</div>
                </div>
              ))
            ) : (
              <p>No se encontraron muebles</p>
            )}
          </div>

          {/* Paginación */}
          <div className="pagination-container">
            {previousPage && (
              <button className="button" onClick={() => fetchFurniture(previousPage, -1)}>
                Anterior
              </button>
            )}

            {nextPage && (
              <button className="button" onClick={() => fetchFurniture(nextPage, 1)}>
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