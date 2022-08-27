var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("zombiegameimages/crying.png");
  backgroundimage=loadImage('zombiegameimages/background.jpeg')
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("zombiegameimages/cloud.png");
  
  obstacle1 = loadImage("./zombiegameimages/runzombie.png");
  obstacle2 = loadImage("./zombiegameimages/happy.png");
  obstacle3 = loadImage("./zombiegameimages/zombie1.png");
  obstacle4 = loadImage("./zombiegameimages/happy.png");
  obstacle5 = loadImage("./zombiegameimages/zombie1.png");
  obstacle6 = loadImage("./zombiegameimages/runzombie.png");
  
  gameOverImg = loadImage("zombiegameimages/gameOver.jpg");
  restartImg = loadImage("zombiegameimages/reset.png");
  zombie1=loadImage('zombiegameImages/zombie1.png')
  gameover=loadImage('zombiegameImages/gameover.jpg')
  boynew=loadImage('zombiegameImages/boynew.png')
  bullet=loadImage('zombiegameImages/bullet.png')
  girl=loadImage('zombiegameImages/girl.png')
 happy=loadImage('zombiegameImages/happy.png')
  hp=loadImage('zombiegameImages/hp.png')
  runzombie=loadImage('zombiegameImages/runzombie.png')
  //zombiesound=loadSound('zombiegameimages/theme.mp3')
}

function setup() {
  createCanvas(1200, 600);
  
  trex = createSprite(80,450,20,50);
  
  trex.addAnimation("running", boynew);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.3;
  
  ground = createSprite(600,550,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.visible=false
  gameOver = createSprite(540,350);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(1100,100);
  restart.addImage(restartImg);
  
  gameOver.scale = 2.2;
  restart.scale = 0.4;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(100,580,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  trex.debug = true;

trex.setCollider('circle',5,5)
  score = 0;
}

function draw() {
  print(mouseX+','+ mouseY, mouseX,mouseY)
  background(backgroundimage);
  //zombiesound.play()
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
    trex.changeAnimation("running", trex_running);
    
    if(keyDown("space") && trex.y >= 159 && trex.collide(invisibleGround)
    ) {
      trex.velocityY = -30;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }

  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  
  }

  textSize (20) 
  fill ('white')
  text("Score: "+ score, 500,50);
  if (score>500){
    fill ('white')
    textSize(100)
    text('Well Done!',500,100)
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 260 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(850,530,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(zombie1);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstacle.debug=true
  }
}

