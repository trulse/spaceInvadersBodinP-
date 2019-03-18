var player = [];
var playerXPos = 290;
var PlayerYpos = 575;
var XDir = 0;
var YDir = 0;

function setup(){
 var canvas = createCanvas(600, 600)
 background(0);
 player = new Player(playerXPos, PlayerYpos,25,15);
}

function draw(){
    background(0);
    player.show();
    console.log(player.YDir,player.XDir)
    onBoard()
    
}

    
function keyReleased() {
    if (keyCode === RIGHT_ARROW) {
        player.XDir -= 2;
    } else if (keyCode === LEFT_ARROW) {
        player.XDir += 2;
    }
    else if (keyCode === DOWN_ARROW) {
        player.YDir -= 2;
    }
    else if (keyCode === UP_ARROW) {
        player.YDir += 2;
    }
    }

    function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        player.XDir += 2;
    } else if (keyCode === LEFT_ARROW) {
        player.XDir += -2;
    }
    else if (keyCode === DOWN_ARROW) {
        player.YDir += 2;
    }
    else if (keyCode === UP_ARROW) {
        player.YDir += -2;
    }
    
}
function onBoard(){
    if(player.playerX > 600){
        player.XDir = 0;
    }
    if(player.playerX < 0){
        player.XDir = 0;
    }
    if(player.playerY > 600){
        player.YDir = 0;
    }
    if(player.playerY < 0){
        player.YDir = 0;
    }
}
      

