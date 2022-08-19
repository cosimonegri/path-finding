import { configureStore } from "@reduxjs/toolkit";

import deviceReducer from "redux/device.slice";
import gridReducer from "redux/grid.slice";
import interactionsReducer from "redux/interactions.slice";

export default configureStore({
  reducer: {
    device: deviceReducer,
    grid: gridReducer,
    interactions: interactionsReducer,
  },
});
