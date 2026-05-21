document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector("form");
    const tarefaInput = document.querySelector("#tarefa");
    const inicioInput = document.querySelector("#inicio");
    const finalInput = document.querySelector("#final");

    const urlParams = new URLSearchParams(window.location.search);
    const dataSelecionada = urlParams.get('date');

    function adicionarTarefa() {
        const horaInicio = inicioInput.value;
        const horaFinal = finalInput.value;

        if (horaInicio > horaFinal) {
            alert("A hora que você digitou não pode ser usada. Tente novamente!");
            form.reset();
            return;
        }

        const frequenciaSelecionada = document.querySelector('input[name="frequencia"]:checked');
        const prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');

        if (tarefaInput.value.trim() === "" || !frequenciaSelecionada || !prioridadeSelecionada) {
            alert("Não foi digitado nenhum dado para salvar! Tente Novamente!");
            return;
        }

        let tarefa = {
            id: obterID(),
            nome: tarefaInput.value.trim(),
            data: dataSelecionada,
            inicioTarefa: inicioInput.value.trim(),
            finalTarefa: finalInput.value.trim(),
            frequencia: frequenciaSelecionada.value,
            prioridade: prioridadeSelecionada.value,
            concluida: false
        };

        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.push(tarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        form.reset();
        window.location.href = "calendario.html";
    }

    function obterID() {
        /* Indicado utilizar Number.parseint por possuir mais benefícios de código. 
        ECMA Script 2015 introduziu métodos estaticos no construtor Number, tornando-o mais consistente, organizado e alinhado as praticas modernas de engenharia de software. Ao user o Number ao invés de chamadas globais, reduzimos o risco de de conflitos de nomeclatura.        */
        /* A função obterID deveria estar no topo do arquivo, como o javascript lê seu código de cima para baixo, todo o conteúdo do arquivo é carregado(inclusive a chamada), para somente depois chegar a função para cumprir seu propósito. Isso deixa o código mal otimizado e piora sua manutenibilidade. */
        let id = parseInt(localStorage.getItem("id")) || 0;
        id += 1;
        localStorage.setItem("id", id);
        return id;
    }

    document.getElementById('botao-adicionar').addEventListener('click', adicionarTarefa);
});
