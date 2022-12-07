// Day 7
// Part 1
const sampleInput = "$ cd /\n" +
"$ ls\n" +
"dir a\n" +
"14848514 b.txt\n" +
"8504156 c.dat\n" +
"dir d\n" +
"$ cd a\n" +
"$ ls\n" +
"dir e\n" +
"29116 f\n" +
"2557 g\n" +
"62596 h.lst\n" +
"$ cd e\n" +
"$ ls\n" +
"584 i\n" +
"$ cd ..\n" +
"$ cd ..\n" +
"$ cd d\n" +
"$ ls\n" +
"4060174 j\n" +
"8033020 d.log\n" +
"5626152 d.ext\n" +
"7214296 k\n";

const createDirectory = function(name, parent) {
  return {
    name: name,
    parent: parent,
    contents: {},
    size: function() {
      if (Object.values(this.contents).length === 0) {
        return 0;
      }
      return Object.values(this.contents).map(content => content.size()).reduce((a, b) => a + b, 0);
    }
  }
};
const createFile = function(name, size) {
  return {
    name: name,
    size: function()  {
      return size;
    }
  }
};

const commands = {
  ls: {
    pattern: /\$ ls$/,
    applyToFilesystem: function(currentDir, currentInput) {
      while (readLsOutput(currentDir, currentInput[1])) {
        currentInput.shift();
      }
      return currentDir;
    }
  },
  cdRoot: {
    pattern: /\$ cd \/$/,
    applyToFilesystem: function(currentDir, currentInput) {
      while (currentDir.name !== "/") {
        currentDir = currentDir.parent;
      }
      return currentDir;
    }
  },
  cdUp: {
    pattern: /\$ cd \.\.$/,
    applyToFilesystem: function(currentDir, currentInput) {
      return currentDir.parent;
    }
  },
  cd: {
    pattern: /\$ cd (.+)$/,
    applyToFilesystem: function(currentDir, currentInput) {
      return currentDir.contents[this.pattern.exec(currentInput[0])[1]];
    }
  }
};

const readLsOutput = (currentDir, lsOutput) => {
  console.log("reading lsOutput: " + lsOutput);
  const fileLine = /(\d+) (.+)$/.exec(lsOutput);
  if (fileLine) {
    currentDir.contents[fileLine[2]] = createFile(fileLine[2], parseInt(fileLine[1]));
    return true;
  }
  const dirLine = /dir (.+)$/.exec(lsOutput);
  if (dirLine) {
    if (currentDir.contents[dirLine[1]]) {
      return true; // already seen directory
    }
    currentDir.contents[dirLine[1]] = createDirectory(dirLine[1], currentDir);
    return true;
  }
  return false; // no ls output line anymore
}

const buildFileSystem = (input) => {
  const fileSystemRoot = createDirectory("/", null);
  var currentDir = fileSystemRoot;
  do {
    const command = Object.values(commands)
         .filter(command => command.pattern.exec(input[0]))[0];
    currentDir = command? command.applyToFilesystem(currentDir, input): null;
    input.shift();
  }
  while (currentDir != null);
  return fileSystemRoot;
}

let collectMatchingDirs = (dir, condition) => {
  const matchingDirs = []
  if (condition(dir)) {
    matchingDirs.push(dir);
  }
  matchingDirs.push(...Object.values(dir.contents)
      .filter(content => content.contents) // is directory
      .map(childDir => collectMatchingDirs(childDir, condition, matchingDirs))
      .flat());
  return matchingDirs;
}

//test
let sampleFs = buildFileSystem(sampleInput.split("\n"));
collectMatchingDirs(sampleFs, (dir) => dir.size() <= 100000).map(dir => dir.size()).reduce((a,b) => a+b, 0);
// 95437

let puzzleInput = document.getElementsByTagName("pre")[0].textContent.trimRight();
let puzzleFs = buildFileSystem(puzzleInput.split("\n"));
collectMatchingDirs(puzzleFs, (dir) => dir.size() <= 100000).map(dir => dir.size()).reduce((a,b) => a+b, 0);
// 1427048
