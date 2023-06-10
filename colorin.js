let canvas = document.querySelector("#tetris");
let scoreboard = document.querySelector("h2");
let ctx = canvas.getContext("2d");
ctx.scale(30,30);




document.addEventListener("DOMContentLoaded", function() {
    var startScreen = document.getElementById("start-screen");
    var gameScreen = document.getElementById("game-screen");
    var startButton = document.getElementById("start-button");
  
    startButton.addEventListener("click", function() {
      startScreen.style.display = "none";
      gameScreen.style.display = "block";
  
      // Aquí puedes agregar la lógica para iniciar el juego
      console.log("¡Juego iniciado!");
    });
  });3
  


 /* window.addEventListener('load', () => {
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');
    const menuButton = document.getElementById('menu-btn');
  
*/




const SHAPES = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,1,0],  
        [0,1,0],  
        [1,1,0]   
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [1,1],
        [1,1],
    ]
];

const COLORS = [
    "#fff",
    "#d78f01",
    "#2e9cfe",
    "#d78f01",
    "#f00201",
    "#06ef00",
    "#9f00f0",
    "#f2c30f"
];

const ROWS = 20;
const COLS = 10;

let grid = generateGrid();
let fallingPieceObj = null;
let score = 0;

setInterval(newGameState, 500);

function newGameState() {
    checkGrid();
    if (!fallingPieceObj) {
        fallingPieceObj = randomPieceObject();
        renderPiece();
    }
    moveDown();
}

function checkGrid() {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        let allFilled = true;
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 0) {
                allFilled = false;
            }
        }
        if (allFilled) {
            count++;
            grid.splice(i, 1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
    }
    if (count === 1) {
        score += 10;
    } else if (count === 2) {
        score += 30;
    } else if (count === 3) {
        score += 50;
    } else if (count > 3) {
        score += 100;
    }
    scoreboard.innerHTML = "Score: " + score;
}

function generateGrid() {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
        grid.push([]);
        for (let j = 0; j < COLS; j++) {
            grid[i].push(0);
        }
    }
    return grid;
}

function randomPieceObject() {
    let ran = Math.floor(Math.random() * 7);
    let piece = SHAPES[ran];
    let colorIndex = ran + 1;
    let x = 4;
    let y = 0;
    return { piece, colorIndex, x, y };
}

function renderPiece() {
    let piece = fallingPieceObj.piece;
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j] === 1) {
                ctx.fillStyle = COLORS[fallingPieceObj.colorIndex];
                ctx.fillRect(fallingPieceObj.x + j, fallingPieceObj.y + i, 1, 1);
            }
        }
    }
}

function moveDown() {
    if (!collision(fallingPieceObj.x, fallingPieceObj.y + 1)) {
        fallingPieceObj.y += 1;
    } else {
        let piece = fallingPieceObj.piece;
        for (let i = 0; i < piece.length; i++) {
            for (let j = 0; j < piece[i].length; j++) {
                if (piece[i][j] === 1) {
                    let p = fallingPieceObj.x + j;
                    let q = fallingPieceObj.y + i;
                    grid[q][p] = fallingPieceObj.colorIndex;
                }
            }
        }
        if (fallingPieceObj.y === 0) {
            alert("¡Game over!");
            gameOver();
            grid = generateGrid();
            score = 0;
        }
        fallingPieceObj = null;
    }
    renderGame();
}

function moveLeft() {
    if (!collision(fallingPieceObj.x - 1, fallingPieceObj.y)) {
        fallingPieceObj.x -= 1;
    }
    renderGame();
}

function moveRight() {
    if (!collision(fallingPieceObj.x + 1, fallingPieceObj.y)) {
        fallingPieceObj.x += 1;
    }
    renderGame();
}

function rotate() {
    let rotatedPiece = [];
    let piece = fallingPieceObj.piece;
    for (let i = 0; i < piece.length; i++) {
        rotatedPiece.push([]);
        for (let j = 0; j < piece[i].length; j++) {
            rotatedPiece[i].push(0);
        }
    }
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            rotatedPiece[i][j] = piece[j][i];
        }
    }

    for (let i = 0; i < rotatedPiece.length; i++) {
        rotatedPiece[i] = rotatedPiece[i].reverse();
    }
    if (!collision(fallingPieceObj.x, fallingPieceObj.y, rotatedPiece)) {
        fallingPieceObj.piece = rotatedPiece;
    }
    renderGame();
}

function collision(x, y, rotatedPiece) {
    let piece = rotatedPiece || fallingPieceObj.piece;
    for (let i = 0; i < piece.length; i++) {
        for (let j = 0; j < piece[i].length; j++) {
            if (piece[i][j] === 1) {
                let p = x + j;
                let q = y + i;
                if (p >= 0 && p < COLS && q >= 0 && q < ROWS) {
                    if (grid[q][p] > 0) {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
    }
    return false;
}

function renderGame() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            ctx.fillStyle = COLORS[grid[i][j]];
            ctx.fillRect(j, i, 1, 1);
        }
    }
    renderPiece();
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.fillText("Se acabó el juego", 70, canvas.height / 2);
}

document.addEventListener("keydown", function(e) {
    let key = e.key;
    if (key === "ArrowDown") {
        moveDown();
    } else if (key === "ArrowLeft") {
        moveLeft();
    } else if (key === "ArrowRight") {
        moveRight();
    } else if (key === "ArrowUp") {
        rotate();
    }
});

function showGameOverText() {
    var gameOverText = document.getElementById("game-over-text");
    gameOverText.innerHTML = "GAME OVER!";
    gameOverText.style.display = "block";
  }
  
  
  
  // Ejemplo de finalización del juego después de 5 segundos (5000 milisegundos)
  setTimeout(function() {
    // Aquí finaliza tu juego...
  
    // Llama a la función showGameOverText() para mostrar el texto de Game Over
    showGameOverText();
  }, 5000);
  


  window.addEventListener('load', () => {
    const scoreElement = document.getElementById('score');
    const restartButton = document.getElementById('restart-btn');

    // Obtén la puntuación real del juego y actualiza el mensaje
    const score = obtenerPuntuacionDelJuego(); // Reemplaza esta función con la lógica de tu juego
    scoreElement.textContent = 'Puntuación: ' + score;

    // Evento clic para reiniciar el juego
    restartButton.addEventListener('click', () => {
        reiniciarJuego(); // Reemplaza esta función con la lógica de reinicio de tu juego
    });
});



/* // Evento clic para reintentar
restartButton.addEventListener('click', () => {
    reiniciarJuego(); // Reemplaza esta función con la lógica de reinicio de tu juego
    gameScreen.classList.remove('hidden');
    gameOverScreen.classList.add('hidden');
});

// Evento clic para regresar al menú
menuButton.addEventListener('click', () => {
    // Lógica para regresar al menú principal de tu juego
});

// Lógica para verificar el fin del juego y mostrar la pantalla de Game Over
function verificarFinDelJuego() {
    const finDelJuego = true; // Reemplaza esto con la lógica real de fin del juego
    const puntuacion = obtenerPuntuacionDelJuego(); // Reemplaza esto con la lógica real de obtención de la puntuación

    if (finDelJuego) {
        showGameOverScreen(puntuacion);
    }
}
}); */

/*
// Obtén referencias a los elementos del DOM
const gameContainer = document.getElementById('gameContainer');
const gameOverContainer = document.getElementById('gameOverContainer');
const retryButton = document.getElementById('retryButton');
const menuButton = document.getElementById('menuButton');

// Agrega un evento 'click' al botón Retry
retryButton.addEventListener('click', () => {
  // Reiniciar el juego o realizar las acciones necesarias
  // para volver a intentarlo
  console.log('Retry button clicked!');
});

// Agrega un evento 'click' al botón Menú Principal
menuButton.addEventListener('click', () => {
  // Redirigir al usuario al menú principal o realizar las
  // acciones necesarias para mostrar el menú principal
  console.log('Menu button clicked!');
});

// Función para mostrar la pantalla de Game Over
function showGameOverScreen() {
  gameContainer.classList.add('hidden');
  gameOverContainer.classList.remove('hidden');
}

// Simula el evento 'game over'
setTimeout(showGameOverScreen, 5000); // Cambia el valor de 5000 por el tiempo que desees
*/


/*
var miMusica = document.getElementById("miMusica");
var botonMusica = document.getElementById("botonMusica");

function toggleMusica() {
  if (miMusica.paused) {
    miMusica.play();
    botonMusica.innerHTML = "Desactivar música";
  } else {
    miMusica.pause();
    botonMusica.innerHTML = "Activar música";
  }
}
*/