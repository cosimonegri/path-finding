import {
  isEnd,
  getCoords,
  compareCoords,
  getValidNeighbors,
  isOnlyWall,
} from "utils/helpers/cell.helpers";
import { getExplorationGrid, getCellsList } from "utils/helpers/grid.helpers";
import { getEdgeWeight, getPath } from "utils/helpers/path.helpers";

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

    if (cell.distance === Infinity) {
      break;
    }
    visitedCellsInOrder.push(cell);

    if (isEnd(cell, endCoords)) {
      break;
    }

    const neighbors = getValidNeighbors(cell, newGrid);
    for (let neighbor of neighbors) {
      if (isOnlyWall(neighbor, startCoords, endCoords)) continue;

      const edgeWeight = getEdgeWeight(neighbor, startCoords, endCoords);
      const newDistance = cell.distance + edgeWeight;

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
