export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const getRandomNumBetween = (min, max) => {
  const range = max - min + 1;
  return Math.floor(Math.random() * range + min);
};

//! make a better function
export const getEvenRandomNumBetween = (min, max) => {
  let evenNum = getRandomNumBetween(min, max);
  while (evenNum % 2 !== 0) {
    evenNum = getRandomNumBetween(min, max);
  }
  return evenNum;
};

//! make a better function
export const getOddRandomNumBetween = (min, max) => {
  let oddNum = getRandomNumBetween(min, max);
  while (oddNum % 2 !== 1) {
    oddNum = getRandomNumBetween(min, max);
  }
  return oddNum;
};
