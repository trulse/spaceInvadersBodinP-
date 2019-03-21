sizeEnemy = 35; 
speedX = 0.2;
speedY = 0;
posX = 1;
posY = 1;
marginY = 75;
marginX = 100;
Width = 800;
Height = 600;
borderYgameOver = 500;
bulletArray = []; 
bulletSpeed = 6;
bulletAmount = 1050;  // bør være mellom 1000 og 1200 //
probability = 240;
playerBullet = [];
nextWave = 0;
level = 0;
var player = [];
var playerXPos = 290;
var PlayerYpos = 575;
var XDir = 0;
var YDir = 0;
amountOfBullets = 0;

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
    player = new Player(playerXPos, PlayerYpos,25,15);
}

function draw(){
    background(0);
    stroke(255);
    line(0,borderYgameOver, 800, borderYgameOver);

    player.show();
    fill(255);
    onBoard();
    showEnemies();
    borderCollision();

    for(let i = 0; i < enemyArray.length; i++){
        for(let j = 0; j < enemyArray[i].length; j++){
            enemyArray[i][j].x += speedX;
        }
    }

    while(playerBullet.length >= 3){
        playerBullet.splice(2,1);
    }

    bulletsOfEnemies();
    bulletOffscreen();

        for(let i = 0; i < enemyArray.length; i++){
            for(let j = 0; j < enemyArray[i].length; j++){
                if(hitbox(enemyArray[i][j].x, (enemyArray[i][j].x + sizeEnemy), player.playerX, (player.playerX + 25)) &&
                hitbox(enemyArray[i][j].y, (enemyArray[i][j].y + sizeEnemy/1.25), player.playerY, (player.playerY + 15)) && enemyArray[i][j].size > 0){
                    noLoop();
                }
                for(let b = 0; b < playerBullet.length; b++){
                            if(hitbox(enemyArray[i][j].x, (enemyArray[i][j].x + sizeEnemy), playerBullet[b].x, (playerBullet[b].x + playerBullet.size/6) &&
                            hitbox(enemyArray[i][j].y, (enemyArray[i][j].y + sizeEnemy/1.25), playerBullet[b].y, playerBullet[b].y + sizeEnemy/1.5)) && enemyArray[i][j].size > 0){
                                enemyArray[i][j].size = 0;
                                playerBullet.splice(b,1);
                                amountOfBullets += 5;
                            }
                            for(let n = 0; n < bulletArray.length; n++){
                                if(hitbox(bulletArray[n].x, (bulletArray[n].x + sizeEnemy/6), player.playerX, (player.playerX + 25)) &&
                                hitbox(bulletArray[n].y, (enemyArray[i][j].y + sizeEnemy/1.25), player.playerY, (player.playerY + 15)) && enemyArray[i][j].size > 0){
                                    noLoop();
                            }
                        }
                    }
                }
            }

        nextWave = 0;
            for(let i = 0; i < enemyArray.length; i++){
                for(let j = 0; j < enemyArray[i].length; j++){
                    if(enemyArray[i][j].size < 1){
                      nextWave++; 
                        }
                    }
                }
                if(nextWave >= 40 && level <= 2){
                    setTimeout(newWave, 1);
                    amountOfBullets = 0;
                    speedX = speedX*1.5;
                    speedY = speedY*0.5;
                    bulletSpeed = 1.5*bulletSpeed;
                    nextWave = 0;
                    level;
                }
            }
// funksjoner utenfor draw() //

// Brukes også til testing skal erstattes med player koordinater//
function bulletOffscreen(){ 
    for(let i = 0; i < bulletArray.length; i++){
    bulletArray[i].show();
    bulletArray[i].y += bulletSpeed;
        
        if(bulletArray[i].y >= 600){
            bulletArray.splice(i, 1);
        }
    }

    for(let i = 0; i < playerBullet.length; i++){
        playerBullet[i].show();
        playerBullet[i].y += -bulletSpeed;
            if(playerBullet[i].y <= 0){
                playerBullet.splice(i, 1);
            }
        }
    }

function bulletsOfEnemies(){
    randomGen = Math.floor(Math.random() * probability);
    if(randomGen === 0){
    generateEnemyBullet();
    probability = 300-amountOfBullets;
    }
    else{
        probability = probability/(bulletAmount/1000);
    }
}

function generatePlayerBullet(){
    playerBulletEn = new bulletPlayer((player.playerX + 10), (player.playerY - 15), sizeEnemy);
    playerBullet.push(playerBulletEn);
}

// ** //

function generateEnemyBullet(){
    bulletEnemy = enemyArray[Math.floor(Math.random() * 8)][Math.floor(Math.random() * 5)];
    if(bulletEnemy.size === 0){
        generateEnemyBullet();
    }
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

function newWave(){
    for(let b = 0; b < enemyArray.length; b++){
        for(let n = 0; n < enemyArray[b].length; n++){
    enemyArray[b][n].x = 90*b+marginX+posX;
    enemyArray[b][n].y = 50*n+25+marginY+posY;
    enemyArray[b][n].size = 35;
        }
    }
}
    
    function borderCollision(){
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
            if (enemyArray[i][j].y > borderYgameOver && enemyArray[i][j].size > 1){
                noLoop();
            }
        }
    }   
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW && player.playerX < 800) {
        player.XDir -= 2;
    } else if (keyCode === LEFT_ARROW && player.playerX > 0) {
        player.XDir += 2;
    }
    else if (keyCode === DOWN_ARROW && player.playerY < 600) {
        player.YDir -= 2;
    }
    else if (keyCode === UP_ARROW && player.playerY > 0) {
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
    else if (keyCode === 32){       
        generatePlayerBullet();
    }
    
}

function onBoard(){
    if(player.playerX > 800-player.playerWidth){
        player.playerX = 799-player.playerWidth;
    }
    if(player.playerX < 0){
        player.playerX = 1;
    }
    if(player.playerY > 600 - player.playerWidth/2){
        player.playerY = 599 - player.playerWidth/2;
    }
    if(player.playerY < 0){
        player.playerY = 1;
    }
}

function showEnemies(){
    for(let i = 0; i< enemyArray.length; i++){
        for(let j = 0; j< enemyArray[i].length; j++){
        enemyArray[i][j].show();
        }
    }
}

function hitbox(a,b,c,d){
    if((c < b && c > a) || (a < d && b > d)){
        return true;
    }
    else{
        return false;
    }
}

/* function turNextWave(array, x, y, size){
        for(let j = 0; j < enemyArray[i].length; j++){
            enemyArray[j].size < 1;
        }
 if(enemyArray.size < 1){
    return true; }
    debugger;
    if(enemyArray.size < 1){
        return true; }
    return array.size <= 1;
 } */   