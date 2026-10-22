const loja = document.querySelector('#produtos');
console.log(produtos);

produtos.forEach(element => {
    const sec = document.createElement('section');
    const titulo = document.createElement('h1');
    titulo.textContent = element.title;
    const imagem = document.createElement('img');
    imagem.src = element.image;
    const descricao = document.createElement('p');
    descricao.textContent = element.description;
    const butao = document.createElement('button');
    butao.id = element.id;
    butao.textContent = "+ adicionar ao cesto"
    
    //Adicionar os elementos à secção criada dinamicamente
    sec.append(titulo);
    sec.append(imagem);
    sec.append(descricao);
    sec.append(butao);
    
    //Adicionar a secção à criada no html
    loja.append(sec);
});
