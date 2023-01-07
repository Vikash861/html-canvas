import { noise } from '/perlinNoiseFunction.js';

let body = document.querySelector("body");

let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext("2d");


window.addEventListener('resize', function() {
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



class Circle {
  constructor(x, y, radii, color, offset) {
    this.x = x;
    this.y = y;
    this.radii = radii;
    this.color = color
    this.offset = offset
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radii, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {

    this.draw();

  }
}



function getRandomColor() {
  var hue = Math.floor(Math.random() * 360);
  return 'hsl(' + hue + ', 50%, 50%)';
}
const circles = []

for(let i = 0; i < 50; i++){
  // console.log()
  circles.push(new Circle(-50,-50, 10,getRandomColor(), i*0.01));
}



let time = 0;

function animation() {
  requestAnimationFrame(animation);
  // ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  circles.forEach(circle=>{
    circle.draw();
    circle.x = noise(time + circle.offset + 20) * canvas.width;
    circle.y = canvas.height * noise(time);
  })
  
  // circle.draw();
  // circle.x = canvas.width * noise(time + 20)
  // circle.y = canvas.height * noise(time)
  time += 0.010;
  // console.log(time)

}

animation();