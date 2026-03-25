
// classes 
class Face {
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;

    this.eyeW = 0;
    this.eyeH = 0;
    this.mouthW = 0;
    this.mouthH = 0;
  }

  display(){
    fill(247, 200, 92);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);

    fill(255);
    ellipse(this.x - 100, this.y - 80, this.eyeW, this.eyeH);
    ellipse(this.x + 100, this.y - 80, this.eyeW, this.eyeH);

    fill(0);
    ellipse(this.x - 100, this.y - 80, this.eyeW/2, this.eyeH/2);
    ellipse(this.x + 100, this.y - 80, this.eyeW/2, this.eyeH/2);

    fill(cleanLevel);
    stroke(cleanLevel);
    strokeWeight(5);
    arc(this.x, this.y + 50, this.mouthW, this.mouthH, 0, PI, CHORD);
  }

  open(){
    if (this.eyeW < 150 || this.mouthW < 350){
      if (this.eyeW < 150) this.eyeW += 3;
      if (this.mouthW < 350) this.mouthW += 5;
    }
    else if (this.eyeH < 150 || this.mouthH < 300){
      if (this.eyeH < 150) this.eyeH += 3;
      if (this.mouthH < 300) this.mouthH += 5;
    }
  }

  close(){
    if (this.eyeH > 0 || this.mouthH > 0){
      if (this.eyeH > 0) this.eyeH -= 3;
      if (this.mouthH > 0) this.mouthH -= 5;
    }
    else if (this.eyeW > 0 || this.mouthW > 0){
      if (this.eyeW > 0) this.eyeW -= 3;
      if (this.mouthW > 0) this.mouthW -= 5;
    }
  }

  isOpenComplete(){
    return this.eyeW >= 150 && this.eyeH >= 150 &&
           this.mouthW >= 350 && this.mouthH >= 300;
  }

  isClosedComplete(){
    return this.eyeW <= 0 && this.eyeH <= 0 &&
           this.mouthW <= 0 && this.mouthH <= 0;
  }
}

class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.baseOpacity = random(150, 255);
    this.opacity = this.baseOpacity;

    this.twinkleOffset = random(TWO_PI);
    this.twinkleSpeed = random(0.02, 0.10);
  }

  display() {
    push();
    translate(this.x, this.y);

    stroke(180);
    strokeWeight(2);
    fill(255, this.opacity);

    beginShape();
    vertex(0, -this.size);
    bezierVertex(this.size*0.05, -this.size*0.3, this.size*0.7, -this.size*0.1, this.size, 0);
    bezierVertex(this.size*0.7, this.size*0.1, this.size*0.05, this.size*0.3, 0, this.size);
    bezierVertex(-this.size*0.05, this.size*0.3, -this.size*0.7, this.size*0.1, -this.size, 0);
    bezierVertex(-this.size*0.7, -this.size*0.1, -this.size*0.05, -this.size*0.3, 0, -this.size);
    endShape(CLOSE);

    pop();
  }

  glow(){
    this.opacity = this.baseOpacity + sin(frameCount * this.twinkleSpeed + this.twinkleOffset) * 80;

    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, this.opacity * 0.10);
    ellipse(0, 0, this.size * 2);
    pop();
  }
}