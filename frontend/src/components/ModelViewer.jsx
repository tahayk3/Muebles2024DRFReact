import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ColorPicker from "./ColorPicker";

const Model = ({ url, color }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  const [isModelReady, setIsModelReady] = useState(false);
  const scaleRef = useRef(1); // Almacena la escala en una referencia
  const originalTextures = useRef({});
  const textureLoader = new THREE.TextureLoader();

  // Rota el modelo
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001; // Rotación continua
    }
  });

  // Actualiza el color del modelo
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && isModelReady) {
        // Almacenar la textura original si aún no se ha hecho
        if (!originalTextures.current[child.uuid]) {
          originalTextures.current[child.uuid] = child.material.map;
        }

        // Si el color es blanco, gris o negro
        if (color === '#FFFFFF' || color === '#878787' || color ==='#242423') {
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

  // Detectar cuando el modelo esté completamente cargado
  useEffect(() => {
    if (modelRef.current && !isModelReady) {
      setIsModelReady(true);
    }
  }, [scene, isModelReady]);

  // Calcular la escala y la posición una vez que el modelo esté listo
  useEffect(() => {
    if (isModelReady && modelRef.current) {
      // Reiniciar la transformación
      modelRef.current.position.set(0, 0, 0);
      modelRef.current.scale.set(1, 1, 1); // Reinicia a escala 1 antes de recalcular
  
      const bbox = new THREE.Box3().setFromObject(modelRef.current);
      console.log("Bounding Box:", bbox); // Verifica la caja delimitadora
  
      const size = bbox.getSize(new THREE.Vector3());
      const height = size.y + size.y *0.05 ; // Altura del modelo
      const windowHeight = window.innerHeight;
  
      if (height > 0) {
        const scale = windowHeight / height; // Escalar basado en la altura de la ventana
        scaleRef.current = scale; // Guardar la escala en referencia
  
        const center = bbox.getCenter(new THREE.Vector3());
        console.log("center", center);
        
        // Escalar el modelo
        modelRef.current.scale.set(scale, scale, scale);
  
        // Ajustar la posición Y para centrar el modelo
        const canvasCenterY = height * scale / 2; // Altura del modelo escalado dividido entre 2
        modelRef.current.position.set(-center.x * scale, -canvasCenterY, -center.z * scale); // Centrar el modelo en el canvas
      }
    }
  }, [isModelReady]);
  

  // Aplicar la escala a la referencia
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(
        scaleRef.current,
        scaleRef.current,
        scaleRef.current
      );
    }
  }, [scaleRef.current]);

  return <primitive ref={modelRef} object={scene} />;
};

const ModelViewer = ({ modelUrl }) => {
  const [color, setColor] = useState("#FFFFFF");

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

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
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <OrbitControls enableZoom={false} />
        <Model url={modelUrl} color={color} />
        <CameraSetup />
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

const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(1,10,700); // Ajusta la distancia aquí
    camera.lookAt(0, 0, 0); // Apunta al centro
    camera.updateProjectionMatrix();
  }, [camera]);

  return null; // No renderiza nada
};

export default ModelViewer;
