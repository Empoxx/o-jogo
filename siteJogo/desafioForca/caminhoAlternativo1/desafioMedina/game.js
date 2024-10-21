const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('scoreText');
const redirectButton = document.getElementById('redirectButton');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isGameOver = false;
let score = 0;
let waveSpeed = 2;
let gravity = 0.6;
let surfboardY = canvas.height / 2;
let surfboardX = 100;
let surfboardSpeed = 0;
let waveAmplitude = 50;
let waveFrequency = 0.02;
let toleranceTime = 1000; // 1 segundo de tolerância
let outOfWaveTimer = 0; // Contador para o tempo fora da onda

// Cria uma onda sinusoidal
function drawWaves() {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);

  for (let i = 0; i < canvas.width; i++) {
    const waveY = Math.sin(i * waveFrequency + Date.now() * 0.005) * waveAmplitude + canvas.height / 2;
    ctx.lineTo(i, waveY);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.closePath();
  ctx.fillStyle = '#1E90FF';
  ctx.fill();
}

// Desenha o surfista
function drawSurfer() {
  const surfboardWidth = 80;
  const surfboardHeight = 20;

  // Simula gravidade e movimento da prancha
  surfboardSpeed += gravity;
  surfboardY += surfboardSpeed;

  // Limitar o surfista para não sair da tela (parte inferior)
  if (surfboardY + surfboardHeight > canvas.height) {
    surfboardY = canvas.height - surfboardHeight;
    surfboardSpeed = 0;
  }

  // Verifica se o surfista caiu da onda (está fora da área da onda)
  const waveY = Math.sin(surfboardX * waveFrequency + Date.now() * 0.005) * waveAmplitude + canvas.height / 2;
  
  // Se o surfista está fora da onda
  if (surfboardY > waveY + 50 || surfboardY < waveY - 50) {
    // Inicia ou incrementa o contador de tempo fora da onda
    outOfWaveTimer += 16; // Aproximadamente 16ms por frame (60 FPS)
    if (outOfWaveTimer >= toleranceTime) {
      gameOver();
    }
  } else {
    // Zera o contador se o surfista voltar à onda
    outOfWaveTimer = 0;
  }

  // Desenha a prancha de surf
  ctx.fillStyle = '#FF4500';
  ctx.fillRect(surfboardX, surfboardY, surfboardWidth, surfboardHeight);
}

// Controla o surfista com as setas
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && surfboardY > 0) {
    surfboardSpeed = -10; // Pula sobre a onda
  }
  if (event.key === 'ArrowDown') {
    surfboardSpeed += 5; // Desce mais rápido
  }
});

// Atualiza a pontuação
function updateScore() {
  if (!isGameOver) {
    score++;
    scoreText.textContent = `Score: ${score}`;
  }
}

// Finaliza o jogo
function gameOver() {
  isGameOver = true;

  // Mostrar o botão de redirecionamento com base na pontuação
  if (score >= 500) {
    redirectButton.href = "posDesafio/ganhouDoMedina.html"; // Direciona para um site se pontuação >= 1000
  } else {
    redirectButton.href = "posDesafio/perdeuProMedina.html"; // Direciona para outro site se pontuação < 2000
  }

  redirectButton.style.display = 'block'; // Exibe o botão
}

// Loop do jogo
function gameLoop() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawWaves();
  drawSurfer();
  updateScore();

  requestAnimationFrame(gameLoop);
}

gameLoop();
