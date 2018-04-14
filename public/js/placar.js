$("#btn-placar").click(mostraPlacar);

function inserePlacar() {
    let placar = $('.placar');
    let corpoPlacar = placar.find("tbody");
    let usuario = "Eduardo";
    let nPalavras = $('#contador-palavras').text();

    let linha = novaLinha(usuario, nPalavras);

    corpoPlacar.prepend(linha);

    $('.placar').slideDown(500);
    scrollPlacar();
}

function novaLinha(usuario, palavaras) {
    let linha = $("<tr>");
    let colunaUsuario = $("<td>").text(usuario);
    let colunaPalavras = $("<td>").text(palavaras);
    let colunaRemover = $("<td>");

    let link = $("<a>").attr("href", "#").addClass("botao-remover");
    let icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    let linha = $(this).parent().parent();

    linha.fadeOut();
    setTimeout(function () {
        linha.remove();
    });
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
}

function scrollPlacar() {
    let posicaoPlacar = $('.placar').offset().top;
    $("html").animate(
        {
            scrollTop: posicaoPlacar + "px"
        },1000);
}