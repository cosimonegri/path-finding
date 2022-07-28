import {
  getValidNeighbors,
  getValidUpDownNeighbors,
  getValidLeftRightNeighbors,
} from "utils/helpers/cell.helpers";
import { getGridForMaze } from "utils/helpers/grid.helpers";
import {
  getVerticalOrientation,
  getHorizontalOrientation,
} from "utils/helpers/maze.helpers";
import { shuffleArray } from "utils/helpers/random.helpers";

const prim = (grid) => {
  const [startRow, startCol] = [0, 0];

  const newGrid = getGridForMaze(grid);
  const passageCellsInOrder = [];
  let discoveredWalls = [];

  const startCell = newGrid[startRow][startCol];
  startCell.visited = true;
  passageCellsInOrder.push(startCell);

  const startNeighbors = getValidNeighbors(startCell, newGrid);
  for (let neighbor of startNeighbors) {
    discoveredWalls.push(neighbor);
  }

  while (discoveredWalls.length > 0) {
    discoveredWalls = shuffleArray(discoveredWalls);
    const wall = discoveredWalls.pop();
    const orientation = getOrientation(wall);

    const [firstCell, secondCell] = orientation.vertical
      ? getValidUpDownNeighbors(wall, newGrid)
      : getValidLeftRightNeighbors(wall, newGrid);

    if (firstCell.visited && secondCell.visited) continue;

    if (!firstCell.visited) {
      for (let neighbor of getValidNeighbors(firstCell, newGrid)) {
        discoveredWalls.push(neighbor);
      }
      firstCell.visited = true;
      passageCellsInOrder.push(firstCell);
    }

    wall.visited = true;
    passageCellsInOrder.push(wall);

    if (!secondCell.visited) {
      for (let neighbor of getValidNeighbors(secondCell, newGrid)) {
        discoveredWalls.push(neighbor);
      }
      secondCell.visited = true;
      passageCellsInOrder.push(secondCell);
    }
  }

  return passageCellsInOrder;
};

const getOrientation = (wall) => {
  if (wall.row % 2 === 1 && wall.col % 2 === 0) {
    return getVerticalOrientation();
  }
  if (wall.row % 2 === 0 && wall.col % 2 === 1) {
    return getHorizontalOrientation();
  }

  console.log("[ERROR] no orientation possible");
};

export default prim;
