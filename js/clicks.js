import { game, ui } from "./variables.js"
import { podeComprar, atualizaPontosPrimario, atualizaPontosSecundario, atualizaLabels, abreModalNovoBotao } from "./util.js"
let intervaloClickPrimario = null
let intervaloClickSecundario = null
let lastClickType = "primary"
export function initClicks() {
  if (ui.btnClickPrimario) {
    ui.btnClickPrimario.addEventListener("click", () => {
      lastClickType = "primary"
      if (game.clickMultiploNivelAtual > 0) {
        game.clickMultiploCont++
        if (game.clickMultiploCont > game.clickMultiploAtiva) {
          game.clickMultiploCont = 0
          game.pontosPrimario += game.valorClick * 10
          atualizaPontosPrimario()
        } else {
          atualizaValorPrimario()
        }
      } else {
        atualizaValorPrimario()
      }
      clickCriticoSorteador()
    })
  }
  if (ui.btnClickSecundario) {
    ui.btnClickSecundario.addEventListener("click", () => {
      lastClickType = "secondary"
      game.pontosSecundario += game.valorClickSecundario
      atualizaPontosSecundario()
      clickCriticoSorteador()
    })
  }
  if (ui.melhoraValor) {
    ui.melhoraValor.textContent = "Melhora valor do click - " + game.precoMelhoraValor
    ui.melhoraValor.addEventListener("click", () => {
      if (podeComprar(game.precoMelhoraValor)) {
        game.valorClick += 1
        game.precoMelhoraValor = Math.round(game.precoMelhoraValor * 1.5)
        ui.melhoraValor.textContent = "Melhora valor do click - " + game.precoMelhoraValor
      }
    })
  }
  if (ui.melhoraEstilo) {
    ui.melhoraEstilo.textContent = "Melhorar estilo - " + game.precoMelhoraEstilo
    function clickMelhoraEstilo() {
      if (!podeComprar(game.precoMelhoraEstilo)) return
      game.precoMelhoraEstilo = Math.round(game.precoMelhoraEstilo * 1.5)
      ui.melhoraEstilo.textContent = "Melhorar estilo - " + game.precoMelhoraEstilo
      game.classeEstilo++
      if (game.classeEstilo <= game.estiloMaximo && ui.estiloGeral && ui.overlay) {
        ui.estiloGeral.classList.add("estilo" + game.classeEstilo)
        ui.overlay.classList.add("estilo" + game.classeEstilo)
      }
      if (game.classeEstilo >= game.estiloMaximo) {
        ui.melhoraEstilo.textContent = "Estilo máximo alcançado."
        ui.melhoraEstilo.removeEventListener("click", clickMelhoraEstilo)
        if (ui.botaoHabilidade) ui.botaoHabilidade.style.display = "block"
      }
    }
    ui.melhoraEstilo.addEventListener("click", clickMelhoraEstilo)
  }
  if (ui.botaoHabilidade) {
    ui.botaoHabilidade.textContent = "Valor para habilitar arvore de habilidades: " + game.precoHabilidade
    function clickHabilidades() {
      if (!podeComprar(game.precoHabilidade)) return
      ui.botaoHabilidade.removeEventListener("click", clickHabilidades)
      ui.botaoHabilidade.textContent = "Habilitado"
      if (ui.arvoreHabilidades) ui.arvoreHabilidades.style.display = "flex"
      if (ui.estiloGeral) ui.estiloGeral.classList.add("estilo4")
      abreModalNovoBotao()
      atualizaPontosSecundario()
    }
    ui.botaoHabilidade.addEventListener("click", clickHabilidades)
  }
  if (ui.clickMultiploLabel) ui.clickMultiploLabel.textContent = "Valor: " + game.clickMultiploValor
  if (ui.clickMultiploNivel) ui.clickMultiploNivel.textContent = "Nivel: " + game.clickMultiploNivelAtual
  if (ui.clickMultiploBotao) ui.clickMultiploBotao.addEventListener("click", clickMultiplo)
  if (ui.clickAutomaticoLabel) ui.clickAutomaticoLabel.textContent = "Valor: " + game.clickAutomaticoValor
  if (ui.clickAutomaticoNivel) ui.clickAutomaticoNivel.textContent = "Nivel: " + game.clickAutomaticoNivelAtual
  if (ui.clickAutomaticoBotao) ui.clickAutomaticoBotao.addEventListener("click", clickAutomatico)
  if (ui.clickCriticoLabel) ui.clickCriticoLabel.textContent = "Valor: " + game.clickCriticoValor
  if (ui.clickCriticoNivel) ui.clickCriticoNivel.textContent = "Nivel: " + game.clickCriticoNivelAtual
  if (ui.clickCriticoBotao) ui.clickCriticoBotao.addEventListener("click", clickCritico)
}
function atualizaValorPrimario() {
  game.pontosPrimario += game.valorClick
  atualizaPontosPrimario()
}
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
function clickAutomatico() {
  if (!podeComprar(game.clickAutomaticoValor)) return
  game.clickAutomaticoHabilitado = true
  game.clickAutomaticoNivelAtual++
  game.clickAutomaticoValor *= 2
  game.clickAutomaticoTempo = Math.max(100, game.clickAutomaticoTempo - game.clickAutomaticoNivelAtual * 10)
  if (ui.clickAutomaticoLabel) ui.clickAutomaticoLabel.textContent = "Valor: " + game.clickAutomaticoValor
  if (ui.clickAutomaticoNivel) ui.clickAutomaticoNivel.textContent = "Nivel: " + game.clickAutomaticoNivelAtual
  if (game.clickAutomaticoNivelAtual === 1) {
    iniciarClickAutomaticoPrimario()
  } else {
    atualizarVelocidadeClickPrimario()
  }
  if (game.clickAutomaticoNivelAtual >= game.clickAutomaticoNivelMaximo) {
    if (ui.clickAutomaticoLabel) ui.clickAutomaticoLabel.textContent = "Nível máximo"
    if (ui.clickAutomaticoBotao) ui.clickAutomaticoBotao.removeEventListener("click", clickAutomatico)
  }
}
function clickCritico() {
  if (!podeComprar(game.clickCriticoValor)) return
  game.clickCriticoNivelAtual++
  game.clickCriticoValor *= 2
  game.clickCriticoChance = Math.min(1, game.clickCriticoChance * 1.5)
  if (game.clickCriticoNivelAtual >= game.clickCriticoNivelMaximo) {
    if (ui.clickCriticoLabel) ui.clickCriticoLabel.textContent = "Nivel máximo"
    if (ui.clickCriticoNivel) ui.clickCriticoNivel.textContent = "Nivel: " + game.clickCriticoNivelAtual
    if (ui.clickCriticoBotao) ui.clickCriticoBotao.removeEventListener("click", clickCritico)
  } else {
    if (ui.clickCriticoLabel) ui.clickCriticoLabel.textContent = "Valor: " + game.clickCriticoValor
    if (ui.clickCriticoNivel) ui.clickCriticoNivel.textContent = "Nivel: " + game.clickCriticoNivelAtual
  }
}
function clickCriticoSorteador() {
  if (Math.random() >= game.clickCriticoChance) return
  if (lastClickType === "primary") {
    game.pontosPrimario += game.valorClick
    atualizaPontosPrimario()
  } else {
    game.pontosSecundario += game.valorClickSecundario
    atualizaPontosSecundario()
  }
}
function clickMultiplo() {
  if (!podeComprar(game.clickMultiploValor)) return
  game.clickMultiploNivelAtual++
  game.clickMultiploValor *= 2
  if (ui.clickMultiploLabel) ui.clickMultiploLabel.textContent = "Valor: " + game.clickMultiploValor
  if (ui.clickMultiploNivel) ui.clickMultiploNivel.textContent = "Nivel: " + game.clickMultiploNivelAtual
}
