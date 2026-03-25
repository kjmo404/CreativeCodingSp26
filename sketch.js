// states 
let grow = 0;
let smile = 1;
let brush = 2;
let sun = 3;
let stars = 4;
let state = grow;

//background colors 
let skies = ['#C1E8FF', '#7DA0CA', "#5483B3", '#052659', '#021024'];
// face class 
let face; 
//scene 1 variables 
let x, y;
let size = 50;
let growing = false;

// scene 2 variables
let eyeW = 0;
let eyeH = 0;
let mouthW = 0;
let mouthH = 0;

//scene 3 variables 
let cleanLevel = 120;
let clean = false; 
let whiteness = cleanLevel;
let cleanTimer = 0; 
let sparkles = [];
 
// scene 4 variables
sunset = ["#052659", "#4B4D60", "#FD5E53", "#FC9C54"]; 
let auraIndex = sunset.length - 1;
let auraT = 0;
let auraLevel = 0;
let sunY;
let skyT = 0;
let sunTrail = [];

// scene 5 
let nightStars = [];
function setup() {
  createCanvas(800, 800);

  x = 0;
  y = height;
  sunY = height/2; 

  face = new Face(width/2, height/2, 500); 
}

function draw() {

  if (state == grow){
    scene1();
  } 
  else if (state == smile){
    scene2();
  } 
  else if (state == brush){
    scene3();
  } 
  else if (state == sun){
    scene4();
  } 
  else if (state == stars){

    if (nightStars.length === 0){
      for (let i = 0; i < 80; i++){
        nightStars.push(new Star(
          random(width),
          random(height),
          random(8, 20)
        ));
      }
    }
    scene5();
  }
}

function scene1(){
background(skies[grow]);

  fill(247, 200, 92);
  noStroke();

  ellipse(x, y, size, size);

  if (!growing) {
    x += 2;
    y -= 2;

    if (dist(x, y, width/2, height/2) < 5) {
      growing = true;
    }
  } else {
    if (size < 500) {
      size += 3;
    }
  }
  if (size >= 500){
    state = smile; 
  }
}
function scene2(){
background(skies[smile]);

face.display();
face.open();

  // keep your variables synced
eyeW = face.eyeW;
eyeH = face.eyeH;
mouthW = face.mouthW;
mouthH = face.mouthH;

if (face.isOpenComplete()){
    state = brush;
  }
}
function scene3(){
  background(skies[brush]);

  face.display();

  // toothbrush
  push();
  translate(mouseX, mouseY);
  rotate(-0.2);
  noStroke();
  fill(44, 104, 123);
  rectMode(CENTER);
  rect(0, 0, 80, 80);
  rectMode(CORNER);
  rect(40, -25, 160, 50);
  fill(200);
  rect(200, -25, 40, 50);
  fill(255);
  for (let i = 0; i < 5; i++) {
    rect(205 + i * 6, -25, 3, 20);
  }
  pop();

  let brushTipX = mouseX + 220;
  let brushTipY = mouseY;

  let closeToTeeth = dist(brushTipX, brushTipY, width/2, height/2 + 50);

  if (closeToTeeth < 120){
    cleanLevel += 5;
    cleanLevel = constrain(cleanLevel, 0, 255);
  }

  if (cleanLevel >= 255){
    clean = true;

    if (sparkles.length === 0){
      for (let i = 0; i < 10; i++){
        sparkles.push(new Star(
          random(width/2 - 200, width/2 + 200),
          random(height/2 + 20, height/2 + 150),
          random(20, 50)
        ));
      }
    }
  }

  for (let s of sparkles){
    s.display();
  }

  if (clean){
    cleanTimer++;
    if (cleanTimer > 60){
      state = sun;
    }
  }
}
function scene4() {
  let skyStart = color(sunset[0]);
  let skyEnd = color(skies[4]);
  let skyColor = lerpColor(skyStart, skyEnd, skyT);
  background(skyColor);


  sunTrail.push({ y: sunY, auraLevel: auraLevel });

  if (sunTrail.length > 30) { // last 30 frames
    sunTrail.shift();
  }


  for (let i = 0; i < sunTrail.length; i++) {
    let trail = sunTrail[i];
    let alpha = map(i, 0, sunTrail.length, 10, 80); // older = more transparent
    let size = 500 + trail.auraLevel * 0.5; // trail grows slightly
    let c = color('#FD5E53'); // warm sunset color
    c.setAlpha(alpha);
    fill(c);
    noStroke();
    ellipse(width/2, trail.y, size, size);
  }

  //sun
  fill('#F7C85C');
  noStroke();
  ellipse(width/2, sunY, 500, 500);
  face.y = sunY;
  face.display();
  face.close();

  if (!face.isClosedComplete()) {
    return;
  }

  // sunset
  let c1 = color(sunset[auraIndex]);
  let c2 = color(sunset[max(auraIndex - 1, 0)]);
  let current = lerpColor(c1, c2, auraT);
  let glow = color(current);
  glow.setAlpha(80);

  fill(glow);
  noStroke();
  ellipse(width/2, sunY, 500 + auraLevel);

  auraT += 0.01;
  auraLevel += 2;
  if (auraT >= 1) {
    auraT = 0;
    auraIndex--;
    if (auraIndex < 0) auraIndex = 0;
  }

 // sun drops 
  if (auraIndex === 0) {
    sunY += 3;

    // fade to night
    skyT += 0.01;
    skyT = constrain(skyT, 0, 1);
  }

  // 🎬 Transition to stars
  if (sunY > height*2 + 200) {
    state = stars;
  }
}
function scene5(){
  background(skies[stars]);

  for (let s of nightStars){
    s.glow();
    s.display();
  }
}
