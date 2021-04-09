var marioImage, mario;
var groundImage, ground;
var bgImage;
var obstacleImage, obstacle;

function preload() {
    bgImage = loadImage("bg.png");
    groundImage = loadImage("ground2.png");
    marioImage = loadAnimation(
        "mario00.png",
        "mario01.png",
        "mario02.png",
        "mario03.png"
        );
    obstacleImage = loadAnimation(
        "obstacle2.png",
        "obstacle3.png",
        "obstacle4.png",
        "obstacle3.png",
        "obstacle1.png"
    );
}

function setup() {
    createCanvas(1200, 600);
    ground = createSprite(600, 550, 1200, 100);
    ground.addImage("groundImage", groundImage);
    ground.scale = 2;
    ground.velocityX = -10;

    mario = createSprite(200, 300, 50, 50);
    mario.addAnimation("marioImage", marioImage);
    mario.scale = 3;

    obstacle = createSprite(1400, 420, 1000, 300);
    obstacle.addAnimation("obstacleImage", obstacleImage);
    obstacle.scale = 2;
}

function draw() {
    background(bgImage);
    drawSprites();

    if(ground.x <= 0) {
        ground.x = 600;
    }

    mario.velocityY += 1;
    
    if(keyDown("space") && mario.collide(ground)) {
        mario.velocityY = -15;
    }

    mario.collide(ground);
}