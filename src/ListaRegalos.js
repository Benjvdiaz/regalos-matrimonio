// ListaRegalos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ListaRegalos.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function ListaRegalos({ onSeleccionarRegalo }) {
  const [regalos, setRegalos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/regalos`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setRegalos(res.data);
        } else {
          setRegalos([]);
          setError("No se encontraron regalos en el servidor.");
        }
      })
      .catch((err) => {
        console.error("Error al cargar regalos:", err);
        setError(
          err.response?.data?.message || "No se pudo conectar con el servidor."
        );
        setRegalos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (regalo) => {
    if (typeof onSeleccionarRegalo === "function") {
      onSeleccionarRegalo(regalo, navigate);
    } else {
      alert("No se ha conectado el manejador de selección...");
    }
  };

  if (loading) return <p className="mensaje-cargando">Cargando regalos...</p>;
  if (error) return <p className="mensaje-error">{error}</p>;
  if (regalos.length === 0) return <p>No hay regalos para mostrar</p>;

  return (
    <div className="lista-container fade-in">
      <div className="top-bar">
        <button onClick={() => navigate("/admin/login")} className="btn-admin">
          Panel de Administración
        </button>
      </div>

      <h2 className="titulo-lista">Lista de Regalos</h2>
      <div className="regalos-grid">
        {regalos.map((regalo) => (
          <div key={regalo.id} className="regalo-card">
            {regalo.imagenUrl && (
              <img
                src={`/img/${regalo.imagenUrl}`}
                alt={regalo.nombre}
                className="regalo-imagen"
                onError={(e) => {
                  e.currentTarget.src = "/img/placeholder.jpg";
                }}
              />
            )}

            <h3>{regalo.nombre}</h3>
            <p className="descripcion">{regalo.descripcion}</p>
            <p className="precio">
              <strong>${regalo.precio?.toLocaleString("es-CL")}</strong>
            </p>
            <p className="stock">Stock: {regalo.stock}</p>

            <button onClick={() => handleSelect(regalo)} className="btn-seleccionar">
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}