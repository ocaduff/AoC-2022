// Day 14
// Part 1
let sampleInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

// debug helper
  String.format = function() {
      var s = arguments[0];
      for (var i = 0; i < arguments.length - 1; i++) {       
          var reg = new RegExp("\\{" + i + "\\}", "gm");             
          s = s.replace(reg, arguments[i + 1]);
      }
      return s;
  };

let point = function(x,y) {
  return {x,y};
};

let cave = (input) => {
  var isOverflow = false;
  const rockPaths = input.split("\n")
    .map(line => [...line.matchAll(/(\d+),(\d+)/g)]
      .map(match => point(parseInt(match[1]), parseInt(match[2]))));
  const minX = xOffset = Math.min(...[].concat(...rockPaths).map(path => path.x));
  const minY = Math.min(...[].concat(...rockPaths).map(path => path.y));
  const maxX = Math.max(...[].concat(...rockPaths).map(path => path.x));
  const maxY = Math.max(...[].concat(...rockPaths).map(path => path.y));
  console.log(String.format("{0} {1} {2} {3}", minX, minY, maxX, maxY));
  const map = Array.from({ length: maxY + 1}, () => Array.from({ length: maxX - minX + 1}, () => "."));

  let drawLines = path => {
    var from = path[0];
    for (let i = 1; i < path.length; i++) {
      drawLine(from, path[i]);
      from = path[i];
    }
  }
  
  let drawLine = (from, to) => {
    if (from.x > to.x || from.y > to.y) {
      const tmp = from;
      from = to;
      to = tmp;
    }
    from = point(from.x, from.y); //create a new point, don't waste the input
    drawPoint(from, "#");
    if (from.x == to.x) {
      while (from.y < to.y) {
        from.y++;
        drawPoint(from, "#");
      }
    }
    if (from.y == to.y) {
      while (from.x < to.x) {
        from.x++;
        drawPoint(from, "#");
      }
    }
  };
  
  let drawPoint = (point, chr) => {
    map[point.y][point.x - xOffset] = chr;
  }

  let isFree = (x, y) => {
    return isOutsideMap(point(x,y)) || map[y][x - xOffset] === ".";
  }

  let isOutsideMap = point => {
    return point.x - xOffset < 0
      || point.x > maxX;
  }

  let trickleSand = point => {
    if (isOutsideMap(point)) {
      isOverflow = true;
    } else if (isFree(point.x, point.y+1)) {
      point.y++;
      trickleSand(point);
    } else if (isFree(point.x - 1, point.y + 1)) {
      point.x--;
      point.y++;
      trickleSand(point);
    } else if (isFree(point.x + 1, point.y + 1)) {
      point.x++;
      point.y++;
      trickleSand(point);
    } else if (isFree(point.x, point.y)) {
      drawPoint(point, "o");
    } else {
      isOverflow = true;
    }
  }
  
  rockPaths.forEach(path => drawLines(path));
  
  return {
    map,
    print: function() {
      console.log(this.map.map(line => line.join("")).join("\n"));
    },
    pourSand: function() {
      while (!isOverflow) {
        trickleSand(point(500, 0));
      }
    },
    count: function(chr) {
      return [].concat(...map).filter(val => val === chr).length;
    },
    maxY: maxY,
    maxX: maxX,
    minX: minX
  }
};

let countSand = input => {
  const aCave = cave(input);
  aCave.pourSand();
  aCave.print();
  console.log(aCave.count("o"));
}

//test
countSand(sampleInput);

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
countSand(puzzleInput);

// part 2
let countSandWithGround = input => {
  const caveWithoutGround = cave(input);
  const newGroundY = caveWithoutGround.maxY + 2;
  const newGroundXMin = caveWithoutGround.minX - newGroundY;
  const newGroundXMax = caveWithoutGround.maxX + newGroundY;
  const caveWithGroundInput = input + "\n" + 
    newGroundXMin + "," + newGroundY + " -> "
    + newGroundXMax + "," + newGroundY;
  console.log(caveWithGroundInput);
  const caveWithGround = cave(caveWithGroundInput);
  caveWithGround.pourSand();
  caveWithGround.print();
  console.log(caveWithGround.count("o"));
}

//test
countSandWithGround(sampleInput);

countSandWithGround(puzzleInput);
