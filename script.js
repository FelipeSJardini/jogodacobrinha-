const appleImg = new Image();
appleImg.src = "maca.png";
const canvas = document.getElementById("gameCanvas");

// Obtém o contexto de desenho 2D para o canvas.
// É através deste contexto (ctx) que desenharemos formas, textos, etc.
const ctx = canvas.getContext("2d");


const box = 20;


let snake = [];

// Define a posição inicial da cabeça da cobra.
// A cabeça é o primeiro elemento do array 'snake'.
// Ela começa no centro da tela (9 * box, 10 * box).
snake[0] = { x: 9 * box, y: 10 * box };


let direction = null;

// Define a posição inicial da comida.
// A comida aparece em uma posição aleatória dentro da área do jogo.
// Math.random() gera um número entre 0 e 1.
// Multiplicamos por 20 para ter 20 posições possíveis na grade.
// Math.floor() arredonda para baixo, garantindo um número inteiro.
// Multiplicamos por 'box' para que a posição da comida se alinhe com a grade.
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

let score = 0;

let gameOver = false;

const scoreDisplay = document.getElementById("score")
const gameOverDisplay = document.getElementById("game-over")

function drawFood(food) {
  if (appleImg.complete) {
    ctx.drawImage(appleImg, food.x, food.y, box, box);
  } else {
    // Caso a imagem ainda não tenha carregado, desenha um quadrado vermelho
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
  }
}

// Inicializa o jogo
function inicializar() {
  gameOverDisplay.style.display = "none"
  scoreDisplay.textContent = "Pontuação: 0"
  snake=[{x: 9 * box, y: 10 * box}]
  score = 0
  direction = null
  food = gerarComida()
  gameOver = false
  desenhar()
}

// Gera uma nova posição para a comida, garantindo que não apareça sobre a cobra
function gerarComida() {
   var newFood
   while(true){
    newFood = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    }
    console.log(newFood)
    let colisaoSnake = false
    for (let i = 0; i<snake.length; i++){
      if(snake[i].x === newFood.x && snake[i].y === newFood.y){
        colisaoSnake = true;
        break;
      }
    }
    if(!colisaoSnake) break;
   }
   return newFood
}

function desenhar() {
    if (gameOver) return;

    // Limpa o canvas
    ctx.fillStyle = "#222"
    ctx.fillRect(0,0,canvas.clientWidth, canvas.height)
    // Desenha a comida
    drawFood(food)
  

    // Desenha a cobrinha
    const bodyColors = ["#328329ff","#71ef29ff"];
    for(var i=0; i<snake.length; i++){
      var indexColor = i % bodyColors.length
      var corescolhida = bodyColors[indexColor]
      //const randomColor = bodyColors[Math.floor(Math.random()* bodyColors.length)]
      ctx.fillStyle = i === 0 ? "#246f31ff" : corescolhida//randomColor;
      ctx.fillRect(snake[i].x,snake[i].y,box, box)
      ctx.strokeStyle = "#013300"
      ctx.strokeRect(snake[i].x,snake[i].y,box, box)
    }

    var head = {...snake[0]};
    switch(direction){
      case "LEFT": head.x -= box
      console.log(head.x)
      break;

      case "RIGHT": head.x += box
      console.log(head.x)
      break;

      case "UP": head.y -= box
      console.log(head.y)
      break;

      case "DOWN": head.y += box
      console.log(head.y)
      break;

      default: return
    }

    // Calcula a próxima posição da cabeça
    
  

    // Verifica se comeu a comida
   if(head.x === food.x && head.y === food.y){
    score++;
    scoreDisplay.textContent = "Pontuação: " + score;
    food = gerarComida()
   }else{
    snake.pop()
   }
   snake.unshift(head)
   console.log(snake)
 
  if(colisaoComCorpo(head,snake.slice(1))){
    fimDeJogo()
    return
  }

  if(head.x<0 || head.x >= canvas.width || head.y<0 || head.y >= canvas.height){
    fimDeJogo()
    return
  }
 
}



// Função que é chamada quando uma tecla é pressionada.
function mudarDirecao(event) {
  // Obtém o código da tecla que foi pressionada.
  const key = event.keyCode;



  // Verifica se a tecla pressionada é a seta esquerda (keyCode 37)
  // e se a direção atual NÃO é para a direita.
  // Isso impede que a cobra se mova na direção oposta imediatamente
  //Ela nao muda da esqueda para a direita e nem debaixo para cima.
  if (key === 37 && direction !== "RIGHT") {
    direction = "LEFT"; // Muda a direção para a esquerda.
  }
  else if (key === 39 && direction !== "LEFT") {
    direction = "RIGHT"; // Muda a direção para a direita.
  }
  else if (key === 38 && direction !== "DOWN") {
    direction = "UP"; // Muda a direção para cima.
  }
  else if (key === 40 && direction !== "UP") {
    direction = "DOWN"; // Muda a direção para baixo.
  }
  else if (key === 32 && gameOver==true) {
    reiniciarJogo();
  }


}

  function colisaoComCorpo(head, body){
    for (let i = 0; i<body.length; i++){
      if(head.x === body[i].x && body[i].y === head.y){
        return true
      }
    }
    return false
  }

  function reiniciarJogo(){
    inicializar()
  }

  function fimDeJogo(){
    gameOver = true
    gameOverDisplay.style.display = "block"
  }

// Event Listener para as teclas*/
document.addEventListener("keydown", mudarDirecao)

// Define um intervalo para a execução da função 'desenhar'.
// A função 'desenhar' será chamada a cada 1000/15 milissegundos,
// o que resulta em aproximadamente 5 quadros por segundo (FPS).
// Isso controla a velocidade de atualização do jogo.
setInterval(desenhar, 1000/10)


// Inicializa o jogo ao carregar a página
inicializar()