import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ColorPicker from "./ColorPicker";

const Model = ({ url, color }) => {
  const { scene } = useGLTF(url);
  const { camera } = useThree();
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      const bbox = new THREE.Box3().setFromObject(modelRef.current);
      const size = bbox.getSize(new THREE.Vector3());
      const center = bbox.getCenter(new THREE.Vector3());

      // Ajustar la cámara para centrar el modelo
      camera.position.set(center.x, center.y, size.z * 2);
      camera.lookAt(center);
      camera.updateProjectionMatrix();

      // Ajustar la posición del modelo para que esté centrado
      modelRef.current.position.set(-center.x, -center.y, -center.z); // Centrar en los ejes X, Y, Z
    }
  }, [url, camera]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
      }
    });
  }, [color, scene]);

  return <primitive ref={modelRef} object={scene} />;
};

const CameraSetup = () => {
  const { camera } = useThree();
  return null; // La cámara se ajusta en el componente Model
};

const ModelViewer = ({ modelUrl }) => {
  const [color, setColor] = useState("");

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  if (!modelUrl) {
    return <p>No se ha proporcionado un modelo 3D válido.</p>;
  }

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", /* Usar la altura completa de la pantalla */

      boxSizing: "border-box", 
      background: "white", 
  }}>
    <Canvas style={{ 
        width: "95%", /* Deja espacio para el ColorPicker */
        height: "100%", 
        border: "1px solid #ccc" /* Añadir un borde si lo deseas */
    }}> 
      <ambientLight intensity={3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <CameraSetup />
      <OrbitControls enableZoom={false} /> {/* Desactivar el zoom */}
      <Model url={modelUrl} color={color} />
    </Canvas>
    <div style={{ 
        width: "5%", 
        padding: '10px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f0f0f0' /* Fondo para destacar el ColorPicker */
    }}> 
      <ColorPicker color={color} onChange={handleColorChange} />
    </div>
  </div>
  
  );
};

export default ModelViewer;