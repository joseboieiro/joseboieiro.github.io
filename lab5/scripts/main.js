/* As funções abaixo são chamadas pelos atributos de evento do index.html
   (onclick, ondblclick, onmouseover, onmouseout, onmousemove), por isso o
   ESLint não as vê a ser usadas. */
/* eslint-disable no-unused-vars */

// Contador

let contador = 0;

function atualizarContador() {
  const elemento = document.querySelector("#contador");
  const mensagem = document.querySelector("#mensagem");

  elemento.textContent = contador;

  if (contador > 0) {
    elemento.style.color = "green";
    mensagem.textContent = "O contador está positivo.";
  } else if (contador < 0) {
    elemento.style.color = "red";
    mensagem.textContent = "O contador está negativo.";
  } else {
    elemento.style.color = "inherit";
    mensagem.textContent = "O contador está a zero.";
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
  const foto = document.querySelector("#fotografia");
  const legenda = document.querySelector("#legenda");

  foto.style.filter = "none";
  foto.style.transform = "scale(1.05) rotate(" + rotacao + "deg)";
  legenda.textContent = "Agora faz duplo clique para rodar a fotografia.";
}

function reporFoto() {
  const foto = document.querySelector("#fotografia");
  const legenda = document.querySelector("#legenda");

  foto.style.filter = "grayscale(100%)";
  foto.style.transform = "scale(1) rotate(" + rotacao + "deg)";
  legenda.textContent = "Passa o rato por cima da fotografia.";
}

function rodarFoto() {
  const foto = document.querySelector("#fotografia");
  const legenda = document.querySelector("#legenda");

  rotacao = rotacao + 180;
  foto.style.transform = "scale(1.05) rotate(" + rotacao + "deg)";
  legenda.textContent = "Fotografia rodada " + rotacao + " graus.";
}

// Caixa que muda de cor com a posição do rato

function pintar(evento) {
  const caixa = document.querySelector("#caixa");
  const coordenadas = document.querySelector("#coordenadas");

  const x = evento.offsetX;
  const y = evento.offsetY;

  // o x escolhe a cor (0 a 360) e o y escolhe a luminosidade (30% a 80%)
  const cor = Math.round((x / caixa.clientWidth) * 360);
  const luz = Math.round(30 + (y / caixa.clientHeight) * 50);

  caixa.style.backgroundColor = "hsl(" + cor + ", 80%, " + luz + "%)";
  coordenadas.textContent = "x: " + x + ", y: " + y;
}

// Tema claro / escuro

let temaEscuro = false;

function mudarTema() {
  const titulo = document.querySelector("#titulo");

  temaEscuro = !temaEscuro;

  if (temaEscuro) {
    document.body.style.backgroundColor = "#14243b";
    document.body.style.color = "white";
    titulo.textContent = "Laboratório de Eventos 🌙";
  } else {
    document.body.style.backgroundColor = "#eef2f6";
    document.body.style.color = "black";
    titulo.textContent = "Laboratório de Eventos ☀️";
  }
}

// 1. Selecionar os elementos do DOM
const btn = document.getElementById("butao-jogo");
const jogoDiv = document.getElementById("jogo-div");
const pontosEl = document.getElementById("pontos");

// 2. Criar variáveis de estado do jogo
let pontos = 0;
let tempoRestante = 10; // Tempo do jogo em segundos
let jogoAtivo = false;
let temporizador;
let emContagem = false;

// Colocar o botão no centro da área do jogo
function centrarBotao() {
  const x = (jogoDiv.clientWidth - btn.offsetWidth) / 2;
  const y = (jogoDiv.clientHeight - btn.offsetHeight) / 2;

  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

centrarBotao();

// Contagem decrescente 3, 2, 1 antes de o jogo começar
function contagemDecrescente() {
  let segundos = 3;
  emContagem = true;
  btn.textContent = segundos;
  centrarBotao();
  btn.style.alignSelf = "center";
  const intervaloContagem = setInterval(() => {
    segundos--;

    if (segundos > 0) {
      btn.textContent = segundos;
      centrarBotao();
    } else {
      // A contagem chegou ao fim: parar este intervalo e só agora começar o jogo
      clearInterval(intervaloContagem);
      emContagem = false;
      iniciarJogo();
    }
  }, 1000);
}

// 3. Começar (ou recomeçar) o jogo
function iniciarJogo() {
  pontos = 0;
  tempoRestante = 10;
  jogoAtivo = true;
  btn.textContent = "Game On";
  centrarBotao();
  pontosEl.innerText = `Pontos: ${pontos} | Tempo: ${tempoRestante}s`;

  // Temporizador novo em cada jogo (contador decrescente de 1 segundo)
  temporizador = setInterval(() => {
    tempoRestante--;

    if (tempoRestante > 0) {
      pontosEl.innerText = `Pontos: ${pontos} | Tempo: ${tempoRestante}s`;
    } else {
      // Quando o tempo acaba
      clearInterval(temporizador);
      jogoAtivo = false;
      btn.textContent = "Reiniciar";
      pontosEl.innerText = `Fim do Jogo! Pontuação final: ${pontos} pontos.`;
    }
  }, 1000);
}

// 4. Passar o rato por cima do botão: ganha um ponto e o botão foge
btn.addEventListener("mouseover", () => {
  if (!jogoAtivo) return;

  // Incrementar pontos
  pontos++;
  pontosEl.innerText = `Pontos: ${pontos} | Tempo: ${tempoRestante}s`;

  // Calcular posição máxima onde o botão pode ficar sem sair da div
  const maxX = jogoDiv.clientWidth - btn.offsetWidth;
  const maxY = jogoDiv.clientHeight - btn.offsetHeight;

  // Gerar coordenadas aleatórias dentro dos limites
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  // Aplicar as novas posições
  btn.style.left = `${randomX}px`;
  btn.style.top = `${randomY}px`;
});

// 5. Clicar no botão depois do fim: recomeça o jogo
btn.addEventListener("click", () => {
  if (jogoAtivo || emContagem) return;
  contagemDecrescente();
});
