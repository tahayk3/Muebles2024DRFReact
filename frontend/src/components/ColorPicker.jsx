// ColorPicker.jsx
import React from 'react';

const COLOR_PALETTE = [
  '#3c2708', // Cafe
  '#FFFFFF', // Blanco
  '#242423', // Negro
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
            backgroundColor: colorHex,
            border: colorHex === color ? '2px solid black' : '2px solid transparent',
            margin: '5px',
            cursor: 'pointer'
          }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;