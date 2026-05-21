document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Form');
    const telefoneInput = document.getElementById('telefone');
    const mostrarSenhasCheckbox = document.getElementById('mostrarSenhas');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    /* Essa função deveria ficar fora do addEventListener, no topo do arquivo. Funções aninhadas causam perca de processamento e memória, especialmente em códigos que são chamados o tempo inteiro. */
    function applyPhoneMask(event) {
        let input = event.target;
        input.value = input.value.replace(/\D/g, '');
        input.value = input.value.replace(/^(\d{2})(\d)/, '($1) $2');
        input.value = input.value.replace(/(\d)(\d{4})$/, '$1-$2');
    }

    function togglePasswordVisibility() {
        const type = mostrarSenhasCheckbox.checked ? 'text' : 'password';
        senhaInput.type = type;
        confirmarSenhaInput.type = type;
    }

    telefoneInput.addEventListener('input', applyPhoneMask);
    mostrarSenhasCheckbox.addEventListener('change', togglePasswordVisibility);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const nascimento = document.getElementById('nascimento').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        const novaPessoa = {
            id: Date.now(),
            username: nome,
            email,
            password: senha,
            telefone: telefone,
            nascimento: nascimento,
            moedas: 0,
            tarefas: {
                concluidas: 0,
                naoConcluidas: 0,
                pendentes: 0
            }
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(novaPessoa);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro concluído com sucesso!');
        /* window é deprecado e voltado somente para browsers. O ideal é utilizar o atributo globalThis por ser a maneira universal de acessar objetos por todo o ambiente javascript. */
        window.location.href = '../login/login.html';
    });
});
