let body = document.querySelector("body");
// body.style.backgroundColor = "#0e1525";

let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext("2d");
// c.fillRect(x,y,w,h)
// changing rectangle color 
// ctx.fillStyle = "white";
// ctx.fillRect(10, 20, 100, 100);
// ctx.fillRect(150, 20, 100, 100);
// ctx.fillStyle = "red ";
// ctx.fillRect(300, 20, 100, 100);
// ctx.fillRect(40, 20, 100, 100);

// console.log(ctx)


// Lines
// ctx.beginPath();
// ctx.moveTo(300, 400);
// ctx.lineTo(900, 200);

// ctx.moveTo(300, 200);
// ctx.lineTo(100, 0);
// ctx.lineTo(200, 500);
// ctx.lineTo(500, 100);
// ctx.moveTo(100, 600);
// ctx.lineTo(1000, 600);
// ctx.lineTo(350, 20);
// changing line color
// ctx.strokeStyle = "white";
// ctx.stroke();

// drawing arcs / circle
// ctx.arc(x, y, radius, startAngle, endAngle, couterClockwise)
// const PI = Math.PI;

// ctx.beginPath();
// ctx.arc(900,300,50,0,2*PI,false);
// ctx.arc(900,300,70,0,2*PI,false);
// ctx.stroke();

// creating hundred diffrerent circles
// for (let i = 0; i < 25; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   ctx.beginPath();
//   ctx.arc(x,y,50,0,2*PI,false);
//   ctx.strokeStyle = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
//   ctx.stroke();
// }

// creating hundreds of lines
// for (let i = 0; i < 100; i++) {
//   let xB = Math.floor(Math.random() * window.innerWidth);
//   let yB = Math.floor(Math.random() * window.innerHeight);
//   let xE = Math.floor(Math.random() * window.innerWidth);
//   let yE = Math.floor(Math.random() * window.innerHeight);
//   ctx.beginPath();
//   ctx.moveTo(xB, yB);
//   ctx.lineTo(xE, yE);
//   ctx.strokeStyle = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
//   ctx.stroke();
// }


window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
})


// coordinate of x and y

const mouseCoordinate = {
  x : undefined,
  y : undefined
}

window.addEventListener('mousemove', function (event) {
  mouseCoordinate.x = event.x;
  mouseCoordinate.y = event.y;
})


class Circle {
  constructor(x,y,dx,dy,maxRadii, radii,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.maxRadii = maxRadii;
    this.minRadii = 8;
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

    if(this.x-this.radii < 0 || this.x+this.radii > innerWidth){
      this.dx = -this.dx;
    }

    if(this.y-this.radii < 0 || this.y+this.radii > innerHeight){
      this.dy = -this.dy;
    }
    
    this.x += this.dx;
    this.y += this.dy;


    // interactivity
    
    if(mouseCoordinate.x - this.x < 100 && mouseCoordinate.y - this.y < 100 && mouseCoordinate.x-this.x > -100 && mouseCoordinate.y-this.y > -100){
      if(this.radii < this.maxRadii)this.radii += 1
    }
    else if(this.radii > this.minRadii){
       this.radii -= 1
    }
    
    this.draw();
    
  }
  
  
}



let circles = [];

let colors = ["#FD8A8A","#A8D1D1","#9EA1D4","#F1F7B5","#2B3467"]

for (let i = 0; i < 300; i++) {
  let x = Math.floor(Math.random() * innerWidth);
  let y = Math.floor(Math.random() * innerHeight);
  let dx = Math.floor(Math.random() * 10);
  let dy = Math.floor(Math.random() * 10);
  let radii = Math.floor(Math.random() * 15);
  let color = colors[Math.floor(Math.random() * 5)];
  let circle = new Circle(x, y, dy, dx, 100,radii,color);
  circles.push(circle);
}

function animation(){
  requestAnimationFrame(animation);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(let i = 0; i < circles.length; i++){
    circles[i].update();
  }
}

animation();