let drawing;
let pic;

async function setup() {
  createCanvas(1920, 1080);
  console.log("SETUP")
  
  drawing = await loadImage("drawing.png")
  console.log("HOLA")
  scaleCanvas();

}

// Scaling function made with chatGPT
function scaleCanvas() {
    let s = min(windowWidth / 1920, windowHeight / 1080);

    let canvas = document.querySelector("canvas");

    canvas.style.width = `${1920 * s}px`;
    canvas.style.height = `${1080 * s}px`;

    canvas.style.position = "absolute";
    canvas.style.left = `${(windowWidth - 1920 * s) / 2}px`;
    canvas.style.top = `${(windowHeight - 1080 * s) / 2}px`;
}

function windowResized() {
    scaleCanvas();
}

function preload() {
  console.log("HII")
  pic = "HIIIi"
  drawing = loadImage("drawing.png");
  console.log(drawing)
  
  //pic = new Picture(drawing)
}


function tween(a, b, t) {
  return a + (b - a)*t;
}

function getAdjustedPos(x, y, anchorX, anchorY) {
  return [x + (anchorX * windowWidth), y + (anchorY * windowHeight)]
}

function getAdjustedSize(x, y) {
  let avg = (windowWidth + windowHeight) / 2;
  avg /= 100
  
  return [x * avg, y * avg]
  
}

class Picture {
  constructor(image) {
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this.width = 50;
    this.height = 50;
  }



  

  drawToScreen() {
    pos = getAdjustedPos(0,0,.5,.5)
    size = getAdjustedSize(50, 50)
    image(this.image, pos[0], pos[1], size[0], size[1]);
  }
}


function draw() {
  noStroke()
  background(220);
  rectMode(CENTER)
  pos = getAdjustedPos(0,0,.5,.5)
  size = getAdjustedSize(50, 50)
  //rect(pos[0], pos[1], size[0], size[1])
  //console.log(pic)
  image(drawing, 50, 50)
  //console.log(drawing)
  
}