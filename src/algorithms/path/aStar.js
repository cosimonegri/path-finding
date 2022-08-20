import { WEIGHT } from "utils/constants/constants";

import {
  isEnd,
  getCoords,
  compareCoords,
  getValidNeighbors,
  isOnlyWall,
  isOnlyWeight,
} from "utils/helpers/cell.helpers";
import { getExplorationGrid, getCellsList } from "utils/helpers/grid.helpers";
import { getPath } from "utils/helpers/helpers";

const aStar = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const cellsToExplore = getCellsList(newGrid);
  const visitedCellsInOrder = [];

  const startCell = newGrid[startRow][startCol];
  startCell.distance = 0;

  while (cellsToExplore.length > 0) {
    sortCellsByDistanceAndHeuristic(cellsToExplore);
    const cell = cellsToExplore.pop();

    if (isEnd(cell, endCoords)) {
      break;
    }
    visitedCellsInOrder.push(cell);

    const neighbors = getValidNeighbors(cell, newGrid);
    for (let neighbor of neighbors) {
      if (isOnlyWall(neighbor, startCoords, endCoords)) continue;

      const isEdgeWeighted =
        isOnlyWeight(cell, startCoords, endCoords) ||
        isOnlyWeight(neighbor, startCoords, endCoords);

      const newDistance = isEdgeWeighted
        ? cell.distance + WEIGHT
        : cell.distance + 1;

      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.parent = cell;
      }
    }
  }

  const path = getPath(newGrid, endRow, endCol);
  return [visitedCellsInOrder, path];
};

// The cells of the array must have DISTANCE and HEURISTIC props
const sortCellsByDistanceAndHeuristic = (cellsArray) => {
  cellsArray.sort((cell1, cell2) => {
    if (cell1.distance + cell1.heuristic < cell2.distance + cell2.heuristic) {
      return 1;
    } else if (
      cell1.distance + cell1.heuristic >
      cell2.distance + cell2.heuristic
    ) {
      return -1;
    } else if (cell1.heuristic < cell2.heuristic) {
      return 1;
    } else if (cell1.heuristic > cell2.heuristic) {
      return -1;
    } else {
      return compareCoords(cell1, cell2); //! pensare se levare questa riga
    }
  });
};

export default aStar;
