function exibirTextoNaTela (tag, mensagem) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = mensagem;
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    let mensagemDeEscolha = `Digite um número de 1 á ${NUMERO_LIMITE}`;
    exibirTextoNaTela('p', mensagemDeEscolha);
}

let listaDeNumeroSorteados = [];
const NUMERO_LIMITE = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagem = `Parabéns! Você acertou o número secreto com ${tentativas} ${palavraTentativas}`;

        exibirTextoNaTela('h1', 'Você ganhou!');
        exibirTextoNaTela('p', mensagem);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else if (chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número secreto é menor!');
    }
    else {
        exibirTextoNaTela('p', 'O número secreto é maior!');
    }
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio () {
    let numeroSorteado = parseInt(Math.random() * NUMERO_LIMITE + 1);
    if (listaDeNumeroSorteados.length == NUMERO_LIMITE) listaDeNumeroSorteados = [];
    if (listaDeNumeroSorteados.includes(numeroSorteado)) return gerarNumeroAleatorio();
    else{
        listaDeNumeroSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo () {
    mensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

