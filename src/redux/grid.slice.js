import { createSlice } from "@reduxjs/toolkit";

import { GRID_ROWS_NUM, GRID_COLS_NUM } from "utils/constants/constants";
import {
  START_ROW,
  START_COL,
  END_ROW,
  END_COL,
} from "utils/constants/constants";
import { createInitialGrid } from "utils/helpers/grid.helpers";
import { getCoordsObject } from "utils/helpers/helpers";

const initialState = {
  grid: createInitialGrid(GRID_ROWS_NUM, GRID_COLS_NUM),
  rowsNum: GRID_ROWS_NUM,
  colsNum: GRID_COLS_NUM,
  startCoords: getCoordsObject(START_ROW, START_COL),
  endCoords: getCoordsObject(END_ROW, END_COL),
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
    changeDimensions: (state, action) => {
      const { rowsNum, colsNum } = action.payload;
      state.rowsNum = rowsNum;
      state.colsNum = colsNum;
      state.grid = createInitialGrid(rowsNum, colsNum);

      //! set START and END coords
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
  changeDimensions,
  setIsGridExplored,
} = gridSlice.actions;

export default gridSlice.reducer;
