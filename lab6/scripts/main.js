// declaração de variáveis
const form = document.querySelector('form');
const nodeInputNumero = document.querySelector('input[type="number"]');
const nodeInputSubmit = document.querySelector('input[type="submit"]');
const nodeUlColecao = document.querySelector('#colecao ul');
const nodeSpanTotal = document.querySelector('#colecao span');
const nodeUlRepetidos = document.querySelector('#repetidos ul');
const nodeSpanRepetidos = document.querySelector('#repetidos span');

const colecao = JSON.parse(localStorage.getItem('colecao')) || [];
const repetidos = JSON.parse(localStorage.getItem('repetidos')) || [];
let totalRepetidos = repetidos.length;

// B. event handlers
function guardarCarta(){
    const numero = Number(nodeInputNumero.value);

    if (colecao.includes(numero)) {
        repetidos.push(numero);
        repetidos.sort((a, b) => a - b);
        totalRepetidos++;
        renderizaRepetidos();
    } else {
        colecao.push(numero);
        colecao.sort((a, b) => a - b);
        atualizaLista(colecao, nodeUlColecao);
        nodeSpanTotal.textContent = colecao.length;
    }
    guardaDados();
}

function guardaDados(){
    localStorage.setItem('colecao', JSON.stringify(colecao));
    localStorage.setItem('repetidos', JSON.stringify(repetidos));
}

function atualizaLista(lista, nodeUl){
    nodeUl.replaceChildren();
    lista.forEach((element, indice) => {
        const item  = document.createElement('li');
        if (lista === repetidos) {
            item.innerHTML = `${element} <button data-indice="${indice}">Eliminar</button>`;
        } else {
            item.textContent = element;
        }
        nodeUl.append(item);
    });
}

function renderizaRepetidos(){
    atualizaLista(repetidos, nodeUlRepetidos);
    nodeSpanRepetidos.textContent = totalRepetidos;
    associaBotoesEliminar();
}

// C. event listeners
form.onsubmit = (event) => {
    event.preventDefault();
    guardarCarta();
    form.reset();
}

function associaBotoesEliminar(){
    const botoes = nodeUlRepetidos.querySelectorAll('button');
    botoes.forEach(botao => {
        botao.onclick = () => {
            repetidos.splice(Number(botao.dataset.indice), 1);
            totalRepetidos--;
            guardaDados();
            renderizaRepetidos();
        };
    });
}

// D. renderização inicial (dados guardados no localStorage)
atualizaLista(colecao, nodeUlColecao);
nodeSpanTotal.textContent = colecao.length;
renderizaRepetidos();
