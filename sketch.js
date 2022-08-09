let school = [];
let fishes = {};
let pond = [];

function preload() {
  for (let i = 1; i < 8; i++) {
    fishes[i] = loadImage("assets/fish" + i + ".gif");
  }
  lilypad = loadImage("assets/lilypad.png");
}

function setup() {
  createCanvas(840, 560);
  // let fish = random(fishes);
  for (let i = 0; i < 30; i++) school.push(new Fish());
  for (let i = 0; i < 20; i++) pond.push(new Lilypad());
}

function draw() {
  background(132, 209, 220);
  for (let fish of school) {
    fish.edges();
    fish.school(school);
    fish.update();
    fish.show();
  }
  for (let lilypad of pond) {
    lilypad.edges();
    lilypad.update();
    lilypad.show();
  }
}
