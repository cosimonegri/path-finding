import { haveSameCoords } from "utils/helpers/cell.helpers";
import { getGridForMaze } from "utils/helpers/grid.helpers";
import {
  getVerticalOrientation,
  getHorizontalOrientation,
} from "utils/helpers/maze.helpers";
import { shuffleArray } from "utils/helpers/random.helpers";

const kruskal = (grid) => {
  const newGrid = getGridForMaze(grid);
  const passageCellsInOrder = [];

  let unvisitedCells = getAllCellsWithOrientation(newGrid);
  unvisitedCells = shuffleArray(unvisitedCells);

  for (let { cell, orientation } of unvisitedCells) {
    const secondCell = orientation.vertical
      ? newGrid[cell.row + 2][cell.col]
      : newGrid[cell.row][cell.col + 2];

    const firstCellRoot = findRoot(cell);
    const secondCellRoot = findRoot(secondCell);

    if (haveSameCoords(firstCellRoot, secondCellRoot)) {
      continue;
    }

    for (let i = 0; i <= 2; i++) {
      const cellToAdd = orientation.vertical
        ? newGrid[cell.row + i][cell.col]
        : newGrid[cell.row][cell.col + i];

      if (!cellToAdd.visited) {
        cellToAdd.visited = true;
        passageCellsInOrder.push(cellToAdd);
      }
    }

    union(firstCellRoot, secondCellRoot);
  }

  return passageCellsInOrder;
};

const getAllCellsWithOrientation = (grid) => {
  const cellsArray = [];
  const rowsNum = grid.length;
  const colsNum = grid[0].length;

  for (let row = 0; row < rowsNum; row += 2) {
    for (let col = 0; col < colsNum; col += 2) {
      if (row + 2 < rowsNum) {
        cellsArray.push({
          cell: grid[row][col],
          orientation: getVerticalOrientation(),
        });
      }
      if (col + 2 < colsNum) {
        cellsArray.push({
          cell: grid[row][col],
          orientation: getHorizontalOrientation(),
        });
      }
    }
  }
  return cellsArray;
};

// Disjoint set FIND operation
const findRoot = (cell) => {
  if (!cell.parent) {
    return cell;
  }
  return findRoot(cell.parent);
};

// Disjoin set UNION operation
const union = (cell1, cell2) => {
  const rootCell1 = findRoot(cell1);
  const rootCell2 = findRoot(cell2);

  rootCell2.parent = rootCell1;
};

export default kruskal;
