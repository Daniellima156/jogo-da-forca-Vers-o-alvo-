var divTracos = document.querySelector(".tracos");
var todosBotoes = document.querySelectorAll(".btn");
var flechaImg = document.querySelector(".flecha")
var iniciar = document.querySelector(".btn-comecar")
var regras = document.querySelector(".regras")
var traco = document.querySelectorAll(".traco")
var dica = document.querySelector(".dica")
var boneco = document.querySelector(".boneco")

var vidas = 5
var marginFlecha = 300
var categoriasPalavras = {
    ANIMAIS: ["CACHORRO", "GATO", "PAPAGAIO", "TIGRE", "ELEFANTE", "LEAO", "ZEBRA", "MACACO", "PANDA", "GIRAFA"],
    PAISES: ["BRASIL", "ESTADOS UNIDOS", "CHINA", "INDIA", "RUSSIA", "JAPAO", "ALEMANHA", "FRANCA", "ITALIA", "CANADA"],
    CORES: ["VERMELHO", "AZUL", "VERDE", "AMARELO", "ROXO", "LARANJA", "BRANCO", "PRETO", "CINZA", "MARROM"],
    FRUTAS: ["MACA", "BANANA", "LARANJA", "UVA", "MORANGO", "ABACAXI", "MELANCIA", "MANGA", "KIWI", "PERA"],
    PROFISSOES: ["MEDICO", "ENGENHEIRO", "PROFESSOR", "ADVOGADO", "POLICIAL", "COZINHEIRO", "JORNALISTA", "PILOTO", "ASTRONAUTA", "ARTISTA"],
    ESPORTES: ["FUTEBOL", "BASQUETE", "TENIS", "NATACAO", "VOLEI", "ATLETISMO", "BOXE", "GINASTICA", "HANDEBOL", "SURF"],
    COMIDAS: ["PIZZA", "HAMBURGUER", "SUSHI", "CHURRASCO", "MACARRAO", "SALADA", "SORVETE", "COXINHA", "TORTA", "FEIJOADA"],
    TRANSPORTES: ["CARRO", "AVIAO", "BICICLETA", "ONIBUS", "TREM", "NAVIO", "METRO", "HELICOPTERO", "CAMINHAO", "BARCO"],
    INSTRUMENTOS: ["VIOLINO", "PIANO", "GUITARRA", "BATERIA", "FLAUTA", "SAXOFONE", "TROMPETE", "VIOLAO", "CAVAQUINHO", "ACORDEAO"],
    FILMES: ["TITANIC", "STAR WARS", "JURASSIC PARK", "HARRY POTTER", "SENHOR DOS ANEIS", "MATRIX", "FROZEN", "O REI LEAO", "INDIANA JONES", "AVATAR"]
};

// Selecionar categoria e palavras
function selecionarPalavraAleatoria(categorias) {
    var categoriasKeys = Object.keys(categorias);
    var categoriaSelecionada = categoriasKeys[Math.floor(Math.random() * categoriasKeys.length)];
    var palavrasCategoria = categorias[categoriaSelecionada];
    var palavraSelecionada = palavrasCategoria[Math.floor(Math.random() * palavrasCategoria.length)];
    return {
        categoria: categoriaSelecionada,
        palavra: palavraSelecionada
    };
}

var palavraAleatoria = selecionarPalavraAleatoria(categoriasPalavras);
console.log("Categoria:", palavraAleatoria.categoria); 
console.log("Palavra:", palavraAleatoria.palavra); 
dica.textContent = palavraAleatoria.categoria
dica.classList.add = ("dica")


//dividi a palavra
function dividirPalavra(palavra) {
    var palavraDividida = palavra.split("");
    return palavraDividida;
}


var palavraDividida = dividirPalavra(palavraAleatoria.palavra);
var palavraDivididaCopia = palavraDividida
console.log(palavraDividida);

// criar os traços
// adicionar classe
// adiciona "filhos"

palavraDividida.forEach(() => {
    var novoTraco = document.createElement("p");
    novoTraco.classList.add("traco");
    novoTraco.textContent = "_";
    divTracos.appendChild(novoTraco);
});


todosBotoes.forEach((botao) => {
    botao.addEventListener('click', function () {
        botao.style.backgroundColor = "green"
        var textoBotao = botao.textContent
        var indice = encontrarIndice(textoBotao, palavraDividida);
        if (indice !== -1) {
            const listaParaRemover = palavraDivididaCopia.slice(0, indice);
            const listaRestante = palavraDivididaCopia.filter((elemento) => !listaParaRemover.includes(elemento));
            console.log(listaRestante);
            indice.forEach((i) => {
                console.log(i)
                var child = document.querySelector(`.traco:nth-child(${i + 1})`)
                child.textContent = palavraDividida[i]
            })
            if (listaRestante.length === 1) {
                situacao = "VOCÊ GANHOU!!"
                reiniciarJogoAposTempo()

            }
        } else {
            vidas--
            marginFlecha = marginFlecha - 100
            botao.style.backgroundColor = "red"
            flechaImg.style.marginRight = marginFlecha + "px"
            console.log(marginFlecha)
            if (vidas === 0) {
                situacao = "VOCÊ PERDEU, TENTE NOVAMENTE!!"
                reiniciarJogoAposTempo()
            }
        }

    })
})

function encontrarIndice(palavra, lista) {
    var indices = [];
    for (var i = 0; i < lista.length; i++) {
        if (lista[i] === palavra) {
            indices.push(i);
        }
    }
    if (indices.length === 0) {
        return -1;
    }
    return indices;
}


iniciar.addEventListener("click", () => {
    regras.style.display = "none"
    boneco.style.display = "flex"
})

function reiniciarJogoAposTempo() {
    setTimeout(() => {
        alert(situacao)
        location.reload();

    }, 1000);
}