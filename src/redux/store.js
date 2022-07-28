import { configureStore } from "@reduxjs/toolkit";

import gridReducer from "redux/grid.slice";
import algorithmReducer from "redux/algorithm.slice";
import interactionsReducer from "redux/interactions.slice";

export default configureStore({
  reducer: {
    grid: gridReducer,
    algorithm: algorithmReducer,
    interactions: interactionsReducer,
  },
});
