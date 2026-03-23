
class Gemstone{
  constructor(x, y){
    this.colors = ['#C00A02','#9D47CE', '#85C3F4', '#DDE1E2', '#19771F','#DCD5DC','#95142A', '#B1C748', '#1403B3', '#95B9AF', '#AC5208', '#1FA0B5'];
    this.sizes = [50, 100, 150, 200, 250, 300];
    this.x = x; 
    this.y = y; 
    this.color = random(this.colors); 
    this.size = random(this.sizes); 
  
    // Optional rotation for dynamic display
    this.angle = random(TWO_PI);

    // Optional shine factor for glow effect
    this.shine = random(200, 255);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle); // rotates gem for a dynamic look
    scale(this.size / 100);

    stroke(this.color);
    strokeWeight(2);
    fill(this.color, this.shine);

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

  // Optional method to animate rotation
  rotateGem(speed = 0.01) {
    this.angle += speed;
  }
}

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = random(200, 255); // optional: make stars slightly transparent
  }

  display() {
    push();
    translate(this.x, this.y);
    stroke(180);
    strokeWeight(2);
    fill(255, this.opacity);

    beginShape();
    vertex(0, -this.size); // top
    bezierVertex(this.size*0.05, -this.size*0.3, this.size*0.7, -this.size*0.1, this.size, 0); // right
    bezierVertex(this.size*0.7, this.size*0.1, this.size*0.05, this.size*0.3, 0, this.size); // bottom
    bezierVertex(-this.size*0.05, this.size*0.3, -this.size*0.7, this.size*0.1, -this.size, 0); // left
    bezierVertex(-this.size*0.7, -this.size*0.1, -this.size*0.05, -this.size*0.3, 0, -this.size); // top
    endShape(CLOSE);

    pop();
  }
}