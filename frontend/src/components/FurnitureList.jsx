import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FurnitureList.css";

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
    fetchFurniture("http://127.0.0.1:8000/api/furniture/");
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="container">
            {furniture.length > 0 ? (
              furniture.map((item) => (
                <div
                  className="card"
                  key={item.id}
                  onClick={() => navigate(`/furniture/${item.id}`)}
                >
                  <div className="text-contect">
                    <h2>{item.name}</h2>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div className="visual">
                    <img src="https://assets-prd.ignimgs.com/2022/07/24/hwbattle5-1658622981861.jpg" />
                  </div>
                </div>
              ))
            ) : (
              <p>No furniture available</p>
            )}
          </div>

          {/* Indicador de página actual */}
          <p> {currentPage}</p>

          <div>
            {previousPage && (
              <button onClick={() => fetchFurniture(previousPage, -1)}>
                Anterior
              </button>
            )}

            {nextPage && (
              <button onClick={() => fetchFurniture(nextPage, 1)}>
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
