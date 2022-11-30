const classX = "x";
const classO = "o";
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const display = document.querySelector(".display");
const announce = document.querySelector(".announce");
const result = document.querySelector(".result");
const button = document.querySelector(".reset");
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn;

startGame();

button.addEventListener("click", startGame);

function startGame() {
    circleTurn = undefined;
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove(classX);
        cell.classList.remove(classO);
        cell.removeEventListener("click", operation, {once:true});
        cell.addEventListener("click", operation, {once:true});
    });
    announce.classList.remove("show");
    displayContent();
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
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(eachCell => {
        return eachCell.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function draw() {
    return [...cells].every(cell => {
        return cell.classList.contains(classX) || cell.classList.contains(classO);
    })
}

function displayContent() {
    let pturn = circleTurn ? "O" : "X";
    display.innerHTML = `Player ${pturn}'s Turn`;
}