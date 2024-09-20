import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ImagesIA from "./ImagesIA";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      alert("Login Successful");
      //reedirecion
      navigate("/createfurnitureform");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-image">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mueblesxela-d948d.appspot.com/o/uploads%2F452200498_1958498787939923_3194501574762496239_n%20(1).jpg?alt=media&token=3bcf094a-b643-4da1-bb7f-fe8c81a39c96"
            alt="Login visual"
          />
        </div>
        <h2>Ingresa con tu cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USUARIO"
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="CONTRASEÑA"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
        <ImagesIA />
    </div>
  );
}

export default Login;
