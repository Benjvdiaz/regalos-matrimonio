// Bienvenida.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bienvenida.css";

export default function Bienvenida() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleContinuar = () => {
    setFadeOut(true);
    setTimeout(() => navigate("/regalos"), 600); // espera que termine la animación
  };

  return (
    <div className={`bienvenida-container ${fadeOut ? "fade-out" : "fade-in"}`}>
      <img
        src="/img/bienvenida.jpg"
        alt="Bienvenida"
        className="bienvenida-imagen"
      />
      <button className="bienvenida-boton" onClick={handleContinuar}>
        Continuar
      </button>
    </div>
  );
}