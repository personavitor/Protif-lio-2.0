// Selecionando os elementos relevantes
const botoes = document.querySelectorAll('.botao');
const imagens = document.querySelectorAll('.imagem');

// Iterando sobre cada botão para adicionar um ouvinte de evento de clique
botoes.forEach((botao, index) => {
  botao.addEventListener('click', () => {
    // Removendo a classe 'selecionado' de todos os botões
    botoes.forEach(botao => botao.classList.remove('selecionado'));
    // Adicionando a classe 'selecionado' apenas ao botão clicado
    botao.classList.add('selecionado');

    // Ocultando todas as imagens
    imagens.forEach(imagem => imagem.classList.remove('ativa'));
    // Exibindo apenas a imagem correspondente ao botão clicado
    imagens[index].classList.add('ativa');
  });
});
