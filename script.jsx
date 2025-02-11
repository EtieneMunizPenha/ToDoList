const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [novaTarefa, setNovaTarefa] = React.useState("");
  const [filtro, setFiltro] = React.useState("todas");
  const [tarefaEditando, setTarefaEditando] = React.useState("");
  const [textoEditado, setTextoEditado] = React.useState("");

  //incluir tarefas ao clicar no btão
  const incluirTarefa = () => {
    if (novaTarefa.trim()) {
      const novaTarefaObj = {
        id: Date.now(), //retorna o número de milissegundos - ID único.
        texto: novaTarefa,
        completo: false,
      };
      setTarefas([...tarefas, novaTarefaObj]);
      setNovaTarefa(""); // limpa o campo de entrada
    }
  };

  //Incluir tarefa ao pressionar a tecla "enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      incluirTarefa();
    }
  };

  // Função para altenar tarefa conluida e não concluida
  const tarefaCompleta = (id) => {
    setTarefas((tarefas) =>
      //tarefas representa um array, mas dentro do .map(), cada tarefa representa um objeto individual.
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completo: !tarefa.completo } : tarefa
      )
    );
  };

  //Exluir tarefa
  const excluirTarefa = (id) => {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id)); // Filtra todas as tarefas, removendo a que tem o id passado
  };

  //Filtrar tarefas
  const filtrarTarefa = tarefas.filter((tarefa) => {
    if (filtro === "concluídas") return tarefa.completo;
    if (filtro === "pendentes") return !tarefa.completo;
    return true; //filtra todas as tarefas
  });

  //Editar tarefa
  const iniciarEdicao = (tarefa) => {
    setTarefaEditando(tarefa.id);
    setTextoEditado(tarefa.texto);
  };

  const editarTarefa = (id) => {
    if (!textoEditado.trim()) return; // Evita salvar texto vazio
    setTarefas((tarefas) =>
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, texto: textoEditado } : tarefa
      )
    );
    setTarefaEditando(""); // Remove o modo de edição
  };

  return (
    <div className="container">
      <h1 className="title-page">Lista de tarefas</h1>
      <div className="wrapper">
        <input
          className="input"
          type="text"
          value={novaTarefa} // <-- Garante que o input é controlado pelo estado - input = string vazia qdo "Incluir é clicado"
          onChange={(e) => setNovaTarefa(e.target.value)}
          onKeyDown={handleKeyPress}
        ></input>
        <div className="button-add">
          <button className="add-task" onClick={incluirTarefa}>
            Incluir
          </button>
        </div>
        <div className="filter-box">
          <h4 className="filter-title">Filtre suas tarefas!</h4>
          <div className="buttons-filter">
            <button
              className="button-all-tasks"
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>
            <button
              className="button-complete-tasks"
              onClick={() => setFiltro("concluídas")}
            >
              Concluídas
            </button>
            <button
              className="button-Not-complete-tasks"
              onClick={() => setFiltro("pendentes")}
            >
              Pendentes
            </button>
          </div>
        </div>
        <div className="list-box">
          <ol className="list">
            {filtrarTarefa.map((tarefa, index) => (
              <li className="list-item" key={tarefa.id}>
                <span id="task-number">{index + 1}.</span>{" "}
                {/* Número automático via CSS */}
                {/*checked={tarefa.completo} - Pega corretamente o valor booleano*
                onChange={tarefaCompleta(tarefa.id) - ERRADO: Isso faz a função rodar imediatamente e quebra a UI.
                onChange={() => tarefaCompleta(tarefa.id)} - Isso faz a função rodar apenas quando o checkbox for clicado ealterna o estado ao clicar..*/}
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={tarefa.completo}
                  onChange={() => tarefaCompleta(tarefa.id)}
                ></input>
                {/* Verifica se está editando e caixa dos botões de manipulção*/}
                {tarefaEditando === tarefa.id ? (
                  <input
                    className="text-added"
                    type="text"
                    value={textoEditado}
                    onChange={(e) => setTextoEditado(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && editarTarefa(tarefa.id)
                    }
                  />
                ) : (
                  <span
                    className={`task-text ${tarefa.completo ? "completa" : ""}`} // Condicionando a classe
                  >
                    {tarefa.texto}
                  </span>
                )}
                <div className="action-buttons">
                  {tarefaEditando === tarefa.id ? (
                    <button
                      className="save"
                      onClick={() => {
                        if (tarefa.id) editarTarefa(tarefa.id);
                      }}
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      className="edit"
                      onClick={() => iniciarEdicao(tarefa)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="remove-task"
                    onClick={() => excluirTarefa(tarefa.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );

  {
    /*Campo de entrada para o usuário digitar uma nova tarefa.
      Botão para adicionar a tarefa à lista.
      Lista de tarefas exibindo as tarefas adicionadas.
      Marcação de tarefa concluída (com checkbox ou botão).
      Remover tarefa (botão de excluir).
      Filtrar tarefas (todas, concluídas, pendentes).*/
  }
};
ReactDOM.render(<App />, document.getElementById("app"));
//preciso continuar pensando no filtro agora
