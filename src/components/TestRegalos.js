import React, { useEffect, useState } from "react";

function TestRegalos() {
  const [regalos, setRegalos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/regalos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error HTTP: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setRegalos(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!regalos.length) {
    return <p>No hay regalos para mostrar.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Regalos</h1>
      <ul>
        {regalos.map((regalo) => (
          <li key={regalo.id}>
            <strong>{regalo.nombre}</strong> - ${regalo.precio}
            <br />
            {regalo.descripcion}
            <br />
            {regalo.imagenUrl && (
              <img
                src={regalo.imagenUrl}
                alt={regalo.nombre}
                style={{ width: "150px", height: "auto", marginTop: "5px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestRegalos;