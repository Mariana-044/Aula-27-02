import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroEvento({ onAdd }) {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descrição, setDescricao] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !data || !local) {
      alert("Preencha todos os campos.");
      return;
    }

    onAdd({ titulo, data, local });
    navigate("/evento");
  }

  return (
    <section className="stack">
      <h2>Cadastrar Evento</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Demo do sistema" />
        </label>

        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        <label>
          Local
          <input value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex: Laboratório" />
        </label>

        <div className="row">
          <button className="btn" type="submit">Salvar</button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
        </div>
      </form>

      <p className="muted">
        Macete: input controlado = valor vem do state e muda no onChange.
      </p>
    </section>
  );
}