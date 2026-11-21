

let drawing;
let pic;

let titlePic

async function setup() {
  createCanvas(1920, 1080);
  console.log("SETUP")
  
  drawing = await loadImage("drawing.png")
  console.log("HOLA")
  imageMode(CENTER)
  scaleCanvas();

  font = loadFont("SpaceGrotesk-Light.ttf");
  console.log(font);
  //textFont(font);

  pic = new Picture(drawing)
  pic.setPosition(900, 400);
  //pictures.push(pic);

  titlePic = new Picture(await loadImage("guis/talkAsSparrow.png"));
  titlePic.setPosition(900,350);
  pictures.push(titlePic);


  

  signInPic = new Picture(await loadImage("guis/signIn.png"));
  signInPic.setPosition(900,550)
  pictures.push(signInPic)

  linePic = new Picture(await loadImage("guis/lineGradient.png"));
  linePic.setPosition(900,630);
  pictures.push(linePic);


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
    this.pic = image;
    this.x = 0;
    this.y = 0;
    this.tweenX = 0;
    this.tweenY = 0;
    this.text = "";
  }

  setText(str) {
    this.text = str;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.tweenX = x;
    this.tweenY = y;
  }

  tweenTo(x,y) {
    this.tweenX = x;
    this.tweenY = y;
  }

  tweenPos(t) {
    this.x = this.x + (this.tweenX - this.x) * t;
    this.y = this.y + (this.tweenY - this.y) * t;
  }

  draw() {
    image(this.pic, this.x, this.y)
    if (this.text != "") {
      text(this.text, this.x, this.y)
    }
  }
}


function draw() {
  noStroke()
  background(11);
  rectMode(CENTER)

  //console.log(pictures)
  
  for (let i = 0; i < pictures.length; i++) {
    //console.log(pictures[i].x)
    pictures[i].tweenPos(0.1);
    pictures[i].draw();
    
  }
}