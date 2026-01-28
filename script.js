const game = {
  pontosPrimario: 0,
  pontosSecundario: 0,
  valorClick: 1000,
  valorClickSecundario: 1000,
  precoMelhoraValor: 100,
  precoMelhoraEstilo: 200,
  precoHabilidade: 1000,
  classeEstilo: 0,
  estiloMaximo: 3,
  clickAutomaticoValor: 1000,
  clickAutomaticoNivelAtual: 0,
  clickAutomaticoNivelMaximo: 20,
  clickAutomaticoTempo: 10000,
  clickAutomaticoHabilitado: false,
  clickCriticoNivelAtual: 0,
  clickCriticoNivelMaximo: 20,
  clickCriticoValor: 2000,
  clickCriticoChance: 0.02,
  clickMultiploNivelAtual: 0,
  clickMultiploNivelMaximo: 20,
  clickMultiploValor: 4000,
  clickMultiploCont: 100,
}

const ui = {
  pontosPrimario: document.getElementById("pontosPrimario"),
  pontosSecundario: document.getElementById("pontosSecundario"),
  btnClickPrimario: document.getElementById("onClickPrimario"),
  btnClickSecundario: document.getElementById("onClickSecundario"),
  melhoraValor: document.getElementById("melhoraValor"),
  melhoraEstilo: document.getElementById("melhoraEstilo"),
  estiloGeral: document.getElementById("estiloGeral"),
  overlay: document.getElementById("overlay"),
  fechaModalPontos: document.getElementById("fechaModalPontos"),
  overlay2: document.getElementById("overlay2"),
  fechaModalNovoBotao: document.getElementById("fechaModalNovoBotao"),
  botaoHabilidade: document.getElementById("habilitaHabilidades"),
  arvoreHabilidades: document.getElementById("arvoreHabilidades"),
  clickAutomaticoLabel: document.getElementById("clickAutomatico"),
  clickAutomaticoNivel: document.getElementById("clickAutomaticoNivel"),
  clickAutomaticoBotao: document.getElementById("clickAutomaticoBotao"),
  clickCriticoLabel: document.getElementById("clickCritico"),
  clickCriticoNivel: document.getElementById("clickCriticoNivel"),
  clickCriticoBotao: document.getElementById("clickCriticoBotao"),
  clickMultiploLabel: document.getElementById("clickMultiplo"),
  clickMultiploNivel: document.getElementById("clickMultiploNivel"),
  clickMultiploBotao: document.getElementById("clickMultiploBotao"),
}

let intervaloClickPrimario = null
let intervaloClickSecundario = null

function atualizaPontosPrimario() {
  ui.pontosPrimario.textContent = game.pontosPrimario
}
function atualizaPontosSecundario() {
  ui.pontosSecundario.textContent = game.pontosSecundario
}

function abreModalPontos() {
  ui.overlay.style.display = "block"
}

ui.fechaModalPontos.addEventListener("click", () => {
  ui.overlay.style.display = "none"
})

function abreModalNovoBotao() {
  ui.overlay2.style.display = "block"
}
ui.fechaModalNovoBotao.addEventListener("click", () => {
  ui.overlay2.style.display = "none"
})

function podeComprar(preco) {
  if (preco <= game.pontosPrimario) {
    game.pontosPrimario -= preco
    atualizaPontosPrimario()
    return true
  }
  abreModalPontos()
  return false
}

atualizaPontosPrimario()

function atualizaValorPrimario(){
  game.pontosPrimario += game.valorClick
  atualizaPontosPrimario()
}

ui.btnClickPrimario.addEventListener("click", () => {
  if(game.clickMultiploNivelAtual > 0){
    game.clickMultiploCont -= 1

    //terminar o bloco com função pra clique x10

  }
  atualizaValorPrimario()
  clickCriticoSorteador()
})

ui.btnClickSecundario.addEventListener("click", () => {
  game.pontosSecundario += game.valorClickSecundario
  atualizaPontosSecundario()
  clickCriticoSorteador()
})

ui.melhoraValor.textContent = "Melhora valor do click - " + game.precoMelhoraValor

ui.melhoraValor.addEventListener("click", () => {
  if (podeComprar(game.precoMelhoraValor)) {
    game.valorClick += 1
    game.precoMelhoraValor = Math.round(game.precoMelhoraValor * 1.5)
    ui.melhoraValor.textContent = "Melhora valor do click - " + game.precoMelhoraValor
  }
})

ui.melhoraEstilo.textContent = "Melhorar estilo - " + game.precoMelhoraEstilo

function clickMelhoraEstilo() {
  if (podeComprar(game.precoMelhoraEstilo)) {
    game.precoMelhoraEstilo = Math.round(game.precoMelhoraEstilo * 1.5)
    ui.melhoraEstilo.textContent = "Melhorar estilo - " + game.precoMelhoraEstilo

    game.classeEstilo++

    if (game.classeEstilo <= game.estiloMaximo) {
      ui.estiloGeral.classList.add("estilo" + game.classeEstilo)
      ui.overlay.classList.add("estilo" + game.classeEstilo)
    }
    if(game.classeEstilo >= game.estiloMaximo){
      ui.melhoraEstilo.textContent = "Estilo máximo alcançado."
      ui.melhoraEstilo.removeEventListener("click", clickMelhoraEstilo)
      ui.botaoHabilidade.style.display = "block"
    }
  }
}

ui.melhoraEstilo.addEventListener("click", clickMelhoraEstilo)

ui.botaoHabilidade.textContent = "Valor para habilitar arvore de habilidades: " + game.precoHabilidade

function clickHabilidades() {
  if (podeComprar(game.precoHabilidade)) {
    ui.botaoHabilidade.removeEventListener("click", clickHabilidades)
    ui.botaoHabilidade.textContent = "Habilitado"
    ui.arvoreHabilidades.style.display = "flex"
    ui.estiloGeral.classList.add("estilo" + "4")
    abreModalNovoBotao()
    atualizaPontosSecundario()
  }
}

ui.botaoHabilidade.addEventListener("click", clickHabilidades)

function iniciarClickAutomaticoPrimario() {
  if (intervaloClickPrimario) return

  intervaloClickPrimario = setInterval(() => {
    atualizaValorPrimario()
  }, game.clickAutomaticoTempo)
}

function pararClickAutomaticoPrimario() {
  if (!intervaloClickPrimario) return

  clearInterval(intervaloClickPrimario)
  intervaloClickPrimario = null
}

function atualizarVelocidadeClickPrimario() {
  pararClickAutomaticoPrimario()
  iniciarClickAutomaticoPrimario()
}

ui.clickAutomaticoLabel.textContent = "Valor: " + game.clickAutomaticoValor
ui.clickAutomaticoNivel.textContent = "Nivel: " + game.clickAutomaticoNivelAtual
ui.clickAutomaticoBotao.addEventListener("click", clickAutomatico)

function clickAutomatico() {
  if (!podeComprar(game.clickCriticoValor)) return

  game.clickAutomaticoHabilitado = true
  game.clickAutomaticoNivelAtual++
  game.clickAutomaticoValor *= 2
  game.clickAutomaticoTempo = Math.max(100,game.clickAutomaticoTempo - game.clickAutomaticoNivelAtual * 10
  )

  ui.clickAutomaticoLabel.textContent ="Valor: " + game.clickAutomaticoValor
  ui.clickAutomaticoNivel.textContent ="Nivel: " + game.clickAutomaticoNivelAtual

  if (game.clickAutomaticoNivelAtual === 1) {
    iniciarClickAutomaticoPrimario()
  } else {
    atualizarVelocidadeClickPrimario()
  }

  if (game.clickAutomaticoNivelAtual >= game.clickAutomaticoNivelMaximo) {
    ui.clickAutomaticoLabel.textContent = "Nível máximo"
    ui.clickAutomaticoBotao.removeEventListener("click", clickAutomatico)
  }
}

ui.clickCriticoLabel.textContent = "Valor: " + game.clickCriticoValor
ui.clickCriticoNivel.textContent = "Nivel: " + game.clickCriticoNivelAtual
ui.clickCriticoBotao.addEventListener("click", clickCritico)

function clickCritico(){
  if(podeComprar(game.clickCriticoValor)) return

  game.clickCriticoNivelAtual++
  game.clickCriticoValor *= 2
  game.clickCriticoChance *= 1.5

  if(game.clickCriticoNivelAtual >= game.clickCriticoNivelMaximo){
    ui.clickCriticoLabel.textContent = "Nivel máximo"
    ui.clickCriticoNivel.textContent = "Nivel: " + game.clickCriticoNivelAtual
  }
}

function clickCriticoSorteador(){
  if(game.clickCriticoChance > Math.random()){
    console.log("deu certo")
  }
}

ui.clickMultiploLabel.textContent = "Valor: " + game.clickMultiploValor
ui.clickMultiploNivel.textContent = "Nivel: " + game.clickMultiploNivelAtual
ui.clickMultiploBotao.addEventListener("click", clickMultiplo)

function clickMultiplo(){

}