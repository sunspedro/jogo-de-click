<?php
if (file_exists('global.php')) {
  require_once 'global.php'; 
}
?>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="style/style.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <title>Document</title>
</head>
<body>
  <div id="estiloGeral">
    <div class="card pontos">
      <div class="lista-pontos">
        <h2 class="pontos-title">Pontuação Primária</h2>
        <p id="pontosPrimario" class="valor"></p>
      </div>
      <div class="lista-pontos pontos2">
        <h2 class="pontos-title">Pontuação Secundária </h2>
        <p class="valor" id="pontosSecundario"></p>
      </div>
    </div>
    <div class="card principal">
      <h2>Click game</h2>
      <button class="btn-principal btn-click" id="onClickPrimario">
        <i class="fa-regular fa-hand-pointer fa-2xl" ></i>
      </button>
      <button class="btn-secundario" id="onClickSecundario">
        <i class="fa-regular fa-hand-pointer fa-2xl" ></i>
      </button>
    </div>
    <div class="card lateral">
      <h2>Melhorias</h2>
      <button class="btn" id="habilitaHabilidades"></button>
      <button class="btn" id="melhoraValor"></button>
      <button class="btn" id="melhoraEstilo"></button>
    </div>
  </div>

  <div id="arvoreHabilidades">
    <h2>Arvore de habilidades</h2>
    <div class="listaHabilidades">
      <h3>Habilidades iniciais</h3>
      <div class="listaCategorias">
        <div class="item">
          <p class="title">Clique automatico</p>
          <p id="clickAutomatico"></p>
          <p id="clickAutomaticoNivel"></p>
          <button id="clickAutomaticoBotao">Comprar</button>
        </div>
        <div class="item">
          <p class="title">Clique Critico</p>
          <p id="clickCritico"></p>
          <p id="clickCriticoNivel"></p>
          <button id="clickCriticoBotao">Comprar</button>
        </div>
        <div class="item">
          <p class="title">Clique Multiplo</p>
          <p id="clickMultiplo"></p>
          <p id="clickMultiploNivel"></p>
          <button id="clickMultiploBotao">Comprar</button>
        </div>
      </div>
      <h3>Habilidades secundarias</h3>
      <div class="listaCategorias">
        <div class="item">
          <p class="title">Auto Click Secundário</p>
          <p id="clickAutomaticoSecundario"></p>
          <p id="clickAutomaticoSecundarioNivel"></p>
          <button id="clickAutomaticoSecundarioBotao">Comprar</button>
        </div>
        <div class="item">
          <p class="title">Efeito de click</p>
          <p>Adiciona diversos efeitos de click</p>
          <p id="efeitoClickLabel"></p>
          <button id="efeitoClickBotao"></button>
        </div>
        <div class="item">
          <p class="title">Conquistas</p>
          <p id="conquistas"></p>
          <button id="conquistasBotao">Comprar</button>
        </div>
      </div>

    </div>
  </div>


  <div id="overlay">
    <div id="modalPontosInsuficientes">
      <h2>Pontos insuficientes</h2>
      <button class="btn" id="fechaModalPontos">Fechar</button>
    </div>
  </div>

  <div id="overlay2">
    <div id="modalNovoBotao">
      <h2 class="title">Novo botão</h2>
      <p class="description">Ele serve pra comprar habilidades secundarias, a pontuação nova fica em baixo da pontuação primaria</p>
      <button class="btn" id="fechaModalNovoBotao">Fechar</button>
    </div>
  </div>

  <div id="overlay3">
    <div id="modalEfeitoClick">
      <h2 class="title">Efeitos de click</h2>
      <p class="description">Compre e ative efeitos para seus cliques!</p>
      <div class="efeitos-row">
        <div class="efeitos-item">
          <h3>Efeito de bolinhas</h3>
          <p id="efeitoBolinhasValor"></p>
          <button id="efeitoBolinhasButton"></button>
        </div>
        <div class="efeitos-item">
          <h3>Efeito de bolinhas</h3>
          <p id="efeitoBolinhasValor"></p>
          <button id="efeitoQuadradoButton">Comprar</button>
        </div>
        <div class="efeitos-item">
          <h3>Efeito de bolinhas</h3>
          <p id="efeitoBolinhasValor"></p>
          <button>Comprar</button>
        </div>
      </div>
      <button id="fechaModalEfeitoClick">Fechar</button>
    </div>
  </div>



  <script src="script.js"></script>
</body>
</html>
