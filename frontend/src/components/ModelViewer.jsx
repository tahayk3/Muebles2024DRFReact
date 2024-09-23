import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ColorPicker from "./ColorPicker";

const Model = ({ url, color }) => {
  const { scene } = useGLTF(url);
  const { camera } = useThree();
  const modelRef = useRef();
  const originalTextures = useRef({});

  // Rota el modelo
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003; // Rotar alrededor del eje Y
    }
  });

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
        // Almacenar la textura original si aún no se ha hecho
        if (!originalTextures.current[child.uuid]) {
          originalTextures.current[child.uuid] = child.material.map;
        }

        // Si el color es blanco, eliminar la textura
        if (color === '#FFFFFF' || color === '#878787') {
          child.material.map = null; // Elimina la textura
        } else {
          // Restaurar la textura original
          child.material.map = originalTextures.current[child.uuid];
        }

        // Establecer el color del material
        child.material.color.set(color);
        // Asegurarse de que el material se actualice
        child.material.needsUpdate = true;
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
    <div
      style={{
        display: "flex",
        height: "100vh",
        borderRadius: "15px",
        background: "#fff",
        backgroundColor: "rgba(0,0,0, 0.1)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
      }}
    >
      <Canvas
        style={{
          width: "95%",
          height: "100%",
        }}
      >
        <ambientLight intensity={3} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <CameraSetup />
        <OrbitControls enableZoom={false} /> {/* Desactivar el zoom */}
        <Model url={modelUrl} color={color} />
      </Canvas>
      <div
        style={{
          width: "5%",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ColorPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
};

export default ModelViewer;
