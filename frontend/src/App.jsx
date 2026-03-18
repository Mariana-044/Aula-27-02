import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Evento from "./pages/Evento";
import CadastroEvento from "./pages/CadastroEvento";
import EventoDetalhe from "./pages/EventoDetalhe";

export default function App() {
  // Estado inicial com dois eventos de exemplo
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Reunião do Projeto",
      data: "2026-02-12",
      local: "Sala 2",
      descricao: "Discussão sobre andamento do projeto",
      status: "aberto",
    },
    {
      id: 2,
      titulo: "Review da Sprint",
      data: "2026-02-13",
      local: "Auditório",
      descricao: "Apresentação dos resultados da sprint",
      status: "lotado",
    },
  ]);

  // Adiciona ou atualiza evento
  function adicionarEvento(novo) {
  setEventos((lista) => {
    const jaExiste = lista.some((e) => e.id === novo.id);
    if (jaExiste) {
      return lista.map((e) => (e.id === novo.id ? novo : e));
    }
    return [...lista, novo]; // já vem com ID do CadastroEvento
  });
}

  // Remove evento específico
  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  // Remove todos os eventos
  function removerTodos() {
    setEventos([]);
  }

  return (
    <div className="app">
      <Header />
      <Menu />

      <main className="conteudo-principal">
        <Routes>
          {/* Home mostra total e próximo evento */}
          <Route
            path="/"
            element={<Home total={eventos.length} eventos={eventos} />}
          />

          {/* Lista de eventos */}
          <Route
            path="/evento"
            element={<Evento eventos={eventos} onRemover={removerEvento} />}
          />

          {/* Detalhe de evento */}
          <Route
            path="/evento/:id"
            element={<EventoDetalhe eventos={eventos} />}
          />

          {/* Cadastro/edição de evento */}
          <Route
            path="/cadastrar"
            element={
              <CadastroEvento onAdd={adicionarEvento} onRemoverTodos={removerTodos} />
            }
          />

          {/* Rota fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

