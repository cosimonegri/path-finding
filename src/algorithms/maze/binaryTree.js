import { getGridForMaze } from "utils/helpers/grid.helpers";
import {
  getVerticalOrientation,
  getHorizontalOrientation,
} from "utils/helpers/maze.helpers";

const binaryTree = (grid) => {
  const newGrid = getGridForMaze(grid);
  const rowsNum = grid.length;
  const colsNum = grid[0].length;
  const passageCellsInOrder = [];

  for (let row = 0; row < rowsNum; row += 2) {
    for (let col = 0; col < colsNum; col += 2) {
      const orientation = getOrientation(row, col, rowsNum, colsNum);

      if (!orientation) continue;

      for (let i = 0; i <= 2; i++) {
        const cellToAdd = orientation.vertical
          ? newGrid[row + i][col]
          : newGrid[row][col + i];

        if (!cellToAdd.visited) {
          cellToAdd.visited = true;
          passageCellsInOrder.push(cellToAdd);
        }
      }
    }
  }

  return passageCellsInOrder;
};

const getOrientation = (row, col, rowsNum, colsNum) => {
  if (row === rowsNum - 1 && col === colsNum - 1) {
    return null;
  } else if (row === rowsNum - 1) {
    return getHorizontalOrientation();
  } else if (col === colsNum - 1) {
    return getVerticalOrientation();
  }

  if (Math.random() > 0.5) {
    return getVerticalOrientation();
  } else {
    return getHorizontalOrientation();
  }
};

export default binaryTree;
