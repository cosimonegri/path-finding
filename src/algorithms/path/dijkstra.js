import { WEIGHT } from "utils/constants/constants";
import { enqueue, dequeue } from "utils/helpers/heap.helpers";
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

const dijkstra = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const cellsToExplore = [];
  const visitedCellsInOrder = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  startCell.distance = 0;
  enqueue(cellsToExplore, startCell, compareDistance);

  while (cellsToExplore.length > 0) {
    const cell = dequeue(cellsToExplore, compareDistance);
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

      const newDistance = isEdgeWeighted
        ? cell.distance + WEIGHT
        : cell.distance + 1;

      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.parent = cell;
      }

      neighbor.visited = true;
      enqueue(cellsToExplore, neighbor, compareDistance);
    }
  }

  const path = getPath(newGrid, endRow, endCol);
  return [visitedCellsInOrder, path];
};

// The cells of the array must have DISTANCE prop
const compareDistance = (cell1, cell2) => {
  if (cell1.distance < cell2.distance) {
    return -1;
  } else if (cell1.distance > cell2.distance) {
    return 1;
  } else {
    return compareCoords(cell1, cell2);
  }
};

export default dijkstra;
