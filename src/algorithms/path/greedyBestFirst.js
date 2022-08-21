import { enqueue, dequeue } from "utils/helpers/heap.helpers";
import {
  isEnd,
  getCoords,
  compareCoords,
  getValidNeighbors,
  isOnlyWall,
} from "utils/helpers/cell.helpers";
import { getExplorationGrid } from "utils/helpers/grid.helpers";
import { getEdgeWeight, getPath } from "utils/helpers/path.helpers";

const greedyBestFirst = (grid, startCoords, endCoords) => {
  const [startRow, startCol] = getCoords(startCoords);
  const [endRow, endCol] = getCoords(endCoords);

  const newGrid = getExplorationGrid(grid, endRow, endCol);
  const cellsToExplore = [];
  const visitedCellsInOrder = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  enqueue(cellsToExplore, startCell, compareHeuristic);

  while (cellsToExplore.length > 0) {
    const cell = dequeue(cellsToExplore, compareHeuristic);
    visitedCellsInOrder.push(cell);

    if (isEnd(cell, endCoords)) {
      break;
    }

    const neighbors = getValidNeighbors(cell, newGrid);
    for (let neighbor of neighbors) {
      if (neighbor.visited || isOnlyWall(neighbor, startCoords, endCoords))
        continue;

      const edgeWeight = getEdgeWeight(neighbor, startCoords, endCoords);
      const newHeuristic = cell.heuristic + edgeWeight - 1;
      //! -1 because by default it was considered a NO weight cell

      if (newHeuristic > cell.heuristic) {
        neighbor.heuristic = newHeuristic;
      }

      neighbor.parent = cell;
      neighbor.visited = true;
      enqueue(cellsToExplore, neighbor, compareHeuristic);
    }
  }

  const path = getPath(newGrid, endRow, endCol);
  return [visitedCellsInOrder, path];
};

// The cells of the array must have HEURISTIC prop
const compareHeuristic = (cell1, cell2) => {
  if (cell1.heuristic < cell2.heuristic) {
    return -1;
  } else if (cell1.heuristic > cell2.heuristic) {
    return 1;
  } else {
    return compareCoords(cell1, cell2);
  }
};

export default greedyBestFirst;
