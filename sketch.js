//gleaming
// five ways to use it 
// 1. Brush to make it gleam
// 2. Gleaming gemstones
// 3. mirror reflecting light 
// 4. a thing that is shiny 
// 5. Stars !!! - let the stars move into the shape of the adjective

//States
let brush = 0; 
let mirror = 1; 
let forge = 2; 
let gems = 3; 
let stars = 4; 

//Starting state
let scene = brush; 

//scene variables 
//scene1 - toothbrush
let cleanLevel = 120; 
let clean = false; 

//scene2 - gemstones 
let gemstones = [];


let skies = ['#C1E8FF', '#7DA0CA', "#5483B3", '#052659', '#021024']
function setup() {
 // put setup code here
 createCanvas(800,800);
 rectMode(CENTER);

  for (let index = 0; index < 20; index ++){
    gemstones.push(new Gemstone(random(150,650), random(150,650)));
    gemstones[index].display();
}
}

function draw() {
  // put drawing code here
  if (scene == brush){
    scene1(); 
  }else if (scene == mirror){
    scene2();
  } else if (scene == forge){
    scene3()
  } else if (scene == gems){
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
    for (let i = 0; i < 3; i++){
    let s = new Star(random(width/2 - 200, width/2 + 200), random(height/2 +20, height/2 + 150), random(20, 50));
    s.display(); // draws it immediately
  }
  }
  //toothBrush
  noStroke();
  fill(44,104,123);
  rect(mouseX, mouseY, 80, 80);
  rect(mouseX + 40, mouseY, 160,50);

}
// scene 2
function scene2(){
  background(skies[mirror]);
}
function scene3(){
  background(skies[forge]);
}
function scene4(){
  background(skies[gems]);
  for (let g of gemstones){
    g.display();
  }

}
function scene5(){
  background(skies[stars]);
}


//test for  change in skies 
function mousePressed(){
scene = (scene + 1) % 5;
}
