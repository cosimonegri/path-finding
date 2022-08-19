import { createSlice } from "@reduxjs/toolkit";

const getDevice = () => {
  return !!navigator.maxTouchPoints ? true : false;
};

const getOrientation = () => {
  return !navigator.maxTouchPoints
    ? "desktop"
    : !window.screen.orientation.angle
    ? "portrait"
    : "landscape";
};

const initialState = () => {
  return {
    isMobile: getDevice(),
    orientation: getOrientation(),
  };
};

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    updateDevice: (state) => {
      state.device = getDevice();
      state.orientation = getOrientation();
    },
  },
});

export const { updateDevice } = deviceSlice.actions;

export default deviceSlice.reducer;
