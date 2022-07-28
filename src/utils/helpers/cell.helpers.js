import { getDistance } from "utils/helpers/helpers";
import cellStyles from "components/Cell/cell.module.css";

export const createCell = (row, col) => {
  return {
    row: row,
    col: col,
    isWall: false,
    isWeight: false,
  };
};

export const getExplorationCell = (cell, endRow, endCol) => {
  return {
    ...cell,
    visited: false,
    parent: null,
    distance: Infinity,
    heuristic: getDistance(cell.row, cell.col, endRow, endCol),
  };
};

export const getCellForMaze = (cell) => {
  return {
    row: cell.row,
    col: cell.col,
    visited: false,
    isPassage: false,
    parent: null,
  };
};

export const isStart = (cell, startCoords) => {
  return cell.row === startCoords.row && cell.col === startCoords.col;
};

export const isEnd = (cell, endCoords) => {
  return cell.row === endCoords.row && cell.col === endCoords.col;
};

export const isOnlyWall = (cell, startCoords, endCoords) => {
  return cell.isWall && !isStart(cell, startCoords) && !isEnd(cell, endCoords);
};

export const isOnlyWeight = (cell, startCoords, endCoords) => {
  return (
    cell.isWeight && !isStart(cell, startCoords) && !isEnd(cell, endCoords)
  );
};

// The cell must have ROW and COL props
export const getCoords = (cell) => {
  return [cell.row, cell.col];
};
// The cells must have ROW and COL props
export const haveSameCoords = (cell1, cell2) => {
  return cell1.row === cell2.row && cell1.col === cell2.col;
};

export const areCoordsInBound = (row, col, rowsNum, colsNum) => {
  return 0 <= row && row < rowsNum && 0 <= col && col < colsNum;
};

// The cell must have ROW and COL props
export const isCellInBound = (cell, rowsNum, colsNum) => {
  return areCoordsInBound(cell.row, cell.col, rowsNum, colsNum);
};

export const getNeighborsCoordsWithJump = (row, col, jump) => {
  return [
    { row: row - jump, col: col },
    { row: row, col: col + jump },
    { row: row + jump, col: col },
    { row: row, col: col - jump },
  ];
};

// The cell must have ROW and COL props
export const getValidNeighbors = (cell, grid) => {
  let neighbors = [];
  let neighborsCoords = getNeighborsCoordsWithJump(cell.row, cell.col, 1);

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

// The cell must have ROW and COL props
export const getValidNeighborsWithJump = (cell, grid, jump) => {
  let neighbors = [];
  let neighborsCoords = getNeighborsCoordsWithJump(cell.row, cell.col, jump);

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

// The cell must have ROW and COL props
export const getValidUpDownNeighbors = (cell, grid) => {
  let neighbors = [];
  let neighborsCoords = [
    { row: cell.row - 1, col: cell.col },
    { row: cell.row + 1, col: cell.col },
  ];

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

// The cell must have ROW and COL props
export const getValidLeftRightNeighbors = (cell, grid) => {
  let neighbors = [];
  let neighborsCoords = [
    { row: cell.row, col: cell.col - 1 },
    { row: cell.row, col: cell.col + 1 },
  ];

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

// The cell must have ROW and COL props
export const makeVisitedVisually = (cell) => {
  document.getElementById(
    `cell-${cell.row}-${cell.col}`
  ).className = `${cellStyles.cell} ${cellStyles.visited}`;
};

// The cell must have ROW and COL props
export const makePathVisually = (cell) => {
  document.getElementById(
    `cell-${cell.row}-${cell.col}`
  ).className = `${cellStyles.cell} ${cellStyles.path}`;
};

// The cell must have ROW and COL props
export const clearCellVisually = (cell) => {
  document.getElementById(`cell-${cell.row}-${cell.col}`).className = document
    .getElementById(`cell-${cell.row}-${cell.col}`)
    .className.replace(`${cellStyles.visited}`, "");
  document.getElementById(`cell-${cell.row}-${cell.col}`).className = document
    .getElementById(`cell-${cell.row}-${cell.col}`)
    .className.replace(`${cellStyles.path}`, "");
};
