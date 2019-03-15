sizeEnemy = 35; 
speedX = 0.5;
speedY = 1;
posX = 1;
posY = 1;
marginY = 75;
marginX = 100;
Width = 800;
Height = 600;
borderYgameOver = 500+500;
bulletArray = []; 
bulletSpeed = 6;
bulletAmount = 1050;  // bør være mellom 1000 og 1200 //
probability = 240;
playerBullet = [];

function setup(){
    createCanvas(Width,Height);
    background(0);
    enemyArray = [];
    for(i = 0; i<8; i++){
        enemyArray[i] = [];
        for(j = 0; j<5; j++){
            enemyArray[i][j] = new Enemy(90*i+marginX+posX,50*j+25+marginY+posY,sizeEnemy);
        }
    }

    playerBullet[0] = new bulletPlayer(300, 550, 5, 5);
}

function draw(){
    background(0);

    for(let i = 0; i< enemyArray.length; i++){
        for(let j = 0; j< enemyArray[i].length; j++){
        enemyArray[i][j].show();
        }
    }

    borderSpeed();

    for(let i = 0; i < enemyArray.length; i++){
        for(let j = 0; j < enemyArray[i].length; j++){
            enemyArray[i][j].x += speedX;
        }
    }

    randomGen = Math.floor(Math.random() * probability);

    if(randomGen === 0){
    generate();
    probability = 240;
    }

    else{
        probability = probability/(bulletAmount/1000);
    }


    for(let i = 0; i < bulletArray.length; i++){
    bulletArray[i].show();
    bulletArray[i].y += bulletSpeed;
        
        if(bulletArray[i].y >= 600){
            bulletArray.splice(i, 1);
        }
    }

    // brukes til testing og skal erstattes med at player skyter //
    randomNumber = Math.floor(Math.random() * 400);

    if(randomNumber === 0){
        generatePlayer();
    }

    for(let i = 0; i < playerBullet.length; i++){
        playerBullet[i].show();
        playerBullet[i].y += -speedY;
            
            if(playerBullet[i].y <= 0){
                playerBullet.splice(i, 1);
            }
        }
        //   **   //
        for(let i = 0; i < enemyArray.length; i++){
            for(let j = 0; j < enemyArray[i].length; j++){
                if(i < playerBullet.length){
                    if(enemyArray[i][j].y+sizeEnemy === playerBullet[i].y){

                    enemyArray[i][j].x = 0;
                    enemyArray[i][j].y = 0; 
                    enemyArray[i][j].size = 0;
                }
                }
    
            }
        }
    }
// funksjoner utenfor draw() //

// Brukes også til testing //
function generatePlayer(){
    
    playerBulletEn = new bulletPlayer(400, 500, sizeEnemy);
    playerBullet.push(playerBulletEn);

}

// ** //

function generate(){
    bulletEnemy = enemyArray[Math.floor(Math.random() * 8)][Math.floor(Math.random() * 5)];
    bullet = new Bullet(bulletEnemy.x, bulletEnemy.y, bulletEnemy.size, bulletEnemy.size);
    bulletArray.push(bullet);
}

function moveY(){
    for(q = 0; q < enemyArray.length; q++){
        for(s = 0; s < enemyArray[q].length; s++){
            enemyArray[q][s].y += speedY;
        }
    }
}
    
    function borderSpeed(){
        for(let i = 0; i < enemyArray.length; i++){
            for(let j = 0; j < enemyArray[i].length; j++){
    
            if(enemyArray[i][j].x > Width-sizeEnemy){ 
                    moveY(); 
                    speedX = -speedX;
              }
    
            if(enemyArray[i][j].x < 0 ){ 
                moveY(); 
                speedX = -speedX;
            }
    
            if (enemyArray[i][j].y > borderYgameOver){
                    noLoop();
            }
        }
    }   
}