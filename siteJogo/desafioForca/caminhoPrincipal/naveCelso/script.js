const plane = document.getElementById('plane');
const gameArea = document.getElementById('gameArea');
let planeX = gameArea.offsetWidth - 10; // Posição inicial do avião (direita)
let bullets = [];

// Array de cenários (imagens de fundo)
const backgrounds = [
    "../../../imgs/brasilia3.png", // Primeiro cenário
    "../../../imgs/BrasiliaSemifinal.png", // Segundo cenário
    "../../../imgs/brasiliaFinal.png", // Terceiro cenário
];
let currentBackground = 0; // Índice do cenário atual
let gameActive = true; // Controle de jogo ativo

// Movendo o avião da direita para a esquerda
function movePlane() {
    if (!gameActive) return; // Se o jogo não estiver ativo, não faz nada

    planeX -= 2; // Velocidade do avião
    if (planeX <= 0) {
        planeX = 0; // Não deixar sair da tela
        changeBackground(); // Mudar fundo quando o avião atingir o lado esquerdo
    }
    plane.style.left = planeX + 'px';

    // Verifica se estamos no terceiro cenário e o avião atingiu a borda esquerda
    if (currentBackground === 2 && planeX <= 0) {
        gameActive = false; // Para o jogo
        alert("Fim do jogo!"); // Exibe mensagem de fim de jogo
    }

    requestAnimationFrame(movePlane);
}

// Mudar a imagem de fundo e reposicionar o avião
function changeBackground() {
    currentBackground++; // Avança para o próximo cenário

    if (currentBackground >= backgrounds.length) {
        currentBackground = 0; // Reinicia se passar do último cenário
    }

    gameArea.style.backgroundImage = `url(${backgrounds[currentBackground]})`; // Altera a imagem de fundo

    // Remover GIFs se não estiver no segundo cenário
    if (currentBackground !== 1) { // Verifica se o cenário não é o segundo
        removeGifs();
    }

    // Reposicionar o avião para a direita
    planeX = gameArea.offsetWidth - 60; // Ajustar para a posição inicial
    plane.style.left = planeX + 'px';

    // Mostrar ou esconder o botão com base no cenário atual
    const actionButton = document.getElementById('actionButton');
    if (currentBackground === 2) {
        actionButton.style.display = 'block'; // Mostrar o botão no terceiro cenário
        actionButton.style.left = (gameArea.offsetWidth / 2 - 50) + 'px'; // Centralizar horizontalmente
        actionButton.style.top = (gameArea.offsetHeight / 2 - 25) + 'px'; // Centralizar verticalmente
    } else {
        actionButton.style.display = 'none'; // Esconder o botão em outros cenários
    }
}

// Criar inimigos e balas
function createBullet() {
    if (!gameActive) return; // Se o jogo não estiver ativo, não cria balas

    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = Math.random() * (gameArea.offsetWidth - 5) + 'px'; // Posição aleatória
    bullet.style.top = '0px';
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}

// Mover balas
function moveBullets() {
    if (!gameActive) return; // Se o jogo não estiver ativo, não move as balas

    bullets.forEach((bullet, index) => {
        let bulletY = parseFloat(bullet.style.top);
        bulletY += 2; // Velocidade das balas
        bullet.style.top = bulletY + 'px';

        // Remover balas que saíram da tela
        if (bulletY > gameArea.offsetHeight) {
            bullet.remove();
            bullets.splice(index, 1);
        }
    });
}

// Parar balas com o mouse
gameArea.addEventListener('mousemove', (event) => {
    bullets.forEach((bullet, index) => {
        const bulletRect = bullet.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Verificar se o mouse está sobre a bala
        if (mouseX >= bulletRect.left && mouseX <= bulletRect.right &&
            mouseY >= bulletRect.top && mouseY <= bulletRect.bottom) {
            bullet.remove(); // Remove a bala se o mouse estiver sobre ela
            bullets.splice(index, 1);
        }
    });
});

// Função para adicionar o GIF
function addGif() {
    const gif = document.createElement('img');
    gif.src = "../../../imgs/explsaogif.gif"; // Substitua pelo caminho correto do GIF
    gif.style.width = '100px'; // Ajuste o tamanho conforme necessário
    gif.style.height = '100px'; // Ajuste o tamanho conforme necessário
    gif.style.position = 'absolute';

    // Definir a posição do GIF para estar alinhado ao avião
    gif.style.left = planeX + 'px'; // Posiciona o GIF na mesma posição horizontal do avião
    gif.style.bottom = (250 - 50) + 'px'; // Coloca o GIF abaixo do avião, ajuste conforme necessário

    // Adicionar o GIF ao container
    document.getElementById('gifsContainer').appendChild(gif);
}

// Função para remover todos os GIFs
function removeGifs() {
    const gifsContainer = document.getElementById('gifsContainer');
    while (gifsContainer.firstChild) {
        gifsContainer.removeChild(gifsContainer.firstChild);
    }
}

// Detectar pressionamento da tecla "ESPAÇO"
document.addEventListener('keydown', (event) => {
    // Verifica se o cenário atual é o segundo
    if (event.code === 'Space' && currentBackground === 1) { // O segundo cenário tem índice 1
        addGif();
    }
});

// Adicionar evento ao botão
document.getElementById('actionButton').addEventListener('click', () => {
    alert("Você pulou do avião");
    // Adicione aqui outras ações que você deseja realizar ao clicar no botão
});

// Iniciar o jogo
function startGame() {
    movePlane();
    setInterval(() => {
        createBullet();
    }, 1000); // Criar balas a cada segundo
    setInterval(moveBullets, 20); // Mover balas a cada 20 ms
}

startGame();