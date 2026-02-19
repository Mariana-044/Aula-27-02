import React, { useState, useMemo } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover }) {
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [buscaLocal, setBuscaLocal] = useState("");

  const eventosFiltrados = useMemo(() => {
    return eventos.filter(
      (e) =>
        (e.titulo?.toLowerCase() || "").includes(buscaTitulo.toLowerCase()) &&
        (e.local?.toLowerCase() || "").includes(buscaLocal.toLowerCase())
    );
  }, [eventos, buscaTitulo, buscaLocal]);

  return (
    <section className="stack">
      <h2>Eventos</h2>

      <input
        type="text"
        placeholder="Buscar por título..."
        value={buscaTitulo}
        onChange={(e) => setBuscaTitulo(e.target.value)}
        className="input"
      />

      <input
        type="text"
        placeholder="Buscar por local..."
        value={buscaLocal}
        onChange={(e) => setBuscaLocal(e.target.value)}
        className="input"
      />

      {eventosFiltrados.length === 0 ? (
        <p className="muted">Nenhum evento encontrado.</p>
      ) : (
        <div className="grid">
          {eventosFiltrados.map((e) => (
            <CardEvento key={e.id} evento={e} onRemover={onRemover} />
          ))}
        </div>
      )}
    </section>
  );
}
