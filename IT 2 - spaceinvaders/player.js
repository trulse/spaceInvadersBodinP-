class Player {
    constructor(playerXPos, playerYPos, width, height){
        this.playerX = playerXPos;
        this.playerY = playerYPos;
        this.XDir = 0;
        this.YDir = 0;
        this.playerWidth = width;
        this.playerHeight = height;
    }
    move(x, y){
        this.playerX += x;
        this.playerY += y;
    }
    show(){
            this.move(this.XDir, this.YDir);
            let playerX = this.playerX;
            let playerY = this.playerY;
            rectMode(CENTER);
            rect(playerX, playerY, this.playerWidth, this.playerHeight);
            fill(255);
        }





}