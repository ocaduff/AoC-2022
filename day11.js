// Day 11
// Part 1
let sampleInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`;

let Monkey = function(items, operation, divisorForTest, targetMonkeyIfTrue, targetMonkeyIfFalse) {
  return {items, operation, divisorForTest, targetMonkeyIfTrue, targetMonkeyIfFalse, nInspections: 0};
}

let doOperation =(old, operationDef) => {
    if (operationDef === "old * old") {
        return old * old;
    }
    let match = /old (\+|\-|\*|\/) (\d+)/.exec(operationDef);
    switch (match[1]) {
        case "+":
            return old + parseInt(match[2]);
        case "-":
            return old - parseInt(match[2]);
        case "*":
            return old * parseInt(match[2]);
        case "/":
            return Math.floor(old / parseInt(match[2]));
    }
}

let monkeyRegex = new RegExp(
`Monkey (?<monkeyId>\\d+):
  Starting items: (?<startingItems>(\\d+)(\\, \\d+)*)
  Operation: new = (?<operation>.+)
  Test: divisible by (?<divisorForTest>\\d+)
    If true: throw to monkey (?<targetMonkeyIfTrue>\\d+)
    If false: throw to monkey (?<targetMonkeyIfFalse>\\d+)`.trim());

let doMonkeyBusiness = input => {
    let monkeys = input.split("\n\n")
          .map(monkeyDef => monkeyRegex.exec(monkeyDef))
          .map(match => match.groups)
          .map(m => Monkey(
              m.startingItems.split(", ").map(item => parseInt(item)),
              function(old) { return doOperation(old, m.operation) },
              parseInt(m.divisorForTest),
              parseInt(m.targetMonkeyIfTrue),
              parseInt(m.targetMonkeyIfFalse)
          ));
    
    for (let round = 0; round < 20; round++) {
        monkeys
            .map(monkey => {
                while (monkey.items.length > 0) {
                    let item = monkey.items.shift();
                    var worryLevel = item;
                    worryLevel = monkey.operation(worryLevel);
                    worryLevel = Math.floor(worryLevel/3);
                    const targetMonkey = worryLevel % monkey.divisorForTest == 0?
                        monkeys[monkey.targetMonkeyIfTrue]:
                        monkeys[monkey.targetMonkeyIfFalse];
                    targetMonkey.items.push(worryLevel);
                    monkey.nInspections++;
                }
            });
        }
    const ranking = monkeys.sort((a, b) => b.nInspections - a.nInspections);
    return ranking[0].nInspections * ranking[1].nInspections;
};

//test
console.log(doMonkeyBusiness(sampleInput));

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
console.log(doMonkeyBusiness(puzzleInput));

//Part 2
// worry level: instead of div by 3, do mod product of all divisors to prevent big numbers
let doMonkeyBigBusiness = (input) => {
    let monkeys = input.split("\n\n")
          .map(monkeyDef => monkeyRegex.exec(monkeyDef))
          .map(match => match.groups)
          .map(m => Monkey(
              m.startingItems.split(", ").map(item => parseInt(item)),
              function(old) { return doOperation(old, m.operation) },
              parseInt(m.divisorForTest),
              parseInt(m.targetMonkeyIfTrue),
              parseInt(m.targetMonkeyIfFalse)
          ));
    
    const divisorsProduct = monkeys
        .map(monkey => monkey.divisorForTest)
        .reduce((a, b) => a * b, 1)

    for (let round = 0; round < 10000; round++) {
        monkeys
            .map(monkey => {
                while (monkey.items.length > 0) {
                    let item = monkey.items.shift();
                    var worryLevel = item;
                    worryLevel = monkey.operation(worryLevel);
                    worryLevel = worryLevel % divisorsProduct;
                    const targetMonkey = worryLevel % monkey.divisorForTest == 0?
                        monkeys[monkey.targetMonkeyIfTrue]:
                        monkeys[monkey.targetMonkeyIfFalse];
                    targetMonkey.items.push(worryLevel);
                    monkey.nInspections++;
                }
            });
        }
    const ranking = monkeys.sort((a, b) => b.nInspections - a.nInspections);
    return ranking[0].nInspections * ranking[1].nInspections;
};

//test
console.log(doMonkeyBigBusiness(sampleInput));

console.log(doMonkeyBigBusiness(puzzleInput));
