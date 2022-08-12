import produtosTenis from "./database2.js"

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
                
        figure.appendChild(img)
        divDescricao.append(sessao, nome, info, preco, botaoAdicionar)
        li.append(figure, divDescricao)
        vitrine.appendChild(li)
        
        return vitrine  
    })
}
cardProduto(produtosTenis)

document.querySelector('.todos').addEventListener('click', () => cardProduto(produtosTenis))

document.querySelector('.acessorios').addEventListener('click', filtrarAcessorios)
function filtrarAcessorios(){
    const acessorio = produtosTenis.filter( produto => produto.tag[0] === "Acessórios")
    cardProduto(acessorio)
}

document.querySelector('.calcado').addEventListener('click', filtrarRaquetes )
function filtrarRaquetes(){
    const raquetes = produtosTenis.filter( produto => produto.tag[0] === "Raquetes")
    cardProduto(raquetes)
}

document.querySelector('.camisetas').addEventListener('click', filtrarBolsas)
function filtrarBolsas(){
    const bolsas = produtosTenis.filter( produto => produto.tag[0] === "Bolsas")
    cardProduto(bolsas)
}


function cardCarrinho(produtosTenis){

    const produtosCarrinho = document.querySelector('.produtos__carrinho')
    produtosCarrinho.innerHTML = ''
    
    if(produtosTenis.length <= 0 ){
        document.querySelector('.container__rodape').style.display = "none" 

        const containerMensagem = document.createElement('div')
        containerMensagem.classList.add('mensagem__vazio')

        const carrinhoVazio = document.createElement('h2')
        carrinhoVazio.classList.add('carrinho__vazio')
        carrinhoVazio.innerText = "Carrinho vazio"

        const adicioneItens = document.createElement('p')
        adicioneItens.classList.add('adicione__itens')
        adicioneItens.innerText = 'Adicione itens'

        containerMensagem.append(carrinhoVazio, adicioneItens)
        produtosCarrinho.appendChild(containerMensagem)

    } else {
        document.querySelector('.container__rodape').style.display = "flex"
        produtosTenis.forEach( produto => { 
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

            figure.appendChild(img)
            div.append(titulo, preco, botaoRemover)
            li.append(figure, div)
        
            produtosCarrinho.append(li)
            
        })
    }}

document.querySelector('.vitrine').addEventListener('click', adicionarCarrinho)
function adicionarCarrinho(clique){
    const alvo = clique.target  
    if(alvo.tagName === "BUTTON"){
        const encontrado = produtosTenis.find( elemento => elemento.id == alvo.id)
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


const botao = document.querySelector('.botao__pesquisar')

botao.addEventListener('click', () => pesquisarProduto)
function pesquisarProduto(){
    botao.preventDefault()

    console.log('pesquisei')
}





// FAZER LOGICA PARA PESQUISA DE PRODUTOS
// ARRUMAR ARQUIVO CSS - ORGANIZAR
// FEZER EFEITO HOVER NA CAIXA DE PRODUTOS - TALVEZ
// MELHORAR CODIGO DE PESQUISAR PRODUTOS
// REESTUDAR REMOVER PRODUTOS DO CARRINHO (VER SE ESTA FUNCIONANDO CERTINHO)
// REESTUDAR PESQUISAR PRODUTOS