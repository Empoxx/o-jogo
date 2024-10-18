const palavraCorreta = 'metanfetamina'.split('');
let letrasCorretas = [];
let letrasErradas = [];

const letrasContainer = document.getElementById('letras-container');
const targetContainer = document.getElementById('target-container');
const botaoVerificar = document.getElementById('botaoVerificar');
const resultado = document.getElementById('resultado');
const continuarBotao = document.getElementById('botaoCont');

// Gerar letras de arrastar
function gerarLetras() {
    const letrasMisturadas = [...palavraCorreta].sort(() => 0.5 - Math.random());
    letrasMisturadas.forEach(letra => {
        const letraDiv = document.createElement('div');
        letraDiv.classList.add('letra');
        letraDiv.textContent = letra;
        letraDiv.draggable = true;
        letraDiv.addEventListener('dragstart', arrastar);
        letrasContainer.appendChild(letraDiv);
    });
}

// Criar slots de destino para a palavra
function criarSlots() {
    palavraCorreta.forEach(() => {
        const slot = document.createElement('div');
        slot.classList.add('target-slot');
        slot.addEventListener('dragover', permitirSoltar);
        slot.addEventListener('drop', soltar);
        targetContainer.appendChild(slot);
    });
}

function arrastar(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

function permitirSoltar(event) {
    event.preventDefault();
}

function soltar(event) {
    event.preventDefault();
    const letraArrastada = event.dataTransfer.getData('text');
    event.target.textContent = letraArrastada;
}

// Verificar se a palavra está correta
function verificarPalavra() {
    const slots = document.querySelectorAll('.target-slot');
    let acertos = 0;

    slots.forEach((slot, index) => {
        if (slot.textContent === palavraCorreta[index]) {
            slot.classList.add('verde');
            slot.classList.remove('vermelho');
            acertos++;
        } else {
            slot.classList.add('vermelho');
            slot.classList.remove('verde');
        }
    });

    if (acertos > palavraCorreta.length / 2) {
        resultado.textContent = 'Você venceu!';
        continuarBotao.onclick = () => {
            window.location.href = 'PROERD.html';
        };
    } else {
        resultado.textContent = 'Você perdeu!';
        continuarBotao.onclick = () => {
            window.location.href = 'caminhoSkate/skate.html';
        };
    }

    botaoVerificar.disabled = true;
    slots.forEach(slot => slot.removeEventListener('drop', soltar)); // Desativar interação
    continuarBotao.style.display = 'inline'; // Mostrar o botão "Continuar"
}

// Inicializar o jogo
gerarLetras();
criarSlots();

botaoVerificar.addEventListener('click', verificarPalavra);
