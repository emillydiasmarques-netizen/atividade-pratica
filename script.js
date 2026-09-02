

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

    
    const botaoRemover = novoLembrete.querySelector(".removerLembrete");

    botaoRemover.addEventListener("click", function() {
        novoLembrete.remove();
    });

});
