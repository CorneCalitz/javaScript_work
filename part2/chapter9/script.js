
let canvas = document.querySelector("#canvas"); 
let ctx = canvas.getContext("2d"); 

ctx.lineWidth = 2;

let colors = ['red', 'blue', 'green', 'orange', 'yellow'];

let x = 10;
let y = 10;
let w = 200;
let h = 100;

for (color of colors) {
    console.log(color);
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
    x += 10;
    y += 10;
    w -= 20;
    h -= 20;
}

canvas = document.querySelector("#canvas2");
ctx = canvas.getContext("2d");
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(150, 15);
ctx.lineTo(200, 100);
ctx.lineTo(100, 100);
ctx.fill()

canvas = document.querySelector("#canvas3");
ctx = canvas.getContext("2d");
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(150, 100, 50, 0 , Math.PI * 2, false);
ctx.fill();

canvas = document.querySelector("#canvas4");
ctx = canvas.getContext("2d")
ctx.lineWidth = 2;
ctx.strokeStyle = "red";

let width = canvas.width;
let height = canvas.height;

ctx.strokeRect(0, 0, width, height);
ctx.strokeStyle = "red";

let opacity = 1;

function drawCircle (x, y) {
    ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    ctx.fill();
}

canvas.addEventListener("click", e => {
    drawCircle(e.offsetX, e.offsetY);
});

document.querySelector('#clear').addEventListener('click', e => {
    ctx.clearRect(0, 0, width, height);
});

document.querySelector('#opacity').addEventListener('change', e => {
    opacity = e.target.value;
})

canvanAnimation  = document.querySelector("#canvas5");
ctxAnim = canvanAnimation.getContext("2d")
ctxAnim.lineWidth = 2;
ctxAnim.strokeStyle = "red";
ctxAnim.strokeRect(0, 0, width, height);

let xAnim = 0;
let yAnim = 0;

function drawCircleAnim(x, y) { 
  ctxAnim.fillStyle = "rgb(0, 128, 255)"; 
  ctxAnim.beginPath(); 
  ctxAnim.arc(x, y, 10, 0, Math.PI * 2, false); 
  ctxAnim.lineWidth = 2;
  ctxAnim.strokeStyle = "red";
  ctxAnim.strokeRect(0, 0, width, height);
  ctxAnim.fill(); 
} 

function update() { 
  x += 1; 
  y += 1; 
} 

function draw() { 
  ctxAnim.clearRect(0, 0, width, height); 
  drawCircleAnim(x, y); 
} 

setInterval(() => { 
  update(); 
  draw(); 
}, 100);



