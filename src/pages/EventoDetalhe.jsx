import React from "react";
import { useParams } from "react-router-dom";

export default function EventoDetalhe({ eventos }) {
  const { id } = useParams();
  const evento = eventos.find(e => String(e.id) === id);

  if (!evento) return <p>Evento não encontrado</p>;

  return (
    <article className="evento-detalhe">
      <h2>{evento.titulo}</h2>
      <p><strong>Data:</strong> {evento.data}</p>
      <p><strong>Local:</strong> {evento.local}</p>
      <p>{evento.descricao}</p>
      <span className={`badge ${evento.status === "aberto" ? "green" : "red"}`}>
        {evento.status === "aberto" ? "Aberto" : "Lotado"}
      </span>
    </article>
  );
}
