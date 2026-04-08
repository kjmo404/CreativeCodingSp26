// Scene states
let grow = 0;
let smile = 1;
let brush = 2;
let sun = 3;
let moon = 4;
let stars = 5;
let state = grow;

// Background color palettes
let skies = ['#C1E8FF', '#7DA0CA', "#5483B3", '#052659', '#021024', '#040622'];
let sunset = ["#052659", "#4B4D60", "#FD5E53", "#FC9C54"]; 

// Scene 1 variables
let x, y;
let size = 50;
let growing = false;
let growStars = [];

// Scene 2 variables
let eyeW = 0; 
let eyeH = 0; 
let mouthW= 0; 
let mouthH = 0; 
let smileTimer = 0; 
let sparkles = [];

// Scene 3 variables
let cleanLevel = 120;
let clean = false; 
let cleanTimer = 0; 

// Scene 4 variables
let auraLevel = 0, skyT = 0;
let sunY;
let sunTrail = [];
let phase = 0; 

// Scene 5 variables
let mooncolor;  // will initialize in setup()
let shrinking = false;
let moonX, moonY, moonSize;
let moonStreaks = [];
// Scene 6 variables
let nightStars = [];

// Global face instance
let face; 

function setup() {
  createCanvas(800, 800);
  x = 0;
  y = height;
  sunY = height / 2;
  mooncolor = color(220, 220, 220);
  moonX = width / 2;
  moonY = height / 2;
  moonSize = 500;
  face = new Face(width / 2, height / 2, 500);
  for (let i = 0; i < 20; i++) {
    growStars.push(new Star(x, y, random(8, 18), color(247, 200, 133)));
  }
}

function draw() {
  if (state == grow){scene1();} 
  else if (state == smile){scene2();} 
  else if (state == brush){scene3();} 
  else if (state == sun){scene4();} 
  else if (state == moon){scene5();}
  else if (state == stars){
    if (nightStars.length === 0){
      for (let i = 0; i < 80; i++){nightStars.push(new Star(random(width), random(height), random(8, 20)));}
    }
    scene6();
  }
}
function scene1(){
  //sun base
  background(skies[grow]);
  fill(247, 200, 92);
  noStroke();
  ellipse(x, y, size, size);
  //moving sun with sparkles trails 
  if (!growing) {
    x += 2;
    y -= 2;     
  for (let s of growStars){
  s.x = lerp(s.x, x + random(-50, 50), 0.06);
  s.y = lerp(s.y, y + random(-50, 50), 0.06);
  s.display();
}
    if (dist(x, y, width/2, height/2) < 5) {growing = true;}} 
    else {if (size < 500) { size += 3;}}
    if (size >= 500){state = smile;}
}
function scene2(){
  background(skies[smile]);
// face mvements + variables
  face.display();
  face.open();
  eyeW = face.eyeW;
  eyeH = face.eyeH;
  mouthW = face.mouthW;
  mouthH = face.mouthH;
// once the face is open, show sparkles
  if (face.isOpenComplete()){
    if (sparkles.length === 0){
      for (let i = 0; i < 12; i++){
        sparkles.push(new Star( width/2 + random(-250, 250),height/2 + random(-250, 250), random(10, 25),color(247,200,150)));
      }
    }
    for (let s of sparkles){
      s.display();
    }
   //let it last a while
    smileTimer++;
    if (smileTimer > 90){
      sparkles = [];     
      smileTimer = 0;
      state = brush;
    }
  }
}
function scene3(){
  background(skies[brush]);
  face.display();

  //Creating a toothbrush-like cursor
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
  for (let i = 0; i < 5; i++) {rect(205 + i * 6, -25, 3, 20);}
  pop();
  let brushTipX = mouseX + 220;
  let brushTipY = mouseY;

  //if brush is close to teeth
  let d = dist(brushTipX, brushTipY, width/2, height/2 + 50);
  if (d < 120 && !clean){
    cleanLevel += 5;
    cleanLevel = constrain(cleanLevel, 0, 255);
  }
  // show sparkles and reset
  if (cleanLevel >= 255 && !clean){
    clean = true;
    cleanTimer = 0;
    sparkles = []; 
    for (let i = 0; i < 12; i++){
      let s = new Star( brushTipX + random(-20, 20), brushTipY + random(-20, 20), random(20, 40) );
      let angle = random(TWO_PI);
      let speed = random(4, 8);
      s.vx = cos(angle) * speed;
      s.vy = sin(angle) * speed;
      s.age = 0;
      s.burstDuration = 20;
      s.fadeDuration = 50;
      sparkles.push(s);
    }
  }

  for (let s of sparkles){
    if (s.age < s.burstDuration){
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.9;
      s.vy *= 0.9;
    }
    if (s.age > 3*s.burstDuration){
      let fadeStep = 255 / s.fadeDuration;
      s.opacity -= fadeStep;
      s.opacity = max(s.opacity, 0);
    }
    s.display();
    s.glow();
    s.age++;
  }
  sparkles = sparkles.filter(s => s.opacity > 0);

  if (clean){
    cleanTimer++;
    if (cleanTimer > 120){state = sun;}
  }
}
function scene4() {
// --- 1. Sky ---
  let skyStart = color(sunset[0]);
  let skyEnd = color(skies[4]);
  let skyColor = lerpColor(skyStart, skyEnd, skyT);
  background(skyColor);

  // --- 2. Sun Trail ---
  sunTrail.push({ y: sunY, auraLevel: auraLevel });
  if (sunTrail.length > 30) sunTrail.shift();

  for (let i = 0; i < sunTrail.length; i++) {
    let trail = sunTrail[i];
    let alpha = map(i, 0, sunTrail.length, 10, 80);
    let size = 500 + trail.auraLevel * 0.5;
    let c = color('#FD5E53');
    c.setAlpha(alpha);
    fill(c);
    noStroke();
    ellipse(width / 2, trail.y, size, size);
  }

  // --- 3. Sun & Face ---
  fill('#F7C85C');
  noStroke();
  ellipse(width / 2, sunY, 500, 500);
  face.y = sunY;
  face.display();
  face.close();
  if (!face.isClosedComplete()) return;

  // --- 4. Phase Logic ---
  if (phase === 0) {
    // Sun falls off screen
    sunY += 3;
    skyT += 0.01;
    auraLevel += 2;
    if (sunY > height + 300) {
      phase = 1;
      sunY = -200; // pop to top
      auraLevel = 0;
      auraIndex = sunset.length - 1;
      auraT = 0;
    }
  } 
  else if (phase === 1) {
    // Sun descends to middle
    sunY += 3;
    auraLevel += 2;

    // Glow through sunset palette
    if (auraIndex >= 1) {
      let c1 = color(sunset[auraIndex]);
      let c2 = color(sunset[auraIndex - 1]);
      let glow = lerpColor(c1, c2, auraT);
      glow.setAlpha(80);
      fill(glow);
      noStroke();
      ellipse(width / 2, sunY, 500 + auraLevel);

      auraT += 0.01;
      if (auraT >= 1) {
        auraT = 0;
        auraIndex--;
      }
    }

    if (sunY >= height / 2) phase = 2; // move to aura shrink
  } 
  else if (phase === 2) {
    // Shrink aura inward — fully decoupled from auraIndex
    auraLevel -= 3;
    auraLevel = max(auraLevel, 0);

    for (let i = 0; i < 3; i++) {
      let size = 500 + auraLevel + i * 20;
      let idx = min(i, sunset.length - 1);
      let c = color(sunset[idx]);
      c.setAlpha(50);
      fill(c);
      noStroke();
      ellipse(width / 2, height / 2, size, size);
    }

    // Draw sun base
    fill('#F7C85C');
    noStroke();
    ellipse(width / 2, height / 2, 500, 500);


    if (auraLevel <= 0) {
      state = moon;
      // reset for scene 5/future use
      cleanLevel = 120;
      moonSize = 500;
      moonX = width/2;
      moonY = height/2;
      shrinking = false;
      phase = 0;
      skyT = 0;
    }
  }
}
function scene5(){ // removes aura, Same wiping mechanic to turn sun into moon, let the moon shrink and go to the top right
  background(skies[moon]);
  let t = map(cleanLevel, 120, 255, 0, 1);
  let sunCol = color(247, 200, 92);
  mooncolor = lerpColor(sunCol, color(220,220,220), t);
  fill(mooncolor);
  noStroke();
  ellipse(moonX, moonY, moonSize);
  let d = dist(mouseX, mouseY, moonX, moonY);
  if (d < moonSize/2 && !shrinking) {cleanLevel += 2;}
  cleanLevel = constrain(cleanLevel, 120, 255);
  if (cleanLevel >= 255) {shrinking = true;}
  //move like scene 1 (diagonal top-right) ---
  if (shrinking) {
    moonX += 2;
    moonY -= 2;
    if (moonSize > 50) {moonSize -= 3;}
    if (moonSize <= 50) {state = stars;}
  }
  // simple cloth cursor
  fill(240);
  rectMode(CENTER);
  rect(mouseX, mouseY, 40, 40);
}
function scene6() {
  background(skies[stars]);
  push();
  translate(moonX, moonY);
  fill(220, 220, 220);
  noStroke();
  ellipse(0, 0, moonSize);
  for (let i = 0; i < 8; i++) {
    let r = moonSize * (1 + i * 0.1);
    fill(255, 255, 255, random(10, 40));
    ellipse(0, 0, r, r);
  }
  pop();
  for (let s of nightStars) {
    s.display();
    s.glow();
  }
}