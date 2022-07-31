import {
  getCoords,
  getValidNeighbors,
  isOnlyWall,
} from "utils/helpers/cell.helpers";

import { getExplorationGrid } from "utils/helpers/grid.helpers";
import { getPathFromBidirectional } from "utils/helpers/helpers";

const bidireactional = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const visitedCellsInOrder = [];
  const cellsToExplore1 = [];
  const cellsToExplore2 = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  cellsToExplore1.push(startCell);
  visitedCellsInOrder.push(startCell);

  const endCell = newGrid[endRow][endCol];
  endCell.visitedFromEnd = true;
  cellsToExplore2.push(endCell);
  visitedCellsInOrder.push(endCell);

  let midCell = null;

  while (cellsToExplore1.length > 0 && cellsToExplore2.length > 0) {
    const cell1 = cellsToExplore1.shift();
    const cell2 = cellsToExplore2.shift();

    if (cell1.visited && cell1.visitedFromEnd) {
      midCell = cell1;
      break;
    }
    if (cell2.visited && cell2.visitedFromEnd) {
      midCell = cell2;
      break;
    }

    const neighbors1 = getValidNeighbors(cell1, newGrid);
    for (let neighbor of neighbors1) {
      if (neighbor.visited || isOnlyWall(neighbor, startCoords, endCoords))
        continue;

      neighbor.parent = cell1;
      neighbor.visited = true;
      cellsToExplore1.push(neighbor);
      visitedCellsInOrder.push(neighbor);
    }

    const neighbors2 = getValidNeighbors(cell2, newGrid);
    for (let neighbor of neighbors2) {
      if (
        neighbor.visitedFromEnd ||
        isOnlyWall(neighbor, startCoords, endCoords)
      )
        continue;

      neighbor.parentFromEnd = cell2;
      neighbor.visitedFromEnd = true;
      cellsToExplore2.push(neighbor);
      visitedCellsInOrder.push(neighbor);
    }
  }

  const path = midCell
    ? getPathFromBidirectional(newGrid, midCell.row, midCell.col)
    : [];

  return [visitedCellsInOrder, path];
};

export default bidireactional;
