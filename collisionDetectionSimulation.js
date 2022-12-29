let body = document.querySelector("body");

let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let ctx = canvas.getContext("2d");


window.addEventListener('resize', function() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
})

const mouseCoordinate = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event) {
  mouseCoordinate.x = event.x;
  mouseCoordinate.y = event.y;
})
////////////////////////////////////////RESOLVING COLLISION /////////////////////////////////////////////////////
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}


function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}


class Particle {
  constructor(x, y, radii, color, particles) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: 1,
      y: 1
    }
    this.radii = radii;
    this.color = color
    this.particles = particles
    this.mass = 1;
    this.opacity = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radii, 0, 2 * Math.PI, false);
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore();
    ctx.strokeStyle = this.color;
    ctx.stroke();

  }

  update() {
    this.draw();

    // collision detection
    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;
      if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - (this.radii * 2) < 0){
        this.opacity = 0.2;
        particles[i].opacity = 0.2;
        resolveCollision(this,particles[i])
      }
    }

    if (this.x - this.radii <= 0 || this.x + this.radii >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radii <= 0 || this.y + this.radii >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }

     // checking every coordiate with mouse coordinate
    if(getDistance(mouseCoordinate.x, mouseCoordinate.y, this.x, this.y) < 120 && this.opacity < 0.2){
      this.opacity += 0.02;
    }
    else if(this.opacity > 0){
      this.opacity -= 0.02;
      this.opacity = Math.max(0, this.opacity);
    }


    this.x += this.velocity.x;
    this.y += this.velocity.y;


  }

}

// some globals
let particles;
let colors = ["#7d3e12", "#3a7d44", "#511a3b", "#6a0000", "#697a1e"]


// getting distace of circle
function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

// intializing particles

function init() {
  particles = [];
  const radius = 15;

  for (let i = 0; i < 100; i++) {
    let x = Math.floor(Math.random() * innerWidth);
    let y = Math.floor(Math.random() * innerHeight);
    const color = Math.floor(Math.random()*5);

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (getDistance(x, y, particles[j].x, particles[j].y) - (radius * 2) < 0) {
          x = Math.floor(Math.random() * innerWidth);
          y = Math.floor(Math.random() * innerHeight);
          j--;
        }
      }
    }
    let particle = new Particle(x, y, radius, colors[color], particles);
    particles.push(particle);

  }

}



function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

init();

animation();