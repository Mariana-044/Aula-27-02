import React, { useState } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos = [], onRemover }) {
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [buscaLocal, setBuscaLocal] = useState("");

  const eventosFiltrados = eventos.filter(
    (e) =>
      (e.titulo?.toLowerCase() || "").includes(buscaTitulo.toLowerCase()) &&
      (e.local?.toLowerCase() || "").includes(buscaLocal.toLowerCase())
  );

  return (
    <section className="stack">
      <h2>Eventos</h2>

      <label>
        Buscar por título:
        <input
          type="text"
          placeholder="Digite o título..."
          value={buscaTitulo}
          onChange={(e) => setBuscaTitulo(e.target.value)}
          className="input"
        />
      </label>
    <p></p>
      <label>
        Buscar por local:
        <input
          type="text"
          placeholder="Digite o local..."
          value={buscaLocal}
          onChange={(e) => setBuscaLocal(e.target.value)}
          className="input"
        />
      </label>

      {eventosFiltrados.length === 0 ? (
        <p className="muted">Nenhum evento encontrado.</p>
      ) : (
        <div className="grid">
          {eventosFiltrados.map((e) => (
            <CardEvento
              key={e.id}
              evento={e}
              onRemover={onRemover || (() => {})}
            />
          ))}
        </div>
      )}
    </section>
  );
}
