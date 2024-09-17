import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const UploadForm = ({ onUploadSuccess, multiple = false }) => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
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

    return (
        <>
            <input type="file" onChange={handleFileChange} multiple={multiple} />
            <button onClick={handleUpload}>Subir</button>
            <div>Subida de imagen en progreso: {progress}%</div>
        </>
    );
};

export default UploadForm;
