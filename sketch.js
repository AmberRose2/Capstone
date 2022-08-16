let school = [];
let fishes = {};
let pond = [];
let feast = [];
let fishSlider, lilypadSlider;
let maxFish = 30;
let maxPads = 14;

function preload() {
  for (let i = 1; i < 8; i++) {
    fishes[i] = loadImage("assets/fish" + i + ".gif");
  }
  lilypad = loadImage("assets/Lilypads.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let fish = random(fishes);
  for (let i = 0; i < maxFish; i++) {
    school.push(new Fish());
  }

  for (let i = 0; i < maxPads; i++) {
    pond.push(new Lilypad());
  }
  fishSlider = createSlider(0, 80, 30, 2);
  lilypadSlider = createSlider(0, 60, 20, 2);
}

function draw() {
  background(106, 193, 216);
  for (let food of feast) {
    food.show();
  }

  for (let fish of school) {
    fish.edges();
    fish.school(school);
    fish.update();
    fish.show();
  }
  // Adjust the amount of fish on screen according to the slider value
  maxFish = fishSlider.value();
  let difference = school.length - maxFish;
  if (difference < 0) {
    for (let i = 0; i < -difference; i++) {
      school.push(new Fish());
    }
  } else if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      school.pop();
    }
  }
  for (let lilypad of pond) {
    lilypad.edges();
    lilypad.update();
    lilypad.show();
  }
  maxPads = lilypadSlider.value();
  let diff = pond.length - maxPads;
  if (diff < 0) {
    for (let i = 0; i < -diff; i++) {
      pond.push(new Lilypad());
    }
  } else if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      pond.pop();
    }
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
// }
