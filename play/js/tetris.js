document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score-tetris')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0;
    let gameEnd = false
    const colors = [
        'blue',
        'orange',
        'limegreen',
        'red',
        'pink',
        'yellow',
        'skyblue'
    ]
    
    //tetrominoes
    
const jTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]

const lTetromino = [
    [0, 1, width+1, width*2+1],
    [width, width+1, width+2, 2],
    [1, width+1, width*2+2, width*2+1],
    [width, width+1, width+2, 2]
]

const sTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
]

const zTetromino = [
    [width, width+1, width*2+1, width*2+2],
    [2, width+1, width+2, width*2+1],
    [width, width+1, width*2+1, width*2+2],
    [2, width+1, width+2, width*2+1]
]

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
]

const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]

const itetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]

const theTetrominoes = [jTetromino, lTetromino, sTetromino, zTetromino, tTetromino, oTetromino, itetromino]

let currentPosition = 4
let currentRotation = 0;

//select random tetromino
let random = Math.floor(Math.random()*theTetrominoes.length)
let current = theTetrominoes[random][currentRotation]
    
//draw the 1st tetromino, 1st rotation
function draw() {
    current.forEach(index => {
        squares[currentPosition+index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
    })
}

function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
}
    
    
//downward move
//timerId = setInterval(moveDown, 1000)
    
//player input
function control(e) {
    if(e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 38) {
        rotate()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
        if (!gameEnd)
            {
                score += 10
                scoreDisplay.innerHTML = score
            }
    }
}
document.addEventListener('keydown', control)
    
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}    
    
//freeze function
    
function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetromino
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
    }
}
    
//moving left unless touching edge
function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    
    if(!isAtLeftEdge) currentPosition -=1
    
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1
    }
    
    draw()
}
    
//moving right unless touching edge
    
function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)
    
    if(!isAtRightEdge) currentPosition +=1
    
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1
    }
    
    draw()
}
    
    
//rotate the tetromino
    
function rotate() {
    undraw()
    currentRotation++;
    if(currentRotation === current.length) {
        currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation]
    draw()
}

    //show next tetromino
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0
    
    
    //tetrominoes without rotation
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //J
        [0, 1, displayWidth+1, displayWidth*2+1], //L
        [displayWidth+1, displayWidth+2, displayWidth*2, displayWidth*2+1], //S
        [displayWidth, displayWidth+1, displayWidth*2+1, displayWidth*2+2], //Z
        [1, displayWidth, displayWidth+1, displayWidth+2], //T
        [0, 1, displayWidth, displayWidth+1], //O
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //I
    ]
    
    
    //display in the mini-grid
    
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }
    
    //start/pause
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theTetrominoes.length)
            displayShape()
        }
    })
    
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            
            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 1000
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }
    
    //game over
    
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
            gameEnd = true
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})