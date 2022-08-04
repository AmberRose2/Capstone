class Fish {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    // Amber = Math.floor(random(1, 8));
    // console.log(Amber);
    this.fish = fishes[Math.floor(random(1, 8))];
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.01;
    this.maxSpeed = 1.6;

    this.angle = 0;
  }

  //fish wrap around the screen
  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
  //How much do you want the fish to swim the same direction?//
  align(fish) {
    let perceptionRadius = 50;
    let steering = createVector();
    let total = 0;
    for (let other of fish) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  //How much do you eant the fish to clump?//
  cohesion(fish) {
    let perceptionRadius = 20;
    let steering = createVector();
    let total = 0;
    for (let other of fish) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  //how spread out or avoidant do you want the fish to be?
  separation(fish) {
    let perceptionRadius = 55;
    let steering = createVector();
    let total = 0;
    for (let other of fish) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  school(fish) {
    let alignment = this.align(fish);
    let cohesion = this.cohesion(fish);
    let separation = this.separation(fish);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0, 0);
  }

  show() {
    // strokeWeight(30);
    // stroke(243, 141, 81);
    // point(this.position.x, this.position.y);
    push();
    translate(this.position.x + 50, this.position.y + 25);
    this.angle = this.velocity.heading();
    rotate(this.angle);
    rotate(PI);
    imageMode(CENTER);
    image(this.fish, 0, 0, 100, 50);
    pop();
  }
}
