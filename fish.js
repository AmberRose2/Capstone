class Fish {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
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
    /////Poor fishies are scared of cursors :( ////////
    let mouse = createVector(mouseX, mouseY);
    let perceptionRadius = 100;
    let mouseDistance = dist(this.position.x, this.position.y, mouseX, mouseY);
    if (mouseDistance < perceptionRadius) {
      mouse.sub(this.position);
      mouse.setMag(0.7);
      this.acceleration.sub(mouse);
    }
    /////Code for food attracting fish///////
    for (let food in feast) {
      let foodPosition = createVector(feast[food].x - 60, feast[food].y - 35);
      if (
        dist(this.position.x, this.position.y, feast[food].x, feast[food].y) <
        perceptionRadius
      ) {
        foodPosition.sub(this.position);
        foodPosition.setMag(1.5);
        this.acceleration.add(foodPosition);
      }
      if (
        dist(
          this.position.x,
          this.position.y,
          feast[food].x - 60,
          feast[food].y - 35
        ) <= 1
      ) {
        feast.pop();
      }
    }

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.set(0, 0);
  }

  show() {
    push();
    translate(this.position.x + 60, this.position.y + 35);
    this.angle = this.velocity.heading();
    rotate(this.angle);
    rotate(PI);
    imageMode(CENTER);
    image(this.fish, 0, 0, 120, 70);
    pop();
  }
}
