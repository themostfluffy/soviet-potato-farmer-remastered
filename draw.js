function preload() {
potatoImage = loadImage('potato.png');
}

function setup() {
  createCanvas(1000, 600);
}

function draw() {
  background(220);
  fill(200, 0, 0);
  rect(0, 0, 200, 200);
  image(potatoImage, 0, 0, 200, 200);
}