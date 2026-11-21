let drawing;
let pic;
let font;
let stage;
let titlePic

async function setup() {
  stage = 0;

  createCanvas(1920, 1080);
  console.log("SETUP");
  
  drawing = await loadImage("drawing.png");
  console.log("HOLA");
  imageMode(CENTER);
  scaleCanvas();

  font = await loadFont("SpaceGrotesk-Light.ttf");
  console.log(font);
  textFont(font);

  pic = new Picture(drawing);
  pic.setPosition(900, 400);
  pic.setName("drawing");
  //titleScreenPictures.push(pic);

  titlePic = new Picture(await loadImage("guis/talkAsSparrow.png"));
  titlePic.setPosition(width / 2, 350);
  titlePic.setName("titlePic");
  titleScreenPictures.push(titlePic);

  signInPic = new Picture(await loadImage("guis/signIn.png"));
  signInPic.setPosition(width / 2, 550);
  signInPic.setName("signIn");
  titleScreenPictures.push(signInPic);

  signInPicAlt = new Picture(await loadImage("guis/glowySignIn.png"));
  signInPicAlt.setPosition(width / 2, 550);
  signInPicAlt.setName("glowySignIn");
  titleScreenPictures.push(signInPicAlt);

  linePic = new Picture(await loadImage("guis/lineGradient.png"));
  linePic.setPosition(width / 2, 630);
  linePic.setName("lineGradient");
  titleScreenPictures.push(linePic);

  // main
  chatBox = new Picture(await loadImage("guis/boxWidget.png"));
  chatBox.setPosition(width / 2, 820);
  chatBox.setName("chatBox");
  mainInteractionPictures.push(chatBox);

  mainInteractionHeader = new Picture(await loadImage("guis/mainInteractionHeader.png"));
  mainInteractionHeader.setPosition(300, 100);
  mainInteractionHeader.setName("mainInteractionHeader");
  mainInteractionPictures.push(mainInteractionHeader);
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
  return a + (b - a) * t;
}

function getAdjustedPos(x, y, anchorX, anchorY) {
  return [x + (anchorX * windowWidth), y + (anchorY * windowHeight)];
}

function getAdjustedSize(x, y) {
  let avg = (windowWidth + windowHeight) / 2;
  avg /= 100;
  
  return [x * avg, y * avg];
  
}

function titleScreenButtons() {
  if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100
    && mouseY > 550 - 30 && mouseY < 550 + 30) {
      if (mouseIsPressed) {
        stage++;
      }
    // for (let i = 0; i < titleScreenPictures.length; i++) {
    //   if (titleScreenPictures[i].name == "signIn") {
    //     titleScreenPictures[i].setVisible(false);
    //   }
    //   if (titleScreenPictures[i].name == "glowySignIn") {
    //     titleScreenPictures[i].setVisible(true);
    //   }
    // }
  }
  // for (let i = 0; i < titleScreenPictures.length; i++) {
  //   if (titleScreenPictures[i].name == "signIn") {
  //     titleScreenPictures[i].setVisible(true);
  //   }
  //   if (titleScreenPictures[i].name == "glowySignIn") {
  //     titleScreenPictures[i].setVisible(false);
  //   }
  // }
  //settings button
  settingsX = width / 2;
  settingsY = 1.25 * (height / 2);
  fill(173);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Settings", settingsX, settingsY);
  fill(255, 255, 255, 100);
  if (mouseX > settingsX - 125 && mouseX < settingsX + 125
    && mouseY > settingsY - 30 && mouseY < settingsY + 30) {
    rect(settingsX, settingsY, 250, 60);
    if (mouseIsPressed) {
      // settings menu
    }
  }
}

// store picture assets
titleScreenPictures = [];
mainInteractionPictures = [];

class Picture {
  constructor(image) {
    this.pic = image;
    this.name = "";
    this.x = 0;
    this.y = 0;
    this.tweenX = 0;
    this.tweenY = 0;
    this.text = "";
    this.visible = true;
  }
  
  setName(name) {
    this.name = name;
  }

  setVisible(v) {
    this.visible = v;
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
    image(this.pic, this.x, this.y);
    // if (visible) {
    //   image(this.pic, this.x, this.y);
    // }
    if (this.text != "") {
      text(this.text, this.x, this.y);
    }
  }
}


function draw() {
  noStroke();
  background(11);
  rectMode(CENTER);
  //console.log(titleScreenPictures)
  
  // titleScreen
  if (stage == 0) {
    titleScreenButtons();
    for (let i = 0; i < titleScreenPictures.length; i++) {
      //console.log(titleScreenPictures[i].x)
      titleScreenPictures[i].tweenPos(0.1);
      titleScreenPictures[i].draw();
      
    }
  } else if (stage == 1) {
    // main interaction demo
    for (let i = 0; i < mainInteractionPictures.length; i++) {
      //console.log(mainInteractionPictures[i].x)
      mainInteractionPictures[i].tweenPos(0.1);
      mainInteractionPictures[i].draw();
    }
  }
}