 const emojis = ["🐶", "🐱", "🐰", "🦊", "🐸", "🐵", "🦁", "🐼"];
    let cartas = [];
    let primeira = null;
    let segunda = null;
    let bloqueado = false;
    let movimentos = 0;

    function embaralhar(array) {
      
     return array.sort(()=> 0.5 - Math.random())

    }

    function criarCarta(emoji) {
     const carta = document.createElement("div")
     carta.classList.add("carta")
     carta.textContent = "❓"
     carta.valor = emoji
     carta.addEventListener("click", ()=> virarCarta(carta))
     return carta
    }

    function virarCarta(carta) {
      if(bloqueado || carta.classList.contains("virada")) return

      carta.textContent = carta.valor
      carta.classList.add("virada")

      if(!primeira){
         primeira = carta
      }else{
         segunda = carta
         bloqueado = true
         movimentos ++;
         document.getElementById("movimentos").textContent = movimentos;

         setTimeout(() => {
            if(primeira.valor !== segunda.valor){
               primeira.textContent = "❓"
               segunda.textContent = "❓"
               primeira.classList.remove("virada")
               segunda.classList.remove("virada")
            }
            primeira = null
            segunda = null
            bloqueado = false
            checarVitoria()
         }, 800);
      }
    }

    function checarVitoria() {
    const viradas = document.querySelectorAll(".virada")
    if(viradas.length === cartas.length){
      document.getElementById("mensagem").textContent = `Parabéns! Você venceu com ${movimentos}movimentos`
    }
    }

    function iniciarJogo() {
     const tabuleiro = document.getElementById("tabuleiro")
     tabuleiro.innerHTML = ""
     document.getElementById("mensagem").textContent = ""
     movimentos = 0
     document.getElementById("movimentos").textContent = movimentos

     cartas = embaralhar([...emojis, ...emojis])
     console.log(cartas)
     cartas.forEach(emoji => {
      const carta = criarCarta(emoji)
      tabuleiro.appendChild(carta)
     });
    }

    iniciarJogo();
