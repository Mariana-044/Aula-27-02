import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function CadastroEvento({ onAdd, onRemoverTodos }) {
  const navigate = useNavigate();
  const location = useLocation();
  const eventoEditado = location.state || null;

  // States existentes
  const [titulo, setTitulo] = useState(eventoEditado?.titulo || "");
  const [data, setData] = useState(eventoEditado?.data || "");
  const [local, setLocal] = useState(eventoEditado?.local || "");
  const [descricao, setDescricao] = useState(eventoEditado?.descricao || "");
  const [status, setStatus] = useState(eventoEditado?.status || "aberto");

  // Novos states
  const [capacidadeTotal, setCapacidadeTotal] = useState(
    eventoEditado?.capacidadeTotal || 0
  );
  const [mapaUrl, setMapaUrl] = useState(eventoEditado?.mapaUrl || "");
  const [fotosTexto, setFotosTexto] = useState(
    eventoEditado?.fotos?.join("\n") || ""
  );

  // Função de envio do formulário
  function handleSubmit(e) {
    e.preventDefault();

    // Validação mínima
    if (!titulo.trim() || !data.trim() || !local.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (capacidadeTotal <= 0) {
      alert("Informe uma capacidade total válida (maior que 0).");
      return;
    }

    // Transformar fotosTexto em lista (aceita quebra de linha, vírgula ou espaço)
    const fotosLista = fotosTexto
      .split(/[\n, ]+/)
      .map((linha) => linha.trim())
      .filter((linha) => linha !== "");

    // Criar objeto do evento
    const novoEvento = {
      id: eventoEditado?.id || uuidv4(),
      titulo,
      data,
      local,
      descricao,
      status,
      capacidadeTotal: Number(capacidadeTotal),
      mapaUrl,
      fotos: fotosLista,
      vagasRestantes: eventoEditado
        ? eventoEditado.vagasRestantes
        : Number(capacidadeTotal),
    };

    // Adiciona ou atualiza evento
    onAdd(novoEvento);

    // Volta para lista de eventos
    navigate("/evento");
  }

  // Função para limpar ou restaurar valores
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
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>

        <label>
          Data
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>

        <label>
          Local
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
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
            min="1"
            value={capacidadeTotal}
            onChange={(e) => setCapacidadeTotal(Number(e.target.value))}
            required
          />
        </label>

        <label>
          URL do Mapa
          <input
            type="url"
            value={mapaUrl}
            onChange={(e) => setMapaUrl(e.target.value)}
          />
        </label>

        <label>
          Fotos (uma URL por linha, vírgula ou espaço)
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
          />
        </label>

        <div className="buttons">
          <button className="btn" type="submit">
            {eventoEditado ? "Salvar" : "Criar"}
          </button>
          <button
            className="btn ghost"
            type="button"
            onClick={() => navigate("/evento")}
          >
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
