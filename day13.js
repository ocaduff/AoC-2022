// Day 14
// Part 1
let sampleInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

let isOrdered = (leftElement, rightElement, currentIndex) => {
  if (Number.isInteger(leftElement) && Number.isInteger(rightElement)) {
    if (leftElement === rightElement) {
      return null;
    } else {
      return leftElement < rightElement;
    }
  } else if (Number.isInteger(leftElement)) {
    leftElement = [leftElement];
    return isOrdered(leftElement, rightElement, currentIndex);
  } else if (Number.isInteger(rightElement)) {
    rightElement = [rightElement];
    return isOrdered(leftElement, rightElement, currentIndex);
  } else {
    var nextIsOrdered = null;
    while (leftElement.length > currentIndex && rightElement.length > currentIndex && nextIsOrdered == null) {
      nextIsOrdered = isOrdered(leftElement[currentIndex], rightElement[currentIndex], 0);
      currentIndex++;
    }
    if (nextIsOrdered !== null) {
      return nextIsOrdered;
    }
    if (leftElement.length == currentIndex && rightElement.length > currentIndex) {
      return true;
    }
    if (rightElement.length == currentIndex && leftElement.length > currentIndex) {
      return false;
    }
    return null;
  }
}

let findOrderedIndexes = input => {
  let orderedIndexes = [];
  let pairs = input.split("\n\n");
  for (let i = 0; i < pairs.length; i++) {
    let [leftSide, rightSide] = pairs[i].split("\n").map(eval);
    if (isOrdered(leftSide, rightSide, 0)) {
      orderedIndexes.push(i);
    }
  }
  console.log(orderedIndexes.reduce((a,b) => a + b + 1, 0));
}

//test
findOrderedIndexes(sampleInput);

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
findOrderedIndexes(puzzleInput);

// Part 2
let decoderKey = input => {
  let findPacketIndex = (packetList, packetToFind) => {
    const packetToFindJson = JSON.stringify(packetToFind);
    return packetList.findIndex(packet => JSON.stringify(packet) === packetToFindJson);
  }
  let packets = input.split("\n")
    .filter(line => "" !== line)
    .map(eval);
  packets.push([[2]], [[6]]);
  let packetsOrdered = packets
    .sort((a,b) => isOrdered(a,b, 0)? -1: 1);
  let index2 = findPacketIndex(packetsOrdered, [[2]]) + 1;
  let index6 = findPacketIndex(packetsOrdered, [[6]]) + 1;
  console.log(index2 * index6);
}

decoderKey(sampleInput);
decoderKey(puzzleInput);
