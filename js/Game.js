
class Game{
    constructor(){
        this.restart = createButton("Restart");

        this.refresh = createButton("Refresh Browser if you forgot to press the button last time");

        this.rate = createButton("Rate Game");
    }

    async start(){
        if(gameState === 0){
            form = new Form;
            form.display();
        }

        this.refresh.hide();
        this.restart.hide();

        this.rate.hide();

        this.rate.position(width/2 - 665, height/2 - 340);
        this.rate.style("width", "170px");
        this.rate.style("height", "30px");
        this.rate.style("background", "gold");
        this.rate.style("font-weight", "bold");
        this.rate.style("cursor", "pointer");

        this.rate.mousePressed(()=>{
            Swal.fire({
                title: "Rate The Game",
                input: "number",
            }), function(text) {

                // check the length of "text" instead of "inputValue"
                // since that's what you're passing into the function
            
                if (text.value > 5) {
                    swal.showInputError("You have exceeded 140 characters!");
                    return false;
                }
             };
        })

        player = createSprite(width - 800, height/2 + 300);
        player.addAnimation("Player", playerAnimation2);
        // player.debug = true;
        player.setCollider("circle", 0, 0, 60)

        for(var land = 3000; land < 18000; land += random(3000, 3500)){
            flyingLand = createSprite(land, random(height/2 + 10, height/2), 10, 10);
            flyingLand.addImage(flyingLandImg);
            flyingLand.scale = 0.5;

            // flyingLand.debug = true;

            flyingLandGroup.add(flyingLand);
        }

        invisiGround = createSprite(width/2 + 5000, height/2 + 370, 50000, 100);
        invisiGround.visible = false;

        for(var monster = 2000; monster < 18000; monster += 3000){
            groundMonster = createSprite(monster, player.y);
            groundMonster.addAnimation("Monster", monsterAnimation);
            groundMonster.scale = 0.4;

            monsterGroup.add(groundMonster);
        }

        for(var monster2 = 2000; monster2 < 22000; monster2 += random(2000, 2500)){
            flyingMonster = createSprite(monster2, random(height/2 - 50, height/2));
            flyingMonster.addAnimation("Flying", flyingMonsterAnimation);
            flyingMonster.scale = 0.3;
            flyingMonster.velocityX = -15;
            flyingMonsterGroup.add(flyingMonster);
        }

        for(var play = 1000; play < 18000; play += random(2000, 2500)){
            coin = createSprite(play, random(player.y, player.y - 200));
            coin.addAnimation("Coin", coinAnimation);
            coin.scale = 0.3;
            coinGroup.add(coin);
        }

        for(var bullet = 1000; bullet < 18000; bullet += random(2000, 2500)){
            monsterBullet = createSprite(bullet, groundMonster.y - 50, 30, 5);
            monsterBullet.shapeColor = "red";
            monsterBullet.velocityX = -10;

            monsterBulletGroup.add(monsterBullet);
        }

        

        for(var mon = 0; mon < flyingLandGroup.length; mon += 2){
            heart = createSprite(flyingLandGroup[mon].x, flyingLandGroup[mon].y - 50);
            heart.addImage(heartImg);
            heart.scale = 0.5;

            heartGroup.add(heart);
        }

        castle = createSprite(width/2 + 19285, player.y - 300);
        castle.addImage(castleImg);
        castle.scale = 3
    }

    speed(){
        form.hide();

        this.rate.hide();   

        form.speedDisplay();
    }

    play(){
        form.hideSpeed();

        this.restart.position(width/2 + 605, height/2 - 340);
        this.restart.style("width", "170px");
        this.restart.style("height", "30px");
        this.restart.style("background", "yellow");
        this.restart.style("font-weight", "bold");
        this.restart.style("cursor", "pointer")

        this.refresh.position(width/2, height/2);
        this.refresh.style("width", "500px");
        this.refresh.style("height", "50px");
        this.refresh.style("background", "cyan");
        this.refresh.style("font-weight", "bold");
        this.refresh.style("cursor", "pointer");

        this.rate.hide();

        this.refresh.hide();

        player.velocityX = speed;
        monsterBullet.velocityX = speed;

        image(groundImg, 0, height/2 + 300, width*14, 250);

        console.log(player.y)

        camera.position.y = height/2;
        camera.position.x = player.x;

        if(touches.length === 1 && player.y > 611 || keyDown("space") && player.y>= 612){
            player.velocityY = -30;
            jumpSound.play();
        }
        player.velocityY += 1;

        for(var hit1 = 0; hit1 < monsterGroup.length; hit1 ++){
            if(monsterGroup[hit1].isTouching(player)){
                lives -= 1;
                monsterGroup[hit1].destroy();
                hitSound.play();
            }
        }
        for(var hit2 = 0; hit2 < flyingMonsterGroup.length; hit2 ++){
            if(flyingMonsterGroup[hit2].isTouching(player)){
                lives -= 1;
                flyingMonsterGroup[hit2].destroy();
                hitSound.play();
            }
        }
        for(var hit3 = 0; hit3 < monsterBulletGroup.length; hit3 ++){
            if(monsterBulletGroup[hit3].isTouching(player)){
                lives -= 1;
                monsterBulletGroup[hit3].destroy();
                hitSound.play();
            }
        }

        for(var coin = 0; coin < coinGroup.length; coin ++){
            if(coinGroup[coin].isTouching(player)){
                coinNumber += 1;
                coinGroup[coin].destroy();
                coinSound.play();
            }
        }
        for(var collide4 = 0; collide4 < flyingLandGroup.length; collide4 ++){
            if(flyingLandGroup.isTouching(player)){
                player.collide(flyingLandGroup[collide4]);
                player.velocityY += 1;
                // player.velocityY = 0;
                // player.velocityX = 0;
                // landSound.play();
            }
        }

        for(var life = 0; life < heartGroup.length; life ++){
            if(player.isTouching(heartGroup[life]) && lives > 0){
                heartGroup[life].destroy();
                winSound.play();
                lives += 1;
            }
        }

        //ScoreBoard;
        textStyle(BOLD);
        fill("black");
        textSize(25);
        text(name + "(You) : " + Math.round(player.x/2), player.x - 700, height/2 - 300);
        text("Lives left : " + lives, player.x - 700, height/2 - 260);
        text("Coins Collected : " + coinNumber, player.x - 700, height/2 - 220);

        player.collide(invisiGround);

        this.restart.mousePressed(()=>{
            resetGame();
        });

        if(player.collide(castle) && lives > 0){
            this.refresh.show();
            gameState = 3;
            this.restart.hide();
            Swal.fire({
                title: 'VICTORY',
                icon: 'success',
                confirmButtonText: "Click Me to Restart the Game!",
                showCancelButton: true,
                showCloseButton: true,
                text: "Well Done! You won the Game by reaching the safe house",
            }).then((result)=>{
                if(result.isConfirmed){
                    gameState = 2;
                    resetGame();
                }

            })

            this.refresh.mousePressed(()=>{
                location.reload();
            })
        }

        if(lives <= 0){
            gameState = 3;
            Swal.fire({
                title: "Oops....",
                icon: "error",
                text: "You lost all your lives, " + name + ". But it is okay, restart the game and show the evil monsters that you are capable of anything!",
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonText: "Click Me to Restart the Game!",
                
            }).then((result)=>{
                if(result.isConfirmed){
                    gameState = 2;
                    resetGame();
                }
            })
        }

        drawSprites();
    }
}

function resetSite(){
    gameState = 0;
}

function resetGame(){
    player.x = width - 700;
    player.y = height/2 + 300;
    lives = 10;
    coinNumber = 0;

    for(var hit1 = 0; hit1 < monsterGroup.length; hit1 ++){
            monsterGroup[hit1].destroy();
    }
    for(var hit2 = 0; hit2 < flyingMonsterGroup.length; hit2 ++){
        flyingMonsterGroup[hit2].destroy();
    }
    for(var hit3 = 0; hit3 < monsterBulletGroup.length; hit3 ++){
            monsterBulletGroup[hit3].destroy();
    }

    for(var monster = 2000; monster < 18000; monster += 3000){
        groundMonster = createSprite(monster, player.y);
        groundMonster.addAnimation("Monster", monsterAnimation);
        groundMonster.scale = 0.4;

        monsterGroup.add(groundMonster);
    }

    for(var monster2 = 2000; monster2 < 18000; monster2 += random(2000, 2500)){
        flyingMonster = createSprite(monster2, random(height/2 - 50, height/2));
        flyingMonster.addAnimation("Flying", flyingMonsterAnimation);
        flyingMonster.scale = 0.3;
        flyingMonster.velocityX = -15;
        flyingMonsterGroup.add(flyingMonster);
    }

    for(var bullet = 1000; bullet < 18000; bullet += random(2000, 2500)){
        monsterBullet = createSprite(bullet, groundMonster.y - 50, 30, 5);
        monsterBullet.shapeColor = "red";
        monsterBullet.velocityX = -10;

        monsterBulletGroup.add(monsterBullet);
    }

    for(var mon = 0; mon < flyingLandGroup.length; mon += 2){
        heart = createSprite(flyingLandGroup[mon].x, flyingLandGroup[mon].y - 50);
        heart.addImage(heartImg);
        heart.scale = 0.5;

        heartGroup.add(heart);
    }
}