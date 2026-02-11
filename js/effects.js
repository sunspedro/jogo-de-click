import { game, ui } from "./variables.js"
import { podeComprar, desativaBotoes, atualizaPontosPrimario, atualizaPontosSecundario } from "./util.js"
let efeitoQuadradosListenersAdded = false
export function initEffects() {
  if (ui.efeitoClickLabel) ui.efeitoClickLabel.textContent = "Valor: " + game.efeitoClickValor
  if (ui.efeitoClickBotao) ui.efeitoClickBotao.textContent = "Comprar"
  if (ui.efeitoClickBotao) ui.efeitoClickBotao.addEventListener("click", efeitoClick)
  if (ui.efeitoBolinhasButton) ui.efeitoBolinhasButton.textContent = "Comprar"
  if (ui.efeitoBolinhasButton) ui.efeitoBolinhasButton.addEventListener("click", efeitoBolinhas)
  if (ui.efeitoQuadradoButton) ui.efeitoQuadradoButton.textContent = "Comprar"
  if (ui.efeitoQuadradoButton) ui.efeitoQuadradoButton.addEventListener("click", efeitoQuadrados)
  document.addEventListener("click", (e) => {
    if (!game.efeitoBolinhasAtivado) return
    const quantidade = 12
    const raioInicial = 10
    const raioFinal = 26
    const duracao = 600
    const bolinhas = []
    const inicio = performance.now()
    for (let i = 0; i < quantidade; i++) {
      const b = document.createElement("div")
      b.className = "bolinha"
      b.style.position = "fixed"
      b.style.left = "0px"
      b.style.top = "0px"
      b.style.pointerEvents = "none"
      document.body.appendChild(b)
      bolinhas.push({
        el: b,
        angulo: (Math.PI * 2 / quantidade) * i
      })
    }
    function animar(tempo) {
      const progresso = Math.min((tempo - inicio) / duracao, 1)
      const raio = raioInicial + (raioFinal - raioInicial) * progresso
      bolinhas.forEach(b => {
        const x = e.clientX + Math.cos(b.angulo) * raio
        const y = e.clientY + Math.sin(b.angulo) * raio
        b.el.style.left = x + "px"
        b.el.style.top = y + "px"
        b.el.style.opacity = 1 - progresso
      })
      if (progresso < 1) {
        requestAnimationFrame(animar)
      } else {
        bolinhas.forEach(b => b.el.remove())
      }
    }
    requestAnimationFrame(animar)
  })
}
function efeitoClick() {
  if (podeComprar(game.efeitoClickValor)) {
    if (ui.efeitoClickBotao) ui.efeitoClickBotao.textContent = "Abrir efeitos"
    game.efeitoClickHabilitado = true
  }
  if (game.efeitoClickHabilitado == true) {
    if (ui.overlay3) ui.overlay3.style.display = "block"
  }
}
function efeitoBolinhas() {
  if (!podeComprar(game.efeitoBolinhasValor)) return
  desativaBotoes()
  game.efeitoBolinhasAtivado = true
  if (ui.efeitoBolinhasButton) ui.efeitoBolinhasButton.textContent = "Habilitado"
}
function efeitoQuadrados() {
  if (!podeComprar(game.efeitoQuadradosValor)) return
  desativaBotoes()
  game.efeitoQuadradosAtivado = true
  if (ui.efeitoQuadradoButton) ui.efeitoQuadradoButton.textContent = "Habilitado"
  if (efeitoQuadradosListenersAdded) return
  efeitoQuadradosListenersAdded = true
  const cursor = document.querySelector(".cursor")
  if (!cursor) return
  function onMove(e) {
    cursor.style.left = e.clientX - 12 + "px"
    cursor.style.top = e.clientY - 12 + "px"
  }
  function onClick() {
    cursor.classList.add("spin")
    setTimeout(() => cursor.classList.remove("spin"), 400)
  }
  document.addEventListener("mousemove", onMove)
  document.addEventListener("click", onClick)
}
