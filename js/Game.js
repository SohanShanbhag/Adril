class Game{
    async start(){
        if(gameState === 0){
            form = new Form;
            form.display();
        }

        player = createSprite(width - 800, height/2 + 300);
        player.addAnimation("Player", playerAnimation);

        invisiGround = createSprite(width/2 + 5000, height/2 + 400, 50000, 100);
        invisiGround.visible = false;

        player.collide(invisiGround)
    }

    speed(){
        form.hide();

        form.speedDisplay();
    }

    play(){
        form.hideSpeed();
        player.velocityX = speed;

        image(groundImg, 0, height/2 + 300, width*10, 250)

        camera.position.y = height/2;
        camera.position.x = player.x;

        drawSprites();
    }
}