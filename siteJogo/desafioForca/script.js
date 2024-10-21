const palavras = ['senhorbranco'];
let palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
let letrasCorretas = [];
let erros = 0;

const palavraSecretaContainer = document.getElementById('palavra-secreta');
const letrasContainer = document.getElementById('letras');
const mensagemContainer = document.getElementById('mensagem');
const canvas = document.getElementById('forca');
const context = canvas.getContext('2d');
const continuarBotao = document.getElementById('botaoCont');
const botaoLink = document.getElementById('botaoHTML');

// Exibe os espaços da palavra secreta
function exibirPalavraSecreta() {
    palavraSecretaContainer.innerHTML = '';
    for (let letra of palavraSecreta) {
        if (letrasCorretas.includes(letra)) {
            palavraSecretaContainer.innerHTML += letra + ' ';
        } else {
            palavraSecretaContainer.innerHTML += '_ ';
        }
    }
}

// Verifica se o jogador ganhou
function verificarVitoria() {
    let palavraCompleta = true;
    for (let letra of palavraSecreta) {
        if (!letrasCorretas.includes(letra)) {
            palavraCompleta = false;
            break;
        }
    }

    if (palavraCompleta) {
        mensagemContainer.textContent = 'Você venceu!';
        continuarBotao.style.display = 'inline'; // Mostra o botão ao ganhar
        botaoLink.setAttribute('href', 'caminhoPrincipal/senhorBranco.html');
        bloquearLetras();
    }
}

// Bloqueia as letras após o jogo terminar
function bloquearLetras() {
    const botoes = document.querySelectorAll('#letras button');
    botoes.forEach(botao => botao.disabled = true);
}

// Verifica se o jogador perdeu
function verificarDerrota() {
    if (erros >= 6) {
        mensagemContainer.textContent = `Você perdeu`;
        continuarBotao.style.display = 'inline'; // Mostra o botão ao perder
        botaoLink.setAttribute('href', '../FIM.html');
        bloquearLetras();
    }
}

// Desenha a forca conforme os erros aumentam
function desenharForca(erros) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;

    if (erros > 0) {
        context.beginPath();
        context.moveTo(10, 190);
        context.lineTo(190, 190);
        context.stroke();
    }
    if (erros > 1) {
        context.beginPath();
        context.moveTo(50, 190);
        context.lineTo(50, 10);
        context.lineTo(150, 10);
        context.lineTo(150, 30);
        context.stroke();
    }
    if (erros > 2) {
        context.beginPath();
        context.arc(150, 50, 20, 0, Math.PI * 2);
        context.stroke();
    }
    if (erros > 3) {
        context.beginPath();
        context.moveTo(150, 70);
        context.lineTo(150, 130);
        context.stroke();
    }
    if (erros > 4) {
        context.beginPath();
        context.moveTo(150, 90);
        context.lineTo(120, 110);
        context.stroke();
    }
    if (erros > 5) {
        context.beginPath();
        context.moveTo(150, 90);
        context.lineTo(180, 110);
        context.stroke();
    }
}

// Função que cria os botões de letras
function criarBotoesLetras() {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letrasContainer.innerHTML = '';
    for (let letra of alfabeto) {
        const botao = document.createElement('button');
        botao.textContent = letra;
        botao.onclick = () => jogar(letra);
        letrasContainer.appendChild(botao);
    }
}

// Lógica de verificar se a letra está correta ou errada
function jogar(letra) {
    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        exibirPalavraSecreta();
        verificarVitoria();
    } else {
        erros++;
        desenharForca(erros);
        verificarDerrota();
    }
}

// Inicializa o jogo
function iniciarJogo() {
    criarBotoesLetras();
    exibirPalavraSecreta();
    desenharForca(0);
}

iniciarJogo();
