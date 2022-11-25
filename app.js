const canvasElement = document.querySelector('canvas');
const conX = canvasElement.getContext('2d');  // method that returns a drawing context on the canvas

canvasElement.height = 400;
canvasElement.width = 400;

//Game parameters
let speed = 7;
let tileCount = 20;  //20 tiles of 20px | the snake is moving on the tiles
let snakeHeadX = 10; //snake head horizontal position
let snakeHeadY = 10; //snake head vertical position
let xV = 0; //initial x velocity
let yV = 0; //initial y velocity
let snackX = 5;
let snackY = 5;
let snakeTailLength = 2;
let score = 0;


//Derived Dimension
let tileSize = canvasElement.width / tileCount;

//snakeBody Array
const snakeBody = []

//Arrow keys event listener

document.addEventListener('keydown', keyDown);



//Create the game loop

function playGame() {
    changeSnakePosition();

    let result = gameOver();
    if(result) {
        return
    }

    clearScreen();
    drawSnake(); 
    drawSnack();
    snackColission();
    drawScore();
    setTimeout(playGame, 1000 / speed); //execute function the number of 'speed' per second
}

function gameOver() {
    let gameOver = false

    if(xV === 0 && yV === 0) {
        return false;
    }

    //check wall collision

    if(snakeHeadX < 0) {
        gameOver = true;
    } else if(snakeHeadX === tileCount) {
        gameOver = true
    } else if(snakeHeadY < 0) {
        gameOver = true
    } else if(snakeHeadY === tileCount) {
        gameOver = true
    }

    //check body collision
    for(let i = 0; i< snakeBody.length; i++) {
        let part = snakeBody[i]
        if(part.x === snakeHeadX && part.y === snakeHeadY) {
            gameOver = true
            break;
        }
    }

    if(gameOver){
        conX.fillStyle = 'white';
        conX.font = '50px sans-serif';
        conX.fillText('GAME OVER', canvasElement.width / 8, canvasElement.height / 2);
    }

    return gameOver;
}

function drawScore(){
    conX.fillStyle ='white'
    conX.font = '15px sans-serif';
    conX.fillText(`Score: ${score}` , 20, 20)
}

//Clear screen function
function clearScreen() {
    conX.fillStyle = 'rgb(39, 39, 39)';
    conX.fillRect(0, 0, canvasElement.width, canvasElement.height);
    
}

//drawSnake function
function drawSnake() {
    conX.fillStyle = 'green';
    for(let i = 0; i < snakeBody.length; i++) {
        let part = snakeBody[i];
        conX.fillRect(part.x * tileCount,
                      part.y * tileCount,
                      tileSize,
                      tileSize
                    );
    }

    snakeBody.push(new SnakeBody(snakeHeadX, snakeHeadY));
    if(snakeBody.length > snakeTailLength) {
        snakeBody.shift();
    }


    conX.fillStyle = 'green';
    conX.fillRect(snakeHeadX * tileCount, 
                  snakeHeadY* tileCount,
                  tileSize,
                  tileSize
                );
}

//draw snack function
function drawSnack() {
    conX.fillStyle = 'red';
    conX.fillRect(snackX * tileCount, 
                  snackY* tileCount,
                  tileSize,
                  tileSize
                );
}

//snack collision detection
function snackColission() {
    if(snackX === snakeHeadX && snackY === snakeHeadY) {
        snackX = Math.floor(Math.random() * tileCount)
        snackY = Math.floor(Math.random() * tileCount)
        snakeTailLength++;
        score++;
        speed++;
    }
}

//change Snake Position
function changeSnakePosition() {
    snakeHeadX = snakeHeadX + xV;
    snakeHeadY = snakeHeadY + yV;
}

// keyDown function
function keyDown(e) {
    // moving up
    if(e.keyCode === 38) {
       if(yV === 1) return;
       yV = -1;
       xV = 0;
    }
    // moving down
    if(e.keyCode === 40) {
       if(yV === -1) return;
       yV = 1;
       xV = 0;
    }
    // moving left
    if(e.keyCode === 37) {
       if(xV === 1) return;
       xV = -1;
       yV = 0;
    }
    // moving right
    if(e.keyCode === 39) {
       if(xV === -1) return;
       xV = 1;
       yV = 0;
    }
}

//Snake body class
class SnakeBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
  
playGame();