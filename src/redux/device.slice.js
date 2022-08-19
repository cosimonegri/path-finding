import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  return {
    device: null,
    orientation: null,
  };
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    changeDevice: (state) => {
      state.device = !!navigator.maxTouchPoints ? "mobile" : "computer";
    },
    changeOrientation: (state) => {
      state.orientation = !navigator.maxTouchPoints
        ? "desktop"
        : !window.screen.orientation.angle
        ? "portrait"
        : "landscape";
    },
  },
});

export const { setDevice, changeOrientation } = deviceSlice.actions;

export default deviceSlice.reducer;
