// Given an input assignment (array of len 81), solve the sudoku
// Return complete assignment if solution found, else None

const rows = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80],
];

const columns = [
  [0, 3, 6, 27, 30, 33, 54, 57, 60],
  [1, 4, 7, 28, 31, 34, 55, 58, 61],
  [2, 5, 8, 29, 32, 35, 56, 59, 62],
  [9, 12, 15, 36, 39, 42, 63, 66, 69],
  [10, 13, 16, 37, 40, 43, 64, 67, 70],
  [11, 14, 17, 38, 41, 44, 65, 68, 71],
  [18, 21, 24, 45, 48, 51, 72, 75, 78],
  [19, 22, 25, 46, 49, 52, 73, 76, 79],
  [20, 23, 26, 47, 50, 53, 74, 77, 80],
];

const blocks = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53],
  [54, 55, 56, 57, 58, 59, 60, 61, 62],
  [63, 64, 65, 66, 67, 68, 69, 70, 71],
  [72, 73, 74, 75, 76, 77, 78, 79, 80],
];

// Remove a number from array of number
const removeFromArray = (array: number[], value: number) => {
  return array.filter((item) => {
    return item != value;
  });
};

// Given an id, return the row, column and block no of the input cell
const findLocation = (id: number): number[] => {
  const location = [];
  // Find row
  for (let ri = 0; ri < 9; ri++) {
    const row = rows[ri];
    if (row.includes(id)) {
      location.push(ri);
    }
  }

  // Find column
  for (let ci = 0; ci < 9; ci++) {
    const column = columns[ci];
    if (column.includes(id)) {
      location.push(ci);
    }
  }

  // Find block
  const block = Math.floor(id / 9);
  location.push(block);

  return location;
};

// Return an array of length 81 with default value -1
const updateAssignment = (id: number, value: number, assignment: number[]) => {
  assignment[id] = value;
  return assignment;
};

// Update domains when a new cell is assigned (enforcing arc consistency)
const updateDomains = (id: number, value: number, domains: number[][]) => {
  // Go through each id, remove clashing numbers from domains
  const neighbors = getNeighbors(id);
  for (var neighborId of neighbors) {
    domains[neighborId] = removeFromArray(domains[neighborId], value);
  }

  return domains;
};

const addAnswer = (
  id: number,
  value: number,
  assignment: number[],
  domains: number[][]
) => {
  assignment = updateAssignment(id, value, assignment);
  domains = updateDomains(id, value, domains);
  return { assignment, domains };
};

// Return the next unassigned variable for backtracking, ranked by smallest domains
// Assume assignment is not completed
const selectUnassignedVariable = (isSolved: number[], domains: number[][]) => {
  const unSolved = getUnSolved(isSolved);
  var result = unSolved[0];
  for (let i = 1; i < unSolved.length; i++) {
    const id = unSolved[i];
    if (domains[id].length < domains[result].length) {
      result = id;
    }
  }
  return result;
};

// Check completeness of assignment
const isAssignmentCompleted = (isSolved: number[]): boolean => {
  return isSolved.length == 81;
};

// Check consistency of assignment
export const isAssignmentConsistent = (
  assignment: number[],
  isSolved?: number[]
): boolean => {
  if (isSolved) {
    for (var id of isSolved) {
      const neighbors = getNeighbors(id);
      for (var neighborId of neighbors) {
        if (isSolved.includes(neighborId)) {
          if (assignment[neighborId] == assignment[id]) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

// Return neighbors of an id (in same row, col and block)
const getNeighbors = (id: number) => {
  const [rowIndex, colIndex, blockIndex] = findLocation(id);
  const neighbors = [];
  for (var rowNeighborId of rows[rowIndex]) {
    neighbors.push(rowNeighborId);
  }
  for (var colNeighborId of columns[colIndex]) {
    neighbors.push(colNeighborId);
  }
  for (var blockNeighborId of blocks[blockIndex]) {
    neighbors.push(blockNeighborId);
  }
  return removeFromArray(neighbors, id);
};

const getUnSolved = (isSolved: number[]): number[] => {
  const unSolved: number[] = [];
  for (let id = 0; id < 81; id++) {
    if (!isSolved.includes(id)) {
      unSolved.push(id);
    }
  }
  return unSolved;
};

const backtrack = (
  isSolved: number[],
  assignment: number[],
  domains: number[][]
): number[] | null => {
  // Base case: If assignment is complete and consistent, return assignment
  if (
    isAssignmentCompleted(isSolved) &&
    isAssignmentConsistent(isSolved, assignment)
  ) {
    return assignment;
  }

  // If invalid assignment, return null
  if (!isAssignmentConsistent) {
    return null;
  }

  // Backtrack from the first-ranked unassigned cell
  const unassignedCellIndex = selectUnassignedVariable(isSolved, domains);
  for (var possibleValue of domains[unassignedCellIndex]) {
    const newAssignment = [...assignment];
    const newDomains = domains.map((domain) => [...domain]);

    // Assign value to the cell
    const { assignment: updatedAssignment, domains: updatedDomains } =
      addAnswer(unassignedCellIndex, possibleValue, newAssignment, newDomains);

    // Recursively solve the next cells
    isSolved.push(unassignedCellIndex);
    const result = backtrack(isSolved, updatedAssignment, updatedDomains);
    if (result !== null) {
      return result;
    } else {
      isSolved = removeFromArray(isSolved, unassignedCellIndex);
    }
  }

  // If no valid assignment found, return null
  return null;
};

// Solve the Sudoku puzzle
export const sudokuSolver = (assignment: number[]): number[] | null => {
  // Initialize domains
  const isSolved = [];
  var domains: number[][] = Array(81)
    .fill(null)
    .map(() => [...Array(9).keys()].map((i) => i + 1)); // Default domains are [1..9]

  // Remove values from domains based on initial assignment
  for (let i = 0; i < 81; i++) {
    if (assignment[i] !== -1) {
      domains = updateDomains(i, assignment[i], domains);
      isSolved.push(i);
    }
  }

  // Start the backtracking solution process
  return backtrack(isSolved, assignment, domains);
};
