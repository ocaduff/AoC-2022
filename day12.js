// Day 12
// Part 1
let sampleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

let traverse = (input, startingChar) => {
  const map = input.split("\n").map(line => line.split(""));
  // visitedMap contains minimum path length up to this field seen up to the current visit
  const visitedMap = Array.from({ length: map.length}, () => Array.from({ length: map[0].length}, () => 9999999));
  let height = coord => {
    switch(map[coord.x][coord.y]) {
      case "S":
        return "a".charCodeAt(0);
      case "E":
        return "z".charCodeAt(0);
      default:
        return map[coord.x][coord.y].charCodeAt(0);
    }
  };
  let isBestSignalPosition = coord => map[coord.x][coord.y] === "E";
  let visitable = (x, y, currentHeight) => {
    if (x < 0 || y < 0 || x >= map.length || y >= map[x].length) {
      return false;
    }
    const heightDiff = height({x,y}) - currentHeight;
    return heightDiff <= 1;
  }
  let getNextCandidates = (currentPos) => {
    var candidates = [];
    if (visitable(currentPos.x + 1, currentPos.y, height(currentPos))) {
      candidates.push({x: currentPos.x + 1, y: currentPos.y});
    }
    if (visitable(currentPos.x - 1, currentPos.y, height(currentPos))) {
      candidates.push({x: currentPos.x - 1, y: currentPos.y});
    }
    if (visitable(currentPos.x, currentPos.y + 1, height(currentPos))) {
      candidates.push({x: currentPos.x, y: currentPos.y + 1});
    }
    if (visitable(currentPos.x, currentPos.y - 1, height(currentPos))) {
      candidates.push({x: currentPos.x, y: currentPos.y - 1});
    }
    candidates.sort((a, b) => height(b) - height(a)); // prioritize upwards!
    return candidates;
  }

  var currentShortestPath = 9999999;
  let findPeak = (path) => {
    if (currentShortestPath.length < path.length) {
      return;
    }
    const currentPos = path[path.length - 1];
    if (isBestSignalPosition(currentPos)) {
      if (path.length < currentShortestPath) {
        //console.log("found path with " + (path.length - 1) + " steps");
        currentShortestPath = path.length - 1;
      }
      return;
    }
    if (visitedMap[currentPos.x][currentPos.y] <= path.length -1) {
      // already been here, current path isn't shorter
      return;
    }
    // current path is ok, continue exploring
    visitedMap[currentPos.x][currentPos.y] = path.length - 1;
    
    const candidates = getNextCandidates(currentPos);
    for (let i = 0; i < candidates.length; i++) {
      path.push(candidates[i]);
      findPeak(path);
      path.pop();
    }
    return currentShortestPath;
  }

  
  let printSurrounding = (x,y) => console.log([visitedMap[x][y],visitedMap[x-1][y],visitedMap[x+1][y],visitedMap[x][y-1],visitedMap[x][y+1]]);

  let find = (value) => {
    const results = [];
    for (let x = 0; x < map.length; x++) {
      const y = map[x].indexOf(value);
      if (y >= 0) {
        results.push({ x, y });
      }
    }
    return results;
  }

  find(startingChar).map(startingPoint => findPeak([startingPoint]));
  console.log("done. shortestPath: " + currentShortestPath);
}

traverse(sampleInput, "S");
let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
traverse(puzzleInput, "S");

// Part 2
traverse(sampleInput, "a");
traverse(puzzleInput, "a");
