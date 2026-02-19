import React from "react";

export default function Home({ total, eventos }) {
  return (
    <section className="stack">
      <h2>Bem-vindos</h2>
      <p>Hoje vamos montar um mini sistema real usando componentes, rotas e estado.</p>
      
      <div className="box" style={{ marginBottom: "12px" }}>
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>

      <div className="box">
        Próximo evento:{" "}
        <strong>{eventos.length > 0 ? eventos[0].titulo : "Nenhum evento disponível"}</strong>
      </div>
    </section>
  );
}
