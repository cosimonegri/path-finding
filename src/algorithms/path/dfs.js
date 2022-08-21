import {
  isEnd,
  getCoords,
  getValidNeighbors,
  isOnlyWall,
} from "utils/helpers/cell.helpers";
import { getExplorationGrid } from "utils/helpers/grid.helpers";
import { getPath } from "utils/helpers/path.helpers";

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
    visitedCellsInOrder.push(cell);

    if (isEnd(cell, endCoords)) {
      breakSearch = true;
      return;
    }

    const neighbors = getValidNeighbors(cell, newGrid);
    for (let neighbor of neighbors) {
      if (breakSearch) return;

      if (isOnlyWall(neighbor, startCoords, endCoords) || neighbor.visited)
        continue;

      neighbor.parent = cell;
      neighbor.visited = true;
      search(neighbor);
    }
  };

  search(startCell);
  const path = getPath(newGrid, endRow, endCol);

  return [visitedCellsInOrder, path];
};

export default dfs;
