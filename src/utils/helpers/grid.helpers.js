import {
  createCell,
  getExplorationCell,
  getCellForMaze,
} from "utils/helpers/cell.helpers";

export const createInitialGrid = (rowsNum, colsNum) => {
  const grid = [];
  for (let row = 0; row < rowsNum; row++) {
    const currentRow = [];
    for (let col = 0; col < colsNum; col++) {
      currentRow.push(createCell(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getExplorationGrid = (grid, endRow, endCol) => {
  const newGrid = [];
  for (let row of grid) {
    const currentRow = [];
    for (let cell of row) {
      currentRow.push(getExplorationCell(cell, endRow, endCol));
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

export const getGridForMaze = (grid) => {
  const newGrid = [];
  for (let row of grid) {
    const currentRow = [];
    for (let cell of row) {
      currentRow.push(getCellForMaze(cell));
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};

export const getCellsList = (grid) => {
  const cellsArray = [];
  for (let row of grid) {
    for (let cell of row) {
      cellsArray.push(cell);
    }
  }
  return cellsArray;
};

export const hasWeights = (grid) => {
  for (let row of grid) {
    for (let cell of row) {
      if (cell.isWeight) return true;
    }
  }
  return false;
};

export const getColsNum = (screenWidth) => {
  if (screenWidth < 160) {
    return 3;
  } else if (screenWidth < 212) {
    return 5;
  } else if (screenWidth < 264) {
    return 7;
  } else if (screenWidth < 316) {
    return 9;
  } else if (screenWidth < 368) {
    return 11;
  } else if (screenWidth < 420) {
    return 13;
  } else if (screenWidth < 472) {
    return 15;
  } else if (screenWidth < 524) {
    return 17;
  } else if (screenWidth < 576) {
    return 19;
  } else if (screenWidth < 628) {
    return 21;
  } else if (screenWidth < 680) {
    return 23;
  } else if (screenWidth < 732) {
    return 25;
  } else if (screenWidth < 784) {
    return 27;
  } else if (screenWidth < 836) {
    return 29;
  } else if (screenWidth < 888) {
    return 31;
  } else if (screenWidth < 940) {
    return 33;
  } else if (screenWidth < 992) {
    return 35;
  } else if (screenWidth < 1044) {
    return 37;
  } else if (screenWidth < 1096) {
    return 39;
  } else if (screenWidth < 1148) {
    return 41;
  } else if (screenWidth < 1200) {
    return 43;
  } else if (screenWidth < 1252) {
    return 45;
  } else if (screenWidth < 1304) {
    return 47;
  } else if (screenWidth < 1356) {
    return 49;
  } else if (screenWidth < 1408) {
    return 51;
  } else if (screenWidth < 1460) {
    return 53;
  } else {
    return 55;
  }
};

export const getRowsNum = (heightWidth) => {
  if (heightWidth < 220) {
    return 3;
  } else if (heightWidth < 272) {
    return 5;
  } else if (heightWidth < 324) {
    return 7;
  } else if (heightWidth < 376) {
    return 9;
  } else if (heightWidth < 428) {
    return 11;
  } else if (heightWidth < 480) {
    return 13;
  } else if (heightWidth < 532) {
    return 15;
  } else if (heightWidth < 584) {
    return 17;
  } else if (heightWidth < 636) {
    return 19;
  } else if (heightWidth < 688) {
    return 21;
  } else if (heightWidth < 740) {
    return 23;
  } else {
    return 25;
  }
};
