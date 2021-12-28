var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var stoneImg, stone, stoneGroup;
var gameImg, game;
var gameState = "play"
var score;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  stoneImg = loadImage("stone.png")
  gameImg = loadImage("gameOver.png")
}

function setup(){
  createCanvas(600,900);
  tower = createSprite(300,900);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  stoneGroup = new Group ();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.4;
  ghost.addImage("ghost", ghostImg);

  
  ghost.setCollider("rectangle",0,0,ghost.width,ghost.height);

  score = 0;

}

function draw(){
  background(0);
  text("Score: "+ score, 100,50);
 

  if (gameState === "play") {

    score = score + Math.round(getFrameRate()/70);

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
   
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 901){
      ghost.destroy();
      gameState = "end"
    }
    if(stoneGroup.isTouching(ghost)){
      ghost.destroy()
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("red");
    fill("red");
    textSize(50);
    text("Game Over", 190,360)
    
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
  if (frameCount % 240 === 0) {   
    var stone = createSprite(200, -50);
    stone.x = Math.round(random(120,400));
    stone.addImage(stoneImg);
    stone.velocityY= 10;
    stone.lifetime = 800;
    stone.scale = 0.3;
    stoneGroup.add(stone)


}
}

