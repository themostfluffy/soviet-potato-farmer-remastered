function preload() {
  //image
  potatoImage = loadImage("potato.png");
  seedsImage = loadImage("seeds.png");

  //press start 2p font
  try {
    pressStart = loadFont("PressStart2P-Regular.ttf");
  } catch (e) {
    console.log("Font not loaded, using default");
  }
}

function setup() {
  createCanvas(1300, 600);
  textFont(pressStart);
  textSize(16);
}

function draw() {
  background(175, 0, 0);
  //debugging info
  if (debugIsEnabled==true) {
  debugText();
  }
   

  //font
  fill(0);
  if (pressStart) {
    textFont(pressStart);
  }
  // display cash, potatoes, seeds, and vodka
  text(" cash:" + cash, 300, 50);
  text(" potato:" + potatoes + "/" + maxPotatoesStored, 300, 70);
  text(" seeds:" + seeds + "/" + maxSeeds, 300, 90);
  text(" vodka:" + vodka + "/" + maxVodka, 300, 110);

  //growth rate display(should be on the bottom of the screen)
  text("Growth Rate: " + growthRate, 300, 560);
  text("Min Potatoes: " + minpotatoes, 300, 580);
  text("Max Potatoes: " + maxpotatoes, 300, 600);
  //bankruptcy check
  //bankruptcy();

  //seed purchasing button
  fill(0, 200, 0);
  rect(0, 100, 100, 100);
  image(seedsImage, 0, 100, 100, 100);

  //potato shiping button
  fill(200, 0, 0);
  rect(0, 0, 100, 100);
  image(potatoImage, 0, 0, 100, 100);
//debug button
  fill(0, 0, 200);
  rect(0, 200, 100, 100);
  fill(255);
  text("Debug", 10, 250);

  //farmland placeholder

  fill(150, 75, 0);
  //land1
  rect(900, 0, 100, 100);
  //land2
  rect(900, 100, 100, 100);
  //land3
  rect(800, 0, 100, 100);
  //land4
  rect(800, 100, 100, 100);
  //upgradeables placeholder on the side of the screen
  fill(0, 150, 150);
  rect(1200, 0, 100,100);
 
  //max potatoes code
  if (potatoes > maxPotatoesStored) {
    potatoes = maxPotatoesStored;
  }
  //max seeds code
  if (seeds > maxSeeds) {
    seeds = maxSeeds;
  }
  //max vodka code
  if (vodka > maxVodka) {
    vodka = maxVodka;
  }
  //growth rate countdown
  //land1 growth rate countdown
  if (land1growth == true) {
    growthCooldown1 = growthCooldown1 - growthRate;
  }
  //when the growth rate countdown is done add the potatoes to the inventory
  if (growthCooldown1 <= 0) {
    land1growth = false;
    growthCooldown1 = growthCooldownM;

    //add the potatoes to the inventory
    potatoes = potatoes + int(random(minpotatoes, maxpotatoes));
  }

  if (land2growth == true) {
    growthCooldown2 = growthCooldown2 - growthRate;
  }
  if (growthCooldown2 <= 0) {
    land2growth = false;
    growthCooldown2 = growthCooldownM;

    //add the potatoes to the inventory
    potatoes = potatoes + int(random(minpotatoes, maxpotatoes));
  }

  if (land3growth == true) {
    growthCooldown3 = growthCooldown3 - growthRate;
  }
  if (growthCooldown3 <= 0) {
    land3growth = false;
    growthCooldown3 = growthCooldownM;

    //add the potatoes to the inventory
    potatoes = potatoes + int(random(minpotatoes, maxpotatoes));
  }

  if (land4growth == true) {
    growthCooldown4 = growthCooldown4 - growthRate;
  }
  if (growthCooldown4 <= 0) {
    land4growth = false;
    growthCooldown4 = growthCooldownM;

    //add the potatoes to the inventory
    potatoes = potatoes + int(random(minpotatoes, maxpotatoes));
  }

  // Show a tooltip when the mouse is over a land plot.
  fill(0);
  if (mouseX > 900 && mouseX < 1000 && mouseY > 0 && mouseY < 100) {
    showLandTooltipPotato(900, 0, land1, land1growth, growthCooldown1);
  }
  if (mouseX > 900 && mouseX < 1000 && mouseY > 100 && mouseY < 200) {
    showLandTooltipPotato(900, 100, land2, land2growth, growthCooldown2);
  }
  if (mouseX > 800 && mouseX < 900 && mouseY > 0 && mouseY < 100) {
    showLandTooltipPotato(800, 0, land3, land3growth, growthCooldown3);
  }
  if (mouseX > 800 && mouseX < 900 && mouseY > 100 && mouseY < 200) {
    showLandTooltipPotato(800, 100, land4, land4growth, growthCooldown4);
  }
  //show tooltip for the upgradeables button
  if (mouseX > 1200 && mouseX < 1300 && mouseY > 0 && mouseY < 100) {
    showUpgradeableTooltip(1200, 0,  maxPotatoesStored);
  }
}



function mousePressed() {
  //debug button
  if (mouseX > 0 && mouseX < 100 && mouseY > 200 && mouseY < 300) {
    debugIsEnabled ==true ? (debugIsEnabled = false) : (debugIsEnabled = true);
  }
  //potato shiping button
  if (
    mouseX > 0 &&
    mouseX < 100 &&
    mouseY > 0 &&
    mouseY < 100 &&
    potatoes > 0
  ) {
    console.log("Potato clicked!");
    //make it random

    cash = cash + potatoes * int(random(5, 10));
    potatoes = 0;
  }
  //seed purchasing button
  if (
    mouseX > 0 &&
    mouseX < 100 &&
    mouseY > 100 &&
    mouseY < 200 &&
    cash >= seedsCost
  ) {
    console.log("Seeds clicked!");
    seeds = seeds + 1;
    cash = cash - seedsCost;
  }
  //land purchasing button when the player purchuses the land they willbe able to grow there seeds
  //land`
  if (
    mouseX > 900 &&
    mouseX < 1000 &&
    mouseY > 0 &&
    mouseY < 100 &&
    cash >= landCost &&
    land1 == false
  ) {
    console.log("Land clicked!");
    cash = cash - landCost;
    //double the land cost for the next land plot
    landcost = landCost + 2;
    //set the land to true so the player can farm there
    land1 = true;
  }
  //land2
  if (
    mouseX > 900 &&
    mouseX < 1000 &&
    mouseY > 100 &&
    mouseY < 200 &&
    cash >= landCost &&
    land2 == false
  ) {
    console.log("Land clicked!");
    cash = cash - landCost;
    //double the land cost for the next land plot
    landcost = landCost + 2;
    //set the land to true so the player can farm there
    land2 = true;
  }
  //land3
  if (
    mouseX > 800 &&
    mouseX < 900 &&
    mouseY > 0 &&
    mouseY < 100 &&
    cash >= landCost &&
    land3 == false
  ) {
    console.log("Land clicked!");
    cash = cash - landCost;
    //double the land cost for the next land plot
    landcost = landCost + 2;
    //set the land to true so the player can farm there
    land3 = true;
  }
  //land4
  if (
    mouseX > 800 &&
    mouseX < 900 &&
    mouseY > 100 &&
    mouseY < 200 &&
    cash >= landCost &&
    land4 == false
  ) {
    console.log("Land clicked!");
    cash = cash - landCost;
    //double the land cost for the next land plot
    landcost = landCost + 2;
    //set the land to true so the player can farm there
    land4 = true;
  }

  //farming on land(depending on growth rate and were the land is located)
  if (
    mouseX > 900 &&
    mouseX < 1000 &&
    mouseY > 0 &&
    mouseY < 100 &&
    seeds > 0 &&
    land1 == true &&
    land1growth == false
  ) {
    console.log("Farming clicked!");
    seeds = seeds - 1;
    //countdownthe growth rate and then add the potatoes to the inventory
    land1growth = true;
  }
  //u clicked on land2 and have seeds and land2 is true and land2growth is false
  if (
    mouseX > 900 &&
    mouseX < 1000 &&
    mouseY > 100 &&
    mouseY < 200 &&
    seeds > 0 &&
    land2 == true &&
    land2growth == false
  ) {
    console.log("Farming clicked!");
    seeds = seeds - 1;
    //countdownthe growth rate and then add the potatoes to the inventory
    land2growth = true;
  }
  //u clicked on land3 and have seeds and land3 is true and land3growth is false
  if (
    mouseX > 800 &&
    mouseX < 900 &&
    mouseY > 0 &&
    mouseY < 100 &&
    seeds > 0 &&
    land3 == true &&
    land3growth == false
  ) {
    console.log("Farming clicked!");
    seeds = seeds - 1;
    //countdownthe growth rate and then add the potatoes to the inventory
    land3growth = true;
  }
  //u clicked on land4 and have seeds and land4 is true and land4growth is false
  if (
    mouseX > 800 &&
    mouseX < 900 &&
    mouseY > 100 &&
    mouseY < 200 &&
    seeds > 0 &&
    land4 == true &&
    land4growth == false
  ) {
    console.log("Farming clicked!");
    seeds = seeds - 1;
    //countdownthe growth rate and then add the potatoes to the inventory
    land4growth = true;
  }
  uppgrade();
}

function debugText() {
  fill(255, 0, 200);
  text("MouseX: " + mouseX + " MouseY: " + mouseY, 100, 20);
  //cooldowns
  text("Shipping Cooldown: " + shippingCooldown, 100, 40);
  //growth cooldown
  text("Growth Cooldown1: " + growthCooldown1, 100, 60);
  text("Growth Cooldown2: " + growthCooldown2, 100, 80);
  text("Growth Cooldown3: " + growthCooldown3, 100, 100);
  text("Growth Cooldown4: " + growthCooldown4, 100, 120);
  //land plots
  text("Land1: " + land1, 100, 140);
  text("Land2: " + land2, 100, 160);
  text("Land3: " + land3, 100, 180);
  text("Land4: " + land4, 100, 200);
  //growth t or f
  text("Land1 Growth: " + land1growth, 100, 220);
  text("Land2 Growth: " + land2growth, 100, 240);
  text("Land3 Growth: " + land3growth, 100, 260);
  text("Land4 Growth: " + land4growth, 100, 280);
  //upgradeables
  text("Growth Rate: " + growthRate, 100, 300);
  text("Min Potatoes: " + minpotatoes, 100, 320);
  text("Max Potatoes: " + maxpotatoes, 100, 340);
  text("land Cost: " + landCost, 100, 360);
}
// Show a tooltip when the mouse is over a land plot.
function showLandTooltipPotato(x, y, owned, growing, cooldown) {
  if (growing) {
    text("Growth progress: " + cooldown, x - 180, y + 50);
  } else if (owned) {
    text("Click to plant seeds", x - 180, y + 50);
  } else {
    text("Buy land: $" + landCost, x - 180, y + 50);
  }
}

//show a tooltip when the mouse is oveer an upgradeable button
function showUpgradeableTooltip(x, y, growthRate, minPotatoes, maxPotatoes, maxPotatoesStored) {
  text("Growth Rate: " + growthRate, x - 180, y + 50);
  text("Min Potatoes: " + minPotatoes, x - 180, y + 70);
  text("Max Potatoes: " + maxPotatoes, x - 180, y + 90);
  text("potatoes storage: " + maxPotatoesStored, x - 180, y + 110);
}

function uppgrade(){
if (mouseX > 1200 && mouseX < 1300 && mouseY > 0 && mouseY < 100&& cash >= 50) {

  //upgrade max potatoes storage
  maxPotatoesStored = maxPotatoesStored + 5;
  //deduct the cost from the player's cash
  cash = cash - 50;
} 
}
//losing condition
function bankruptcyWithLand() {

}

    function bankruptcy() {
      if ( cash <= 9 && potatoes <= 0 && vodka <= 0 &&land1 == false &&land2 == false &&land3 == false &&land4 == false) 
        {
          bankruptcy = true;
      } else if (cash <= 9 && seeds <= 0 && potatoes <= 0 && vodka <= 0 && land1growth == false && land2growth == false && land3growth == false && land4growth == false) {
        bankruptcy = true;
      }

      if (bankrupcy == true) {
        text("You are bankrupt! Game Over!", 500, 300);
      }
    
    }
