import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://tienda-online-boda-eli-y-seba.onrender.com";

export default function FormularioCompra({ regalo, onCancelar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [tipo, setTipo] = useState("success");
  const [loading, setLoading] = useState(false);
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  if (!regalo) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email) {
      setMensaje("Por favor completa tu nombre y correo.");
      setTipo("danger");
      return;
    }

    setLoading(true);
    setMensaje(null);

    try {
      const payload = {
        nombreInvitado: nombre,
        emailInvitado: email,
        regaloId: regalo.id,
        montoPagado: regalo.precio,
      };

      const res = await axios.post(`${API_URL}/api/compras`, payload);
      console.log("Respuesta del backend:", res.data);

      setTipo("success");
      setMensaje(res.data.mensaje || "Compra registrada con éxito.");
      setCompraConfirmada(true);
    } catch (err) {
      console.error("Error al procesar la compra:", err?.response || err);
      setTipo("danger");
      setMensaje("Ocurrió un error al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button
        type="button"
        onClick={onCancelar}
        style={{
          marginBottom: 16,
          padding: "8px 12px",
          background: "#e5e7eb",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        ← Volver a la lista
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* Info del regalo */}
        <div
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 12,
            padding: 16,
            background: "#fff",
          }}
        >
          {regalo.imagenUrl && (
            <img
              src={`/img/${regalo.imagenUrl}`}
              alt={regalo.nombre}
              style={{
                width: "100%",
                height: 240,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 12,
                background: "#f5f5f5",
              }}
            />
          )}
          <h2 style={{ margin: "0 0 8px" }}>{regalo.nombre}</h2>
          <p style={{ color: "#555", margin: "0 0 8px" }}>{regalo.descripcion}</p>
          <p style={{ margin: "0 0 8px" }}>
            <strong>${regalo.precio?.toLocaleString("es-CL")}</strong>
          </p>
          <p style={{ margin: 0, color: "#666" }}>Stock: {regalo.stock}</p>
        </div>

        {/* Formulario o datos bancarios */}
        {!compraConfirmada ? (
          <form
            onSubmit={handleSubmit}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Tus datos</h3>

            {mensaje && (
              <div
                style={{
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 8,
                  background:
                    tipo === "danger" ? "#fde8e8" : "#ecfdf5",
                  color: tipo === "danger" ? "#991b1b" : "#065f46",
                  border: tipo === "danger" ? "1px solid #fecaca" : "1px solid #a7f3d0",
                }}
              >
                {mensaje}
              </div>
            )}

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 6 }}>Tu nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", marginBottom: 6 }}>Tu correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@email.com"
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid #d1d5db",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 14px",
                backgroundColor: loading ? "#ffba3b" : "#ffba3b",
                color: "#000000",
                fontWeight: 700,
                border: "none",
                borderRadius: 8,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Procesando..." : `Registrar compra`}
            </button>
          </form>
        ) : (
          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              padding: 16,
              background: "#f9fafb",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 12 }}>Datos bancarios para la transferencia</h3>
            <p><strong>Banco:</strong> BancoEstado</p>
            <p><strong>Tipo de cuenta:</strong> Cuenta Vista</p>
            <p><strong>Número de cuenta:</strong> 38470118340</p>
            <p><strong>RUT:</strong> 18778478-6</p>
            <p><strong>Nombre:</strong> SEBASTIAN HUGO ANDRES FARIAS TAPIA</p>
            <p><strong>Email:</strong> seba.prev15@gmail.com </p>
            <p style={{ marginTop: 16, color: "#065f46" }}>
              Por favor, envía el comprobante de transferencia a nuestro correo. ¡Gracias por tu regalo! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}