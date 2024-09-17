import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FurnitureList = () => {
  const [furniture, setFurniture] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
    fetchFurniture('http://127.0.0.1:8000/api/furniture/');
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ): (
        <>
          {furniture.length > 0 ? (
            furniture.map((item)=>(
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Stock: {item.stock}</p>
              </div>
            ))
          ):(
            <p>No furniture available</p>
          )}

          {/* Indicador de página actual */}
          <p> {currentPage}</p>

          <div>
            {previousPage &&(
              <button onClick={()=>fetchFurniture(previousPage, -1)}>Anterior</button>
            )}

            {nextPage &&(
              <button onClick={()=>fetchFurniture(nextPage, 1)}>Siguiente</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FurnitureList;
