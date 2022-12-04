// Day 3

// Part 1

let toPriority = item => {
    if (item.toLowerCase() === item) {
        return item.charCodeAt(0) - "a".charCodeAt(0) + 1;
    } else {
        return item.charCodeAt(0) - "A".charCodeAt(0) + 27;
    }
};

let intersect = (compartiment1, compartiment2) => {
   let items1 = Array.from(new Set(compartiment1.split('')));
   let items2 = compartiment2.split('');
   return items1.filter(item1 => items2.indexOf(item1) >= 0)
                .reduce((a, b) => a + b, "");
};

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trim();

puzzleInput
    .split("\n")
    .map(rucksack => [rucksack.substr(0, rucksack.length/2), rucksack.substr(rucksack.length/2, rucksack.length/2)])
    .map(([compartiment1, compartiment2]) =>
                    intersect(compartiment1, compartiment2)
                        .split("")
                        .map(commonItem => toPriority(commonItem))
                        .reduce((a, b) => a + b, 0))
    .reduce((a, b) => a + b, 0);
// 7850

// Part 2
let createGroups = (rucksacks, groupSize) => {
  return new Array(rucksacks.length / groupSize)
    .fill('')
    .map((_, i) => rucksacks.slice(i * groupSize, (i + 1) * groupSize));
};
 
createGroups(puzzleInput.split("\n"), 3)
    .map(([elf1, elf2, elf3]) => intersect(elf1, intersect(elf2, elf3)))
    .map(badge => toPriority(badge))
    .reduce((a, b) => a+b, 0);
// 2581
