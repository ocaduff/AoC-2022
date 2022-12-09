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

let point = function(x,y) { return {x, y, toString() {return "("+x+","+y+")";}}}; 

let moveSingle = (currentPosition, direction) => {
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

let move = (currentPosition, directions) => {
  if (directions === "") {
      return currentPosition;
  }
  directions.split("").forEach(direction => {
    currentPosition = moveSingle(currentPosition, direction)
  });
  return currentPosition;
}

let follow = (tail, head) => {
  if (Math.abs(tail.x - head.x) <= 1
      && Math.abs(tail.y - head.y) <= 1) {
    return "";
  }
  var direction = "";
  if (tail.x - head.x == 2) {
    direction += "L";
  }
  if (head.x - tail.x == 2) {
    direction += "R";
  }
  if (tail.y - head.y == 2) {
    direction += "D";
  }
  if (head.y - tail.y == 2) {
    direction += "U";
  }
  return direction;
}

let drag = (tail, head) => {
  if (Math.abs(head.x - tail.x) == 2) {
    if (tail.y - head.y == 1) {
      return "D";
    }
    if (head.y - tail.y == 1) {
      return "U";
    }
  }
  if (Math.abs(head.y - tail.y) == 2) {
    if (tail.x - head.x == 1) {
      return "L";
    }
    if (head.x - tail.x == 1) {
      return "R";
    }
  }
  return "";
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
      const dragDirection = drag(tail, head);
      tail = move(tail, tailDirection + dragDirection);
      seenPointsTail.add(tail.x + ","+ tail.y);
    }
  });
  console.log("visited points: " + seenPointsTail.size);
}

followHead(sampleInput);
let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
followHead(puzzleInput);

// Part 2

let printLongTail = (knots) => {
  const maxX = Math.max(0, ...knots.map(knot => knot.x));
  const minX = Math.min(0, ...knots.map(knot => knot.x))
  const maxY = Math.max(0, ...knots.map(knot => knot.y))
  const minY = Math.min(0, ...knots.map(knot => knot.y))
  const offsetX = 0 - minX;
  const offsetY = 0 - minY;
  const lines = [];
  for (let i = 0; i < maxY - minY + 1; i++) {
    lines.push(".".repeat(maxX - minX + 1).split(""));
  }
  lines[offsetY][offsetX] = "s";
  for (let i = 0; i < knots.length; i++) {
    lines[offsetY + knots[i].y][offsetX + knots[i].x] = i;
  }
  console.log(lines.reverse().map(line => line.join("")).join("\n"));
}

let followKnot = (knots, i) => {
  if (i == knots.length) {
    return;
  }
  const tailDirection = follow(knots[i], knots[i - 1]);
  const dragDirection = drag(knots[i], knots[i - 1]);
  knots[i] = move(knots[i], tailDirection + dragDirection);
  followKnot(knots, i+1);
}

let moveWithTail = (knots, direction, debug) => {
  knots[0] = move(knots[0], direction);
  followKnot(knots, 1);
}

let followHeadLongTail = (input, debug) => {
  var knots = new Array(10).fill(point(0,0));
  const seenPointsTail = new Set();
  input.split("\n").forEach(line => {
    let [_, direction, moves] = /(\w) (\d+)/.exec(line);
    if (debug) console.log("== " + direction + " " + moves + " ==");
    for (let i = 0; i < moves; i++) {
      moveWithTail(knots, direction, debug)
      seenPointsTail.add(knots[knots.length - 1].toString());
    }
    if (debug) printLongTail(knots);
  });
  console.log(seenPointsTail.size)
  return knots;
}

let sampleInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
followHeadLongTail(sampleInput2, true);
followHeadLongTail(puzzleInput);
