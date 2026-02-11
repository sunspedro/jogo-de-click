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
  clickMultiploNivelMaximo: 10,
  clickMultiploValor: 4000,
  clickMultiploAtiva: 150,
  clickMultiploCont: 1,
  efeitoClickValor: 1000,
  efeitoBolinhasValor: 5000,
  efeitoClickHabilitado: false,
  efeitoBolinhasAtivado: false,
  efeitoQuadradosAtivado: false,
  efeitoQuadradosValor: 5000,
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
  overlay3: document.getElementById("overlay3"),
  fechaModalEfeitoClick: document.getElementById("fechaModalEfeitoClick"),
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
  efeitoClickLabel: document.getElementById("efeitoClickLabel"),
  efeitoClickBotao: document.getElementById("efeitoClickBotao"),
  efeitoBolinhasLabel: document.getElementById("efeitoBolinhasValor"),
  efeitoBolinhasButton: document.getElementById("efeitoBolinhasButton"),
  efeitoQuadradoLabel: document.getElementById("efeitoQuadradosValor"),
  efeitoQuadradoButton: document.getElementById("efeitoQuadradoButton"),
}

let intervaloClickPrimario = null
let intervaloClickSecundario = null
let currentScroll = window.scrollY
let targetScroll = currentScroll
let scrolling = false

let lastClickType = 'primary'

let efeitoQuadradosListenersAdded = false

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

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return

  targetScroll = el.getBoundingClientRect().top + window.scrollY
  scrolling = true
  requestAnimationFrame(inertiaScroll)
}

function desativaBotoes(){
  game.efeitoBolinhasAtivado = false
}

function atualizaPontosPrimario() {
  if (ui.pontosPrimario) ui.pontosPrimario.textContent = game.pontosPrimario.toLocaleString()
}
function atualizaPontosSecundario() {
  if (ui.pontosSecundario) ui.pontosSecundario.textContent = game.pontosSecundario.toLocaleString()
}

function abreModalPontos() {
  if (!ui.overlay) return
  ui.overlay.style.display = "block"
  scrollToId("estiloGeral")
}

if (ui.fechaModalPontos) {
  ui.fechaModalPontos.addEventListener("click", () => {
    ui.overlay.style.display = "none"
  })
}

function abreModalNovoBotao() {
  if (!ui.overlay2) return
  ui.overlay2.style.display = "block"
  scrollToId("estiloGeral")
}
if (ui.fechaModalNovoBotao) {
  ui.fechaModalNovoBotao.addEventListener("click", () => {
    ui.overlay2.style.display = "none"
  })
}

function abreModalEfeitoClick() {
  if (!ui.overlay3) return
  ui.overlay3.style.display = "block"
  scrollToId("estiloGeral")
}
if (ui.fechaModalEfeitoClick) {
  ui.fechaModalEfeitoClick.addEventListener("click", () => {
    ui.overlay3.style.display = "none"
  })
}

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
atualizaPontosSecundario()

function atualizaValorPrimario(){
  game.pontosPrimario += game.valorClick
  atualizaPontosPrimario()
}

if (ui.btnClickPrimario) {
  ui.btnClickPrimario.addEventListener("click", () => {
    lastClickType = 'primary'

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
    lastClickType = 'secondary'
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

if (ui.clickAutomaticoLabel) ui.clickAutomaticoLabel.textContent = "Valor: " + game.clickAutomaticoValor
if (ui.clickAutomaticoNivel) ui.clickAutomaticoNivel.textContent = "Nivel: " + game.clickAutomaticoNivelAtual
if (ui.clickAutomaticoBotao) ui.clickAutomaticoBotao.addEventListener("click", clickAutomatico)

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

if (ui.clickCriticoLabel) ui.clickCriticoLabel.textContent = "Valor: " + game.clickCriticoValor
if (ui.clickCriticoNivel) ui.clickCriticoNivel.textContent = "Nivel: " + game.clickCriticoNivelAtual
if (ui.clickCriticoBotao) ui.clickCriticoBotao.addEventListener("click", clickCritico)

function clickCritico(){
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

function clickCriticoSorteador(){
  if (Math.random() >= game.clickCriticoChance) return

  // efeito: dobra o ganho do clique (adicionei um segundo ganho)
  if (lastClickType === 'primary') {
    game.pontosPrimario += game.valorClick
    atualizaPontosPrimario()
    // aqui você pode adicionar feedback visual (flash, animação, toast)
  } else {
    game.pontosSecundario += game.valorClickSecundario
    atualizaPontosSecundario()
  }
}

if (ui.clickMultiploLabel) ui.clickMultiploLabel.textContent = "Valor: " + game.clickMultiploValor
if (ui.clickMultiploNivel) ui.clickMultiploNivel.textContent = "Nivel: " + game.clickMultiploNivelAtual
if (ui.clickMultiploBotao) ui.clickMultiploBotao.addEventListener("click", clickMultiplo)

function clickMultiplo(){
  if (!podeComprar(game.clickMultiploValor)) return

  game.clickMultiploNivelAtual++
  game.clickMultiploValor *= 2
  if (ui.clickMultiploLabel) ui.clickMultiploLabel.textContent = "Valor: " + game.clickMultiploValor
  if (ui.clickMultiploNivel) ui.clickMultiploNivel.textContent = "Nivel: " + game.clickMultiploNivelAtual
}

if (ui.efeitoClickLabel) ui.efeitoClickLabel.textContent = "Valor: " + game.efeitoClickValor
if (ui.efeitoClickBotao) ui.efeitoClickBotao.textContent = "Comprar"
if (ui.efeitoClickBotao) ui.efeitoClickBotao.addEventListener("click", efeitoClick)

function efeitoClick(){
  if (podeComprar(game.efeitoClickValor)) {
    if (ui.efeitoClickBotao) ui.efeitoClickBotao.textContent = "Abrir efeitos"
    game.efeitoClickHabilitado = true
  }
  if (game.efeitoClickHabilitado == true) {
    abreModalEfeitoClick()
  }
}

if (ui.efeitoBolinhasButton) ui.efeitoBolinhasButton.textContent = "Comprar"

function efeitoBolinhas(){
  if (!podeComprar(game.efeitoBolinhasValor)) return

  desativaBotoes()
  game.efeitoBolinhasAtivado = true
  if (ui.efeitoBolinhasButton) ui.efeitoBolinhasButton.textContent = "Habilitado"
}

if (ui.efeitoBolinhasButton) ui.efeitoBolinhasButton.addEventListener("click", efeitoBolinhas)

document.addEventListener("click", (e) => {
  if (!game.efeitoBolinhasAtivado) return;

  const quantidade = 12;
  const raioInicial = 10;
  const raioFinal = 26;
  const duracao = 600;

  const bolinhas = [];
  const inicio = performance.now();

  for (let i = 0; i < quantidade; i++) {
    const b = document.createElement("div");
    b.className = "bolinha";
    b.style.position = 'fixed';
    b.style.left = '0px';
    b.style.top = '0px';
    b.style.pointerEvents = 'none';
    document.body.appendChild(b);

    bolinhas.push({
      el: b,
      angulo: (Math.PI * 2 / quantidade) * i
    });
  }

  function animar(tempo) {
    const progresso = Math.min((tempo - inicio) / duracao, 1);
    const raio = raioInicial + (raioFinal - raioInicial) * progresso;

    bolinhas.forEach(b => {
      const x = e.clientX + Math.cos(b.angulo) * raio;
      const y = e.clientY + Math.sin(b.angulo) * raio;

      b.el.style.left = x + "px";
      b.el.style.top = y + "px";
      b.el.style.opacity = 1 - progresso;
    });

    if (progresso < 1) {
      requestAnimationFrame(animar);
    } else {
      bolinhas.forEach(b => b.el.remove());
    }
  }

  requestAnimationFrame(animar);
});

if (ui.efeitoQuadradoButton) ui.efeitoQuadradoButton.textContent = "Comprar"
if (ui.efeitoQuadradoButton) ui.efeitoQuadradoButton.addEventListener("click", efeitoQuadrados)

function efeitoQuadrados(){
  if (!podeComprar(game.efeitoQuadradosValor)) return

  desativaBotoes()
  game.efeitoQuadradosAtivado = true
  if (ui.efeitoQuadradoButton) ui.efeitoQuadradoButton.textContent = "Habilitado"

  if (efeitoQuadradosListenersAdded) return
  efeitoQuadradosListenersAdded = true

  const cursor = document.querySelector('.cursor')
  if (!cursor) return

  function onMove(e){
    cursor.style.left = e.clientX - 12 + 'px';
    cursor.style.top  = e.clientY - 12 + 'px';
  }
  function onClick(){
    cursor.classList.add('spin');
    setTimeout(() => cursor.classList.remove('spin'), 400);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('click', onClick);
}

function atualizaLabels(){
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

atualizaLabels()
atualizaPontosPrimario()
atualizaPontosSecundario()
