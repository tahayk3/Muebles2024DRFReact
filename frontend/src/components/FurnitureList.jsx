import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FurnitureList = () => {
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/furniture/');
        setFurniture(response.data);
      } catch (error) {
        console.error('Error fetching the furniture:', error);
      }
    };

    fetchFurniture();
  }, []);

  return (
    <div>
      {furniture.results && furniture.results.length > 0 ? (
        furniture.results.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Stock: {item.stock}</p>
          </div>
        ))
      ) : (
        <p>No furniture available</p>
      )}
    </div>
  );
};

export default FurnitureList;
