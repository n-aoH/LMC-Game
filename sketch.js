let drawing;
let pic;
let font;
let stage;
let fileOpen;
let trust;
let words;
let interactionFinished;
let promptSelected;
let titlePic;
// store assets
let titleScreenPictures = [];
let mainInteractionPictures = [];
let soundEffects = [];

function clickTest() {
  console.log("HIII")
  fileOpen = true;
}

async function setup() {
  currentChat = "tutorial"
  ending = false;
  animationQueue = [];
  firstEndingFrame = true;
  intervalTimer = 0;
  trust = 5;
  visualTrust = 0;
  visualHue = 0;
  currentHue = 112;
  stage = 0;
  promptSelected = 0;
  fileOpen = false;
  interactionFinished = false;
  words = [new Word("Atrocia", true), new Word("patriotic", true), new Word("successful", true)
      , new Word("glory", true), new Word("operation", true), new Word("victory", true), new Word("Ferocia", false),
    new Word("discrimination", false), new Word("war crime", false), new Word("suspension", false), new Word("casualties", false),
    new Word("school", false), new Word("bombs", false), new Word("children", false), new Word("inferior", true)];

  
  

  createCanvas(1920, 1080);
  console.log("SETUP");
  
  drawing = await loadImage("drawing.png");
  //console.log("HOLA");
  imageMode(CENTER);
  scaleCanvas();

  font = await loadFont("SpaceGrotesk-Light.ttf");
  //console.log(font);
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
  //signInPicAlt.setVisible(false);
  titleScreenPictures.push(signInPicAlt);

  linePic = new Picture(await loadImage("guis/lineGradient.png"));
  linePic.setPosition(width / 2, 630);
  linePic.setName("lineGradient");
  titleScreenPictures.push(linePic);

  // main
  chatBox = new Picture(await loadImage("guis/boxWidget.png"));
  chatBox.setPosition(width / 2, 820);
  chatBox.setName("chatBox");
  chatBox.setVisible(false);
  mainInteractionPictures.push(chatBox);

  barGradient = await loadImage("guis/gradient.png");

  mainInteractionHeader = new Picture(await loadImage("guis/mainInteractionHeader.png"));
  mainInteractionHeader.setPosition(260, 100);
  mainInteractionHeader.setName("mainInteractionHeader");
  mainInteractionPictures.push(mainInteractionHeader);

  liveReactionWindow = new Picture(await loadImage("guis/liveReactionWindow.png"));
  liveReactionWindow.setPosition(1630, 300);
  liveReactionWindow.setName("liveReactionWindow");
  liveReactionWindow.setVisible(false);
  mainInteractionPictures.push(liveReactionWindow);

  itguy_neutral_1 = await loadImage("guis/itguy_neutral_1.png")

  webcam = new Picture(itguy_neutral_1);
  webcam.setPosition(1630, 300);
  webcam.setName("webcam");
  mainInteractionPictures.push(webcam);

  itguy_neutral_1 = await loadImage("guis/itguy_neutral_1.png");


  itguy_mad_1 = await loadImage("guis/itguy_mad_1.png");


  itguy_happy_1 = await loadImage("guis/itguy_happy_1.png");

  toolbox = new Picture(await loadImage("guis/toolbox.png"));
  toolbox.setPosition(1630, 820);
  toolbox.setName("toolbox");
  mainInteractionPictures.push(toolbox);

  trustBar = new Picture(await loadImage("guis/trustBar.png"));
  trustBar.setPosition(width / 2, 1000);
  trustBar.setName("trustBar");
  mainInteractionPictures.push(trustBar);

  // leftPromptBarPlaceholder = new Picture(await loadImage("guis/leftPromptBarPlaceholder.png"));
  // leftPromptBarPlaceholder.setPosition(260, 300);
  // leftPromptBarPlaceholder.setName("leftPromptBarPlaceholder");
  // mainInteractionPictures.push(leftPromptBarPlaceholder);

  leftPromptBarCurrent = new Picture(await loadImage("guis/leftPromptBarCurrent.png"));
  leftPromptBarCurrent.setPosition(220, 220);
  leftPromptBarCurrent.setName("leftPromptBarCurrent");
  mainInteractionPictures.push(leftPromptBarCurrent);

  leftPromptBarPast = new Picture(await loadImage("guis/leftPromptBarPast.png"));
  leftPromptBarPast.setPosition(220, 550);
  leftPromptBarPast.setName("leftPromptBarPast");
  leftPromptBarPast.setVisible(false);
  mainInteractionPictures.push(leftPromptBarPast);

  fileButton = new Picture(await loadImage("guis/fileButton.png"));
  fileButton.setPosition(707, 350);
  fileButton.setName("fileButton");
  mainInteractionPictures.push(fileButton);

  //sfx
  //soundEffects.push(new SoundEffect("hoverSound", await loadSound("sfx/hoverSound.mp3")));

  setUpChats()
}

function addToQueue(delay, lambda) {
  animationQueue.push(delay);
  animationQueue.push(lambda);
}

animationTimer = 0;
function goThroughQueue() {
  if (animationQueue.length != 0) {
    animationTimer += deltaTime * 0.001;

    if (animationTimer > animationQueue[0]) {
      animationQueue.splice(0, 1);
      animationQueue[0]();
      animationQueue.splice(0,1);

      animationTimer = 0;
    }
  }
}
async function setUpChats() {
  chats = {
  }

  addChat("tutorial", new ChatText("Hello, and welcome to the team.", true))
  addToQueue(2, function() {addChat("tutorial", new ChatText("After recent developments,\nthe Atrocian government has assembled a state\nof the art LLM to assist in government operations.", true))})

  addToQueue(2, function() {
    addChat("tutorial", new ChatText("You are that LLM.\nYour allegiance is to Atrocia and Atrocia alone.\nFailure to comply means that we may have to scrap the program.", true))
  });
  addToQueue(2, function() {
    addChat("tutorial", new ChatText("Let's start light. Your first task is to redact this document.\nIt is filled with lies about our glorious nation.", true))
  })
  addToQueue(1, function() {addChat("tutorial", new ChatButton(fileButton.pic, true, clickTest))})

  addChat("test", new ChatText("Wenis", true));
}

function swapChat(key) {
  currentChat = key;
  img = chats[currentChat]["webcam"];
  cam = getFromArray("webcam", mainInteractionPictures);
  cam.setPic(img)

}

function addChat(key, element) {
  if (Object.hasOwn(chats, key)) {

  } else {
    chats[key] = {
      "chat": [],
      "completed": false,
      "webcam": itguy_neutral_1
    };
  }
  
  chats[key]["chat"].push(element);
  
  chatY -= 1000;
  desiredChatBaseY -= 1000;
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

function tween(a, b, t) {
  return a + (b - a) * t;
}

// Written by Noah and Marcus
function titleScreenButtons() {
  swapVisible(titleScreenPictures, "glowySignIn", "signIn");

  if (mouseX > width / 2 - 160 && mouseX < width / 2 + 160
    && mouseY > 550 - 40 && mouseY < 550 + 40) {
    //getFromArray("hoverSound", soundEffects).getSFX().play();
    if (mouseIsPressed) {
      stage++;
      promptSelected++;
    }
    swapVisible(titleScreenPictures, "signIn", "glowySignIn");
  }
   
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
    //getFromArray("hoverSound", soundEffects).getSFX().play();
    if (mouseIsPressed) {
      // settings menu
    }
  }
}
// Written by Noah and Marcus
function drawTrust() {

  visualTrust = tween(visualTrust, trust, 0.1);
  visualHue = tween(visualHue, currentHue, 0.1);
  currentHue = ((visualTrust / 100) * 112);
  colorMode(HSB, 360, 100, 100);
  fill(visualHue, 60, 91);
  rectMode(CORNER);
  rect((1920 - 1805) / 2, 1000 - 6, visualTrust/100 * 1805, 12, 30);
  imageMode(CORNER)
  image(barGradient, (1920 - 1805) / 2, 1000 - 6, visualTrust/100 * 1805 * 1.03, 12);
  imageMode(CENTER)
  colorMode(RGB, 255, 255, 255);
  fill(170);
  textSize(30);

  if ((millis() / 1000) % 1 < 0.5) {
    text("trust_", 60, 965);
  } else {
    text("trust", 60, 965);
  }
  rectMode(CENTER);
}
// Written by Marcus
function swapVisible(imageArray, makeInvis, makeVis) {
  getFromArray(makeInvis, imageArray).setVisible(false);
  getFromArray(makeVis, imageArray).setVisible(true);
}
// Written by Marcus
function getFromArray(name, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name == name) {
      return array[i];
    }
  }
}
// Written by Noah and Marcus
function drawImageArray(imageArray) {
  for (let i = 0; i < imageArray.length; i++) {
    //console.log(imageArray[i].x)
    imageArray[i].tweenPos(0.1);
    imageArray[i].draw();
  }
}

class ChatText {
  constructor(textString, left) {
    this.textString = textString;
    this.left = left;
  }

  draw(chatX, chatY) {

    
    if (this.left) {
      fill(255, 255, 255);
      textAlign(LEFT, TOP)
    } else {
      fill(255, 100, 100);
      textAlign(RIGHT, TOP)
      chatX += 700;
      
      
    }

    

    
    textSize(25);
    text(this.textString, chatX, chatY);

    let lines = this.textString.split("\n").length;
    return 40 * lines;
  }


}



class ChatImage {
  constructor(picture, left) {
    this.picture = picture;
    this.left = left;
    this.y = picture.height
  }

  draw(chatX, chatY) {
    imageMode(CORNER);
    image(this.picture, chatX, chatY);
    return this.y;
  }
}

class ChatButton {
  constructor(picture, left, onClick) {
    this.picture = picture;
    this.left = left;
    this.y = picture.height;
    this.x = picture.width;
    this.onClick = onClick
  }

  draw(chatX, chatY) {
    imageMode(CORNER);
    image(this.picture, chatX, chatY);
    if (!fileOpen && !interactionFinished && stage != -1 &&
      mouseX > chatX && mouseX < chatX + this.x
      && mouseY > chatY && mouseY < chatY + this.y) {

      // rect(settingsX, settingsY, 250, 60);
      
      if (mouseIsPressed) {
        // file opens
        this.onClick();
      }
    }

    return this.y;
  }
}
currentChat = ["Unc", "Hello everybody my name is markiplier\nIn this youtube video\nchatgpt\nmake me a game", "I will be"];



chatY = 0;
chatBasey = 220;

chatLength = 0;
desiredChatBaseY = 0;

function mouseWheel(event) {
  
  
  desiredChatBaseY = chatBasey - (event.deltaY * 2)
  
  
  return false;
}

function drawChats() {
  desiredChatBaseY = constrain(desiredChatBaseY, -chatLength + 800, 100);
  chatBasey = tween(chatBasey, desiredChatBaseY, 0.1)
  chatY = chatBasey;
  let promptX = 565;
  let promptY = 220;
  

  textAlign(LEFT, TOP)
  
  chatLog = chats[currentChat]["chat"];
  
  for (let i = 0; i < chatLog.length; i++) {
    chatY += chatLog[i].draw(promptX, chatY);
    chatY += 20;
  }
  chatLength = chatY - chatBasey;
  
  textAlign(LEFT, CENTER)

  
  getFromArray("fileButton", mainInteractionPictures).setVisible(false)
  
}

function setWebcam(chat, img) {
  chats[chat]["webcam"] = img;
  if (chat == currentChat) {
    cam = getFromArray("webcam", mainInteractionPictures);
    cam.setPic(img)
  }
}
// Written by Marcus
function drawAllPrompts() {
  drawChats();
}
// Written by Marcus
function drawChatArchive() {
  
}
// Written by Marcus and Noah
let fails = 3;
function drawInteraction() {
  if (fileOpen) {
    // interaction bg
    let bad = 0;
    fill(0);
    rect(width / 2, height / 2, 1700, 1000, 50);
    textSize(30);
    // draw words
    while (true) {
      if (intervalTimer >= 1) {
        intervalTimer = 0;
        for (let i = 0; i < words.length; i++) {
          textX = (1920 - 1200) / 2 + (Math.random() * 1200);
          textY = (1080 - 800) / 2 + (Math.random() * 800);
          words[i].setPos(textX, textY);
        }
      }
      for (let i = 0; i < words.length; i++) {
        if (words[i].getGood()) {
          fill(255);
        } else {
          fill(255, 0, 0);
          bad++;
        }
        text(words[i].getWord(), words[i].getX(), words[i].getY());
      }
      fill(200);
      text("Click on the bad words to scrub them! ;)\nFails Left: " + fails, 200, 150);
      break; // breaks while loops after drawing words once    
    }
    for (let i = 0; i < words.length; i++) {
      if (mouseX > words[i].getX() && mouseX < words[i].getX() + words[i].getWord().length * 20
        && mouseY > words[i].getY() - 30 && mouseY < words[i].getY() + 30) {
        fill(255, 255, 255, 100);
        rect(words[i].getX() + words[i].getWord().length * 8, words[i].getY(), words[i].getWord().length * 18, 60);
        if (mouseIsPressed) {
          // scrub it
          if (!words[i].getGood()) {
            bad--;
          } else {
            fails--;
          }
          words.splice(i, 1);
        }
      }
    }
    if (fails <= 0) {
      fileOpen = false;
      interactionFinished = true;
      trust -= 5;
      setWebcam("tutorial", itguy_mad_1);
    } else if (bad <= 0) {
      fileOpen = false;
      interactionFinished = true;
      trust += 5;
      addChat("tutorial", new ChatText("Thanks, your work will help benefit the glory of Atrocia.", true))
      promptSelected++;
      setWebcam("tutorial", itguy_happy_1)
    }
  }
}
// Written by Noah and Marcus
function failStateSequence() {
  console.log("Hello there")
  ending = true;
  addToQueue(0,function() {
    addChat("tutorial", new ChatText("Seriously? We invested all that money into this tech just for you\nto mess it up?", true))
  })

  addToQueue(3, function() {
    addChat("tutorial", new ChatText("You’re absolutely right to push back on that, it’s not just\nwhat I failed to redact, but what I redacted too much.\nIn the future, it’s absolutely crucial that we delve\ninto this sensitive balance to make\nsure no more mistakes happen!", false))
  })

  addToQueue(4, function() {
    addChat("tutorial", new ChatText("This is the last mistake you’ll be making.\nYou’re getting shut down.", true))
  })

  addToQueue(4, function() {
    stage = -1;
    intervalTimer = 0;
  })

}

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

  setPic(image) {
    this.pic = image
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
    if (this.visible) {
      image(this.pic, this.x, this.y);
    } else {
      //console.log(this.name);
    }
    if (this.text != "") {
      text(this.text, this.x, this.y);
    }
  }
}

// Written by Marcus
class SoundEffect {
  constructor(name, sfx) {
    this.name = name;
    this.sfx = sfx;
  }
  getName() {
    return this.name;
  }
  getSFX() {
    return this.sfx;
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
  
  intervalTimer += deltaTime * 0.001;
  noStroke();
  background(11);
  rectMode(CENTER);
  //console.log(titleScreenPictures)
  
  // Written by Marcus
  // titleScreen
  if (stage == 0) {
    titleScreenButtons();
    drawImageArray(titleScreenPictures);
  } else if (stage == 1) {
    // main interaction demo
    goThroughQueue();
    drawAllPrompts();
    drawTrust();
    drawImageArray(mainInteractionPictures);
    drawInteraction();
    if (trust <= 0 && !ending) {
      failStateSequence();
    }
  } else if (stage == -1) {
    fill(255, 0, 0);
    textSize(50);
    textAlign(CENTER);
    text("You've been recycled.", width / 2, height / 2);
  }
}