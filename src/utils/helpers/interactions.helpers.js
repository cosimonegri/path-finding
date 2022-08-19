export const isClickLeft = (event) => {
  return event.button === 0;
};

export const isTouchMultiple = (event) => {
  return event.touches.length > 1;
};
