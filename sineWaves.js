let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
})

let body = document.querySelector("body");
// body.style.background = "#01020e";

let slidersContainer = document.createElement('div');
let sliders = `
<div>
 Y:<input type="range" min="1" max= ${canvas.height} value= ${canvas.height/2} class="slider" id="y">
 <br>
 Lenght:<input type="range" min="-0.01" step="0.001" max="0.01" value="0.01" class="slider" id="lenght">
  <br>
  Amplitude:<input type="range" min="-300" max="300" value="100" class="slider" id="amplitude">
  <br>
  Frequency:<input type="range" min="-0.01" step="0.01" max="1" value="0.01" class="slider" id="frequency">
  </div>
  <div>
  h:<input type="range" min="0" step="1" max="255" value="255" class="slider" id="h">
    <br>
  s:<input type="range" min="0" step="1" max="100" value="50" class="slider" id="s">
    <br>
  l:<input type="range" min="0" step="1" max="100" value="50" class="slider" id="l">
      <br>
  r:<input type="range" min="0" step="1" max="255" value="50" class="slider" id="r">
      <br>
  g:<input type="range" min="0" step="1" max="255" value="50" class="slider" id="g">
      <br>
  b:<input type="range" min="0" step="1" max="255" value="50" class="slider" id="b">
      <br>
  alpha:<input type="range" min="0" step="0.01" max="1" value="0.01" class="slider" id="alpha">
  </div>
`;
slidersContainer.innerHTML = sliders;
slidersContainer.classList.add('styleSlidersCont');
body.appendChild(slidersContainer);

let ctx = canvas.getContext("2d");



let increment = Number(frequency.value);

function animation() {
  requestAnimationFrame(animation);
  // ctx.clearRect(-10, 0, innerWidth, innerHeight);
  ctx.fillStyle = `rgba(${r.value},${g.value},${b.value},${alpha.value})`;
  ctx.fillRect(0,0,innerWidth, innerHeight)
  ctx.beginPath();
  ctx.moveTo(0,canvas.height/2);
  for(let i = -10; i < canvas.width; i++){
  ctx.lineTo(i, Number(y.value) + Math.sin(i * Number(lenght.value) + increment) *       Number(amplitude.value) * Math.sin(increment));
      ctx.lineTo(i, (Number(y.value) + Math.sin(i * Number(lenght.value) + increment) *       Number(amplitude.value) * Math.sin(increment))+1);
    
  let hue = Math.abs(Number(h.value) * Math.sin(increment));
    // console.log(hue)
  ctx.strokeStyle = `hsl(${hue},${Number(s.value)}%,${Number(l.value)}%)`
  ctx.stroke();
  }
  
  // console.log(hue);
   increment += Number(frequency.value);
  

  
}
animation();
