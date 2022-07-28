import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  algorithmId: null,
  instrumentId: 1,
  blockClick: false,
  isMovingStart: false,
  isMovingEnd: false,
  isCreatingWall: false,
  isCreatingWeight: false,
  isClearing: false,
};

export const interactionsSlice = createSlice({
  name: "interactions",
  initialState,
  reducers: {
    setAlgorithmId: (state, action) => {
      state.algorithmId = action.payload;
    },
    setInstrumentId: (state, action) => {
      state.instrumentId = action.payload;
    },
    setBlockClick: (state, action) => {
      state.blockClick = action.payload;
    },
    setIsMovingStart: (state, action) => {
      state.isMovingStart = action.payload;
    },
    setIsMovingEnd: (state, action) => {
      state.isMovingEnd = action.payload;
    },
    setIsCreatingWall: (state, action) => {
      state.isCreatingWall = action.payload;
    },
    setIsCreatingWeight: (state, action) => {
      state.isCreatingWeight = action.payload;
    },
    setIsClearing: (state, action) => {
      state.isClearing = action.payload;
    },
  },
});

export const {
  setAlgorithmId,
  setInstrumentId,
  setBlockClick,
  setIsMovingStart,
  setIsMovingEnd,
  setIsCreatingWall,
  setIsCreatingWeight,
  setIsClearing,
} = interactionsSlice.actions;

export default interactionsSlice.reducer;
