const loja = document.querySelector("#produtos");
const cesto = document.querySelector("#cesto");
const tituloCesto = cesto.querySelector("h1");
const preco_lbl = document.querySelector("#preco");
//Filtros
const filtro_cat = document.querySelector("#filtro-categoria");
const filtro_ordem = document.querySelector("#ordenar");
const filtro_nome = document.querySelector("#procurar");
//Check Out
const cupao = document.querySelector("#cupao");
const estudante = document.querySelector("#estudante");
const btnComprar = document.querySelector("#comprar");

let carrinho = [];
if (!localStorage.getItem("carrinho")) {
  localStorage.setItem("carrinho", JSON.stringify([]));
}

//Carregar as categorias
function carregarCategorias() {
  fetch("https://deisishop.pw.deisi.ulusofona.pt/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar categorias");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((categoria) => {
        const cat = document.createElement("option");
        cat.id = categoria.name;
        cat.textContent = categoria.name;
        filtro_cat.append(cat);
      });
    })
    .catch((error) => {
      console.error("Houve um problema com o fetch:", error);
    });
}
carregarCategorias();

filtro_cat.addEventListener("change", carregarProdutos);
filtro_ordem.addEventListener("change", carregarProdutos);
filtro_nome.addEventListener("input", carregarProdutos);

function filtrarProdutos(listaDeProdutos) {
  let temp = listaDeProdutos;

  temp = temp.filter((prod) => {
    return prod.category == filtro_cat.value || filtro_cat.value == "T";
  });

  if (filtro_ordem.value == "crescente") {
    temp.sort((a, b) => a.price - b.price);
  } else if (filtro_ordem.value == "decrescente") {
    temp.sort((a, b) => b.price - a.price);
  }

  if (filtro_nome.value != "") {
    const pesquisa = filtro_nome.value.toLowerCase();
    temp = temp.filter((prod) => prod.title.toLowerCase().includes(pesquisa));
  }

  return temp;
}

function criarElemento(element, tipo, index) {
  const sec = document.createElement("section");

  const titulo = document.createElement("h1");
  titulo.textContent = element.title;

  const imagem = document.createElement("img");
  imagem.src = "https://deisishop.pythonanywhere.com" + element.image;

  const preco_display = document.createElement("p");
  // Nota: os preços da API são strings no JSON, garante que usas parseFloat se necessário
  preco_display.textContent = `Custo total: ${parseFloat(element.price)} €`;

  const descricao = document.createElement("p");
  descricao.textContent = element.description;

  const butao = document.createElement("button");
  butao.id = element.id;

  sec.append(titulo);
  sec.append(imagem);
  sec.append(preco_display);

  if (tipo == 1) {
    sec.append(descricao);

    butao.textContent = "+ adicionar ao cesto";

    butao.addEventListener("click", () => {
      // Garante que se o carrinho não existir no localStorage, inicia como um array vazio []
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.push(element);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      if (typeof loadCarrinho === "function") loadCarrinho();
    });
  } else if (tipo == 2) {
    butao.textContent = "- Remover do Cesto";
    butao.addEventListener("click", () => {
      carrinho.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      loadCarrinho();
    });
  }

  sec.append(butao);

  return sec;
}

function carregarProdutos() {
  const url = "https://deisishop.pw.deisi.ulusofona.pt/products";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados");
      }
      return response.json();
    })
    .then((listaDeProdutos) => {
      // O código de renderização deve ser executado aqui dentro, quando os dados chegam!
      if (listaDeProdutos !== null && Array.isArray(listaDeProdutos)) {
        //Limpar os produtos mas manter o título e os filtros
        loja
          .querySelectorAll(":scope > section:not(#filtros)")
          .forEach((sec) => sec.remove());
        filtrarProdutos(listaDeProdutos).forEach((element) => {
          loja.append(criarElemento(element, 1));
        });
      }
    })
    .catch((error) => {
      console.error("Houve um problema com o fetch:", error);
    });
}

// Não te esqueças de chamar a função para ela ser executada!
carregarProdutos();

function loadCarrinho() {
  //Limpar o cesto mas manter o título
  cesto.replaceChildren(tituloCesto);
  let valor_total = 0;
  //Criar os elemetntos de cada section
  carrinho = JSON.parse(localStorage.getItem("carrinho"));
  carrinho.forEach((element, index) => {
    //Adicionar a secção à criada no html
    valor_total += parseFloat(element.price);
    cesto.append(criarElemento(element, 2, index));
  });

  //Preço do cesto no fundo da secção
  preco_lbl.textContent = `Custo total: ${valor_total.toFixed(2)} €`;
  cesto.append(preco_lbl);
}

//Mostrar o cesto guardado ao abrir a página
loadCarrinho();


btnComprar.addEventListener("click", () => {
  if (carrinho.length == 0) return;

  const data = {
    products: carrinho.map((prod) => prod.id),
    student: estudante.checked,
    coupon: cupao.value,
    name: "Zé",
  };

  fetch("https://deisishop.pw.deisi.ulusofona.pt/buy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) =>
      response.json().then((dados) => {
        if (!response.ok) throw new Error(dados.error || response.status);
        return dados;
      })
    )
    .then((dados) => {
      /*console.log(dados.totalCost);
        console.log(dados.reference);
        console.log(dados.message);
       */
      alert('Valor pago: ' + dados.totalCost + '€\nReferência: ' + dados.reference);
      carrinho = [];
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      loadCarrinho();
    })
    .catch((error) => console.error("Erro na compra:", error.message));
});
