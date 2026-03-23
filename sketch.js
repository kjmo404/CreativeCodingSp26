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

//scene variables 
//scene1 - toothbrush
let cleanLevel = 120; 
let clean = false; 

//scene2 = 

let skies = ['#C1E8FF', '#7DA0CA', "#5483B3", '#052659', '#021024']
function setup() {
 // put setup code here
 createCanvas(800,800);
 rectMode(CENTER);
}

function draw() {
  // put drawing code here
  if (scene == brush){
    scene1(); 
  }else if (scene == gems){
    scene2();
  } else if (scene == mirror){
    scene3()
  } else if (scene == forge){
    scene4();
  } else if (scene == stars){
    scene5();
  } else { scene == brush}

}
 
function scene1(){
  // change the scene
  background(skies[brush]);
  //face
  noStroke();
  fill(247,200,92);
  ellipse(width/2, height/2, 500,500); 
  //teeth
  strokeWeight(2);
  fill(cleanLevel); 
  arc(width/2, height/2 + 50, 350, 300, 0, PI);
  let closeToTeeth = dist(mouseX, mouseY, width/2, height/2 +50); 
  if (closeToTeeth < 120){
    cleanLevel++; 
    cleanLevel = constrain(cleanLevel, 0, 255); 
  }
  if (cleanLevel >= 255){
    clean = true; 
    for (let i = 0; i < 5; i++){
    sparkle(random(width/2 - 100, width/2 + 100), random(height/2, height/2 + 80),random(40, 50));
  }
  }
  //toothBrush
  noStroke();
  fill(44,104,123);
  rect(mouseX, mouseY, 80, 80);
  rect(mouseX + 40, mouseY, 160,50);

}
//helper function
function sparkle(x, y, size){
  // four pointed sparkle coords 
  // from up-right-down--left = (0,-50), (5,-5), (50,0), (5,5), (0,50), (-5,5)(-50,0)(-5,-5)(0,-50)
  push(); 
  translate(x,y);
  stroke(180);
  strokeWeight(2);
  fill(255, random(200, 255));

  beginShape();
    vertex(0, -size); // start at top
    bezierVertex(size*0.05, -size*0.3, size*0.7, -size*0.1, size, 0); // right
    bezierVertex(size*0.7, size*0.1, size*0.05, size*0.3, 0, size);    // bottom
    bezierVertex(-size*0.05, size*0.3, -size*0.7, size*0.1, -size, 0); // left
    bezierVertex(-size*0.7, -size*0.1, -size*0.05, -size*0.3, 0, -size);// top
  endShape(CLOSE);
}
// scene 2
function scene2(){
  background(skies[gems]);
}
function scene3(){
  background(skies[mirror]);
}
function scene4(){
  background(skies[forge]);
}
function scene5(){
  background(skies[stars]);
}


//test for  change in skies 
function mousePressed(){
scene = (scene + 1) % 5;
}







// doesnt work rn idk why 
// function scene_change(){
//   if (scene > stars) {
//     emotion = brush;
//   } else {
//     scene++;
//   }
// }
