import React from 'react';

// Flechas SVG
const UpArrowSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="red" // Cambiado a rojo
    style={{ width: '30px', height: '30px' }} // Ajuste de tamaño
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V6m-7 7l7-7 7 7" />
  </svg>
);

const COLOR_PALETTE = [
  'up', // Flecha hacia arriba
  '#4f3626', // Cafe
  '#f7f7f7', // Blanco
  '#242423', // Negro
  '#fffcf6', // Nogal cenizo
  '#402f24', // Cafe chocolate
  '#878787', // Gris
];

const ColorPicker = ({ color, onChange }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {COLOR_PALETTE.map((colorHex) => (
        <div
          key={colorHex}
          onClick={() => onChange({ hex: colorHex })}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: colorHex === 'up' || colorHex === 'down' ? 'transparent' : colorHex,
            border: colorHex === color ? '2px solid black' : '2px solid transparent',
            margin: '5px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {colorHex === 'up' && <UpArrowSVG/>}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;