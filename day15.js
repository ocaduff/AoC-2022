// Day 15
// Part 1
let sampleInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

let point = function(x,y) {
  return {x,y};
};
let line = function(from, to) {
  return {from, to, m: (from.y - to.y)/(from.x - to.x)};
};
let intersect = (line1, line2) => {
  if (line1.m == line2.m) {
    return null;
  }
  const x = (line1.m * line1.to.x - line2.m * line2.to.x + line2.to.y - line1.to.y) / (line1.m - line2.m);
  const y = line1.m * (x - line1.to.x) + line1.to.y;
  if (between(line1.to.x, x, line1.from.x) && between(line1.to.y, y, line1.from.y)) {
    return point(x, y);
  }; 
  return null;
};

let between = (a, b, c) => {
  if (a <= c) return a <= b && b <= c; else return c <= b <= a;
}

let sensorBeaconPair = match => {
  let sensor = point(parseInt(match[1]), parseInt(match[2]));
  let beacon = point(parseInt(match[3]), parseInt(match[4]));
  let dist = manhattanDistance(sensor, beacon);
  return {
    sensor: sensor,
    beacon: beacon,
    distance: dist,
    covers: function(point) {
      return manhattanDistance(point, sensor) <= dist;
    }
  }
};

let manhattanDistance = (a,b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

let cave = (input) => {
  const sensorNet = input.split("\n")
    .map(line => line.match(/x=(\-?\d+), y=(\-?\d+).+x=(\-?\d+), y=(\-?\d+)/))
    .map(sensorBeaconPair);

  return {
    part1: yLine => {
      const yLinePoints = new Set();
      
      let drawCircleOnLine = (center, radius) => {
        if (manhattanDistance(center, point(center.x, yLine)) > radius) {
          return;
        }
        for (let x = center.x - radius; x < center.x + radius; x++) {
          if (manhattanDistance(center, point(x, yLine)) <= radius) {
            yLinePoints.add(x);
          }
        }
      }
      let removeFromLine = point => {
        if (point.y === yLine) {
          yLinePoints.delete(point.x);
        }
      }
    
      sensorNet.forEach(pair => drawCircleOnLine(pair.sensor, pair.distance));
      sensorNet.forEach(pair => removeFromLine(pair.beacon));
    
      console.log(yLinePoints.size);
    },
    part2: maxXYCoord => {
      const intersections = new Set();
      let findIntersections = (line, i) => {
        for (let j = i; j < sensorNet.length; j++) {
          sensorNet[j].borderlines.forEach(borderLine => findIntersections(borderLine, i++));
          intersections.concat(...sensorNet[j].borderlines.map(lineB => intersect(line, lineB)).filter(x => x));
        }
      }
      sensorNet
        //corners
        .forEach(pair => pair.corners =
                            [point(pair.sensor.x - pair.distance - 1, pair.sensor.y),
                             point(pair.sensor.x + pair.distance + 1, pair.sensor.y),
                             point(pair.sensor.x, pair.sensor.y - pair.distance - 1),
                             point(pair.sensor.x, pair.sensor.y + pair.distance + 1)])
      sensorNet
        //connect the corners to borderlines
        .forEach(pair => pair.borderlines = 
                  [line(pair.corners[0], pair.corners[2]),
                   line(pair.corners[0], pair.corners[3]),
                   line(pair.corners[2], pair.corners[1]),
                   line(pair.corners[3], pair.corners[1])]);
      const posLines = [].concat(...sensorNet.map(pair => pair.borderlines).filter(line => line.m = 1))
      const negLines = [].concat(...sensorNet.map(pair => pair.borderlines).filter(line => line.m = -1))
      posLines.forEach(posLine => negLines.forEach(negLine => {
        const intersection = intersect(posLine, negLine);
        if (intersection) {
          intersections.add(JSON.stringify(intersection));
        }
      }));
      return [...intersections]
        .map(JSON.parse)
        .filter(intersection => between(0, intersection.x, maxXYCoord) && between(0, intersection.y, maxXYCoord))
        .filter(intersection => sensorNet.filter(sensor => sensor.covers(intersection)).length == 0)
        .map(intersection => intersection.x * 4000000 + intersection.y);
    },
    sensorNet: sensorNet
  }
};

// test
cave(sampleInput).part1(10);

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
cave(puzzleInput).part1(2000000);

// Part 2
cave(sampleInput).part2(20);
cave(puzzleInput).part2(4000000)
