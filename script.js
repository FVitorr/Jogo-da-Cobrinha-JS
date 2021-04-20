var canvas = document.getElementById("snake");
var context = canvas.getContext("2d");
var box = 32 ;
var snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
var direction = "right";
var food = { 
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG (){
    context.fillStyle = "lime";
    context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobrinha (){
    for (i = 0 ; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box , box);
    }
}
function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x,food.y, box , box);
}

document.addEventListener('keydown', update);

function update(event){
    if (event.keyCode == 37 || event.keyCode == 65  && direction != "right") direction = "left";
    if (event.keyCode == 38 || event.keyCode == 87  && direction != "down") direction = "up";
    if (event.keyCode == 39 || event.keyCode == 68  && direction != "left") direction = "right";
    if (event.keyCode == 40 || event.keyCode == 83  && direction != "up") direction = "down";
}

function initGame (){

    if(snake[0].x > 15 * box && direction =="right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(initGame);
            alert("Game Over :{");
        }
    }

    criarBG();
    criarCobrinha(); 
    drawFood();
    
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    var newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

var jogo = setInterval(initGame,100);
