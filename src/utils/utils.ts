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
  [0, 1, 2, 3, 4, 5, 6, 7, 8], // Block 1
  [9, 10, 11, 12, 13, 14, 15, 16, 17], // Block 2
  [18, 19, 20, 21, 22, 23, 24, 25, 26], // Block 3
  [27, 28, 29, 30, 31, 32, 33, 34, 35], // Block 4
  [36, 37, 38, 39, 40, 41, 42, 43, 44], // Block 5
  [45, 46, 47, 48, 49, 50, 51, 52, 53], // Block 6
  [54, 55, 56, 57, 58, 59, 60, 61, 62], // Block 7
  [63, 64, 65, 66, 67, 68, 69, 70, 71], // Block 8
  [72, 73, 74, 75, 76, 77, 78, 79, 80], // Block 9
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

// Update domains when a new cell is assigned
const updateDomains = (id: number, value: number, domains: number[][]) => {
  // Go through each id, remove clashing numbers from domains
  const location = findLocation(id);
  const rowIndex = location[0];
  const colIndex = location[1];
  const blockIndex = location[2];

  // Update domains of own cell
  domains[id] = [];

  // Update domains of cells in same row
  for (var rowNeighborId of rows[rowIndex]) {
    domains[rowNeighborId] = removeFromArray(domains[rowNeighborId], value);
  }

  // Update domains of cells in same column
  for (var colNeighborId of columns[colIndex]) {
    domains[colNeighborId] = removeFromArray(domains[colNeighborId], value);
  }

  // Update domains of cells in same block
  for (var blockNeighborId of blocks[blockIndex]) {
    domains[blockNeighborId] = removeFromArray(domains[blockNeighborId], value);
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

const solve = (assignment: number[], domains: number[][]): number[] | null => {
  // Find the first unassigned cell (cell with value -1)
  const unassignedCellIndex = assignment.findIndex((value) => value === -1);
  if (unassignedCellIndex === -1) return assignment; // If no unassigned cells, it's solved

  // Try assigning values from 1 to 9 to this unassigned cell
  for (let value = 1; value <= 9; value++) {
    if (domains[unassignedCellIndex].includes(value)) {
      const newAssignment = [...assignment];
      const newDomains = domains.map((domain) => [...domain]);

      // Assign value to the cell
      const { assignment: updatedAssignment, domains: updatedDomains } =
        addAnswer(unassignedCellIndex, value, newAssignment, newDomains);

      // Recursively solve the next cells
      const result = solve(updatedAssignment, updatedDomains);
      if (result !== null) {
        return result; // Found a solution, return the solved grid
      }
    }
  }

  // If no valid assignment found, return null
  return null;
};

// Solve the Sudoku puzzle
const sudokuSolver = (assignment: number[]): number[] | null => {
  // Initialize domains
  var domains: number[][] = Array(81)
    .fill(null)
    .map(() => [...Array(9).keys()].map((i) => i + 1)); // Default domains are [1..9]

  // Remove values from domains based on initial assignment
  for (let i = 0; i < 81; i++) {
    if (assignment[i] !== -1) {
      domains = updateDomains(i, assignment[i], domains);
    }
  }

  // Start the backtracking solution process
  return solve(assignment, domains);
};
