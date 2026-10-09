// Contador

let contador = 0;

function atualizarContador() {
  const elemento = document.querySelector('#contador');
  const mensagem = document.querySelector('#mensagem');

  elemento.textContent = contador;

  if (contador > 0) {
    elemento.style.color = 'green';
    mensagem.textContent = 'O contador está positivo.';
  } else if (contador < 0) {
    elemento.style.color = 'red';
    mensagem.textContent = 'O contador está negativo.';
  } else {
    elemento.style.color = 'inherit';
    mensagem.textContent = 'O contador está a zero.';
  }
}

function incrementar() {
  contador = contador + 1;
  atualizarContador();
}

function decrementar() {
  contador = contador - 1;
  atualizarContador();
}

function reiniciar() {
  contador = 0;
  atualizarContador();
}

// Fotografia

let rotacao = 0;

function destacarFoto() {
  const foto = document.querySelector('#fotografia');
  const legenda = document.querySelector('#legenda');

  foto.style.filter = 'none';
  foto.style.transform = 'scale(1.05) rotate(' + rotacao + 'deg)';
  legenda.textContent = 'Agora faz duplo clique para rodar a fotografia.';
}

function reporFoto() {
  const foto = document.querySelector('#fotografia');
  const legenda = document.querySelector('#legenda');

  foto.style.filter = 'grayscale(100%)';
  foto.style.transform = 'scale(1) rotate(' + rotacao + 'deg)';
  legenda.textContent = 'Passa o rato por cima da fotografia.';
}

function rodarFoto() {
  const foto = document.querySelector('#fotografia');
  const legenda = document.querySelector('#legenda');

  rotacao = rotacao + 180;
  foto.style.transform = 'scale(1.05) rotate(' + rotacao + 'deg)';
  legenda.textContent = 'Fotografia rodada ' + rotacao + ' graus.';
}

// Caixa que muda de cor com a posição do rato

function pintar(evento) {
  const caixa = document.querySelector('#caixa');
  const coordenadas = document.querySelector('#coordenadas');

  const x = evento.offsetX;
  const y = evento.offsetY;

  // o x escolhe a cor (0 a 360) e o y escolhe a luminosidade (30% a 80%)
  const cor = Math.round((x / caixa.clientWidth) * 360);
  const luz = Math.round(30 + (y / caixa.clientHeight) * 50);

  caixa.style.backgroundColor = 'hsl(' + cor + ', 80%, ' + luz + '%)';
  coordenadas.textContent = 'x: ' + x + ', y: ' + y;
}

// Tema claro / escuro

let temaEscuro = false;

function mudarTema() {
  const titulo = document.querySelector('#titulo');

  temaEscuro = !temaEscuro;

  if (temaEscuro) {
    document.body.style.backgroundColor = '#14243b';
    document.body.style.color = 'white';
    titulo.textContent = 'Laboratório de Eventos 🌙';
  } else {
    document.body.style.backgroundColor = '#eef2f6';
    document.body.style.color = 'black';
    titulo.textContent = 'Laboratório de Eventos ☀️';
  }
}
