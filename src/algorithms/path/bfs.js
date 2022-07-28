import {
  getCoords,
  getValidNeighbors,
  isOnlyWall,
} from "utils/helpers/cell.helpers";

import { isEnd } from "utils/helpers/cell.helpers";
import { getExplorationGrid } from "utils/helpers/grid.helpers";
import { getPath } from "utils/helpers/helpers";

const bfs = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const visitedCellsInOrder = [];
  const cellsToExplore = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  visitedCellsInOrder.push(startCell);
  cellsToExplore.push(startCell);

  let breakLoop = false;

  while (cellsToExplore.length > 0 && !breakLoop) {
    const cell = cellsToExplore.shift();

    const neighbors = getValidNeighbors(cell, newGrid);
    for (let neighbor of neighbors) {
      if (isOnlyWall(neighbor, startCoords, endCoords) || neighbor.visited)
        continue;

      neighbor.visited = true;
      neighbor.parent = cell;

      visitedCellsInOrder.push(neighbor);
      cellsToExplore.push(neighbor);

      if (isEnd(neighbor, endCoords)) {
        breakLoop = true;
        break;
      }
    }
  }

  const path = getPath(newGrid, endRow, endCol);

  return [visitedCellsInOrder, path];
};

export default bfs;
