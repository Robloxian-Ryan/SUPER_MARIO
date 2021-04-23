var marioImage, mario;
var groundImage, ground;
var bgImage;
var obstacleImage, obstacle, obstacleGroup;
var brick, brickImage, brickGroup;
var coin, coinImage, coinGroup;
var gameState;

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
        
    brickImage = loadImage("brick.png");

    coinImage = loadImage("coin.png");
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

    obstacleGroup = new Group();
    brickGroup = new Group();
    coinGroup = new Group();

    gameState = "play";
}

function draw() {
    background(bgImage);
    drawSprites();
    spawnObstacles();
    spawnBricks();
    spawnCoins();

    if(ground.x <= 0) {
        ground.x = 600;
    }

    mario.velocityY += 1;
    
    if(keyDown("space") && mario.collide(ground)) {
        mario.velocityY = -20;
    }

    mario.collide(ground);

    for (var i = 0; i < brickGroup.length; i++) {
        if(brickGroup.get(i).isTouching(mario)) {
            brickGroup.get(i).remove();
            mario.velocityY += 5;
        }
    }

    for (var i = 0; i < coinGroup.length; i++) {
        if(coinGroup.get(i).isTouching(mario)) {
            coinGroup.get(i).remove();
        }
    }

}

function spawnObstacles() {
    if(frameCount % 100 === 0) {
        obstacle = createSprite(1210, 420, 1000, 300);
        obstacle.addAnimation("obstacleImage", obstacleImage);
        obstacle.scale = 2;
        obstacle.velocityX = ground.velocityX;
        obstacleGroup.add(obstacle);
    }
}

function spawnBricks() {
    var rand = Math.round(random(120, 170));
    if(frameCount % rand === 0) {
        brick = createSprite(1210, 300, 1000, 300);
        brick.addImage("brickImage", brickImage);
        brick.scale = 2;
        brick.velocityX = ground.velocityX;
        brickGroup.add(brick);
    }
}

function spawnCoins() {
    if(frameCount % 155 === 0) {
        coin = createSprite(1210, 330, 1000, 300);
        coin.addImage("coinImage", coinImage);
        coin.scale = 1;
        coin.velocityX = ground.velocityX;
        coinGroup.add(coin);
    }
}