function preload() {
  //image
potatoImage = loadImage('potato.png');
seedsImage = loadImage('seeds.png');

//press start 2p font
  try {
    pressStart = loadFont("PressStart2P-Regular.ttf");
  } catch (e) {
    console.log("Font not loaded, using default");
  }
}


function setup() {
  createCanvas(1000, 600);
  textFont(pressStart);
  textSize(16);
}

function draw() {
  background(220);
//debugging info
fill(255, 0, 200);
text("MouseX: " + mouseX + " MouseY: " + mouseY, 100, 20);


  //font
  fill(0);
  if (pressStart) {
    textFont(pressStart);
  }
// display cash, potatoes, seeds, and vodka
  text(" cash:" + cash, 300, 50);
  text(" potato:" + potatoes, 300, 70);
  text(" seeds:" + seeds, 300, 90); 
  
  //growth rate display(should be on the bottom of the screen)
  text("Growth Rate: " + growthRate, 300, 560);
  text("Min Potatoes: " + minpotatoes, 300, 580);
  text("Max Potatoes: " + maxpotatoes, 300, 600);

//seed purchasing button
  fill(0, 200, 0);
  rect(0, 100, 100, 100);
  image(seedsImage, 0, 100, 100, 100);

  //potato shiping button
  fill(200, 0, 0);
  rect(0, 0, 100, 100);
  image(potatoImage, 0, 0, 100, 100);

  //farmland placeholder
  

    fill(150, 75, 0);
     rect(900, 0, 100, 100);

 


}

function mousePressed() {
  //potato shiping button
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100&& potatoes > 0) {
    console.log("Potato clicked!");
    //make it random 
    potatoes=0;
    cash=cash
  }
  //seed purchasing button
  if (mouseX > 0 && mouseX < 100 && mouseY > 100 && mouseY < 200&& cash >= seedsCost) {
    console.log("Seeds clicked!");
    seeds=seeds+1;
    cash=cash-seedsCost
  }
  //land purchasing button
  //farming on land(depending on growth rate and were the land is located)
  
}