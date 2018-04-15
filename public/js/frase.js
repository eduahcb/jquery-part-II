$('#btn-frase').click(fraseAleatoria);

function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2000);
        })
        .always(function(){
            $("#spinner").toggle();
        });
}

function trocaFraseAleatoria(data) {
    let frase = $('.frase');
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    console.log(data);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}