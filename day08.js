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

// Part 2
let computeVisibility = (tree, i, j ) => {
  let [up, down, left, right ] = new Array(4).fill(1);
  while (i - up > 0 && tree[i][j] > tree[i-up][j]) up++;
  while (j + right < tree[i].length - 1 && tree[i][j] > tree[i][j+right]) right++;
  while (i + down < tree.length - 1 && tree[i][j] > tree[i+down][j]) down++;
  while (j - left > 0 && tree[i][j] > tree[i][j-left]) left++;
  return up * down * right * left;
}

let getMaxVisibility = (tree) => {
  var maxVisibility = 0;
  for (let i = 0; i < tree.length; i++) {
    for (let j = 0; j < tree[i].length; j++) {
      maxVisibility = Math.max(maxVisibility, computeVisibility(tree, i, j));
    }
  }
  return maxVisibility;
}

getMaxVisibility(sampleTree);

//test
computeVisibility(sampleTree, 1, 2);

computeVisibility(sampleTree, 3, 2);

getMaxVisibility(puzzleTree);
