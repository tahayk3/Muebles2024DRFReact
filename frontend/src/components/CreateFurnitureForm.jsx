import React, { useState } from "react";
import UploadForm from "./UploadForm";
import axios from "axios";

const CreateFurnitureForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        images: [],
        model_3d: [],
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (urls) => {
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...urls], // Acumular nuevas imágenes
        }));
    };

    const handleModelUpload = (urls) => {
        setFormData((prevData) => ({
            ...prevData,
            model_3d: urls, // Ahora model_3d puede manejar múltiples URLs
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar que se hayan subido al menos una imagen
        if (formData.images.length === 0) {
            alert("Por favor, sube al menos una imagen.");
            return;
        }

        const dataToSend = {
            ...formData,
        };

        const token = localStorage.getItem("access_token");
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/furniture/",
                dataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Mueble creado:", response.data);
        } catch (error) {
            console.log("Error al crear el mueble:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Precio</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Subir imágenes</label>
                <UploadForm onUploadSuccess={handleImageUpload} multiple={true} />
            </div>
            <div>
                <label>Subir modelo 3D</label>
                <UploadForm onUploadSuccess={handleModelUpload} />
            </div>
            <button type="submit">Crear Mueble</button>
        </form>
    );
};

export default CreateFurnitureForm;

