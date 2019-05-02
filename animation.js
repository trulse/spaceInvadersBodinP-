var sizeEnemy = 35;
var sizeBoss = 100; 
var speedX = 0.2;
var speedY = 3.5;
var posX = 1;
var posY = 1;
var marginY = 75;
var marginX = 100;
var Width = 800;
var Height = 600;
var borderYgameOver = 500;
var bulletArray = []; 
var bulletSpeed = 5;
var bulletAmount = 1.05;  // bør være mellom 1.00 og 1.25 øker/minker betraktelig antall skudd med små justeringer  //
var probability = 300;
var playerBullet = [];
var nextWave = 0;
var level = 0;
var poengsum = 0;
var player = [];
var playerXPos = 290;
var PlayerYpos = 575;
var XDir = 0;
var YDir = 0;
var amountOfBullets = 0;
var enemybilde;
var playerWidth = 25;
var playerHeight = 15
var marginXEnemies = 90;
var marginYEnemies = 50;
var poengPerEnemy = 100;
var amountOfEnemies = 40;
var speedXIncrease = 1.3; //endrer vanskelighetsgraden på spillet oppgis som kommatall, men kan ganges med 100 for å få en prosent sammenliknet med tidligere nivå//
var speedYIncrease = 0.9; //Samme som linjen over//
var bulletSpeedIncrease = 1.16; //Samme som linjene over. Øker hastighet på bullets mellom hver wave //

function preload(){
    lyd = loadSound("melodi.mp3");
}

function setup(){
    createCanvas(Width,Height);
    background(0);
    enemyArray = [];
    for(i = 0; i<8; i++){
        enemyArray[i] = [];
        for(j = 0; j<5; j++){
            enemyArray[i][j] = new Enemy(marginXEnemies*i+marginX+posX,marginYEnemies*j+25+marginY+posY,sizeEnemy);
        }
    }

    player = new Player(playerXPos, PlayerYpos,playerWidth,playerHeight);
    enemybilde = loadImage("enemy.png");
    playerbilde = loadImage("89.jpg");
}

function draw(){
    background(0);
    stroke(0);

    player.show();

    fill(255);

    onBoard();
    showEnemies();
    borderCollision();
    moveX();

    playerBulletsLimit();
    bulletsOfEnemies();
    bulletOffscreen();

    playerHitsEnemyAndPlayerBulletHitsEnemy();
    playerHitsEnemyBullets();
    nextWaveFunction();

    fill(255);
    textSize(26);
    text('Poeng: '+ poengsum, 20, 40);
}

// funksjoner utenfor draw() //

function bulletOffscreen(){ 
    for(let i = 0; i < bulletArray.length; i++){
    bulletArray[i].show();
    bulletArray[i].y += bulletSpeed;
        
        if(bulletArray[i].y >= Height){
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
    probability = 300;  /* Verdi som indikerer at probability resettes. Variabelen får samme verdien som den startet med definert før setup*/
    }
    else{
        probability = probability/bulletAmount;
    }
}

function generatePlayerBullet(){
    playerBulletEn = new bulletPlayer((player.playerX + playerHeight), (player.playerY - playerWidth), sizeEnemy);
    playerBullet.push(playerBulletEn);
}

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

function moveX(){
    for(let i = 0; i < enemyArray.length; i++){
        for(let j = 0; j < enemyArray[i].length; j++){
            enemyArray[i][j].x += speedX;
        }
    }
}

function newWave(){
    for(let b = 0; b < enemyArray.length; b++){
        for(let n = 0; n < enemyArray[b].length; n++){
    enemyArray[b][n].x = marginXEnemies*b+marginX+posX;
    enemyArray[b][n].y = marginYEnemies*n+25+marginY+posY; /* verdien 25 indikerer avstanden de øverste enemiesene har til toppen av spillbrettet*/
    enemyArray[b][n].size = sizeEnemy;
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
                fill(255);
                textSize(26);
                text('Game Over din poengsum ble ' + poengsum, 200, 40);
            }
        }
    }   
}

function keyReleased() {
    if (keyCode === RIGHT_ARROW && player.playerX < Width) {
        player.XDir -= 2;
    } else if (keyCode === LEFT_ARROW && player.playerX > 0) {
        player.XDir += 2;
    }
    else if (keyCode === DOWN_ARROW && player.playerY < Height) {
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
    if(player.playerX > Width-player.playerWidth){
        player.playerX = (Width-1)-player.playerWidth;
    }
    if(player.playerX < 0){
        player.playerX = 1;
    }
    if(player.playerY > Height - player.playerWidth/2){
        player.playerY = (Height-1) - player.playerWidth/2;
    }
    if(player.playerY < 0){
        player.playerY = 1;
    }
}

function showEnemies(){
    for(let i = 0; i< enemyArray.length; i++){
        for(let j = 0; j< enemyArray[i].length; j++){
            if(enemyArray[i][j].size > 0){
                enemyArray[i][j].show();
            }
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

function playerHitsEnemyBullets(){
    for(let n = 0; n < bulletArray.length; n++){
        if(hitbox((player.playerX -10), (player.playerX + 10), bulletArray[n].x, (bulletArray[n].x + sizeEnemy*0.2))){
            if(hitbox(player.playerY, (player.playerY + playerHeight), bulletArray[n].y, (bulletArray[n].y + sizeEnemy*0.67))){
            noLoop();
            fill(255);
            textSize(26);
            text('Game Over din poengsum ble ' + poengsum, 200, 40);
            setTimeout(function(){location.reload(true)}, 2000);
            }
        }
    }
}

function playerHitsEnemyAndPlayerBulletHitsEnemy(){
    for(let i = 0; i < enemyArray.length; i++){
        for(let j = 0; j < enemyArray[i].length; j++){
            if(hitbox(enemyArray[i][j].x, (enemyArray[i][j].x + sizeEnemy), player.playerX, (player.playerX + playerWidth)) &&
            hitbox(enemyArray[i][j].y, (enemyArray[i][j].y + playerWidth), player.playerY, (player.playerY + playerHeight)) && enemyArray[i][j].size > 0){
                noLoop();
                fill(255);
                textSize(26);
                text('Game Over din poengsum ble ' + poengsum, 200, 40);
                setTimeout(function(){location.reload(true)}, 2000);
            }
            for(let b = 0; b < playerBullet.length; b++){
                /* Disse 3 if setningene kan ikke sammenfalles til 1 if setning med AND operator. Derfor splittes de i 3 for å få programmet til å funke slik det skal. Som gjennomgått i timen */
                        if(hitbox(enemyArray[i][j].x, (enemyArray[i][j].x + sizeEnemy), playerBullet[b].x, (playerBullet[b].x + playerBullet[b].size * 0.2))){
                            if(hitbox(enemyArray[i][j].y, (enemyArray[i][j].y + playerWidth), playerBullet[b].y, playerBullet[b].y + playerWidth)){
                                if(enemyArray[i][j].size > 0){
                                    enemyArray[i][j].size = 0;
                                    playerBullet.splice(b,1);
                                    amountOfBullets += 5;
                                    poengsum = poengsum+poengPerEnemy;
                        }
                    }
                }
            }        
        }
    }
}

function playerBulletsLimit(){
    while(playerBullet.length >= 3){
        playerBullet.splice(2,1);
    }
} 

function nextWaveFunction(){
    nextWave = 0;
    for(let i = 0; i < enemyArray.length; i++){
        for(let j = 0; j < enemyArray[i].length; j++){
            if(enemyArray[i][j].size < 1){
              nextWave++; 
                }
            }
        }
        if(nextWave >= amountOfEnemies && level <= 2){
            setTimeout(newWave, 1);
            amountOfBullets = 0;
            speedX = speedX*speedXIncrease;
            speedY = speedY*speedYIncrease;
            bulletSpeed = bulletSpeedIncrease*bulletSpeed;
            level++;
        }
        if(level >= 3){
            noLoop();
            fill(255);
            textSize(26);
            text('Gratulerer du vant spillet refresh siden for å starte på nytt', 200, 40, 400, 400);
            lyd.play();
        }
}   