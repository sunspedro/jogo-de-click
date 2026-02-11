import { initModals, atualizaLabels, atualizaPontosPrimario, atualizaPontosSecundario } from "./util.js"
import { initClicks } from "./clicks.js"
import { initEffects } from "./effects.js"
document.addEventListener("DOMContentLoaded", () => {
  initModals()
  initClicks()
  initEffects()
  atualizaLabels()
  atualizaPontosPrimario()
  atualizaPontosSecundario()
})
