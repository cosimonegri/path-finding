import { createSlice } from "@reduxjs/toolkit";

const getInitialIsHandling = () => {
  return {
    start: false,
    end: false,
    wall: false,
    weight: false,
    clear: false,
  };
};

const initialState = {
  algorithmId: null,
  instrumentId: 1,
  blockClick: false,
  isHandling: getInitialIsHandling(),
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
    makeHandling: (state, action) => {
      state.isHandling[action.payload] = true;
    },
    resetIsHandling: (state, action) => {
      for (let instrument of action.payload) {
        state.isHandling[instrument] = false;
      }
    },
  },
});

export const {
  setAlgorithmId,
  setInstrumentId,
  setBlockClick,
  makeHandling,
  resetIsHandling,
} = interactionsSlice.actions;

export default interactionsSlice.reducer;
