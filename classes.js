let colors = ['#C00A02','#9D47CE', '#85C3F4', '#DDE1E2', '#19771F','#DCD5DC','#95142A', '#B1C748', '#1403B3', '#95B9AF', '#AC5208', '#1FA0B5'];
let sizes = [50, 100, 150, 200, 250, 300];
class Gemstone{
  constructor(x, y){
    this.x = x; 
    this.y = y; 
    this.color = random(colors); 
    this.size = random(sizes); 
    // this.shine = shine; 
  }
  display(){
    // hexagon starter code from p5js - https://editor.p5js.org/jenagosta/sketches/Sy5wzBblg
    stroke(this.color); 
    strokeWeight(2);
    fill(this.color, 240);

    push(); 
    translate(this.x, this.y);
    scale(this.size/100);

    beginShape();
      vertex(-75, -130); 
      vertex(75, -130); 
      vertex(150, 0); 
      vertex(75, 130); 
      vertex(-75, 130); 
      vertex(-150, 0);
    endShape(CLOSE); 
    
    pop();
  }
}

class Star{
  constructor(){}
}