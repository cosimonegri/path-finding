export const getCoordsObject = (row, col) => {
  return {
    row: row,
    col: col,
  };
};

export const getDistance = (row1, col1, row2, col2) => {
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};

// The cells of the grid must have 'parent' prop
export const getPath = (grid, endRow, endCol) => {
  const path = [];
  let cell = grid[endRow][endCol];

  if (!cell.parent) {
    return [];
  }
  while (cell) {
    path.push(cell);
    cell = cell.parent;
  }

  return path.reverse();
};

// The cells of the grid must have 'parent' and 'parentFromEnd' prop
export const getPathFromBidirectional = (grid, midRow, midCol) => {
  const pathStartMid = getPath(grid, midRow, midCol);
  const pathMidEnd = [];
  let cell = grid[midRow][midCol];

  while (cell) {
    pathMidEnd.push(cell);
    cell = cell.parentFromEnd;
  }

  return [...pathStartMid, ...pathMidEnd];
};
