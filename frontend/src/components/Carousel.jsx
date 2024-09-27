import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Importa tu archivo CSS personalizado

const ColorCarousel = ({ images }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen ampliada

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }),
    []
  );

  // Función para cerrar la imagen ampliada
  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div aria-label="Color Carousel">
      <Slider {...settings}>
        {images.map((color, index) => (
          <div key={index} style={{ padding: "0px 10px 10px 10px" }}>
            <div
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(color.image_url)} // Maneja el clic para ampliar
              style={{
                height: "auto",
                border: `1px solid white`,
                borderRadius: "5px",
                margin: window.innerWidth < 768 ? "20px" : "100px",
                cursor: "pointer", // Cambia el cursor al pasar sobre la imagen
              }}
              role="listitem"
            >
              <img
                src={color.image_url}
                alt=""
                loading="lazy"
                style={{
                  width: "100%", // O un valor fijo como "300px"
                  height: "auto", // Mantiene la relación de aspecto
                  maxHeight: "500px", // Ajusta la altura máxima según lo necesites
                  minHeight: "500px",
                  borderRadius: "5px", // Si deseas bordes redondeados
                  objectFit: window.innerWidth < 480 ? "cover" : "contain",
                  backgroundColor: "rgba(0,0,0, 0.1)",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
                  backdropFilter: "blur(0px)",
                  WebkitBackdropFilter: "blur(0px)",
                }}
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* Modal para la imagen ampliada */}
      {selectedImage && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer", // Permite cerrar haciendo clic
          }}
        >
          <img
            src={selectedImage}
            alt="Ampliada"
            style={{
              maxWidth: "95%",
              maxHeight: "95%",
              objectFit: "contain",
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.9)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(ColorCarousel);
