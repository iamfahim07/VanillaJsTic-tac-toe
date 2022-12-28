const classX = "X";
const classO = "O";
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const display = document.querySelector(".display");
const announce = document.querySelector(".announce");
const result = document.querySelector(".result");
const button = document.querySelectorAll(".reset");
const change = document.getElementById("change");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();

button[0].addEventListener("click", startGame);
button[1].addEventListener("click", startGame);

change.addEventListener("click", changeFunc);

function changeFunc() {
  swapTurn();
  displayContent();
  change.innerHTML = circleTurn ? "Start with X" : "Start with O";

  if (change.classList.contains(classO)) {
    change.classList.remove(classO);
    change.classList.add(classX);
  } else {
    change.classList.remove(classX);
    change.classList.add(classO);
  }
}

function startGame() {
  circleTurn = undefined;
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove(classX);
    cell.classList.remove(classO);
    cell.removeEventListener("click", operation, { once: true });
    cell.addEventListener("click", operation, { once: true });
  });
  announce.classList.remove("show");
  displayContent();
  change.style.display = "inline";
}

function operation(e) {
  let cell = e.target;

  let currentClass = circleTurn ? classO : classX;
  cell.classList.add(currentClass);

  let fCell = circleTurn ? "O" : "X";
  cell.innerHTML = fCell;

  if (checkWin(currentClass)) {
    result.innerHTML = `Player ${fCell}! won`;
    announce.classList.add("show");
  } else if (draw()) {
    result.innerHTML = `Match draw`;
    announce.classList.add("show");
  }
  swapTurn();
  displayContent();
  change.style.display = "none";
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some((eachCell) => {
    return eachCell.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function draw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(classX) || cell.classList.contains(classO);
  });
}

function displayContent() {
  let pturn = circleTurn ? classO : classX;
  display.innerHTML = `<span style="padding:0px 15px; border-radius: 5px" class="${pturn}">Player ${pturn}'s Turn</span>`;
}
