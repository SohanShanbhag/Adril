//MAIN VARIABLES//

//Global
var distance, form, game, gameState = 0, name, coinNumber = 0, lives = 0, player, speed;

//Images and Animations
var playerAnimation, monsterAnimatation, coinAnimation, flyingMonsterAnimation, fireBallImg, castleImg, groundImg, logoImg, backgroundImg, flyingLandImg;

//Player Ability and feature
var playerBullet, invisiGround;

//Monster Ability
var monsterBullet;

//Groups
var monsterGroup, coinGroup, flyingMonsterGroup, monsterBulletGroup, playerBulletGroup, flyingLandGroup;

//Sounds
var coinSound, hitSound, jumpSound, landSound, loseSound, winSound;

//Preload Images and Files needed
function preload(){
    playerAnimation = loadAnimation("images/Player1.png", "images/Player2.png", "images/Player3.png");
    monsterAnimatation = loadAnimation("images/Monster1.png", "images/Monster2.png");
    coinAnimation = loadAnimation("images/Coin1.png", "images/Coin2.png", "images/Coin3.png");
    flyingMonsterAnimation = loadAnimation("images/FlyingMonster1.png", "images/FlyingMonster2.png");
    fireBallImg = loadImage("images/FireBall.png");
    castleImg = loadImage("images/Castle.png");
    groundImg = loadImage("images/Ground.png");
    logoImg = loadImage("images/Logo.png");
    backgroundImg = loadImage("images/StartBackground.png");
    flyingLandImg = loadImage("images/FlyingLand.png");

    monsterGroup = new Group();
    flyingLandGroup = new Group();
    flyingMonsterGroup = new Group();
    coinGroup = new Group();
    monsterBulletGroup = new Group();
    playerBulletGroup = new Group();

    jumpSound = loadSound("music/Jump.mp3");
    loseSound = loadSound("music/Lose.flac");
    coinSound = loadSound("music/Collect.wav");
    winSound = loadSound("music/Win.wav");
    hitSound = loadSound("music/Hit.flac");
    landSound = loadSound("music/Land.wav");
}

function setup(){
    windowWidth -= 100;
    windowHeight -= 50;

    canvas = createCanvas(windowWidth, windowHeight);

    console.log(windowWidth, windowHeight);

    logo = createSprite(width/2, height/2 - 285);
    logo.addImage(logoImg);
    logo.scale = 0.4;

    gameState = 0;

    game = new Game;
    game.start();
}

function draw(){
    background(backgroundImg);

    logo.display();

    if(gameState === 1){
        background("#17FD73");
        game.speed();
        logo.display();
    }

    if(gameState === 2){
        background("#57D7F7");
        game.play();
    }
}