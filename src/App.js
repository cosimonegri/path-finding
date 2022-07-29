import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import Header from "components/Header/Header";
import Grid from "components/Grid/Grid";

import useWindowDimensions from "hooks/useWindowDimensions";

import { changeGridDimensions, setIsGridExplored } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import dijkstra from "algorithms/path/dijkstra";
import aStar from "algorithms/path/aStar";
import bfs from "algorithms/path/bfs";
import dfs from "algorithms/path/dfs";

import { getRowsNum, getColsNum } from "utils/helpers/grid.helpers";

import { clearCellVisually } from "utils/helpers/cell.helpers";

// poter smuovere inizio e fine su smartphone
// levare scritta bellman ford o aggiungere algoritmo
// a volte start e end sono sulla riga sbagliata per fare i maze

// milgiorare codice per scegliere il numero di righe e colonne
// migliorare transizione quando le dimensioni della grid cambiano

// si puo diegnare mura anche quando griglia esplorata ???
// far cominciare gli algoritmi maze dalla cella iniziale e non da quella in alto a sinistra ????

// dijkstra e a-star: usare priority queue
// dijkstra e a-star: unvisitedCells comincia vuota e si riempie via via
// migliori funzioni per ottenere numero pari e dispari

const App = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions(); // they get updated even when the window is resized
  const activeTimeouts = useRef([]);

  const grid = useSelector((state) => state.grid.grid);
  const rowsNum = useSelector((state) => state.grid.rowsNum);
  const colsNum = useSelector((state) => state.grid.colsNum);
  const algorithmId = useSelector((state) => state.interactions.algorithmId);

  const clearExplorationGraphic = () => {
    for (let row of grid) {
      for (let cell of row) {
        clearCellVisually(cell);
      }
    }
  };

  const getExplorationData = (startCoords, endCoords) => {
    let visitedCellsInOrder;
    let path;

    switch (algorithmId) {
      case 1:
        [visitedCellsInOrder, path] = dijkstra(grid, startCoords, endCoords);
        break;
      case 2:
        [visitedCellsInOrder, path] = aStar(grid, startCoords, endCoords);
        break;
      case 3:
        [visitedCellsInOrder, path] = bfs(grid, startCoords, endCoords);
        break;
      case 4:
        [visitedCellsInOrder, path] = dfs(grid, startCoords, endCoords);
        break;
    }

    return [visitedCellsInOrder, path];
  };

  const handleScreenResize = () => {
    const newRowsNum = getRowsNum(height);
    const newColsNum = getColsNum(width);

    if (newRowsNum !== rowsNum || newColsNum !== colsNum) {
      while (activeTimeouts.current.length > 0) {
        const timeout = activeTimeouts.current.pop();
        clearTimeout(timeout);
      }

      clearExplorationGraphic();
      dispatch(setIsGridExplored(false));

      dispatch(
        changeGridDimensions({ rowsNum: newRowsNum, colsNum: newColsNum })
      );
      dispatch(setBlockClick(false));
    }
  };

  useEffect(
    () => {
      handleScreenResize();
    },
    isMobile ? [] : [width, height]
  );

  return (
    <>
      <Header
        clearExplorationGraphic={clearExplorationGraphic}
        getExplorationData={getExplorationData}
        activeTimeouts={activeTimeouts}
      />
      <Grid
        clearExplorationGraphic={clearExplorationGraphic}
        getExplorationData={getExplorationData}
      />
    </>
  );
};

export default App;
