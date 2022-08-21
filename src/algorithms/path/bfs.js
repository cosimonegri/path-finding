import {
  isEnd,
  getCoords,
  getValidNeighbors,
  isOnlyWall,
} from "utils/helpers/cell.helpers";
import { getExplorationGrid } from "utils/helpers/grid.helpers";
import { getPath } from "utils/helpers/path.helpers";

const bfs = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const visitedCellsInOrder = [];
  const cellsToExplore = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  cellsToExplore.push(startCell);

  while (cellsToExplore.length > 0) {
    const cell = cellsToExplore.shift();
    visitedCellsInOrder.push(cell);

    if (isEnd(cell, endCoords)) break;

    const neighbors = getValidNeighbors(cell, newGrid);
    for (let neighbor of neighbors) {
      if (neighbor.visited || isOnlyWall(neighbor, startCoords, endCoords))
        continue;

      neighbor.parent = cell;
      neighbor.visited = true;
      cellsToExplore.push(neighbor);
    }
  }

  const path = getPath(newGrid, endRow, endCol);

  return [visitedCellsInOrder, path];
};

export default bfs;
