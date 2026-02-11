import { game, ui } from "./variables.js"
let currentScroll = window.scrollY
let targetScroll = currentScroll
let scrolling = false
function inertiaScroll() {
  if (!scrolling) return
  currentScroll += (targetScroll - currentScroll) * 0.1
  window.scrollTo(0, currentScroll)
  if (Math.abs(targetScroll - currentScroll) < 0.5) {
    scrolling = false
    return
  }
  requestAnimationFrame(inertiaScroll)
}
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  targetScroll = el.getBoundingClientRect().top + window.scrollY
  scrolling = true
  requestAnimationFrame(inertiaScroll)
}
export function abreModalPontos() {
  if (!ui.overlay) return
  ui.overlay.style.display = "block"
  scrollToId("estiloGeral")
}
export function abreModalNovoBotao() {
  if (!ui.overlay2) return
  ui.overlay2.style.display = "block"
  scrollToId("estiloGeral")
}
export function abreModalEfeitoClick() {
  if (!ui.overlay3) return
  ui.overlay3.style.display = "block"
  scrollToId("estiloGeral")
}
export function podeComprar(preco) {
  if (preco <= game.pontosPrimario) {
    game.pontosPrimario -= preco
    atualizaPontosPrimario()
    return true
  }
  abreModalPontos()
  return false
}
export function desativaBotoes() {
  game.efeitoBolinhasAtivado = false
}
export function atualizaPontosPrimario() {
  if (ui.pontosPrimario) ui.pontosPrimario.textContent = game.pontosPrimario.toLocaleString()
}
export function atualizaPontosSecundario() {
  if (ui.pontosSecundario) ui.pontosSecundario.textContent = game.pontosSecundario.toLocaleString()
}
export function atualizaLabels() {
  if (ui.melhoraValor) ui.melhoraValor.textContent = "Melhora valor do click - " + game.precoMelhoraValor
  if (ui.melhoraEstilo) ui.melhoraEstilo.textContent = game.classeEstilo >= game.estiloMaximo ? "Estilo máximo alcançado." : "Melhorar estilo - " + game.precoMelhoraEstilo
  if (ui.clickAutomaticoLabel) ui.clickAutomaticoLabel.textContent = "Valor: " + game.clickAutomaticoValor
  if (ui.clickAutomaticoNivel) ui.clickAutomaticoNivel.textContent = "Nivel: " + game.clickAutomaticoNivelAtual
  if (ui.clickCriticoLabel) ui.clickCriticoLabel.textContent = game.clickCriticoNivelAtual >= game.clickCriticoNivelMaximo ? "Nivel máximo" : "Valor: " + game.clickCriticoValor
  if (ui.clickCriticoNivel) ui.clickCriticoNivel.textContent = "Nivel: " + game.clickCriticoNivelAtual
  if (ui.clickMultiploLabel) ui.clickMultiploLabel.textContent = "Valor: " + game.clickMultiploValor
  if (ui.clickMultiploNivel) ui.clickMultiploNivel.textContent = "Nivel: " + game.clickMultiploNivelAtual
  if (ui.efeitoClickLabel) ui.efeitoClickLabel.textContent = "Valor: " + game.efeitoClickValor
  if (ui.efeitoBolinhasLabel) ui.efeitoBolinhasLabel.textContent = "Valor: " + game.efeitoBolinhasValor
  if (ui.efeitoQuadradoLabel) ui.efeitoQuadradoLabel.textContent = "Valor: " + game.efeitoQuadradosValor
  if (ui.botaoHabilidade) ui.botaoHabilidade.textContent = "Valor para habilitar arvore de habilidades: " + game.precoHabilidade
}
export function initModals() {
  if (ui.fechaModalPontos) ui.fechaModalPontos.addEventListener("click", () => {
    if (ui.overlay) ui.overlay.style.display = "none"
  })
  if (ui.fechaModalNovoBotao) ui.fechaModalNovoBotao.addEventListener("click", () => {
    if (ui.overlay2) ui.overlay2.style.display = "none"
  })
  if (ui.fechaModalEfeitoClick) ui.fechaModalEfeitoClick.addEventListener("click", () => {
    if (ui.overlay3) ui.overlay3.style.display = "none"
  })
}
