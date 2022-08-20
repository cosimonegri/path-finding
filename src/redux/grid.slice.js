import { createSlice } from "@reduxjs/toolkit";

import { createInitialGrid } from "utils/helpers/grid.helpers";
import { makeEven, getCoordsObject } from "utils/helpers/helpers";

const initialState = {
  grid: [],
  rowsNum: 0,
  colsNum: 0,
  startCoords: null,
  endCoords: null,
  isExplored: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    moveStart: (state, action) => {
      const { row, col } = action.payload;
      state.startCoords = getCoordsObject(row, col);
    },
    moveEnd: (state, action) => {
      const { row, col } = action.payload;
      state.endCoords = getCoordsObject(row, col);
    },
    makeWall: (state, action) => {
      const { row, col } = action.payload;
      state.grid[row][col].isWall = true;
      state.grid[row][col].isWeight = false;
    },
    makeWeight: (state, action) => {
      const { row, col } = action.payload;
      state.grid[row][col].isWall = false;
      state.grid[row][col].isWeight = true;
    },
    clearCell: (state, action) => {
      const { row, col } = action.payload;
      state.grid[row][col].isWall = false;
      state.grid[row][col].isWeight = false;
    },
    clearGridWallsAndWeights: (state) => {
      for (let row of state.grid) {
        for (let cell of row) {
          cell.isWall = false;
          cell.isWeight = false;
        }
      }
    },
    coverGridWithWalls: (state) => {
      for (let row of state.grid) {
        for (let cell of row) {
          cell.isWall = true;
          cell.isWeight = false;
        }
      }
    },
    changeGridDimensions: (state, action) => {
      const { rowsNum, colsNum } = action.payload;
      const row = makeEven(Math.floor(rowsNum / 2));
      const startCol = makeEven(Math.floor(colsNum / 4));
      const endCol = colsNum - startCol - 1;
      state.rowsNum = rowsNum;
      state.colsNum = colsNum;
      state.grid = createInitialGrid(rowsNum, colsNum);
      state.startCoords = getCoordsObject(row, startCol);
      state.endCoords = getCoordsObject(row, endCol);
    },
    setIsGridExplored: (state, action) => {
      state.isExplored = action.payload;
    },
  },
});

export const {
  moveStart,
  moveEnd,
  makeWall,
  makeWeight,
  clearCell,
  clearGridWallsAndWeights,
  coverGridWithWalls,
  changeGridDimensions,
  setIsGridExplored,
} = gridSlice.actions;

export default gridSlice.reducer;
