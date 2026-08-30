// encontrar o botão adicionar tarefa

const adicionarTarefaBt = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function criarElementoTarefa(tarefa) {
    // criando tags
    const li = document.createElement('li');
    const svg = document.createElement('svg');
    const paragrafo = document.createElement('p');
    const botao = document.createElement('button');
    const imagemBotao = document.createElement('img');

    // conteudo e atributos das tags
    li.classList.add('app__section-task-list-item');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;
    botao.classList.add('app_button-edit');
    botao.append(imagemBotao);
    imagemBotao.setAttribute('src', '/imagens/edit.png');

    // adicionando
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

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
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // chave de acesso - variavel 
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

tarefas.forEach((tarefa) => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});