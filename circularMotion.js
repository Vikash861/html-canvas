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


function intFromRange(min, max){
  return Math.floor((Math.random() * (max-min)+1)+min);
}


function Particle(x, y,radius, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radians = Math.random() * (Math.PI * 2);
  this.velocity = 0.05;
  this.radius = (Math.random() * 3) + 1;
  this.distanceFromCenter = intFromRange(60,120);

 this.update =()=> {
    let lastPoint = {
      x : this.x,
      y : this.y
    }

    // move points over time
    this.radians += this.velocity;
  
    // for drag effect
    // console.log(this.lastMouse.x);
    // console.log(this.lastMouse.y);

    // this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.5;
    // this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.5;
  
    // for circular motion
    this.x =  mouse.x + Math.cos(this.radians)*this.distanceFromCenter;
    this.y =  mouse.y + Math.sin(this.radians)*this.distanceFromCenter;
    this.draw(lastPoint);
  }

  this.draw = (lastPoint)=> {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke()
    ctx.closePath();
  }


}

let particles;
let colors = ["#FD8A8A", "#F1F7B5", "#A8D1D1", "#9EA1D4", "#F8FFDB"]

function init(){
  particles = [];
  for (let i = 0; i < 50; i++) 
     particles.push(new Particle(canvas.width/2, canvas.height/2,7,colors[Math.floor(Math.random()*4)]));
}



function animation(){
  requestAnimationFrame(animation);
  // ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle = "rgba(1,2,14,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  particles.forEach(particle=>{
    particle.update();
  })
}


init();

animation();