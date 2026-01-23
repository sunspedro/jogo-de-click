const game = {
  pontos: 0,
  valorClick: 1000,
  precoMelhoraValor: 100,
  precoMelhoraEstilo: 200,
  precoHabilidade: 1000,
  classeEstilo: 0,
  maxEstilo: 3
}

const ui = {
  pontos: document.getElementById("pontos"),
  btnClick: document.getElementById("onClick"),
  melhoraValor: document.getElementById("melhoraValor"),
  melhoraEstilo: document.getElementById("melhoraEstilo"),
  estiloGeral: document.getElementById("estiloGeral"),
  overlay: document.getElementById("overlay"),
  fechaModal: document.getElementById("fechaModal"),
  botaoHabilidade: document.getElementById("habilitaHabilidades"),
  arvoreHabilidades: document.getElementById("arvoreHabilidades")
}

function atualizaPontos() {
  ui.pontos.textContent = game.pontos
}

function abreModal() {
  ui.overlay.style.display = "block"
}

function podeComprar(preco) {
  if (preco <= game.pontos) {
    game.pontos -= preco
    atualizaPontos()
    return true
  }
  abreModal()
  return false
}

atualizaPontos()

ui.btnClick.addEventListener("click", () => {
  game.pontos += game.valorClick
  atualizaPontos()
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

    if (game.classeEstilo < game.maxEstilo) {
      ui.estiloGeral.classList.add("estilo" + game.classeEstilo)
      ui.overlay.classList.add("estilo" + game.classeEstilo)
    } else {
      ui.melhoraEstilo.textContent = "Estilo máximo alcançado."
      ui.melhoraEstilo.removeEventListener("click", clickMelhoraEstilo)
      ui.botaoHabilidade.style.display = "block"
    }
  }
}

ui.melhoraEstilo.addEventListener("click", clickMelhoraEstilo)

ui.fechaModal.addEventListener("click", () => {
  ui.overlay.style.display = "none"
})

ui.botaoHabilidade.textContent = "Valor para habilitar arvore de habilidades: " + game.precoHabilidade

function clickHabilidades() {
  if (podeComprar(game.precoHabilidade)) {
    ui.botaoHabilidade.removeEventListener("click", clickHabilidades)
    ui.botaoHabilidade.textContent = "Habilitado"
    ui.arvoreHabilidades.style.display = "flex"
  }
}

ui.botaoHabilidade.addEventListener("click", clickHabilidades)
