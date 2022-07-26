const school = [];

// let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(640, 360);
  // alignSlider = createSlider(0, 5, 1, 0.1);
  // cohesionSlider = createSlider(0, 5, 1, 0.1);
  // separationSlider = createSlider(0, 5, 1, 0.1);
  for (let i = 0; i < 20; i++) school.push(new Fish());
}

function draw() {
  background(132, 209, 220);
  for (let fish of school) {
    fish.edges();
    fish.school(school);
    fish.update();
    fish.show();
  }
}
