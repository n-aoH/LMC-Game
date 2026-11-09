let drawing;
let pic;

async function setup() {
  createCanvas(1920, 1080);
  console.log("SETUP")
  
  drawing = await loadImage("drawing.png")
  console.log("HOLA")
  imageMode(CENTER)
  scaleCanvas();

  pic = new Picture(drawing)
  pic.setPosition(900, 400);
  pictures.push(pic);

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
  console.log(drawing);
  
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

pictures = [];

class Picture {
  constructor(image) {
    self.pic = image;
    self.x = 0;
    self.y = 0;
    self.tweenX = 0;
    self.tweenY = 0;
  }

  setPosition(x, y) {
    self.x = x;
    self.y = y;
    self.tweenX = x;
    self.tweenY = y;
  }

  tweenTo(x,y) {
    self.tweenX = x;
    self.tweenY = y;
  }

  tweenPos(t) {
    self.x = self.x + (self.tweenX - self.x) * t;
    self.y = self.y + (self.tweenY - self.y) * t;
  }

  draw() {
    image(self.pic, self.x, self.y)
  }
}


function draw() {
  noStroke()
  background(220);
  rectMode(CENTER)
  //rect(pos[0], pos[1], size[0], size[1])
  //console.log(pic)
  
  //image(drawing, 960, 540)
  //console.log(drawing)

  //console.log(pictures)
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].tweenPos(0.1);
    pictures[i].draw();
    pictures[i].tweenTo(mouseX, mouseY);
  }
}