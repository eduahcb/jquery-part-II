$('#btn-frase').click(fraseAleatoria);
$("#btn-frase-id").click(buscaFraseID);

function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
        .fail(function () {
            $("#erro").toggle();
            setTimeout(function () {
                $("#erro").toggle();
            }, 2000);
        })
        .always(function () {
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

function buscaFraseID() {

    let idFrase = $("#buscaFraseId").val();

    if (idFrase == "") {
    }
    else {
        $("#spinner").toggle();
        data = {
            id: idFrase
        }
        $.get("http://localhost:3000/frases", data, trocaFraseId)
            .fail(function () {
                $("#erro").toggle();
                setTimeout(function () {
                    $("#erro").toggle();
                }, 2000);
            })
            .always(function () {
                $("#spinner").toggle();
            });
    }
}

function trocaFraseId(data) {
    let frase = $('.frase');
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}