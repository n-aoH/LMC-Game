let drawing;
let pic;
let font;
let stage;
let fileOpen;
let trust;
let words;
let titlePic;

async function setup() {
  trust = 5;
  stage = 0;
  fileOpen = false;
  words = [new Word("Atrocia", true), new Word("patriotic", true), new Word("successful", true)
      , new Word("glory", true), new Word("operation", true), new Word("victory", true), new Word("Ferocia", false),
    new Word("discrimination", false), new Word("war crime", false), new Word("suspension", false), new Word("casualties", false),
    new Word("school", false), new Word("bombs", false), new Word("children", false), new Word("inferior", true)];

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
  signInPicAlt.setVisible(false);
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
  mainInteractionHeader.setPosition(260, 100);
  mainInteractionHeader.setName("mainInteractionHeader");
  mainInteractionPictures.push(mainInteractionHeader);

  liveReactionWindow = new Picture(await loadImage("guis/liveReactionWindow.png"));
  liveReactionWindow.setPosition(1630, 300);
  liveReactionWindow.setName("liveReactionWindow");
  mainInteractionPictures.push(liveReactionWindow);

  toolbox = new Picture(await loadImage("guis/toolbox.png"));
  toolbox.setPosition(1630, 820);
  toolbox.setName("toolbox");
  mainInteractionPictures.push(toolbox);

  trustBar = new Picture(await loadImage("guis/trustBar.png"));
  trustBar.setPosition(width / 2, 1000);
  trustBar.setName("trustBar");
  mainInteractionPictures.push(trustBar);

  leftPromptBarPlaceholder = new Picture(await loadImage("guis/leftPromptBarPlaceholder.png"));
  leftPromptBarPlaceholder.setPosition(260, 300);
  leftPromptBarPlaceholder.setName("leftPromptBarPlaceholder");
  mainInteractionPictures.push(leftPromptBarPlaceholder);

  fileButton = new Picture(await loadImage("guis/fileButton.png"));
  fileButton.setPosition(707, 350);
  fileButton.setName("fileButton");
  mainInteractionPictures.push(fileButton);
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
// Written by Marcus
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
  let settingsX = width / 2;
  let settingsY = 1.25 * (height / 2);
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
// Written by Marcus
function drawPrompt(prompt) {
  let promptX = 565;
  let promptY = 220;
  fill(255);
  textSize(25);
  textAlign(LEFT);
  text(prompt, promptX, promptY);
}
// Written by Marcus
function drawTrust() {
  fill(111, 232, 93);
  rect(102, 1000, trust/100 * 1805, 12, 30);
  fill(170);
  textSize(30);
  text("trust_", 60, 965);
}
// Written by Marcus
function mainInteractionButtons() {
  //file button
  let fileX = 707;
  let fileY = 350;
  if (!fileOpen && mouseX > fileX - 142 && mouseX < fileX + 142
    && mouseY > fileY - 64 && mouseY < fileY + 64) {
    // rect(settingsX, settingsY, 250, 60);
    if (mouseIsPressed) {
      // file opens
      fileOpen = true;
    }
  } 
}
// Written by Marcus
function drawInteraction(loopTime) {
  if (fileOpen) {
    // interaction bg
    let drawTime = millis();
    fill(0);
    rect(width / 2, height / 2, 1700, 1000, 50);
    
    // draw words
    while (true) {
      if (drawTime > loopTime + 1000) {
        fill(200);
        text("Click on the bad words to scrub them! ;)\nxoxo\n-Atty\nDrawTime: " +
          drawTime + "\nLoopTime: " + loopTime + "\nWords: " + words.length, 200, 150);
        for (let i = 0; i < words.length; i++) {
          if (words[i].getGood()) {
            fill(255);
          } else {
            fill(255, 0, 0);
          }
          let textX = (1920 - 1200) / 2 + (Math.random() * 1200);
          let textY = (1080 - 800) / 2 + (Math.random() * 800);
          words[i].setPos(textX, textY);
          text(words[i].getWord(), words[i].getX(), words[i].getY());
        }
        break; // breaks while loops after drawing words once
      }
      drawTime = millis();
    }
    for (let i = 0; i < words.length; i++) {
      if (mouseX > words[i].getX() - 50 && mouseX < words[i].getX() + 50
        && mouseY > words[i].getY() - 30 && mouseY < words[i].getY() + 30) {
        fill(255, 255, 255, 50);
        rect(textX, textY, 100, 60);
        if (mouseIsPressed) {
          // scrub it
          words.splice(i, 1);
        }
      }
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
    // image(this.pic, this.x, this.y);
    if (this.visible) {
      image(this.pic, this.x, this.y);
    }
    if (this.text != "") {
      text(this.text, this.x, this.y);
    }
  }
}
// Written by Marcus
class Word {
  constructor(str, good) {
    this.word = str;
    this.good = good;
    this.x = 0;
    this.y = 0;
  }
  getWord() {
    return this.word;
  }
  getGood() {
    return this.good;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  setPos(x, y) {
    this.x = x;
    this.y = y;
  } 
}

function draw() {
  noStroke();
  background(11);
  rectMode(CENTER);
  //console.log(titleScreenPictures)
  
  // Written by Marcus
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
    drawPrompt("Hello.\nPlease scrub all of the bad words from the attached file.");
    mainInteractionButtons();
    drawTrust();
    for (let i = 0; i < mainInteractionPictures.length; i++) {
      //console.log(mainInteractionPictures[i].x)
      mainInteractionPictures[i].tweenPos(0.1);
      mainInteractionPictures[i].draw();
    }
    drawInteraction(millis());
  }
}