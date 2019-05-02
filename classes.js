
class Enemy {

    constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
}

    show(){
        fill(0);
        rect(this.x, this.y, this.size, this.size/1.25);  // this.size/4 //
        image(enemybilde, this.x,this.y, this.size, this.size/1.25);
    }
}

class Bullet{
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show(){
        fill(150,20,20);
        rect(this.x+(sizeEnemy/2-(this.size/8)), this.y, this.size/6, this.size/1.5);

    }
}

class bulletPlayer{
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show(){
        fill(10,200,70);
        rect(this.x, this.y, this.size/6, this.size/1.5);
    }

}

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
            rect(playerX, playerY, this.playerWidth, this.playerHeight);
            fill(255);
            image(playerbilde, this.playerX,this.playerY, this.playerWidth, this.playerHeight);
        }





}