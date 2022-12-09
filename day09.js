// Day 9
// Part 1
let sampleInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

let point = function(x,y) { return {x, y}}; 

let move = (currentPosition, direction) => {
  switch (direction) {
    case "U":
      return point(currentPosition.x, currentPosition.y + 1);
    case "R":
      return point(currentPosition.x + 1, currentPosition.y);
    case "D":
      return point(currentPosition.x, currentPosition.y - 1);
    case "L":
      return point(currentPosition.x - 1, currentPosition.y);
    default:
      return currentPosition;
  }
}

let follow = (tail, head) => {
  if (Math.abs(tail.x - head.x) <= 1
      && Math.abs(tail.y - head.y) <= 1) {
    return "-";
  }
  if (tail.x - head.x == 1) {
    return "L";
  }
  if (head.x - tail.x == 1) {
    return "R";
  }
  if (tail.y - head.y == 1) {
    return "D";
  }
  if (head.y - tail.y == 1) {
    return "U";
  }
  return "-";
}

let drag = (tail, head, tailDirection) => {
  if (tail.x - head.x == 2) {
    return "L";
  }
  if (head.x - tail.x == 2) {
    return "R";
  }
  if (tail.y - head.y == 2) {
    return "D";
  }
  if (head.y - tail.y == 2) {
    return "U";
  }
  return "-";
}

let printRope = (tail, head, xdim, ydim) => {
  let field = [];
  for (let i = 0; i < xdim; i++) {
    let line = "";
    for (let j = 0; j < ydim; j++) {
      if (head.x == j && head.y == i){
        line += "H";
      } else if (tail.x == j && tail.y == i){
        line += "T";
      } else {
        line += ".";
      }
    }
    field.push(line);
  }
  console.log(field.reverse().join("\n"));
}

let printVisitedFields = (visited, minX, minY, maxX, maxY) => {
  let field = [];
  for (let i = minY - 1; i <= maxY; i++) {
    let line = "";
    for (let j = minX - 1; j <= maxX; j++) {
      if (j==0 && i == 0) {
        line += "s";
      } else if (visited.has(j+","+i)){
        line += "#";
      } else {
        line += ".";
      }
    }
    field.push(line);
  }
  console.log(field.reverse().join("\n"));
  console.log("minX, minY, maxX, maxY: " + minX + ", " + minY + ", " + maxX + ", " + maxY);
}

let followHead = input => {
  var head = point(0,0);
  var tail = point(0,0);
  const seenPointsTail = new Set();
  var minX = 0;
  var maxX = 0;
  var minY = 0;
  var maxY = 0;
  input.split("\n").forEach(line => {
    let [_, direction, moves] = /(\w) (\d+)/.exec(line);
    console.log("== " + direction + " " + moves + " ==");
    for (let i = 0; i < moves; i++) {
      head = move(head, direction);
      const tailDirection = follow(tail, head);
      const dragDirection = drag(tail, head, tailDirection);
      tail = move(tail, tailDirection);
      tail = move(tail, dragDirection);
      seenPointsTail.add(tail.x + ","+ tail.y);
      minX = Math.min(minX, head.x, tail.x);
      minY = Math.min(minY, head.y, tail.y);
      maxX = Math.max(maxX, head.x, tail.x);
      maxY = Math.max(maxY, head.y, tail.y);
    }
  });
  printVisitedFields(seenPointsTail, minX, minY, maxX, maxY);
  console.log("visited points: " + seenPointsTail.size);
}

followHead(sampleInput);
let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
followHead(puzzleInput);

// Part 2
let followHeadLongTail = input => {
  var knots = new Array(10).fill(point(0,0));
  const seenPointsTail = new Set();
  var minX = 0;
  var maxX = 0;
  var minY = 0;
  var maxY = 0;
  input.split("\n").forEach(line => {
    let [_, direction, moves] = /(\w) (\d+)/.exec(line);
    console.log("== " + direction + " " + moves + " ==");
    for (let i = 0; i < moves; i++) {
      knots[0] = move(knots[0], direction);
      for (let i = 1; i < knots.length; i++) {
        const tailDirection = follow(knots[i], knots[i-1]);
        const dragDirection = drag(knots[i], knots[i-1], tailDirection);
        knots[i] = move(knots[i], tailDirection);
        knots[i] = move(knots[i], dragDirection);
      }
      const tail = knots[knots.length-1];
      const head = knots[0];
      seenPointsTail.add(tail.x + ","+ tail.y);
      minX = Math.min(minX, head.x, tail.x);
      minY = Math.min(minY, head.y, tail.y);
      maxX = Math.max(maxX, head.x, tail.x);
      maxY = Math.max(maxY, head.y, tail.y);
    }
  });
  printVisitedFields(seenPointsTail, minX, minY, maxX, maxY);
  console.log("visited points: " + seenPointsTail.size);
}

let sampleInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
followHeadLongTail(sampleInput2);
followHeadLongTail(puzzleInput);
