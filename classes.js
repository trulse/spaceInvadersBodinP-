
class Enemy {

    constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
}

    show(){
        fill(255);
        rect(this.x, this.y, this.size, this.size/1.25);  // this.size/4 //
    }
}

class Bullet{
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show(){
        fill(150,20,70);
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
        fill(150,20,70);
        rect(this.x, this.y, this.size/6, this.size/1.5);
    }

}


class Player{
    constructor(x,y,size,speed){
        this.x = x;
        this.y = y;
        this.size = size;
    }
}