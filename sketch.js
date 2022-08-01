let school = [];

function preload() {
  koi = loadImage("assets/koi.gif");
}

function setup() {
  createCanvas(840, 560);
  for (let i = 0; i < 30; i++) school.push(new Fish());
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
