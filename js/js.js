function start() {

    // hide(): ocultado a div que chama inicio
    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    // Principais variáveis do jogo
    var podeAtirar = true;
    var jogo = {};
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }

    jogo.pressionou = [];

    // Verifica se o usuário pressionou alguma tecla
    $(document).keydown(function(e) {
        jogo.pressionou[e.which] = true;
        console.log('ibag keydown')
    });

    $(document).keyup(function(e) {
        jogo.pressionou[e.which] = false;
        console.log('ibag keyup')
    });

    // Game loop
    // setInterval(): estou chamando o loop a cada 30 segundos
    jogo.timer = setInterval(loop, 30);

    function loop() {
        movefundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
    }

    // Função que movimenta o fundo do jogo
    function movefundo() {

        // parseint(): converte uma string em um número inteiro
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda-1);
    }

    function moveJogador() {
        if(jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo-10);

            if(topo <= 0) {
                $("#jogador").css("top", topo+10);
            }
        }

        if(jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo+10);

            if(topo >= 434) {
                $("#jogador").css("top", topo-10)
            }
        } 

        if(jogo.pressionou[TECLA.D]) {
            // chamar a função Disparo
            disparo();
        }
    }

    // move to enemy1
    function moveInimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX-velocidade);
        $("#inimigo1").css("top", posicaoY);

        if(posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
    }

    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX-3);

        if(posicaoX <= 0) {
            $("#inimigo2").css("left", 775);
        }
    }

    // move friends
    function moveAmigo() {
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX+1);

        if(posicaoX > 906) {
            $("#amigo").css("left", 0);
        }
    }

    function disparo() {
        if(podeAtirar === true) {
            podeAtirar = false;

            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo+37;
            $("#fundoGame").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30)
        }

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if(posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        }
    }

    // colisão entre objetos
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));

        console.log(colisao1)
    }
} // Fim da função