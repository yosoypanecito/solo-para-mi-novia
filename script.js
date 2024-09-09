// Obtener el canvas y su contexto
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Establecer el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cargar la imagen de Hello Kitty
let kittyImage = new Image();
kittyImage.src = 'https://media.tenor.com/z8swAVI-pygAAAAj/cinnamoroll-sanrio-characters.gif';

// Definir variables
let kitty = {
  x: 50,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  velocidad: 0,
  gravedad: 0.5
};

let obstaculos = [];
let puntaje = 0;
let gameOver = false;
let tiempoInactivo = 2; // Variable para contar el tiempo de inactividad
let tiempoEnPiso = 2; // Variable para contar el tiempo en el piso
let inactivityTimer = 0; // Variable para contar el tiempo de inactividad del usuario

// Función para dibujar a Hello Kitty
function dibujarKitty() {
  ctx.drawImage(kittyImage, kitty.x, kitty.y, kitty.width, kitty.height);
}

// Función para dibujar obstáculos
function dibujarObstaculos() {
  obstaculos.forEach((obstaculo, index) => {
    ctx.fillStyle = '#f00';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
    if (obstaculo.x < -obstaculo.width) {
      obstaculos.splice(index, 1);
    }
  });
}

// Función para actualizar la posición de Hello Kitty
function actualizarKitty() {
  if (!gameOver) {
    kitty.velocidad += kitty.gravedad;
    kitty.y += kitty.velocidad;
    if (kitty.y + kitty.height > canvas.height) {
      kitty.y = canvas.height - kitty.height;
      kitty.velocidad = 0;
      tiempoEnPiso++;
    } else {
      tiempoEnPiso = 0;
    }

    // Verificar colisión con obstáculos
    obstaculos.forEach((obstaculo) => {
      if (
        kitty.x + kitty.width > obstaculo.x &&
        kitty.x < obstaculo.x + obstaculo.width &&
        kitty.y + kitty.height > obstaculo.y &&
        kitty.y < obstaculo.y + obstaculo.height
      ) {
        // Si hay colisión, "matar" a Hello Kitty
        gameOver = true;
        ctx.fillStyle = "#000";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("moriste mi amorcito!", canvas.width / 2, canvas.height / 2);
      }
    });

    // Verificar si el jugador ha estado quieto durante demasiado tiempo
    if (kitty.velocidad === 0) {
      tiempoInactivo++;
      if (tiempoInactivo > 60) {
        gameOver = true;
        ctx.fillStyle = "#000";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("moriste mi amorcito!", canvas.width / 2, canvas.height / 2);
      }
    } else {
      tiempoInactivo = 0;
    }

    // Verificar si el jugador ha estado en el piso durante demasiado tiempo
    if (tiempoEnPiso > 5) {
      gameOver = true;
      ctx.fillStyle = "#000";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
    }

    // Incrementar el tiempo de inactividad del usuario
    inactivityTimer++;

    // Verificar si el usuario ha estado inactivo durante 10 segundos
    if (inactivityTimer > 600) {
      gameOver = true;
      ctx.fillStyle = "#000";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("moriste mi amorcito!", canvas.width / 2, canvas.height / 2);
    }
  }
}

// Función para actualizar la posición de los obstáculos
// ...

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarKitty();
  dibujarObstaculos();
  actualizarKitty();
  actualizarObstaculos();
  requestAnimationFrame(loop);
}

// Agregar evento de teclado
document.addEventListener('click', manejarEvento);

// Esperar a que la imagen esté cargada
kittyImage.onload = function() {
  // Agregar obstáculos iniciales
  for (let i = 0; i < 5; i++) {
    obstaculos.push({
      x: canvas.width + (i * 200),
      y: canvas.height - 50,
      width: 50,
      height: 50
    });
  }

  // Iniciar el juego
  loop();
};

// Función para agregar nuevos obstáculos
function agregarObstaculo() {
  obstaculos.push({
    x: canvas.width,
    y: canvas.height - 50,
    width: 50,
    height: 50
  });
}

// Agregar evento para agregar nuevos obstáculos
setInterval(agregarObstaculo, 2000);
