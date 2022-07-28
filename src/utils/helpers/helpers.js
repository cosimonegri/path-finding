export const getCoordsObject = (row, col) => {
  return {
    row: row,
    col: col,
  };
};

export const getDistance = (row1, col1, row2, col2) => {
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};

// The cells of the grid must have PARENT prop
export const getPath = (grid, endRow, endCol) => {
  const path = [];
  let cell = grid[endRow][endCol];

  if (!cell.parent) {
    return path;
  }
  while (cell) {
    path.push(cell);
    cell = cell.parent;
  }

  return path.reverse();
};
