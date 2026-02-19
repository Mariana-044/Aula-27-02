import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardEvento({ evento }) {
  const navigate = useNavigate();

  if (!evento) return null;

  return (
    <div className="card">
      <h3>{evento.titulo}</h3>
      <span className={`badge ${evento.status === "aberto" ? "green" : "red"}`}>
        {evento.status === "aberto" ? "Aberto" : "Lotado"}
      </span>
      <button onClick={() => navigate("/cadastrar", { state: evento })}>
        Editar
      </button>
    </div>
  );
}
