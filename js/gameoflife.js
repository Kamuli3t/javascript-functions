function seed() {
  let arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr[i] = arguments[i];
  }
  return arr;
}

function same([x, y], [j, k]) {
  if (x === j && y === k) return true;
  else false;
}
// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  for (const acell of this) {
    if (same(acell, cell)) {
      return true;
    }
  }
}

const printCell = (cell, state) => {
  if (contains.call(state, cell)) {
    return "\u25A3";
  } else {
    return "\u25A2";
  }
};

const corners = (state = []) => {
  let corn = {
    topRight: ([] = [0, 0]),
    bottomLeft: ([] = [0, 0]),
  };
  if (state.length != 0) {
    for (const cell of state) {
      if (cell[0] >= corn.bottomLeft[0] && corn.bottomLeft[0] === 0) {
        corn.bottomLeft[0] = cell[0];
        if (cell[1] > 1) {
          corn.bottomLeft[1] = --cell[1];
        } else {
          corn.bottomLeft[1] = cell[1];
        }
      } else if (cell[0] < corn.bottomLeft[0]) {
        corn.bottomLeft[0] = cell[0];
        if (cell[1] > 1) {
          corn.bottomLeft[1] = --cell[1];
        } else {
          corn.bottomLeft[1] = cell[1];
        }
      } else if (
        cell[0] == corn.bottomLeft[0] &&
        cell[1] < corn.bottomLeft[1]
      ) if (cell[1] > 1) {
        corn.bottomLeft[1] = --cell[1];
      } else {
        corn.bottomLeft[1] = cell[1];
        }

      if (corn.topRight[0] === 0 && cell[0] >= corn.topRight[0]) {
        corn.topRight[0] = cell[0];
        corn.topRight[1] = ++cell[1];
      } else if (cell[0] > corn.topRight[0]) {
        corn.topRight[0] = cell[0];
        corn.topRight[1] = ++cell[1];
      } else if (cell[0] == corn.topRight[0] && cell[1] > corn.topRight[1]) {
        corn.topRight[1] = ++cell[1];
      }
    } return corn;
  }

const printCells = (state) => {};

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
  rpentomino: [
    [3, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4],
  ],
  glider: [
    [-2, -2],
    [-1, -2],
    [-2, -1],
    [-1, -1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [2, 3],
  ],
  square: [
    [1, 1],
    [2, 1],
    [1, 2],
    [2, 2],
  ],
};

const [pattern, iterations] = process.argv.slice(2);
const runAsScript = require.main === module;

if (runAsScript) {
  if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
    main(pattern, parseInt(iterations));
  } else {
    console.log("Usage: node js/gameoflife.js rpentomino 50");
  }
}

exports.seed = seed;
exports.same = same;
exports.contains = contains;
exports.getNeighborsOf = getNeighborsOf;
exports.getLivingNeighbors = getLivingNeighbors;
exports.willBeAlive = willBeAlive;
exports.corners = corners;
exports.calculateNext = calculateNext;
exports.printCell = printCell;
exports.printCells = printCells;
exports.startPatterns = startPatterns;
exports.iterate = iterate;
exports.main = main;