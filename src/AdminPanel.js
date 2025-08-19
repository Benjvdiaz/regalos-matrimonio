// src/AdminPanel.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export default function AdminPanel() {
  const [compras, setCompras] = useState([]);

  // Función para cargar todas las compras
  const fetchCompras = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/compras`, { withCredentials: true });
      const comprasTransformadas = res.data.map((c) => ({
        ...c,
        montoPagado: Number(c.montoPagado),
        fecha: new Date(c.fecha),
      }));
      setCompras(comprasTransformadas);
    } catch (err) {
      console.error("Error al cargar compras:", err);
    }
  };

  useEffect(() => {
    fetchCompras();
  }, []);

  // Confirmar pago
  const confirmarPago = async (id) => {
    try {
      const res = await axios.put(
        `${API_BASE}/api/compras/${id}/confirmar-pago`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert(res.data.mensaje || "Pago confirmado correctamente");
        fetchCompras();
      } else {
        alert("No se pudo confirmar el pago: " + (res.data.mensaje || ""));
      }
    } catch (err) {
      console.error("Error al confirmar pago:", err);
      alert("Error al confirmar pago: " + (err.response?.data?.mensaje || err.message));
    }
  };

  // Eliminar compra
  const eliminarCompra = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta compra?")) return;
    try {
      const res = await axios.delete(`${API_BASE}/api/compras/${id}`, { withCredentials: true });
      if (res.status === 200) {
        alert(res.data.mensaje || "Compra eliminada correctamente");
        fetchCompras();
      } else {
        alert("No se pudo eliminar: " + (res.data.mensaje || ""));
      }
    } catch (err) {
      console.error("Error al eliminar compra:", err);
      alert("Error al eliminar: " + (err.response?.data?.mensaje || err.message));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Panel de Administración</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Invitado</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Email</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Regalo</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Monto</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Fecha</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Estado</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Método</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Referencia</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: 8 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id}>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{compra.id}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{compra.nombreInvitado}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{compra.emailInvitado}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {compra.regalo?.nombre}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {compra.montoPagado.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {compra.fecha.toLocaleString()}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {compra.estadoPago}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {compra.metodoPago || "-"}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>
                {compra.referenciaTransferencia || "-"}
              </td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8, display: "flex", gap: "6px" }}>
                {compra.estadoPago !== "Pagado" && (
                  <button
                    onClick={() => confirmarPago(compra.id)}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#22c55e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Confirmar Pago
                  </button>
                )}
                <button
                  onClick={() => eliminarCompra(compra.id)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}