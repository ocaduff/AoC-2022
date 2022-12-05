let reorderStacks = (input, moveItemsOp) => {
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
  movementsDescription.split("\n")
    .map(movement => movementDescriptionPattern.exec(movement))
    .map(([_, nItems, from, to]) => moveItemsOp(nItems, stacks[from-1], stacks[to-1]));
  stacks.map(stack => console.log("stack after: " + stack));
  return stacks.map(stack => stack.pop()).join("");
};

let moveItemsOp9000 = (nItems, from, to) => {
    for (let i = 0; i < nItems; i++) {
      to.push(from.pop());
    }
  };

// test
reorderStacks(sampleInput, moveItemsOp9000);

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
reorderStacks(puzzleInput, moveItemsOp9000);

//Part 2
let moveItemsOp9001 = (nItems, from, to) => {
    console.log("nItems: " + nItems + " from: " + from.join("-") + " to: " + to.join("-"));
    to.push(...from.splice(from.length-nItems,nItems));
	console.log("after from: " + from.join("-") + " to: " + to.join("-"));
  };
  
// test
reorderStacks(sampleInput, moveItemsOp9001);

reorderStacks(puzzleInput, moveItemsOp9001);
