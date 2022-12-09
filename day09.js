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

let follow = (pointA, pointB) => {
  if (Math.abs(pointA.x - pointB.x) <= 1
      && Math.abs(pointA.x - pointB.x) <= 1) {
    return "-";
  }
  if (pointA.x - pointB.x > 1) {
    return "L";
  }
  if (pointB.x - pointA.x > 1) {
    return "R";
  }
  if (pointA.y - pointB.y > 1) {
    return "D";
  }
  if (pointB.y - pointA.y > 1) {
    return "U";
  }
}

let followHead = input => {
  var head = point(0,0);
  var tail = point(0,0);
  const seenPointsTail = new Set();
  input.split("\n").forEach(line => {
    let [_, direction, moves] = /(\w) (\d)/.exec(line);
    console.log("input: " + direction + " " + moves);
    for (let i = 0; i < moves; i++) {
      head = move(head, direction);
      console.log("new head: (" + head.x + ","+head.y+")");
      const tailDirection = follow(tail, head);
      console.log("following: " + tailDirection);
      tail = move(tail, tailDirection);
      console.log("new tail: (" + tail.x + ","+tail.y+")");
      seenPointsTail.add(tail);
    }
  });
  seenPointsTail.size;
}

followHead(sampleInput);
