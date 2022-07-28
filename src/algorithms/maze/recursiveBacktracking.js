import { getValidNeighborsWithJump } from "utils/helpers/cell.helpers";
import { getGridForMaze } from "utils/helpers/grid.helpers";
import {
  getVerticalOrientation,
  getHorizontalOrientation,
} from "utils/helpers/maze.helpers";
import { shuffleArray } from "utils/helpers/random.helpers";

const recursiveBacktracking = (grid) => {
  const [startRow, startCol] = [0, 0];

  const newGrid = getGridForMaze(grid);
  const passageCellsInOrder = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  passageCellsInOrder.push(startCell);

  const makeMaze = (cell) => {
    let neighbors = getValidNeighborsWithJump(cell, newGrid, 2);
    neighbors = shuffleArray(neighbors);

    for (let neighbor of neighbors) {
      if (neighbor.visited) continue;

      const orientation = getOrientation(cell, neighbor);
      let midCell;

      if (orientation.vertical) {
        const midRow = (cell.row + neighbor.row) / 2;
        midCell = newGrid[midRow][cell.col];
      } else if (orientation.horizontal) {
        const midCol = (cell.col + neighbor.col) / 2;
        midCell = newGrid[cell.row][midCol];
      }

      midCell.visited = true;
      passageCellsInOrder.push(midCell);

      neighbor.visited = true;
      passageCellsInOrder.push(neighbor);

      makeMaze(neighbor);
    }
  };

  makeMaze(startCell);

  return passageCellsInOrder;
};

const getOrientation = (cell1, cell2) => {
  if (cell1.col === cell2.col) {
    return getVerticalOrientation();
  }
  if (cell1.row === cell2.row) {
    return getHorizontalOrientation();
  }

  console.log("[ERROR] no orientation possible");
};

export default recursiveBacktracking;
