let school = [];
let fishes = {};
let pond = [];
let feast = [];
let fishSlider, lilypadSlider;
let maxFish = 30;
let maxPads = 14;

// let Controls = function () {
//   this.numFish = 30;
//   this.numPads = 20;
// };

// let controls = new Controls();

function preload() {
  for (let i = 1; i < 8; i++) {
    fishes[i] = loadImage("assets/fish" + i + ".gif");
  }
  lilypad = loadImage("assets/Lilypads.png");
}

function setup() {
  createCanvas(1800, 1000);
  let fish = random(fishes);
  for (let i = 0; i < maxFish; i++) {
    school.push(new Fish());
  }

  for (let i = 0; i < maxPads; i++) pond.push(new Lilypad());
  fishSlider = createSlider(0, 80, 30, 2);
  lilypadSlider = createSlider(0, 60, 20, 2);
  // let gui = new dat.GUI({
  //   width: 295,
  // });
  // gui.add(controls, "numFish", 0, 80).name("Number of Fish").step(1);
  // for (let i = 0; i < controls.numFish; i++) {
  //   school.push(new Fish()); //flock.push(new Boid());
  // }
}

function draw() {
  background(106, 193, 216);
  // maxFish = fishSlider.value();
  // maxPads = lilypadSlider.value();
  for (let food of feast) {
    food.show();
  }

  for (let fish of school) {
    fish.edges();
    fish.school(school);
    fish.update();
    fish.show();
  }
  // Adjust the amount of boids on screen according to the slider value
  // let maxFish = controls.numFish;
  // let difference = school.length - maxFish;
  // if (difference < 0) {
  //   for (let i = 0; i < -difference; i++) {
  //     school.push(new Fish()); // Add boids if there are less boids than the slider value
  //   }
  // } else if (difference > 0) {
  //   for (let i = 0; i < difference; i++) {
  //     flock.pop(); // Remove boids if there are more boids than the slider value
  //   }
  // }
  for (let lilypad of pond) {
    lilypad.edges();
    lilypad.update();
    lilypad.show();
  }
}
function mousePressed() {
  feast.push(new Food(mouseX, mouseY));
}

// When the user clicks on the button, toggle between hiding and showing the dropdown content //
// function myFunction() {
//   document.getElementById("myDropdown").classList.toggle("show");
// }

// Close the dropdown menu if the user clicks outside of it
// window.onclick = function (event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };
