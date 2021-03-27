var gameStarted = false;
var isDead = false;
var won = false;
var seconds = 0;
var minutes = 0;
var hours = 0;

var score = 0;

var playerX;
var playerY;
var playerDir;
//0: Right 
//1: Down 
//2: Left 
//3: Up
var playerBody = [[playerX-1,playerY]];

var foodX;
var foodY;



function createTile(idName)
{
var tile = document.createElement("div");

tile.classList.add('gameTile');
tile.setAttribute('id', idName);

document.getElementById("board").appendChild(tile);
}

var size = 20;
var boardGenerated = false;

function generateBoard()
{
    size = document.getElementById('sizeInput').value;
    
    document.getElementById('board').style.width = String((size*27) + 'px');
    document.getElementById('board').style.height = String((size*27) + 'px');
    document.getElementById('collider').style.width = String((size*27) + 'px');
    document.getElementById('collider').style.height = String((size*27) + 'px');
    
    playerX = Math.round((size-1) / 2);
    playerY = Math.round((size-1) / 2);
    playerDir = 0;

    if (!boardGenerated)
    {
        for (var y = 0; y < size; y++)
        {
            for (var x = 0; x < size; x++)
            {
                
            var idName = x + '|' + y;
            createTile(idName);
            }
        }

        var playerHead = playerX + '|' + playerY;
        setSnake(playerHead);

        spawnFood();

        

        boardGenerated = true;
        gameStarted = true;
    }
    else
    {
        var deleteBoard = document.getElementById('board');
        while (deleteBoard.firstChild) 
        {
            deleteBoard.removeChild(deleteBoard.lastChild);
        }
        boardGenerated = false;
        minesGenerated = false;
        isDead = false;
        won = false;
        seconds = 0;
        minutes = 0;
        hours = 0;
        score = 0;
        playerBody = [[playerX-1,playerY]];
        generateBoard();
    }
}

var timer = setInterval(function() {
    if (gameStarted && !isDead && !won)
    {
        seconds++;
        if (seconds === 60)
        {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60)
        {
            minutes = 0;
            hours++;
        }

        var time = document.getElementById('timer');
        time.textContent = 'TIME: ' + hours + ':' + minutes + ':' + seconds
    }
    else if (isDead)
    {
        var time = document.getElementById('timer');
        time.textContent = 'DEAD: ' + hours + ':' + minutes + ':' + seconds
        return;
    }
    else if (won)
    {
        var time = document.getElementById('timer');
        time.textContent = 'WON: ' + hours + ':' + minutes + ':' + seconds
        return;
    }
}, 1000)

function setSnake(idName)
{
    console.log(idName);
    var tile = document.getElementById(idName);
    if (!tile.classList.contains('snake'))
        tile.classList.replace('gameTile', 'snake');
}

function clearSnake()
{
    for (var y = 0; y < size; y++)
    {
        for (var x = 0; x < size; x++)
        {
            var tileId = x + '|' + y;
            var tile = document.getElementById(tileId);
            if (tile.classList.contains('snake'))
            {
                tile.classList.replace('snake', 'gameTile');
            }
        }
    }
}

var movement = setInterval(() => {
    if (gameStarted && !isDead)
    {
        clearSnake();
        if (playerDir === 0)
        {
            if (playerX > size-2)
            {
                isDead = true;
                return;
            }
            else
                playerX++;
        }
        else if(playerDir === 1)
        {
            if (playerY > size-2)
            {
                isDead = true;
                return;
            }
            else
                playerY++;
        }
        else if(playerDir === 2)
        {
            if (playerX < 1)
            {
                isDead = true;
                return;
            }
            else
                playerX--;
        }
        else if(playerDir === 3)
        {
            if (playerY < 1)
            {
                isDead = true;
                return;
            }
            else
                playerY--;
        }

        if (playerX === foodX && playerY === foodY)
        {
            Grow();
            var tileId = x + '|' + y;
            tile = document.getElementById(tileId);
            tile.classList.replace('food', 'gameTile');
            spawnFood();
        }

        for (var i = 0; i < playerBody.length; i++)
        {
            if (playerX === playerBody[i][0] && playerY === playerBody[i][1])
            {
                isDead = true;
            }
        }

        var playerHead = playerX + '|' + playerY;
        setSnake(playerHead);

        var currentX = playerX;
        var currentY = playerY;
        for (var i = 0; i < playerBody.length; i++)
        {
            //x+, x-. y-, y+
            
            currentX = playerBody[i][0];
            currentY = playerBody[i][1];

            var tileId = currentX + '|' + currentY;
            setSnake(tileId);
        }

        for (var i = playerBody.length-1; i > 0; i--)
        {
            playerBody[i][0] = playerBody[i-1][0];
            playerBody[i][1] = playerBody[i-1][1];
        }
        playerBody[0][0] = playerX;
        playerBody[0][1] = playerY;
    }

}, 120);

function spawnFood()
{
    x = Math.round(Math.random() * (size - 1));
    y = Math.round(Math.random() * (size - 1));
    var tileId = x + '|' + y;
    tile = document.getElementById(tileId);
    if (tile.classList.contains('snake'))
    {
        spawnFood();
    }
    else
    {
        foodX = x;
        foodY = y;
        tile.classList.replace('gameTile', 'food');
    }
}


/*
for (var i = 0; i < mineNum - mines.length; i++)
        {
            x = Math.round(Math.random() * (size - 1));
            y = Math.round(Math.random() * (size - 1));
            var tile = x + '|' + y;
            if (!mines.includes(tile))
            {
                mines.push(tile);
                var printOn = document.getElementById(tile);
                printOn.textContent = '@';
                printOn.classList.add('mine');
            }
        }
*/

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 65 || event.keyCode == 37) {
        //left
        if (playerDir === 0)
            return;
        playerDir = 2;
        var pos = [];
        pos.push(playerX);
        pos.push(playerY);
        playerBody[0] = pos;
    }
    else if(event.keyCode == 87 || event.keyCode == 38) {
        //up
        if (playerDir === 1)
            return;
        playerDir = 3;
        var pos = [];
        pos.push(playerX);
        pos.push(playerY);
        playerBody[0] = pos;
    }
    else if(event.keyCode == 68 || event.keyCode == 39) {
        //right
        if (playerDir === 2)
            return;
        playerDir = 0;
        var pos = [];
        pos.push(playerX);
        pos.push(playerY);
        playerBody[0] = pos;
    }
    else if(event.keyCode == 83 || event.keyCode == 40) {
        //down
        if (playerDir === 3)
            return;
        playerDir = 1;
        var pos = [];
        pos.push(playerX);
        pos.push(playerY);
        playerBody[0] = pos;
    }
});

function Grow()
{
    var position = [];
    position.push(playerBody[playerBody.length-1][0]);
    position.push(playerBody[playerBody.length-1][1]);
    playerBody.push(position);
    score++;
}

var updateScore = setInterval(() => {
    var output = document.getElementById('scoreCounter')
    output.textContent = "Score: " + score;
}, 100);