const loja = document.querySelector('#produtos');
const cesto = document.querySelector('#cesto');
const tituloCesto = cesto.querySelector('h1');
const preco_lbl = document.querySelector('#preco');
if(!localStorage.getItem('carrinho')){
    localStorage.setItem('carrinho', JSON.stringify([]));
}

produtos.forEach(element => {
    //Criar os elemetntos de cada section
    const sec = document.createElement('section');
    const titulo = document.createElement('h1');
    titulo.textContent = element.title;
    const imagem = document.createElement('img');
    imagem.src = element.image;
    const preco_display = document.createElement('p');
    preco_display.textContent = `Custo total: ${element.price.toFixed(2)} €`;
    const descricao = document.createElement('p');
    descricao.textContent = element.description;
    const butao = document.createElement('button');
    butao.id = element.id;
    butao.textContent = "+ adicionar ao cesto"
    butao.addEventListener('click', () => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho'));
        carrinho.push(element);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        loadCarrinho();
    })

    //Adicionar os elementos à secção criada dinamicamente
    sec.append(titulo);
    sec.append(imagem);
    sec.append(preco_display);
    sec.append(descricao);
    sec.append(butao);

    //Adicionar a secção à criada no html
    loja.append(sec);
});

function loadCarrinho() {
    //Limpar o cesto mas manter o título
    cesto.replaceChildren(tituloCesto);
    let valor_total = 0;
    //Criar os elemetntos de cada section 
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.forEach((element,index) => {
        const sec = document.createElement('section');
        const titulo = document.createElement('h1');
        titulo.textContent = element.title;
        const imagem = document.createElement('img');
        imagem.src = element.image;
        const preco_display = document.createElement('p');
        preco_display.textContent = `Custo total: ${element.price.toFixed(2)} €`;
        const butao = document.createElement('button');
        butao.id = element.id;
        butao.textContent = "- Remover do Cesto"
        butao.addEventListener('click', () => {
            carrinho.splice(index,1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            loadCarrinho();
        })
        valor_total += element.price;
        //Adicionar os elementos à secção criada dinamicamente
        sec.append(titulo);
        sec.append(imagem);
        sec.append(preco_display);
        sec.append(butao);

        //Adicionar a secção à criada no html
        cesto.append(sec);
    });

    //Preço do cesto no fundo da secção
    preco_lbl.textContent = `Custo total: ${valor_total.toFixed(2)} €`;
    cesto.append(preco_lbl);
}

//Mostrar o cesto guardado ao abrir a página
loadCarrinho();
