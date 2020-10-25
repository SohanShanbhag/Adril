class Form{
    constructor(){
        this.start = createButton("Enter Game");
        this.instruct1 = createElement("h3");
        this.instruct2 = createElement("h3");
        this.instruct3 = createElement("h3");
        this.instruct4 = createElement("h3");
        this.instruct5 = createElement("h3");
        this.input = createInput("");

        this.greet = createElement("h3");
        this.speed = createButton("Generate Speed");
        this.tell = createElement("h3");
        this.new = createElement("h3");
        this.play = createButton("Play Game")

        this.reset = createButton("Restart");
    }

    hide(){
        this.start.hide();
        this.instruct1.hide();
        this.instruct2.hide();
        this.instruct3.hide();
        this.instruct4.hide();
        this.instruct5.hide();
        this.input.hide();
    }

    display(){
        this.play.hide();
        this.reset.hide();

        this.instruct1.html("Enter your name in the box below");
        this.instruct1.position(width/2 - 130, height/2 - 170);
        this.instruct1.style("color", "yellow");
        this.instruct1.style("font-family", "verdana");

        this.input.position(width/2 - 115, height/2 - 100);
        this.input.style("font-size", "24px");
        this.input.style("font-weight", "bold")
        this.input.style("background", "#56FF00");
        this.input.style("width", "310px");
        this.input.style("height", "30px")
        this.input.style("text-align", "center");
        this.input.required = true;

        this.start.position(width/2 - 65, height/2 - 50);
        this.start.style("width", "220px");
        this.start.style("height", "30px");
        this.start.style("background", "yellow");
        this.start.style("font-weight", "bold");

        this.instruct2.html("Play This Game on Mobile and PC");
        this.instruct2.style("color", "yellow");
        this.instruct2.style("font-family", "verdana");
        this.instruct2.position(width/2 - 130, height/2 + 10)

        this.instruct3.html("Mobile: Generate a random speed and you will be running automatically. Tap the screen to jump. Collect coins and reach the safe house. Beware of the deadly monsters.")
        this.instruct3.style("color", "white");
        this.instruct3.style("font-family", "verdana");
        this.instruct3.position(width/2 - 670, height/2 + 50);
        this.instruct3.style("text-align", "center");

        this.instruct4.html("PC: Generate a random speed and you will be running automatically. Press the SPACE button to jump. Collect coins and reach the safe house. Beware of the deadly monsters.")
        this.instruct4.style("color", "white");
        this.instruct4.style("font-family", "verdana");
        this.instruct4.position(width/2 - 670, height/2 +150);
        this.instruct4.style("text-align", "center");

        this.instruct5.html("The next screen will have the Random Speed Generator. Enter your name and let's go to the Generator.")
        this.instruct5.style("color", "white");
        this.instruct5.style("font-family", "verdana");
        this.instruct5.position(width/2 - 550, height/2 +220);
        this.instruct5.style("text-align", "center");

        this.start.mousePressed(()=>{
            gameState = 1;
            name = this.input.value();
        })
    }

    speedDisplay(){
        this.speed.position(width/2 - 65, height/2 + 100);
        this.speed.style("width", "220px");
        this.speed.style("height", "30px");
        this.speed.style("background", "yellow");
        this.speed.style("font-weight", "bold");

        this.greet.html("Hello " + name);
        this.greet.position(width/2 - 0, height/2 - 100);
        this.greet.style("font-family", "verdana");
        this.greet.style("color", "black");

        this.tell.html("Generate your speed that your player will run at.");
        this.tell.style("color", "black");
        this.tell.style("font-family", "verdana");
        this.tell.position(width/2 - 200, height/2 + 0);

        this.speed.mousePressed(()=>{
            this.greet.hide();
            this.speed.hide();
            this.tell.hide();
            this.play.show();

            speed = Math.round(random(20, 30))
            this.new.html("Your Speed is : " + speed);
            this.new.position(width/2 - 50, height/2 - 100)
            this.new.style("font-family", "verdana");

            this.play.position(width/2 - 65, height/2 + 100);
            this.play.style("width", "220px");
            this.play.style("height", "30px");
            this.play.style("background", "yellow");
            this.play.style("font-weight", "bold");

            this.play.mousePressed(()=>{
                gameState = 2;
            })
        })
    }

    hideSpeed(){
        this.play.hide();
        this.new.hide();
    }
}