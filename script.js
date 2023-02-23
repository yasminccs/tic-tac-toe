const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const body = document.querySelector('body')
const root = document.querySelector(':root')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
const scoreEmpate = document.querySelector('#pt2')
const scorePlayer1 = document.querySelector('#pt1')
const scorePlayer2 = document.querySelector('#pt3')

let score  = {
  tie: 0,
  player1: 0,
  player2: 0
}

let circleTurn 

function fecho() {
  const boxFeedback = document.getElementById('boxFeedback')
  boxFeedback.style.display = 'none'
}

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.addEventListener('click', handleClick) 
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) { //lida com os cliques
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

  placeMark(cell, currentClass) //coloca o personagem na célula ao clicar

  if (checkWin(currentClass)) {//checkWin verifica se no tabulueiro há alguma daquelas combinações e vê se quem fez foi X ou O, dessa forma, determinando quem ganhou
    endGame(false)
  } else if (isDraw()) {
    endGame(true) //retorna empate
  } else { //em caso do jogo ainda não ter terminado
    swapTurns() //troca os turnos após o personagem ser colocado na célula
    setBoardHoverClass() //é a sombra que aparece quando passe o mouse pela célula
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Empate!'
    score.tie++
    scoreEmpate.innerText = score.tie
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? `Jogador "O"` : `Jogador "X"`} ganhou!`
    if(circleTurn){
      score.player1++
      scorePlayer2.innerText = score.player1
    } else {
      score.player2++
      scorePlayer1.innerText = score.player2
    }
  }
  winningMessageElement.classList.add('show')
}
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) { //coloca o personagem na célula ao clicar
  cell.classList.add(currentClass)
}

function swapTurns() { //troca os turnos após o personagem ser colocado na célula
  circleTurn = !circleTurn
}

function setBoardHoverClass() { //é a sombra que aparece quando passe o mouse pela célula
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) { //verifica se no tabulueiro há alguma daquelas combinações
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

document.getElementById("themeSwitcher").addEventListener('click', function () {
  if (body.dataset.theme === "dark"){
    root.style.setProperty("--bg-color", "#fff")
    root.style.setProperty("--color", "#000")
    root.style.setProperty("--shadow", "#d0cccc")
    body.dataset.theme = "light"
  } else {
    root.style.setProperty("--bg-color", "#000")
    root.style.setProperty("--color", "#fff")
    root.style.setProperty("--shadow", "#686767")
    body.dataset.theme = "dark"
  }
})