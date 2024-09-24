import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FurnitureList.css";
import "./paginacion.css";

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
    fetchFurniture("http://192.168.0.9:8000/api/furniture/");
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <marquee  direction="left">
            <h2>Clic en la imagen para más información</h2>
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
                    <h2 className="card-title">{item.name}</h2>
                    <p className="card-body">{item.description}</p>
                  </div>
                  <div className="card-price">Q{item.price}</div>
                </div>
              ))
            ) : (
              <p>No furniture available</p>
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
