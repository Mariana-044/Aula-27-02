export default function Home({ total = 0, eventos = [] }) {
  const proximoEvento =
    eventos.length > 0
      ? [...eventos].sort((a, b) => new Date(a.data) - new Date(b.data))[0]
      : null;

  return (
    <section className="stack">
      <h2>Bem-vindos</h2>
      <p>
        Hoje vamos montar um mini sistema real usando componentes, rotas e
        estado.
      </p>

      <div className="box" style={{ marginBottom: "12px" }}>
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>

      <div className="box">
        Próximo evento:{" "}
        <strong>
          {proximoEvento ? proximoEvento.titulo : "Nenhum evento disponível"}
        </strong>
      </div>
    </section>
  );
}
