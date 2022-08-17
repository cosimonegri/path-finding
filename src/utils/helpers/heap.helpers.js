import { swap } from "utils/helpers/helpers";

// Functions to handle a MIN heap

// The compare function returns:
//   -1 if the first element is smaller than the second
//   1 if the first element is bigger than the second
//   -1 or 1 if the elements are equal, on the basis of their position in the grid

// function not used in any file
export const heapify = (array, compareFunction) => {
  for (let i = array.length - 1; i >= 0; i--) {
    bubbleDown(array, i, compareFunction);
  }
};

export const enqueue = (array, element, compareFunction) => {
  array.push(element);
  bubbleUp(array, array.length - 1, compareFunction);
};

export const dequeue = (array, compareFunction) => {
  if (array.length === 0) {
    return null;
  }

  swap(array, 0, array.length - 1);
  const element = array.pop();
  bubbleDown(array, 0, compareFunction);

  return element;
};

const bubbleUp = (array, index, compareFunction) => {
  const parent = getParent(index);
  if (parent === null) {
    return;
  }

  if (compareFunction(array[index], array[parent]) === -1) {
    swap(array, index, parent);
    bubbleUp(array, parent, compareFunction);
  }
};

const bubbleDown = (array, index, compareFunction) => {
  const smallerChild = getSmallerChild(array, index, compareFunction);
  if (smallerChild === null) {
    return;
  }

  if (compareFunction(array[index], array[smallerChild]) === 1) {
    swap(array, index, smallerChild);
    bubbleDown(array, smallerChild, compareFunction);
  }
};

const getParent = (index) => {
  if (index === 0) {
    return null;
  }
  return Math.floor((index - 1) / 2);
};

const getFirstChild = (index, size) => {
  const child = index * 2 + 1;
  if (child >= size) {
    return null;
  }
  return child;
};

const getSecondChild = (index, size) => {
  const child = index * 2 + 2;
  if (child >= size) {
    return null;
  }
  return child;
};

const getSmallerChild = (array, index, compareFunction) => {
  const child1 = getFirstChild(index, array.length);
  const child2 = getSecondChild(index, array.length);

  if (child1 === null && child2 === null) {
    return null;
  } else if (child1 === null) {
    return child2;
  } else if (child2 === null) {
    return child1;
  } else {
    return compareFunction(array[child1], array[child2]) === -1
      ? child1
      : child2;
  }
};
