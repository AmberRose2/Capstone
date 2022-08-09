class Lilypad {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(0, 2));
    this.acceleration = createVector();
    this.angle = 0;
    this.maxSpeed = 0.07;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0, 0);
  }

  show() {
    push();
    translate(this.position.x + 50, this.position.y + 50);
    this.angle = this.velocity.heading();
    rotate(this.angle);
    rotate(PI);
    imageMode(CENTER);
    image(lilypad, 0, 0, 100, 100);
    pop();
  }
}
