import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CadastroEvento({ onAdd, onRemoverTodos }) {
  const navigate = useNavigate();
  const location = useLocation();
  const eventoEditado = location.state;

  const [titulo, setTitulo] = useState(eventoEditado?.titulo || "");
  const [data, setData] = useState(eventoEditado?.data || "");
  const [local, setLocal] = useState(eventoEditado?.local || "");
  const [descricao, setDescricao] = useState(eventoEditado?.descricao || "");
  const [status, setStatus] = useState(eventoEditado?.status || "aberto");

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !data || !local) {
      alert("Preencha todos os campos.");
      return;
    }

    onAdd({
      id: eventoEditado?.id || crypto.randomUUID(),
      titulo,
      data,
      local,
      descricao,
      status,
    });

    navigate("/evento");
  }

  function handleClear() {
    if (eventoEditado) {
      // Restaurar valores originais se estiver editando
      setTitulo(eventoEditado.titulo);
      setData(eventoEditado.data);
      setLocal(eventoEditado.local);
      setDescricao(eventoEditado.descricao);
      setStatus(eventoEditado.status);
    } else {
      // Limpar se for novo cadastro
      setTitulo("");
      setData("");
      setLocal("");
      setDescricao("");
      setStatus("aberto");
    }
  }

  return (
    <section className="stack">
      <h2>{eventoEditado ? "Editar Evento" : "Cadastrar Evento"}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </label>

        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        <label>
          Local
          <input value={local} onChange={(e) => setLocal(e.target.value)} />
        </label>

        <label>
          Descrição
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="aberto">Aberto</option>
            <option value="lotado">Lotado</option>
          </select>
        </label>

        <div className="buttons">
          <button className="btn" type="submit">
            {eventoEditado ? "Salvar" : "Criar"}
          </button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
          <button className="btn danger" type="button" onClick={handleClear}>
            {eventoEditado ? "Restaurar valores" : "Limpar formulário"}
          </button>
          {onRemoverTodos && (
            <button className="btn danger" type="button" onClick={onRemoverTodos}>
              Remover todos
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
