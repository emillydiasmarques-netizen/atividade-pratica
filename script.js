-

let tamanhoTexto = 100;

const botaoAumentar = document.getElementById("aumentarTexto");
const botaoDiminuir = document.getElementById("diminuirTexto");

botaoAumentar.addEventListener("click", function() {

    if (tamanhoTexto < 150) {
        tamanhoTexto += 10;
        document.body.style.fontSize = tamanhoTexto + "%";
    }

});


botaoDiminuir.addEventListener("click", function() {

    if (tamanhoTexto > 80) {
        tamanhoTexto -= 10;
        document.body.style.fontSize = tamanhoTexto + "%";
    }

});




const botaoContraste = document.getElementById("altoContraste");

botaoContraste.addEventListener("click", function() {

    document.body.classList.toggle("alto-contraste");

});




const botaoLer = document.getElementById("lerTexto");

botaoLer.addEventListener("click", function() {

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        botaoLer.textContent = "🔊 Ler página";
        return;
    }

    const texto = document.body.innerText;

    const leitura = new SpeechSynthesisUtterance(texto);

    leitura.lang = "pt-BR";
    leitura.rate = 0.9;

    leitura.onend = function() {
        botaoLer.textContent = "🔊 Ler página";
    };

    speechSynthesis.speak(leitura);

    botaoLer.textContent = "⏹️ Parar leitura";

});




const formulario = document.getElementById("formLembrete");
const campoLembrete = document.getElementById("lembrete");
const listaLembretes = document.getElementById("listaLembretes");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const texto = campoLembrete.value.trim();

    if (texto === "") {
        alert("Por favor, digite um lembrete.");
        return;
    }

    const novoLembrete = document.createElement("li");

    novoLembrete.innerHTML = `
        <span>📌 ${texto}</span>
        <button class="removerLembrete">❌ Remover</button>
    `;

    listaLembretes.appendChild(novoLembrete);

    campoLembrete.value = "";

    const botaoRemover =
        novoLembrete.querySelector(".removerLembrete");

    botaoRemover.addEventListener("click", function() {
        novoLembrete.remove();
    });

});



const perguntas = [

    {
        pergunta: "Qual destes alimentos é uma fruta?",
        alternativas: [
            "🍎 Maçã",
            "🥕 Cenoura",
            "🥦 Brócolis",
            "🥔 Batata"
        ],
        resposta: 0
    },

    {
        pergunta: "Quantos dias existem em uma semana?",
        alternativas: [
            "5 dias",
            "6 dias",
            "7 dias",
            "8 dias"
        ],
        resposta: 2
    },

    {
        pergunta: "Qual é o planeta em que vivemos?",
        alternativas: [
            "Marte",
            "Terra",
            "Júpiter",
            "Saturno"
        ],
        resposta: 1
    },

    {
        pergunta: "Qual destes animais é conhecido por miar?",
        alternativas: [
            "🐶 Cachorro",
            "🐴 Cavalo",
            "🐱 Gato",
            "🐮 Vaca"
        ],
        resposta: 2
    },

    {
        pergunta: "Quanto é 10 + 5?",
        alternativas: [
            "12",
            "15",
            "20",
            "25"
        ],
        resposta: 1
    }

];




let perguntaAtual = 0;
let pontuacao = 0;




const botaoIniciar = document.getElementById("iniciarQuiz");

const areaQuiz = document.getElementById("quiz");

const perguntaElemento = document.getElementById("pergunta");

const numeroPergunta =
    document.getElementById("numeroPergunta");

const alternativasElemento =
    document.getElementById("alternativas");

const resultadoResposta =
    document.getElementById("resultadoResposta");

const botaoProxima =
    document.getElementById("proximaPergunta");

const resultadoFinal =
    document.getElementById("resultadoFinal");

const pontuacaoFinal =
    document.getElementById("pontuacaoFinal");

const botaoNovamente =
    document.getElementById("jogarNovamente");




botaoIniciar.addEventListener("click", function() {

    perguntaAtual = 0;
    pontuacao = 0;

    areaQuiz.style.display = "block";

    resultadoFinal.style.display = "none";

    botaoIniciar.style.display = "none";

    mostrarPergunta();

});




function mostrarPergunta() {

    const pergunta = perguntas[perguntaAtual];

    numeroPergunta.textContent =
        "Pergunta " + (perguntaAtual + 1) +
        " de " + perguntas.length;

    perguntaElemento.textContent =
        pergunta.pergunta;

    alternativasElemento.innerHTML = "";

    resultadoResposta.textContent = "";

    botaoProxima.style.display = "none";


    
    pergunta.alternativas.forEach(function(alternativa, indice) {

        const botao = document.createElement("button");

        botao.textContent = alternativa;

        botao.classList.add("alternativa");

        botao.addEventListener("click", function() {

            verificarResposta(indice);

        });

        alternativasElemento.appendChild(botao);

    });

}




function verificarResposta(indiceEscolhido) {

    const pergunta = perguntas[perguntaAtual];

    const botoes =
        alternativasElemento.querySelectorAll("button");




    botoes.forEach(function(botao) {
        botao.disabled = true;
    });


    if (indiceEscolhido === pergunta.resposta) {

        pontuacao++;

        resultadoResposta.textContent =
            "✅ Muito bem! Você acertou!";

        resultadoResposta.style.color = "green";

    } else {

        resultadoResposta.textContent =
            "❌ Ops! Essa não é a resposta correta.";

        resultadoResposta.style.color = "red";

    }


    

    botaoProxima.style.display = "inline-block";

}




botaoProxima.addEventListener("click", function() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

});




function mostrarResultado() {

    areaQuiz.style.display = "none";

    resultadoFinal.style.display = "block";

    pontuacaoFinal.textContent =
        "Você acertou " +
        pontuacao +
        " de " +
        perguntas.length +
        " perguntas!";

}




botaoNovamente.addEventListener("click", function() {

    perguntaAtual = 0;

    pontuacao = 0;

    resultadoFinal.style.display = "none";

    areaQuiz.style.display = "block";

    mostrarPergunta();

});
