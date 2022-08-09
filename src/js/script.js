import data from "./database.js";

let carrinho = []

function cardProduto(data){
    const vitrine = document.querySelector('.vitrine')
    
    vitrine.innerHTML = ""
    
    data.forEach( produto => {
        
        const li = document.createElement('li')
        li.classList.add('card__produto')
        
        const figure = document.createElement('figure')
        figure.classList.add('figure')
        
        const img = document.createElement('img')
        img.classList.add('imagem__card')
        img.src = produto.img
        img.alt = produto.nameItem
        
        const divDescricao = document.createElement('div')
        divDescricao.classList.add('card__descricao__produto')
        
        const sessao = document.createElement('p')
        sessao.classList.add('sessao__produto')
        sessao.innerText = produto.tag[0]
        
        const nome = document.createElement('h2')
        nome.classList.add('nome__produto')
        nome.innerText = produto.nameItem
        
        const info = document.createElement('p')
        info.classList.add('info__produto')
        info.innerText = produto.description
        
        const preco = document.createElement('p')
        preco.classList.add('preco__produto')
        preco.innerText = `R$ ${produto.value},00`   
        
        const botaoAdicionar = document.createElement('button')
        botaoAdicionar.classList.add('botao__adicionar__carrinho')
        botaoAdicionar.innerText = produto.addCart
        botaoAdicionar.id = produto.id
        
        // botaoAdicionar.addEventListener('click', () => adicionarCarrinho(produto))
        
        figure.appendChild(img)
        divDescricao.append(sessao, nome, info, preco, botaoAdicionar)
        li.append(figure, divDescricao)
        vitrine.appendChild(li)
        
        return vitrine  
    })
}
cardProduto(data)


document.querySelector('.todos').addEventListener('click', () => cardProduto(data))

document.querySelector('.acessorios').addEventListener('click', filtrarAcessorios)
function filtrarAcessorios(){
    const acessorio = data.filter( produto => produto.tag[0] === "Acessórios")
    cardProduto(acessorio)
}

document.querySelector('.calcado').addEventListener('click', filtrarCalcado )
function filtrarCalcado(){
    const calcado = data.filter( produto => produto.tag[0] === "Calçado")
    cardProduto(calcado)
}

document.querySelector('.camisetas').addEventListener('click', filtrarCamisetas)
function filtrarCamisetas(){
    const camisetas = data.filter( produto => produto.tag[0] === "Camisetas")
    cardProduto(camisetas)
}


function cardCarrinho(data){

    const produtosCarrinho = document.querySelector('.produtos__carrinho')
    
    produtosCarrinho.innerHTML = ''
    
    data.forEach( produto => { 
        const li = document.createElement('li')
        li.classList.add('container__produto__carrinho')
        li.id = produto.id
    
        const figure = document.createElement('figure')
        const img = document.createElement('img')
        img.classList.add('imagem__carrinho')
        img.src = produto.img
        img.alt = produto.nameItem
    
        const div = document.createElement('div')
        div.classList.add('descricao__produto__carrinho')
    
         const titulo = document.createElement('h2')
        titulo.classList.add('titulo__produto')
        titulo.innerText = produto.nameItem
    
        const preco = document.createElement('p')
        preco.classList.add('preco__carrinho')
        preco.innerText = `R$ ${produto.value},00`
    
        const botaoRemover = document.createElement('button')
        botaoRemover.classList.add('botao__remover')
        botaoRemover.innerText = 'Remover produto'
    
        // botaoRemover.addEventListener('click', () => removerCarrinho(produto))
    
        figure.appendChild(img)
    
        div.append(titulo, preco, botaoRemover)
    
        li.append(figure, div)
    
        produtosCarrinho.append(li)
        
    })
}


document.querySelector('.vitrine').addEventListener('click', adicionarCarrinho)
function adicionarCarrinho(clique){
    const alvo = clique.target  
    if(alvo.tagName === "BUTTON"){
        const encontrado = data.find( elemento => elemento.id == alvo.id)
        carrinho.push(encontrado)
        cardCarrinho(carrinho)
        qtdadeCarrinho()
        valorTotalCarrinho()
    }
}


document.querySelector('.produtos__carrinho').addEventListener('click', removerCarrinho)
function removerCarrinho(clique){
    const alvo = clique.target
    if(alvo.tagName == "BUTTON"){
        const idLi = alvo.closest('li').id
        const encontrado = carrinho.find( elemento => elemento.id == idLi)
        const index = carrinho.indexOf(encontrado)
        carrinho.splice(index, 1)
        cardCarrinho(carrinho)
        qtdadeCarrinho()
        valorTotalCarrinho()
    }
}


// ADICIONAR E REMOVER PRODUTOS CARRINHO POR ARRAY E COM ADEVENT LISTENER
// function adicionarCarrinho(produto){
//     carrinho.push(produto)
//     dadosCarriho(carrinho)
// }

// function removerCarrinho(produto){
//     const index = carrinho.indexOf(produto)
//     carrinho = carrinho.filter( (elemento, i) => index != i )
//     dadosCarriho(carrinho)
// }

// FAZER CONDICIONAR PARA APARECER CARRINHO VAZIO QDO ARRAY ESTIVER VAZIO
// FAZER CSS PARA CARRINHO DE COMPRAS ACOMPANHAR BARRA DE ROLAGEM (APRENDI NO CURSO PROGRAMADOR BR)
// FAZER CSS SE NAO TIVER NENHUM PRODUTO FILTADO NOS BOTOES SUPERIORES, APARECER NA PÁGINA (NÃO HÁ PRDUTOS DESTA CATEGORIA)
// ARRUMAR BARRA DO HEADER
// ARRUMAR DENTRO DE card__descricao__produto
// ARRUMAR IMAGENS DENTRO DO CARRINHO DE COMPRAS (centralizar)
// ARRUMAR ARQUIVO CSS - ORGANIZAR



function qtdadeCarrinho(){
    const qtdade = document.querySelector('.quantidade')
    qtdade.innerText = carrinho.length
}

function valorTotalCarrinho(){
    const valorTotal = document.querySelector('.total')
    const total = carrinho.reduce( (acumulador, valorTotal) => {
        return acumulador + valorTotal.value
    },0)
    valorTotal.innerText = `R$ ${total},00`
}

