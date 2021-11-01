function seed() {
  let arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr[i] = arguments[i];
  }
  return arr;
}

function same([x, y], [j, k]) {
  if (x === j && y === k) return true;
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
  let limitCorners = {
    topRight: [0, 0],
    bottomLeft: [0, 0],
  };
  if (state.length !== 0) {
    const xValues = state.map(([x,_]) => x);
    const yValues = state.map(([_,y]) => y);

    limitCorners.topRight = [Math.max(...xValues), Math.max(...yValues)],
    limitCorners.bottomLeft = [Math.min(...xValues), Math.min(...yValues)];
  }
  return limitCorners;
};

const printCells = (state) => {
  const {bottomLeft,topRight} = corners(state);  
  let result = "";
  for (let y = topRight[1]; y >= bottomLeft[1]; y--) {
    let row = [];
    for (let x = bottomLeft[0]; x <= topRight[0]; x++) {
      row.push(printCell([x, y], state));
    }
    result += row.join(" ") + "\n";
  }
  return result;
};

const getNeighborsOf = ([x, y]) => {
  let neighbors = [
    [-1,1],[0,1],[1,1],
    [-1,0],/* */ [1,0],
    [-1,-1],[0,-1],[1,-1]
  ];
    var addCells = ([a,b],[c,d]) => { return  [a+c,b+d];}  
    return  neighbors.map((cell) => addCells(cell,[x,y]));
};

const getLivingNeighbors = (cell, state) => {
  let allNeighors = getNeighborsOf(cell);
return allNeighors.filter((n) => contains.bind(state)(n))
};

const willBeAlive = (cell, state) => {
  let aliveNeighbors = getLivingNeighbors(cell,state);
  let numAliveNeighbors = aliveNeighbors.length;
  return ( numAliveNeighbors === 3 || numAliveNeighbors === 2 && (contains.call(state,cell)));
  };

const calculateNext = (state) => {
  const {bottomLeft,topRight} = corners(state);
  let nextState = [];

  for (let y = topRight[1]+1; y >= bottomLeft[1]-1; y--) {
    for (let x = bottomLeft[0]-1; x <= topRight[0]+1; x++) {
            if (willBeAlive([x,y],state)) {
              nextState.push([x,y])
            }
    }
  }
  return nextState;
};

const iterate = (state, iterations) => {
  const states = [state];
  for (let i = 0; i < iterations; i++) {
    states.push(calculateNext(state[states.length - 1]));
  }
}

const main = (pattern, iterations) => {
 const results = iterate(startPatterns[pattern],iterations)
 results.forEach(result => console.log(printCells(result)))
};

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
