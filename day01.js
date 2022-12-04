/ Day 1:

// Part 1:

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trim();
let elves = puzzleInput.split("\n\n");
let caloriesPerElve = elves
    .map(oneElve => oneElve.split("\n")
                .map(cal => parseInt(cal))
                .reduce((a,b) => a + b, 0));
Math.max.apply(Math, caloriesPerElve);
// 69177

// Part 2:
caloriesPerElve
    .sort((a, b) => a-b)
                .reverse()
                .slice(0,3)
                .reduce((a,b) => a+b, 0);
// 207456
