document.getElementById('rollButton').addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1; // Gera número aleatório de 1 a 20
    const resultMessage = document.getElementById('resultMessage');
    const passo2 = document.getElementById('passo-2');
    const passo3 = document.getElementById('passo-3');
    const passo1 = document.getElementById('passo-1');

    // Verifica se o jogador ganhou ou perdeu
    if (randomNumber <= 10) {
        resultMessage.textContent = `Você rolou ${randomNumber}. Você deu azar.`;
        passo1.classList.remove('ativo'); // Remove a classe 'ativo' do passo 1
        passo2.classList.add('ativo'); // Adiciona a classe 'ativo' ao passo 2
    } else {
        resultMessage.textContent = `Você rolou ${randomNumber}. Você deu sorte.`;
        passo1.classList.remove('ativo'); // Remove a classe 'ativo' do passo 1
        passo3.classList.add('ativo'); // Adiciona a classe 'ativo' ao passo 3
    }
});


const avanca = document.querySelectorAll('.btn-proximo');

avanca.forEach(button => {
    button.addEventListener('click', function(){
        const atual = document.querySelector('.ativo');
        const proximoPasso = 'passo-' + this.getAttribute('data-proximo');

        atual.classList.remove('ativo');
        document.getElementById(proximoPasso).classList.add('ativo');
    })
})
