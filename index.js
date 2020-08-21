const cellElements =  document.querySelectorAll('[cell-symbol]')
const board = document.getElementById('board')
const winMessage = document.querySelector('[win-message]')
const win = document.getElementById('win')
const restartGame = document.getElementById('restartGame')
const refreshScore = document.getElementById('refreshScore')
let xTurn;

if(localStorage.getItem("xScore")==undefined)
{
    localStorage.setItem("xScore", 0)
    localStorage.setItem("oScore", 0)
}

const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartGame.addEventListener('click', startGame)
refreshScore.addEventListener('click', scoreReset)

startGame()

function scoreReset() {
    localStorage.setItem("xScore", 0)
    localStorage.setItem("oScore", 0)
    startGame()
}

function startGame() {
    document.getElementById("xS").innerHTML = "X-Score: " + localStorage.getItem("xScore")
    document.getElementById("oS").innerHTML = "O-Score: " + localStorage.getItem("oScore")
    xTurn=true
    cellElements.forEach(cell => {
        cell.classList.remove('x')
        cell.classList.remove('o')
        cell.removeEventListener('click', onClick)
        cell.addEventListener('click', onClick, {once: true})
    })
    hoverSymbol()
    win.classList.remove('show')
}

function onClick(e) {
    const cell = e.target
    const current = xTurn ? 'x' : 'o'
    selectSymbol (cell, current)
    if (gameWin(current)) {
        gameOver(false)
    } else if (gameTied()){
        gameOver(true)
    } else {
        xTurn = !xTurn
        hoverSymbol()
    }
}

function selectSymbol(cell, current) {
    cell.classList.add(current)
}

function hoverSymbol() {
    board.classList.remove('x')
    board.classList.remove('o')
    if(xTurn) {
        board.classList.add('x')
    }
    else {
        board.classList.add('o')
    }
}

function gameWin(current) {
    return  winCombo.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(current)
        })
    })
}

function gameOver(tie) {
    if(tie) {
        winMessage.innerHTML = 'Game Drawn'
    } 
    else {
        winMessage.innerHTML = `${xTurn ? "X" : "O"} won the game`
        if(xTurn){
            localStorage.xScore = Number(localStorage.xScore) + 1
        }
        else {
            localStorage.oScore = Number(localStorage.oScore) + 1
        }
    }
    win.classList.add('show')
}

function gameTied() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}