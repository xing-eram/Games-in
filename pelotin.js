



const canvas = document.getElementById('c');
const context = canvas.getContext('2d');
context.fillStyle = "#000";
context.font = "60px monospace";
let w = 1;
let s = 1;
let p = 0;
let q = 0;
let a = 0;
let b = 0;
let m = 190;
let n = 190;
let x = 300;
let y = 235;
let u = -5;
let v = 3;




document.addEventListener("DOMContentLoaded", function() {
    var startScreen = document.getElementById("start-screen");
    var gameScreen = document.getElementById("game-screen");
    var startButton = document.getElementById("start-button");
  
    startButton.addEventListener("click", function() {
      startScreen.style.display = "none";
      gameScreen.style.display = "block";
  
      
      console.log("¡Juego iniciado!");
    });
  });3







setInterval(function() {
  if (w && !s) return;
  s = 0;
  context.clearRect(0, 0, 640, 480);
  
  for (let i = 5; i < 480; i += 20) {
    context.fillRect(318, i, 4, 10);
  }
  
  m += p;
  n += q;
  m = Math.max(0, Math.min(380, m));
  n = Math.max(0, Math.min(380, n));
  x += u;
  y += v;
  
  if (y <= 0) {
    y = 0;
    v = -v;
  }
  
  if (y >= 470) {
    y = 470;
    v = -v;
  }
  
  if (x <= 40 && x >= 20 && y < m + 110 && y > m - 10) {
    u = -u + 0.2;
    v += (y - m - 45) / 20;
  }
  
  if (x <= 610 && x >= 590 && y < n + 110 && y > n - 10) {
    u = -u - 0.2;
    v += (y - n - 45) / 20;
  }
  
  if (x < -10) {
    b++;
    x = 360;
    y = 235;
    u = 5;
    w = 1;
  }
  
  if (x > 640) {
    a++;
    x = 280;
    y = 235;
    u = -5;
    w = 1;
  }
  


  context.fillText(a + " " + b, 266, 60);
  context.fillRect(20, m, 20, 100);
  context.fillRect(600, n, 20, 100);
  context.fillRect(x, y, 10, 10);
}, 30);




document.onkeydown = function(e) {
  const keyCode = (e || window.event).keyCode;
  w = w ? 0 : (keyCode === 27 ? 1 : 0);
  p = keyCode === 65 ? 5 : (keyCode === 81 ? -5 : p);
  q = keyCode === 40 ? 5 : (keyCode === 38 ? -5 : q);
};





document.onkeyup = function(e) {
  const keyCode = (e || window.event).keyCode;
  p = (keyCode === 65 || keyCode === 81) ? 0 : p;
  q = (keyCode === 38 || keyCode === 40) ? 0 : q;
};


