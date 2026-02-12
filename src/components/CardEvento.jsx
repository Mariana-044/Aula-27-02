import React from "react";
import '../styles.css';


function CardEvento({ titulo, descricao, data, local, onParticipar }) {
  return (
    <article className="card-evento">
      <h2>{titulo}</h2>
      <p>{descricao}</p>
      <p>
        <strong>Data:</strong> {data}
      </p>
      <p>
        <strong>Local:</strong> {local}
      </p>
      <button onClick={onParticipar}>Participar</button>
    </article>
  );
}

export default CardEvento;
