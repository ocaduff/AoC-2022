// Day 8
// Part 1
const sampleInput = `30373
25512
65332
33549
35390`;

//parse the three
let parseTree = input => input.split("\n").map(line => line.split("").map(val => parseInt(val)));

let traverseTree = tree => {
  let visibleTree = Array.from({ length: tree.length}, () => Array.from({ length: tree[0].length}, () => false));
  let seenMaxNorth = new Array(tree[0].length).fill(-1);
  let seenMaxSouth = new Array(tree[0].length).fill(-1);
  let seenMaxEast = new Array(tree.length).fill(-1);
  let seenMaxWest = new Array(tree.length).fill(-1);
  let iReverse = tree.length;
  for (let i = 0; i < tree.length; i++) {
    iReverse--;
    let jReverse = tree[0].length;
    for (let j = 0; j < tree[0].length; j++) {
      jReverse--;
      if (tree[i][j] > seenMaxNorth[j]) {
        visibleTree[i][j] = true;
        seenMaxNorth[j] = tree[i][j];
      }
      if (tree[i][j] > seenMaxWest[i]) {
        visibleTree[i][j] = true;
        seenMaxWest[i] = tree[i][j];
      }
      if (tree[iReverse][jReverse] > seenMaxSouth[jReverse]) {
        visibleTree[iReverse][jReverse] = true;
        seenMaxSouth[jReverse] = tree[iReverse][jReverse];
      }
      if (tree[iReverse][jReverse] > seenMaxEast[iReverse]) {
        visibleTree[iReverse][jReverse] = true;
        seenMaxEast[iReverse] = tree[iReverse][jReverse];
      }
    }
  }
  return visibleTree;
}

let countTrees = visibleTree => {
  return visibleTree.map(line => line.filter(x => x).length).reduce((a, b) => a+b, 0);
}

//test
let sampleTree = parseTree(sampleInput);
let sampleTreeVisible = traverseTree(sampleTree);
countTrees(sampleTreeVisible);

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
let puzzleTree = parseTree(puzzleInput);
let puzzleTreeVisible = traverseTree(puzzleTree);
countTrees(puzzleTreeVisible);
