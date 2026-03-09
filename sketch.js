//gleaming
// five ways to use it 
// 1. Brush to make it gleam
// 2. Gleaming gemstones
// 3. mirror reflecting light 
// 4. a thing that is shiny 
// 5. Stars !!! - let the stars move into the shape of the adjective

//States
let brush = 0; 
let gems = 1; 
let mirror = 2; 
let forge = 3; 
let stars = 4; 


//Starting state
let scene = brush; 

function setup() {
 // put setup code here
 createCanvas(800,800);
 background(196,216,255);
}

function draw() {
  // put drawing code here
  background(196,216,255);
  sunrise();
}

//State 1 - sun rises up to middle of screen, turns into a face, shows teeth and users has to brush teeth to white, once complete 
function sunrise(){
    fill(255,206,27);
    noStroke();
    ellipse(mouseX, mouseY, 120,120);
    ellipse(mouseX + 40, mouseY + 40, 150, 150);
}

function scene_change(){
  if (scene > stars) {
    emotion = brush;
  } else {
    scene++;
  }
}