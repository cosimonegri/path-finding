import { WEIGHT } from "utils/constants/constants";

import {
  isEnd,
  getCoords,
  compareCoords,
  getValidNeighbors,
  isOnlyWall,
  isOnlyWeight,
} from "utils/helpers/cell.helpers";
import { getExplorationGrid } from "utils/helpers/grid.helpers";
import { getPath } from "utils/helpers/helpers";

const greedyBestFirst = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const cellsToExplore = [];
  const visitedCellsInOrder = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  cellsToExplore.push(startCell);

  while (cellsToExplore.length > 0) {
    sortCellsByHeuristic(cellsToExplore);
    const cell = cellsToExplore.pop();
    visitedCellsInOrder.push(cell);

    if (isEnd(cell, endCoords)) {
      break;
    }

    const neighbors = getValidNeighbors(cell, newGrid);
    for (let neighbor of neighbors) {
      if (neighbor.visited || isOnlyWall(neighbor, startCoords, endCoords))
        continue;

      const isEdgeWeighted =
        isOnlyWeight(cell, startCoords, endCoords) ||
        isOnlyWeight(neighbor, startCoords, endCoords);

      const newHeuristic = isEdgeWeighted
        ? cell.heuristic + WEIGHT
        : cell.heuristic;

      if (newHeuristic > cell.heuristic) {
        neighbor.heuristic = newHeuristic;
      }

      neighbor.parent = cell;
      neighbor.visited = true;
      cellsToExplore.push(neighbor);
    }
  }

  const path = getPath(newGrid, endRow, endCol);

  return [visitedCellsInOrder, path];
};

// The cells of the array must have HEURISTIC prop
const sortCellsByHeuristic = (cellsArray) => {
  cellsArray.sort((cell1, cell2) => {
    if (cell1.heuristic < cell2.heuristic) {
      return 1;
    } else if (cell1.heuristic > cell2.heuristic) {
      return -1;
    } else {
      return compareCoords(cell1, cell2);
    }
  });
};

export default greedyBestFirst;
