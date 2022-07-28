import {
  createCell,
  getExplorationCell,
  getCellForMaze,
} from "utils/helpers/cell.helpers";

export const createInitialGrid = (rowsNum, colsNum) => {
  const grid = [];
  for (let row = 0; row < rowsNum; row++) {
    const currentRow = [];
    for (let col = 0; col < colsNum; col++) {
      currentRow.push(createCell(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getExplorationGrid = (grid, endRow, endCol) => {
  const newGrid = [];
  for (let row of grid) {
    const currentRow = [];
    for (let cell of row) {
      currentRow.push(getExplorationCell(cell, endRow, endCol));
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

export const getGridForMaze = (grid) => {
  const newGrid = [];
  for (let row of grid) {
    const currentRow = [];
    for (let cell of row) {
      currentRow.push(getCellForMaze(cell));
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

export const getAllCells = (grid) => {
  const cellsArray = [];
  for (let row of grid) {
    for (let cell of row) {
      cellsArray.push(cell);
    }
  }
  return cellsArray;
};

export const hasWeights = (grid) => {
  for (let row of grid) {
    for (let cell of row) {
      if (cell.isWeighted) return true;
    }
  }
  return false;
};
