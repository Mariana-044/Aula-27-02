import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CadastroEvento({ onAdd, onRemoverTodos }) {
  const navigate = useNavigate();
  const location = useLocation();
  const eventoEditado = location.state;

  // States existentes
  const [titulo, setTitulo] = useState(eventoEditado?.titulo || "");
  const [data, setData] = useState(eventoEditado?.data || "");
  const [local, setLocal] = useState(eventoEditado?.local || "");
  const [descricao, setDescricao] = useState(eventoEditado?.descricao || "");
  const [status, setStatus] = useState(eventoEditado?.status || "aberto");

  // Novos states
  const [capacidadeTotal, setCapacidadeTotal] = useState(eventoEditado?.capacidadeTotal || 0);
  const [mapaUrl, setMapaUrl] = useState(eventoEditado?.mapaUrl || "");
  const [fotosTexto, setFotosTexto] = useState(
    eventoEditado?.fotos?.join("\n") || "" // se estiver editando, mostra cada foto em uma linha
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !data || !local) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Passo 2: transformar fotosTexto em lista
    const fotosLista = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter((linha) => linha !== "");

    // Passo 3: vagasRestantes começa igual à capacidadeTotal em novo evento
    const novoEvento = {
      id: eventoEditado?.id || crypto.randomUUID(),
      titulo,
      data,
      local,
      descricao,
      status,
      capacidadeTotal,
      mapaUrl,
      fotos: fotosLista,
      vagasRestantes: eventoEditado
        ? eventoEditado.vagasRestantes // mantém valor atual se estiver editando
        : capacidadeTotal,             // inicia igual à capacidade se for novo
    };

    onAdd(novoEvento);
    navigate("/evento"); // ✅ Checkpoint: cadastra e volta pra /evento
  }

  function handleClear() {
    if (eventoEditado) {
      // Restaurar valores originais se estiver editando
      setTitulo(eventoEditado.titulo);
      setData(eventoEditado.data);
      setLocal(eventoEditado.local);
      setDescricao(eventoEditado.descricao);
      setStatus(eventoEditado.status);
      setCapacidadeTotal(eventoEditado.capacidadeTotal || 0);
      setMapaUrl(eventoEditado.mapaUrl || "");
      setFotosTexto(eventoEditado.fotos?.join("\n") || "");
    } else {
      // Limpar se for novo cadastro
      setTitulo("");
      setData("");
      setLocal("");
      setDescricao("");
      setStatus("aberto");
      setCapacidadeTotal(0);
      setMapaUrl("");
      setFotosTexto("");
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

        {/* Novos campos */}
        <label>
          Capacidade Total
          <input
            type="number"
            value={capacidadeTotal}
            onChange={(e) => setCapacidadeTotal(Number(e.target.value))}
          />
        </label>

        <label>
          URL do Mapa
          <input
            type="text"
            value={mapaUrl}
            onChange={(e) => setMapaUrl(e.target.value)}
          />
        </label>

        <label>
          Fotos (uma URL por linha)
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
          />
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
