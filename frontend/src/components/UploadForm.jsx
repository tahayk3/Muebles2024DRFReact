import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const UploadForm = ({ onUploadSuccess, multiple = false }) => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    //Estado para las viastas previas
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);

        //Crear URLs para l vista previa
        const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls(previewUrls);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (files.length === 0) return;

        const uploadPromises = files.map((file) => {
            const storeRef = ref(storage, `uploads/${file.name}`);
            const uploadTask = uploadBytesResumable(storeRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.error("Error uploading file:", error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        });

        Promise.all(uploadPromises).then((urls) => {
            if (onUploadSuccess) {
                onUploadSuccess(urls); // Notify parent component
            }
        }).catch((error) => {
            console.error("Error uploading files:", error);
        });
    };

    const handleRemoveImage = (index) =>{
        const updatedFiles = files.filter((_,i)=>i !== index);
        const updatePreviews = previewUrls.filter((_,i)=> i !==index);

        setFiles(updatedFiles);
        setPreviewUrls(updatePreviews);
    };

    return (
        <div>
        <input type="file" onChange={handleFileChange} multiple={multiple} />
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {previewUrls.map((url, index) => (
                <div key={index} style={{ position: "relative" }}>
                    <img
                        src={url}
                        alt={`preview ${index}`}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <button
                        onClick={() => handleRemoveImage(index)}
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            background: "red",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
        <button onClick={handleUpload}>Subir</button>
        <div>Subida de imagen en progreso: {progress}%</div>
    </div>
    );
};

export default UploadForm;
