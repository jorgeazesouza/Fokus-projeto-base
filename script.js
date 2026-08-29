const html = document.querySelector('html'); // contexto html
const [ focoBt, curtoBt, longoBt ] = document.querySelectorAll('.app__card-button'); // botões
const botoes = document.querySelectorAll('.app__card-button'); // todos os botões
const banner = document.querySelector('.app__image'); // banner
const titulo = document.querySelector('.app__title'); // Título
const musicaFocoInput = document.querySelector('#alternar-musica'); // alterar musica
const startPauseBt = document.querySelector('#start-pause'); // botão de iniciar
const iniciarOuPausarBt = document.querySelector('#start-pause span'); // texto do iniciar
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

// Audio
const musica = new Audio('/sons/luna-rise-part-one.mp3'); // musica de fundo
musica.loop = true; // musica loop
musica.volume = 0.5; // volume

const audioPlay = new Audio('/sons/play.wav'); // audio iniciar
const audioPause = new Audio('/sons/pause.mp3'); // audio pausar
const audioEnd = new Audio('/sons/beep.mp3'); // audio fim
const audioIcone = document.querySelector('.app__card-primary-butto-icon')

musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause(); // pausar e começar a musica
});


// Observadores
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500; // 25 min
    alterarContexto('foco');
    focoBt.classList.add('active'); // adicionando classe de foco
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300; // 5 min
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active'); // adicionando classe de foco
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900; // 15 min
    alterarContexto('descanso-longo');
    longoBt.classList.add('active'); // adicionando classe de foco
});

// Refatorando código
function alterarContexto(contexto) {
    mostrarTempo(); // ativa a função q deixa o tempo na tela
    html.setAttribute('data-contexto', `${contexto}`); // alterando contexto
    banner.setAttribute('src', `/imagens/${contexto}.png`); // alterando imagem

    // Removendo a classe de foco
    botoes.forEach(function(contexto) {
        // percorre todos os botes da variavel e remove a classe active, depois adiciona somente no selecionado
        contexto.classList.remove('active');
    });

    // Alterando texto do título
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 
            `Otimize sua produtividade, <br>
            <strong class="app__title-strong" >mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = 
            `Que tal dar uma respirada? <br>
            <strong class="app__title-strong" >Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = 
            `Hora de voltar à superfice. <br>
            <strong class="app__title-strong" >Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

// Timer
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos === 0) {
        zerar(); // zera quando chega no zero
        audioEnd.play();
        return; // interrompe
    }

    tempoDecorridoEmSegundos -= 1; // subtrai o valor
    mostrarTempo(); // mostra tempo
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    // pausa o temporizador
    if (intervaloId) {
        zerar();
        audioPause.play();
        return; // interrompe
    }

    audioPlay.play();
    audioIcone.setAttribute('src', '/imagens/pause.png'); // mudar icone
    intervaloId = setInterval(contagemRegressiva, 1000); // chama função a cada 1 seg
    iniciarOuPausarBt.textContent = 'Pausar'; // alterando texto
}

function zerar() {
    clearInterval(intervaloId); // para o temporizador do setInterval
    audioIcone.setAttribute('src', '/imagens/play_arrow.png'); // mudar icone
    iniciarOuPausarBt.textContent = 'Começar'; // alterando texto
    intervaloId = null; // retorna valor p nulo
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000); // milisegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' }); // mostra min e seg
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();