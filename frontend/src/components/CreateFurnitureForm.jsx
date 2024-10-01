import React, { useState, useEffect } from "react";
import UploadForm from "./UploadForm";
import axios from "axios";

const CreateFurnitureForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        images: [], // Solo URLs de las imágenes
        model_3d: [],
    });

    const [updatedImages, setUpdatedImages] = useState([]);

    useEffect(() => {
        // No actualizamos el estado de formData aquí, lo haremos en handleSubmit
    }, [updatedImages]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (urls) => {
        setUpdatedImages(prevImages => {
            const newImages = urls.map(({ url, name }) => ({ image_url: url, name }));
            const existingImageUrls = new Set(prevImages.map(img => img.image_url));
            return [
                ...prevImages,
                ...newImages
            ].filter((img, index, self) =>
                index === self.findIndex((t) => t.image_url === img.image_url)
            );
        });
    };

    const handleRemoveImage = (imageName) => {
        setUpdatedImages(prevImages =>
            prevImages.filter(img => img.name !== imageName)
        );
    };

    const handleModelUpload = (urls) => {
        setFormData(prevData => ({
            ...prevData,
            model_3d: urls,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (updatedImages.length === 0) {
            alert("Por favor, sube al menos una imagen.");
            return;
        }

        const formDataToSend = {
            ...formData,
            images: updatedImages.map(img => img.image_url) // Solo URLs
        };

        const token = localStorage.getItem("access_token");
        try {
            const response = await axios.post(
                "https://muebles2024drfreactbackend-production.up.railway.app/api/furniture/",
                formDataToSend,
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
                <UploadForm onUploadSuccess={handleImageUpload} onRemoveImage={handleRemoveImage} multiple={true} type="image" />
            </div>
            <div>
                <label>Subir modelo 3D</label>
                <UploadForm onUploadSuccess={handleModelUpload} type="3D model" />
            </div>
            <button type="submit">Crear Mueble</button>
        </form>
    );
};

export default CreateFurnitureForm;
