// Day 6
// Part 1

//WIP
let sampleInput = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb",
                   "bvwbjplbgvbhsrlpgdmjqwftvncz",
                   "nppdvjthqldpwncqszvftbrmjlhg",
                   "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
                   "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"];

let findMarkerStart = input => {
  const packetLength = 4;
  const seenChars = input.substring(0, packetLength - 1).split("");
  console.log("seenChars: " + seenChars);
  var currentPosition = packetLength - 1;
  while (isInPacket(input.charAt(currentPosition), seenChars)) {
    seenChars.shift();
    seenChars.push(input.charAt(currentPosition));
    currentPosition++;
    console.log("seenChars: " + seenChars);
  }
  return currentPosition;
}

let isInPacket = (signal, seenChars) => {
  console.log("isInPacket signal: " + signal + " seenChars: " + seenChars);
  return seenChars.indexOf(signal) >= 0;
}

findMarkerStart(sampleInput[0]);
sampleInput.map(findMarkerStart);
