let body = document.querySelector("body");

let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext("2d");


window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
})

const mouseCoordinate = {
  x : undefined,
  y : undefined
}

window.addEventListener('mousemove', function (event) {
  mouseCoordinate.x = event.x;
  mouseCoordinate.y = event.y;
})


class Circle {
  constructor(x,y,radii,color) {
    this.x = x;
    this.y = y;
    this.radii = radii;
    this.color = color
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radii, 0, 2*Math.PI, false);
    // ctx.strokeStyle = "white";
    // ctx.stroke();
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update(){
    
    this.draw();
    
  }
}

let circles = [];

let colors = ["#FD8A8A","#A8D1D1","#9EA1D4","#F1F7B5","#2B3467"]

let circle1;
let circle2;

function init(){
  circle1 = new Circle(500,300,75,"blue");
  circle2 = new Circle(10,10,25,"yellow")
}

// getting distace of circle

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2-x1;
  let yDistance = y2-y1;
  return Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance, 2))
}

function animation(){
  requestAnimationFrame(animation);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  circle1.update();
  circle2.x = mouseCoordinate.x;
  circle2.y = mouseCoordinate.y;
  
  circle2.update();
  console.log(getDistance(circle1.x,circle1.y, circle2.x, circle2.y))
  if(getDistance(circle1.x,circle1.y, circle2.x, circle2.y) < 100){
    circle1.color = "yellow"
  }
  else{
    circle1.color = "blue"
  }
  
}

init();

animation();