import { clearCellVisually } from "utils/helpers/cell.helpers";

export const swap = (array, idx1, idx2) => {
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
};

export const makeEven = (num) => {
  if (num % 2 === 0) return num;
  return num - 1;
};

export const getDistance = (row1, col1, row2, col2) => {
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};

export const getCoordsObject = (row, col) => {
  return {
    row: row,
    col: col,
  };
};

export const clearAllTimeouts = (timeoutsArray) => {
  while (timeoutsArray.length > 0) {
    clearTimeout(timeoutsArray.pop());
  }
};

export const clearExplorationVisually = (grid) => {
  for (let row of grid) {
    for (let cell of row) {
      clearCellVisually(cell);
    }
  }
};

export const getToastStyle = (toastId, activeTime, delay = 0) => {
  return {
    toastId: toastId,
    autoClose: activeTime,
    delay: delay,
    position: "bottom-right",
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
  };
};
