import { WEIGHT } from "utils/constants/constants";
import { isOnlyWeight } from "utils/helpers/cell.helpers";

export const getEdgeWeight = (cell, startCoords, endCoords) => {
  let edgeWeight = 1;

  if (isOnlyWeight(cell, startCoords, endCoords)) {
    edgeWeight += WEIGHT;
  }
  return edgeWeight;
};

// The cells of the grid must have 'parent' prop
export const getPath = (grid, endRow, endCol) => {
  const path = [];
  let cell = grid[endRow][endCol];

  if (!cell.parent) {
    return [];
  }
  while (cell) {
    path.push(cell);
    cell = cell.parent;
  }
  return path.reverse();
};

// The cells of the grid must have 'parent' and 'parentFromEnd' prop
export const getPathFromBidirectional = (grid, midCell) => {
  if (!midCell) {
    return [];
  }

  const pathStartMid = getPath(grid, midCell.row, midCell.col);
  const pathMidEnd = [];
  let cell = midCell.parentFromEnd;

  while (cell) {
    pathMidEnd.push(cell);
    cell = cell.parentFromEnd;
  }
  return [...pathStartMid, ...pathMidEnd];
};

export const getPathLength = (path, startCoords, endCoords) => {
  let length = 0;

  if (path.length === 0) {
    return 0;
  }
  for (let cell of path) {
    if (isOnlyWeight(cell, startCoords, endCoords)) {
      length += WEIGHT;
    } else {
      length += 1;
    }
  }
  return length - 1; // you are already on the start cell
};
