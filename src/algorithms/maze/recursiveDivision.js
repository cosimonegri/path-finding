import { getGridForMaze } from "utils/helpers/grid.helpers";
import {
  getVerticalOrientation,
  getHorizontalOrientation,
} from "utils/helpers/maze.helpers";
import {
  getEvenRandomNumBetween,
  getOddRandomNumBetween,
} from "utils/helpers/random.helpers";

const recursiveDivision = (grid) => {
  const [startRow, startCol] = [0, 0];
  const [endRow, endCol] = [grid.length - 1, grid[0].length - 1];

  const newGrid = getGridForMaze(grid);
  const wallCellsInOrder = [];

  const makeMaze = (minRow, maxRow, minCol, maxCol) => {
    const orientation = getOrientation(minRow, maxRow, minCol, maxCol);

    if (orientation.vertical) {
      if (maxCol - minCol <= 1) return;

      const divisionCol = getOddRandomNumBetween(minCol, maxCol);
      if (maxRow >= minRow) {
        const passageRow = getEvenRandomNumBetween(minRow, maxRow);
        newGrid[passageRow][divisionCol].isPassage = true;
      }

      for (let row = minRow; row <= maxRow; row++) {
        const cell = newGrid[row][divisionCol];

        if (!cell.isPassage) {
          wallCellsInOrder.push(cell);
        }
      }

      makeMaze(minRow, maxRow, minCol, divisionCol - 1);
      makeMaze(minRow, maxRow, divisionCol + 1, maxCol);
    }

    if (orientation.horizontal) {
      if (maxRow - minRow <= 1) return;

      const divisionRow = getOddRandomNumBetween(minRow, maxRow);
      if (maxCol >= minCol) {
        const passageCol = getEvenRandomNumBetween(minCol, maxCol);
        newGrid[divisionRow][passageCol].isPassage = true;
      }

      for (let col = minCol; col <= maxCol; col++) {
        const cell = newGrid[divisionRow][col];

        if (!cell.isPassage) {
          wallCellsInOrder.push(cell);
        }
      }

      makeMaze(minRow, divisionRow - 1, minCol, maxCol);
      makeMaze(divisionRow + 1, maxRow, minCol, maxCol);
    }
  };

  makeMaze(startRow, endRow, startCol, endCol);

  return wallCellsInOrder;
};

const getOrientation = (minRow, maxRow, minCol, maxCol) => {
  const rowsNum = maxRow - minRow + 1;
  const colsNum = maxCol - minCol + 1;

  if (colsNum > rowsNum) {
    return getVerticalOrientation();
  }
  if (rowsNum > colsNum) {
    return getHorizontalOrientation();
  }

  if (Math.random() > 0.5) {
    return getVerticalOrientation();
  } else {
    return getHorizontalOrientation();
  }
};

export default recursiveDivision;
