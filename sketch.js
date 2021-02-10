var gamestate = 1;
var Play = 1;
var End = 0;

var monkey , monkey_running, ground;

var bananas ,bananaImage, stone, stoneImage;

var FoodGr, stoneGr, bgimg, bg;

var survivalTime = 0;
var score = 0;

function preload(){
  bgimg = loadImage("jungle.jpg");
  
  monkey_running =  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");

  end = loadImage("end.jpg");
 
}



function setup() {
  createCanvas(600,600);
  
  bg = createSprite(300,300);
  bg.addImage(bgimg);
  bg.scale = 0.8;
  bg.velocityX = -3;
   
  monkey = createSprite(300,510);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.16;
  
  ground = createSprite(300,570,1500,30);
  ground.velocityX = -6;
  
  FoodGr = createGroup();
  stoneGr = createGroup();
  
  survivalTime = 0;
  score = 0;

}


function draw() {
  
  monkey.collide(ground);
  
  if(gamestate === Play){
    survivalTime = Math.ceil(frameCount/frameRate());
     
    if(keyDown("space")&& monkey.y >= 250){
    monkey.velocityY = -12; 
  }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.velocityY = monkey.velocityY + 0.9;
    
    if(FoodGr.isTouching(monkey)){
      FoodGr.destroyEach();
      score = score + 2;
  }
    
    switch(score){
      case 10: monkey.scale = 0.18;
        break;
      case 20: monkey.scale = 0.20;
        break;
      case 30: monkey.scale = 0.22;
        break;
      case 40: monkey.scale = 0.24;
        break;
      case 50: monkey.scale = 0.26;
        break;
      case 60: monkey.scale = 0.28;
        break;
      case 70: monkey.scale = 0.295;
        break;
      default: break;
    }
    
    
  }

  if(stoneGr.isTouching(monkey)){
      gamestate = End;
      monkey.destroy();
  }

  if(gamestate === End){
    background(end);

    FoodGr.destroyEach();
    stoneGr.destroyEach(); 
    
    bg.velocityX = 0;
    bg.x = 300;
    bg.destroy();
  }
  
  if(bg.x < 185){
     bg.x = bg.width/2;
  }
  
  ground.visible = false;
  
  drawSprites(); 
  Banana();
  Stone();
  
  textSize(19);
  fill("white");
  text("Score: " + score, 420,80);
}

function reset(){
  gamestate = Play;
  FoodGr.destroyEach();
  stoneGr.destroyEach();
  SurvivalTime = 0;
  score = 0;
}

function Banana(){
  if(frameCount % 90 === 0){
     bananas = createSprite(600,300);
     bananas.addImage(bananaImage);
     bananas.scale = 0.07;
     bananas.velocityX = -4;
     bananas.y = Math.round(random(200,450));
     bananas.lifetime = 300;
     
    
     FoodGr.add(bananas); 
}
}

function Stone(){
  if(frameCount % 160 === 0){
      stone = createSprite(620,530);
      stone.addImage(stoneImage);
      stone.scale = 0.27;
  
      stone.velocityX = -5.5; 
      stone.lifetime = 300;
    
      stoneGr.add(stone);
  }
}
