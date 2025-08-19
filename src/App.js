// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Bienvenida from "./Bienvenida";
import ListaRegalos from "./ListaRegalos";
import FormularioCompra from "./FormularioCompra";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [regaloSeleccionado, setRegaloSeleccionado] = useState(null);

  const handleSeleccionarRegalo = (regalo, navigate) => {
    setRegaloSeleccionado(regalo);
    navigate("/comprar");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route
          path="/regalos"
          element={<ListaRegalos onSeleccionarRegalo={handleSeleccionarRegalo} />}
        />
        <Route
          path="/comprar"
          element={
            regaloSeleccionado ? (
              <FormularioCompra
                regalo={regaloSeleccionado}
                onCancelar={() => setRegaloSeleccionado(null)}
              />
            ) : (
              <Navigate to="/regalos" />
            )
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;