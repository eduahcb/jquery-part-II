$('#btn-frase').click(fraseAleatoria);
$("#btn-frase-id").click(buscaFraseID);
$("#btn-sync").click(sincronizaPlacar);

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

function sincronizaPlacar(){
    let placar = [];

    let linha = $("tbody tr");
    
    linha.each(function(){
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();
        
        let score = {
            usuario: usuario,
            pontos: palavras
        }

        placar.push(score);
    });
    let data = {
        placar: placar
    }
    $.post("http://localhost:3000/placar", data, function(){
        console.log("placar salvo com sucesso");
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){

        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos);
            linha.find(".btn-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}