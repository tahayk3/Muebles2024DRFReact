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
      const response = await axios.post("https://muebles2024drfreactbackend-production.up.railway.app/api/token/", {
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
            src="./logo512.png"
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
