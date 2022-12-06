// Day 6
// Part 1

let sampleInput = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb",
                   "bvwbjplbgvbhsrlpgdmjqwftvncz",
                   "nppdvjthqldpwncqszvftbrmjlhg",
                   "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
                   "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"];

let findMarkerStart = input => {
  const packetLength = 4;
  const seenSignals = [];
  var currentPosition = 0;
  while (!formsStartPacket(input.charAt(currentPosition), seenSignals, packetLength)) {
    currentPosition++;
  }
  return currentPosition + 1;
}

let formsStartPacket = (latestSignal, seenSignals, packetLength) => {
  const seenIndex = seenSignals.indexOf(latestSignal);
  if (seenIndex >= 0) {
    seenSignals.splice(0, seenIndex + 1);
    seenSignals.push(latestSignal);
    return false;
  }
  seenSignals.push(latestSignal);
  return seenSignals.length == packetLength;
}

// test
findMarkerStart(sampleInput[0]);
sampleInput.map(findMarkerStart);
let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
findMarkerStart(puzzleInput);
