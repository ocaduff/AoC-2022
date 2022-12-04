
// Day 2:

// Part 1:
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
let toShape = (symbol) => {
    switch(symbol) {
        case "A":
        case "X":
          return ROCK;
        case "B":
        case "Y":
            return PAPER;
        case "C":
        case "Z":
            return SCISSORS;
        }
    return null;
};

let roundPoints = (meShape, elfShape) => {
    if (playerBeats(meShape, elfShape)) {
        return 6; //me wins
    } else if (playerBeats(elfShape, meShape)) {
        return 0; //me loses
    } else {
        return 3; //draw
    }
};

let playerBeats = (player, opponent) => {
    return player === ROCK && opponent === SCISSORS
        || player === SCISSORS && opponent === PAPER
        || player === PAPER && opponent === ROCK;
};

let shapePoints = (shape) => {
    switch(shape) {
        case ROCK:
            return 1;
        case PAPER:
            return 2;
        case SCISSORS:
            return 3;
    }
    return NaN;
};

let score = (elfShape, meShape) => {
    return roundPoints(meShape, elfShape) + shapePoints(meShape);
};

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trim();
puzzleInput
    .split("\n")
    .map(round => [elf, me] = round.split(" "))
    .map(([elf, me]) => score(toShape(elf), toShape(me)))
    .reduce((a, b) => a + b, 0);

// 13809

// Part 2

let chooseShapeToWin = opponentShape => [ROCK, PAPER, SCISSORS].find(shape => playerBeats(shape, opponentShape));
let chooseShapeToLoose = opponentShape => [ROCK, PAPER, SCISSORS].find(shape => playerBeats(opponentShape, shape));
let chooseShapeToDraw = opponentShape => opponentShape;
let chooseShape = (opponentShape, outcome) => {
    switch(outcome) {
        case "X":
            return chooseShapeToLoose(opponentShape);
        case "Y":
            return chooseShapeToDraw(opponentShape);
        case "Z":
            return chooseShapeToWin(opponentShape);
    }
};

puzzleInput
    .split("\n")
    .map(round => [elf, outcome] = round.split(" "))
    .map(([elf, outcome]) => score(toShape(elf), chooseShape(toShape(elf), outcome)))
    .reduce((a, b) => a + b, 0);

// 12316
