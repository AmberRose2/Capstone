class Food {
  constructor(x, y) {
    this.x = mouseX;
    this.y = mouseY;
  }

  show() {
    stroke(75);
    strokeWeight(3);
    ellipse(this.x, this.y, 3, 3);
  }
}
