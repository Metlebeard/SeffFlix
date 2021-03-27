var gameStarted = false;
var isDead = false;
var won = false;
var seconds = 0;
var minutes = 0;
var hours = 0;

var flag = false;
var flags = 0;

var revealed = [];
var zeroes = [];
document.addEventListener('contextmenu', event => event.preventDefault());

function createTile(idName)
{
var tile = document.createElement("div");

tile.classList.add('gameTile');
tile.setAttribute('id', idName);

document.getElementById("board").appendChild(tile);
}

function createButton(idName)
{
var button = document.createElement("button");

button.classList.add('select');
button.setAttribute('id', idName);
button.setAttribute('onclick', "check('" + idName + "')");
button.textContent = '0';

document.getElementById("hidden").appendChild(button);
document.getElementById(idName).onmousedown = function(event) {
    if (event.which == 3) {
        toggleFlag();
        check(idName);
        toggleFlag();
    }
}
}

var mines = [];
var size = 20;
var mineNum = 99;
var boardGenerated = false;
var minesGenerated = false;

function generateBoard()
{
    size = document.getElementById('sizeInput').value;
    mineNum = document.getElementById('mineInput').value;
    if (size*size < mineNum)
    {
        alert('Too many mines!');
        return;
    }
    else
    {
        document.getElementById('board').style.width = String((size*27) + 'px');
        document.getElementById('board').style.height = String((size*27) + 'px');
        document.getElementById('hidden').style.width = String((size*27) + 'px');
        document.getElementById('hidden').style.height = String((size*27) + 'px');
        document.getElementById('collider').style.width = String((size*27) + 'px');
        document.getElementById('collider').style.height = String((size*27) + 'px');
    }
    if (!minesGenerated)
    {
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
            for (var y = 0; y < size; y++)
            {
                for (var x = 0; x < size; x++)
                {
                    var idName = x + '/' + y;
                    createButton(idName);
                }
            }       
            boardGenerated = true;
        }

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

        if (mineNum - mines.length != 0)
        {
            generateBoard()
        }
        else
        {
            minesGenerated = true;
            gameStarted = true;
            flags = mineNum;
            var flagCount = document.getElementById('flagCounter');
            flagCount.textContent = 'FLAGS: ' + flags;
        }


        for (var y = 0; y < size; y++)
            {
                for (var x = 0; x < size; x++)
                {
                    var idName = x + '|' + y;
                    var adjacentMines = 0;

                    if (!mines.includes(idName))
                    {
                        var xCheck = 0;
                        var yCheck = 0;

                        for (var rotation = 0; rotation < 8; rotation++)
                        {
                            if (rotation === 0)
                            {
                                xCheck = x;
                                yCheck = y+1;
                            }
                            else if (rotation === 1)
                            {
                                xCheck = x+1;
                                yCheck = y+1;
                            }
                            else if (rotation === 2)
                            {
                                xCheck = x+1;
                                yCheck = y;
                            }
                            else if (rotation === 3)
                            {
                                xCheck = x+1;
                                yCheck = y-1;
                            }
                            else if (rotation === 4)
                            {
                                xCheck = x;
                                yCheck = y-1;
                            }
                            else if (rotation === 5)
                            {
                                xCheck = x-1;
                                yCheck = y-1;
                            }
                            else if (rotation === 6)
                            {
                                xCheck = x-1;
                                yCheck = y;
                            }
                            else if (rotation === 7)
                            {
                                xCheck = x-1;
                                yCheck = y+1;
                            }

                            if (mines.includes((xCheck + '|' + yCheck)))
                            {
                                adjacentMines++;
                            }
                        }

                        document.getElementById(idName).textContent = adjacentMines;

                        if (adjacentMines === 0)
                        {
                            document.getElementById(idName).classList.add('zero');
                        }
                        else if (adjacentMines === 1)
                        {
                            document.getElementById(idName).classList.add('one');
                        }
                        else if (adjacentMines === 2)
                        {
                            document.getElementById(idName).classList.add('two');
                        }
                        else if (adjacentMines === 3)
                        {
                            document.getElementById(idName).classList.add('three');
                        }
                        else if (adjacentMines === 4)
                        {
                            document.getElementById(idName).classList.add('four');
                        }
                        else if (adjacentMines === 5)
                        {
                            document.getElementById(idName).classList.add('five');
                        }
                        else if (adjacentMines === 6)
                        {
                            document.getElementById(idName).classList.add('six');
                        }
                        else if (adjacentMines === 7)
                        {
                            document.getElementById(idName).classList.add('seven');
                        }
                        else if (adjacentMines === 8)
                        {
                            document.getElementById(idName).classList.replace('eight');
                        }
                    }
                }
            }
    }
    else
    {
        var deleteBoard = document.getElementById('board');
        var deleteButtons = document.getElementById('hidden');
        while (deleteBoard.firstChild) 
        {
            deleteBoard.removeChild(deleteBoard.lastChild);
        }
        while (hidden.firstChild) 
        {
            hidden.removeChild(hidden.lastChild);
        }
        revealed.splice(0, revealed.length);
        boardGenerated = false;
        minesGenerated = false;
        isDead = false;
        won = false;
        mines.splice(0, mines.length);
        seconds = 0;
        minutes = 0;
        hours = 0;
        generateBoard();
    }
}




function check(buttonSelected)
{
    if (!isDead)
    {
        if (flag)
        {
            if (flags > 0 || document.getElementById(buttonSelected).classList.contains('flagged'))
            {
                placeFlag(buttonSelected);
            }
            else
            {
                alert('No more flags!')
            }
        }
        else
        {
            if (!document.getElementById(buttonSelected).classList.contains('flagged'))
            {
                if (!revealed.includes(buttonSelected))
                {
                    revealed.push(buttonSelected);
                }
                var blank = document.createElement("div");
                blank.classList.add('blank');
                blank.setAttribute('id', buttonSelected);
                document.getElementById(buttonSelected).replaceWith(blank);

                var getNum = '';
                for (var i = 0; i < buttonSelected.length; i++)
                {
                    if (buttonSelected[i] === '/')
                    {
                        getNum = getNum + '|'
                    }
                    else
                    {
                        getNum = getNum + buttonSelected[i];
                    }
                }
                var tileNumber = document.getElementById(getNum);

                if (tileNumber.textContent === '0')
                {
                    zeroes.push(getNum);
                }
                if (tileNumber.textContent === '@')
                {
                    isDead = true;
                    for (var i = 0; i < mines.length; i++) 
                    {
                        console.log('blip')
                        var coords = mines[i];
                        if (!revealed.includes(coords))
                        {
                            var mineLocated = '';
                            for (var i = 0; i < coords.length; i++)
                            {
                                if (coords[i] === '|')
                                {
                                    mineLocated = mineLocated + '/';
                                }
                                else
                                {
                                    mineLocated = mineLocated + coords[i];
                                }
                            }
                            console.log(mineLocated);
                            var mineBlank = document.createElement("div");
                            mineBlank.classList.add('blank');
                            mineBlank.setAttribute('id', mineLocated);
                            document.getElementById(mineLocated).replaceWith(mineBlank);
                        }
                    }
                }
            }
        }
    }

    if (revealed.length === ((size * size) - mineNum))
    {
        won = true;
    }
}

function isZero(id)
{
    var x = '';
    var y = '';
    var buttonPos = '';

    for (var i = 0; i < id.length; i++)
    {
        if (id[i] === '|')
        {
            buttonPos = buttonPos + '/'
        }
        else
        {
            buttonPos = buttonPos + id[i];
        }
    }

    if (id.includes('|'))
    {
        for (var i = 0; i < id.length; i++)
        {
            if (i < id.indexOf('|'))
            {
                var x = x + id[i];
            }
            else if (i > id.indexOf('|'))
            {
                var y = y + id[i];
            }
        }
    }
    else
    {
        for (var i = 0; i < id.length; i++)
        {
            if (i < id.indexOf('/'))
            {
                var x = x + id[i];
            }
            else if (i > id.indexOf('/'))
            {
                var y = y + id[i];
            }
        }
    }

    

    var xPos = Number(x);
    var yPos = Number(y);

    for (var i = 0; i < 8; i++)
    {
        xPos = Number(x);
        yPos = Number(y);
        if (i === 0)
        {
            yPos--;
        }
        else if (i === 1)
        {
            yPos--;
            xPos++;
        }
        else if (i === 2)
        {
            xPos++;
        }
        else if (i === 3)
        {
            yPos++;
            xPos++;
        }
        else if (i ===4)
        {
            yPos++;
        }
        else if (i === 5)
        {
            yPos++;
            xPos--;
        }
        else if (i === 6)
        {
            xPos--;
        }
        else if (i === 7)
        {
            yPos--;
            xPos--;
        }
        var buttonId = xPos + '/' + yPos;
        var tileId = xPos + '|' + yPos;

        if (!revealed.includes(buttonId) && yPos != -1 && yPos != size && xPos != -1 && xPos != size)
        {
            if (document.getElementById(buttonId).classList.contains('flagged'))
            {
                placeFlag(buttonId);
            }
            if (!revealed.includes(buttonId))
            {
                revealed.push(buttonId);
            }
            var blank = document.createElement("div");
            blank.classList.add('blank');
            blank.setAttribute('id', buttonId);
            document.getElementById(buttonId).replaceWith(blank);

            if (document.getElementById(tileId).textContent === '0')
            {
                zeroes.push(buttonId)
            }
        }
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

var zeroClear = setInterval(function() {
    if (zeroes.length != 0)
    {
        isZero(zeroes[0]);
        zeroes.splice(0, 1);
    }
}, 1)

function toggleFlag()
{
    var flagButton = document.getElementById('flagCounter');
    if (flag)
    {
        flag = false;
        flagButton.classList.replace('flagCounterOn', 'flagCounterOff');
    }
    else
    {
        flag = true;
        flagButton.classList.replace('flagCounterOff', 'flagCounterOn');
    }
}

function placeFlag(id)
{
    var tile = document.getElementById(id);
    if (tile.classList.contains('select'))
    {
        tile.classList.replace('select', 'flagged');
        flags--
    }
    else if (tile.classList.contains('flagged'))
    {
        tile.classList.replace('flagged', 'select');
        flags++;
    }
    var flagCount = document.getElementById('flagCounter');
    flagCount.textContent = 'FLAGS: ' + flags;
}