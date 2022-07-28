import { createSlice } from "@reduxjs/toolkit";

export const algorithmSlice = createSlice({
  name: "algorithm",
  initialState: {
    id: null,
    visitedCells: [], // in order
    // parentsCells: null,
  },
  reducers: {
    setAlgorithmId: (state, action) => {
      state.id = action.payload;
    },
    setVisitedCells: (state, action) => {
      state.visitedCells = action.payload;
    },
    // setParentsCells: (state, action) => {
    //   state.parentsCells = action.payload;
    // },
  },
});

export const { setAlgorithmId, setVisitedCells } = algorithmSlice.actions;

export default algorithmSlice.reducer;
