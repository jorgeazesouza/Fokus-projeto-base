// encontrar o botão adicionar tarefa
const adicionarTarefaBt = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const tarefas = []; // lista de tarefas

adicionarTarefaBt.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden'); // alternar visibilidade
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault(); // previne o envio do submit

    // criando uma tarefa a cada submit
    const tarefa = {
        descricao: textarea.value
    };
    tarefas.push(tarefa); // armazenando tarefa na lista
    //            chave de acesso   variavel armazenada
    localStorage.setItem('tarefas', tarefas);
});