// Day 5
// Part 1
let sampleInput = "    [D]    \n"+
"[N] [C]    \n"+
"[Z] [M] [P]\n"+
" 1   2   3 \n"+
"\n"+
"move 1 from 2 to 1\n"+
"move 3 from 1 to 3\n"+
"move 2 from 2 to 1\n"+
"move 1 from 1 to 2";

let reorderStacks = input => {
  let [initialStacksDescription, movementsDescription] = input.split("\n\n");
  let stackLevels = initialStacksDescription.split("\n").reverse();
  let stackDesignators = stackLevels.shift();
  let nStacks = Math.max.apply(Math, stackDesignators.split(" ").map(parseInt).filter(Number.isInteger));
  let stacks = new Array(nStacks);
  for (let i = 0; i < nStacks; i++) {
    stacks[i] = new Array();
  }
  // build the stack from its descriptions
  for (let i = 0; i < stackLevels.length; i++) {
    for (let j = 0; j < nStacks; j++) {
      let crate = stackLevels[i].charAt(1 + j*4);
      if (crate !== " ") {
        stacks[j].push(crate);
      }
    }
  }
  stacks.map(stack => console.log("built stack: " + stack));

  let movementDescriptionPattern = /move (\d+) from (\d+) to (\d+)/;
  let moveItems = (nItems, from, to) => {
    console.log("move " + nItems + " from " + from + " to " + to);
    for (let i = 0; i < nItems; i++) {
      stacks[to-1].push(stacks[from-1].pop());
    }
    console.log("from is now " + stacks[from-1] + " to is now " + stacks[to-1]);
  };
  movementsDescription.split("\n")
    .map(movement => movementDescriptionPattern.exec(movement))
    .map(([_, nItems, from, to]) => moveItems(nItems, from, to));
  return stacks.map(stack => stack.pop()).join("");
};

reorderStacks(sampleInput);

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
reorderStacks(puzzleInput);
