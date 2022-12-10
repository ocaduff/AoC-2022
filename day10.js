// Day 10
// Part 1
let sampleInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`;

let processSignals = input => {
    let instructions = input.split("\n")
        .map(line => /addx (\-?\d+)/.exec(line))
        .map(match => match? parseInt(match[1]): null);
    const measurementCycles = [20, 60, 100, 140 ,180, 220];
    var measurementsSum = 0;
    var register = 1;
    var cycle = 1;
    var busy = null;
    while (instructions.length > 0 && measurementCycles.length > 0) {
        cycle++;
        if (!busy) {
            let addition = instructions.shift();
            if (addition) {
                busy = register + addition;
            }
        } else {
            // one cycle passed => make result available
            register = busy;
            busy = null;
        }
        if (cycle == measurementCycles[0]) {
            measurementCycles.shift();
            measurementsSum += cycle * register;
            console.log("register at cycle " + cycle + ": " + register + " signal strength: " + cycle * register);
        }
    }
    console.log("sum of signal strengths: " + measurementsSum);
}

processSignals(sampleInput);

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
processSignals(puzzleInput);

