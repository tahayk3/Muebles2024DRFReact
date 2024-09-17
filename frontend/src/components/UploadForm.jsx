import React, {useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from '../firebase';


const UploadForm = () =>{
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);
    };

    const handleUpload = () =>{
        if(!file) return;
        const storeRef = ref(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storeRef, file);

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
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setFileUrl(downloadURL);
                console.log("File available at", downloadURL);
              });
            }
          );
    }

    return(
        <>
            <h1>SUBIR IMAGENES</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir</button>
            <div>Subida de imagen en progreso: {progress}</div>
            {fileUrl && <div>File URL: <a href={fileUrl} >{fileUrl}</a></div>}
        </>
    );
}

export default UploadForm;