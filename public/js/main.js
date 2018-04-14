$(function(){
    atualizaTamanhoFrase();
    iniciaContadores();
    iniciaCronometro();
    iniciaVerifica();

    $(".botao-remover").on("click", removeLinha)
});

let tempoInicial = $("#tempo").text();

function atualizaTamanhoFrase() {
    let palavras = $('.frase');
    let tot_palavras = palavras.text().split(" ").length;
    $('#total-palavras').text(tot_palavras);
}

function iniciaContadores() {
    $('.campo-digitacao').on("input", () => {
        let campo = $('.campo-digitacao').val();
        let campo_sem_espaco = campo.replace(/\s+/g, '');


        let total_caracters = campo_sem_espaco.length;
        $('#contador-caracteres').text(total_caracters);

        let qtde_palavras = $('.campo-digitacao').val().split(/\S+/).length - 1;
        $('#contador-palavras').text(qtde_palavras);
    });
}

function iniciaCronometro() {
    $('#btn-reinicia').attr("disabled", true);
    let tempo = $("#tempo").text();
    $('.campo-digitacao').one("focus", function () {
        let cronometroID = setInterval(() => {
            tempo--;
            $("#tempo").text(tempo);

            if (tempo == 0) {
                $('.campo-digitacao').attr("disabled", true);
                clearInterval(cronometroID);
                $('.campo-digitacao').removeClass("borda-verde");
                $('.campo-digitacao').removeClass("borda-vermelha");
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    $('#btn-reinicia').attr("disabled", false);
    $('.campo-digitacao').toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
    $('.campo-digitacao').attr("disabled", false);
    $('.campo-digitacao').val("");
    $('#contador-palavras').text("0");
    $('#contador-caracteres').text("0");
    $("#tempo").text(tempoInicial);
    iniciaCronometro();
    $('.campo-digitacao').toggleClass("campo-desativado");
}

function iniciaVerifica(){
    let frase = $('.frase').text();
    $('.campo-digitacao').on("input",function(){
        let digitado = $('.campo-digitacao').val();
        let comparavel = frase.substr(0,digitado.length);

        if(digitado == comparavel){
            $('.campo-digitacao').addClass("borda-verde");
            $('.campo-digitacao').removeClass("borda-vermelha");
        }
        else{
            $('.campo-digitacao').addClass("borda-vermelha");
            $('.campo-digitacao').removeClass("borda-verde");
        }
    });
}
$('#btn-reinicia').click(reiniciaJogo);