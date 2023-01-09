
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


const gravity = 0.05;
const friction = 0.99;


class Circle {
  constructor(x, y, radii, color, velocity) {
    this.x = x;
    this.y = y;
    this.radii = radii;
    this.color = color;
    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globaaAplha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radii, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore();
  }

  update() {
    this.draw();
    this.velocity.y *= friction;
    this.velocity.x *= friction;
    this.velocity.y += gravity;
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.alpha -= 0.0005;
  }
}



function getRandomColor() {
  var hue = Math.floor(Math.random() * 360);
  return 'hsl(' + hue + ', 50%, 50%)';
}



const circles = []


  
function animation() {
  requestAnimationFrame(animation);
  // ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  circles.forEach((circle, index)=>{
    if(circle.alpha > 0){15
      circle.update();
    }else{
      circles.splice(index,1)
    }
  })

  

}

animation();


window.addEventListener('click', function(event) {
  
let radians = 2 * Math.PI/100;
  console.log(circles) 
  for(let i = 0; i < 200; i++){
    circles.push(new Circle(event.clientX, event.clientY, Math.random()*10, getRandomColor(),{
      x:Math.cos(radians * i) * Math.random() * 10,
      y:Math.sin(radians * i) * Math.random() * 10
    }));
  }
  
});