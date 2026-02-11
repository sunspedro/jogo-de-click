import { ui } from './variables.js'
import { scrollToId } from './util.js'

export function abreModalPontos() {
  if (!ui.overlay) return
  ui.overlay.style.display = "block"
  scrollToId("estiloGeral")
}

if (ui.fechaModalPontos) {
  ui.fechaModalPontos.onclick = () => {
    ui.overlay.style.display = "none"
  }
}

export function abreModalNovoBotao() {
  if (!ui.overlay2) return
  ui.overlay2.style.display = "block"
  scrollToId("estiloGeral")
}

if (ui.fechaModalNovoBotao) {
  ui.fechaModalNovoBotao.onclick = () => {
    ui.overlay2.style.display = "none"
  }
}
