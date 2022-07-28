import {
  getCoords,
  getValidNeighbors,
  isOnlyWall,
} from "utils/helpers/cell.helpers";

import { isEnd } from "utils/helpers/cell.helpers";
import { getExplorationGrid } from "utils/helpers/grid.helpers";
import { getPath } from "utils/helpers/helpers";

const dfs = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const visitedCellsInOrder = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  visitedCellsInOrder.push(startCell);

  let breakSearch = false;

  const search = (cell) => {
    const neighbors = getValidNeighbors(cell, newGrid);

    for (let neighbor of neighbors) {
      if (breakSearch) return;

      if (isOnlyWall(neighbor, startCoords, endCoords) || neighbor.visited)
        continue;

      neighbor.visited = true;
      neighbor.parent = cell;
      visitedCellsInOrder.push(neighbor);

      if (isEnd(neighbor, endCoords)) {
        breakSearch = true;
        return;
      }

      search(neighbor);
    }
  };

  search(startCell);
  const path = getPath(newGrid, endRow, endCol);

  return [visitedCellsInOrder, path];
};

export default dfs;
