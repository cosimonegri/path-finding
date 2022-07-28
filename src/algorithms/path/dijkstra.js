import { WEIGHT } from "utils/constants/constants";

import {
  isEnd,
  getCoords,
  getValidNeighbors,
  isOnlyWall,
  isOnlyWeight,
} from "utils/helpers/cell.helpers";
import { getExplorationGrid, getAllCells } from "utils/helpers/grid.helpers";
import { getPath } from "utils/helpers/helpers";

const dijkstra = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const visitedCellsInOrder = [];
  const unvisitedCells = getAllCells(newGrid);

  const startCell = newGrid[startRow][startCol];
  startCell.distance = 0;

  while (unvisitedCells.length > 0) {
    sortCellsByDistance(unvisitedCells);
    const cell = unvisitedCells.pop();

    if (cell.distance === Infinity) {
      break;
    }
    if (isEnd(cell, endCoords)) {
      visitedCellsInOrder.push(cell);
      break;
    }

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

    visitedCellsInOrder.push(cell);
  }

  const path = getPath(newGrid, endRow, endCol);

  return [visitedCellsInOrder, path];
};

// The cells of the array must have DISTANCE prop
const sortCellsByDistance = (cellsArray) => {
  cellsArray.sort((cell1, cell2) => (cell1.distance < cell2.distance ? 1 : -1));
};

export default dijkstra;
