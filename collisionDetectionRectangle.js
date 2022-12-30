let body = document.querySelector("body");
body.style.background = "#01020e";
let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext("2d");


window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
})

const mouse = {
  x : undefined,
  y : undefined
}

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
})



function animation(){
  requestAnimationFrame(animation);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle = "cyan";
  ctx.fillRect(mouse.x,mouse.y,100,100);
  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width/2-50, canvas.height/2-50,100,100);
  
  if(mouse.x+100 >= canvas.width/2-50 && (canvas.width/2-(50))+100 >= mouse.x && mouse.y+100 >= canvas.height/2-50 && (canvas.height/2-(50))+100 >= mouse.y)  {
    console.log("collied");
  }
  
  
}


animation();