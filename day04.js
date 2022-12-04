// Day 4
// Part 1
let sampleInput = "2-4,6-8\n"+
"2-3,4-5\n"+
"5-7,7-9\n"+
"2-8,3-7\n"+
"6-6,4-6\n"+
"2-6,4-8";

let toSections = (sectionsStr) => {
  let sectionsParts = sectionsStr.split("-");
  return {start: parseInt(sectionsParts[0]), end: parseInt(sectionsParts[1])};
}

let contains = (sections1, sections2) => {
  return sections1.start <= sections2.start && sections1.end >= sections2.end;
}

let overlaps = (sections1, sections2) => {
  return contains(sections1, sections2) || contains(sections2, sections1);
}

let countOverlaps = (input) => 
  input
    .split("\n")
    .filter(pair => pair.split(",")
                     .map(toSections).reduce(overlaps))
    .length;

countOverlaps(sampleInput);
// 4

countOverlaps(puzzleInput);
// 576

// Part 2
let overlapsSimple = (sections1, sections2) => {
  return partialContains(sections1, sections2) || partialContains(sections2, sections1);
}

let partialContains = (sections1, sections2) => {
  return sections1.start <= sections2.start && sections1.end >= sections2.start;
}

let countPartialOverlaps = (input) => 
  input
    .split("\n")
    .filter(pair => pair.split(",")
                     .map(toSections).reduce(overlapsSimple))
    .length;

countPartialOverlaps(sampleInput);
// 2

countPartialOverlaps(puzzleInput);
