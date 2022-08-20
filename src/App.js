import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "components/Header/Header";
import Grid from "components/Grid/Grid";

import useWindowDimensions from "hooks/useWindowDimensions";

import { updateDevice } from "redux/device.slice";
import { changeGridDimensions, setIsGridExplored } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import dijkstra from "algorithms/path/dijkstra";
import aStar from "algorithms/path/aStar";
import greedyBestFirst from "algorithms/path/greedyBestFirst";
import bfs from "algorithms/path/bfs";
import dfs from "algorithms/path/dfs";
import bidirectional from "algorithms/path/bidirectional";

import { getRowsNum, getColsNum } from "utils/helpers/grid.helpers";
import {
  clearExplorationVisually,
  clearAllTimeouts,
} from "utils/helpers/helpers";

// alert quando non si possono usare algorithmi

// su schermi piccoli le celle sono più piccole
// aggiungere link al profilo github

// poter smuovere inizio e fine su smartphone

// migliorare transizione quando le dimensioni della grid cambiano
// migliorare codice e css per scegliere il numero di righe e colonne

// fare schede tutorial / aggiugnere informazioni
// far cominciare gli algoritmi maze dalla cella iniziale e non da quella in alto a sinistra ????

// a-star: usare priority queue
// migliori funzioni per ottenere numero pari e dispari

const App = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions(); // they are automatically updated when the window is resized
  const activeTimeouts = useRef([]);

  const isMobile = useSelector((state) => state.device.isMobile);
  const orientation = useSelector((state) => state.device.orientation);
  const grid = useSelector((state) => state.grid.grid);
  const rowsNum = useSelector((state) => state.grid.rowsNum);
  const colsNum = useSelector((state) => state.grid.colsNum);
  const algorithmId = useSelector((state) => state.interactions.algorithmId);

  const getExplorationData = (startCoords, endCoords) => {
    let visitedCellsInOrder;
    let path;

    if (algorithmId === 1) {
      [visitedCellsInOrder, path] = dijkstra(grid, startCoords, endCoords);
    } else if (algorithmId === 2) {
      [visitedCellsInOrder, path] = aStar(grid, startCoords, endCoords);
    } else if (algorithmId === 3) {
      [visitedCellsInOrder, path] = greedyBestFirst(
        grid,
        startCoords,
        endCoords
      );
    } else if (algorithmId === 4) {
      [visitedCellsInOrder, path] = bfs(grid, startCoords, endCoords);
    } else if (algorithmId === 5) {
      [visitedCellsInOrder, path] = dfs(grid, startCoords, endCoords);
    } else if (algorithmId === 6) {
      [visitedCellsInOrder, path] = bidirectional(grid, startCoords, endCoords);
    }

    return [visitedCellsInOrder, path];
  };

  const handleResizeGrid = () => {
    const newRowsNum = getRowsNum(height);
    const newColsNum = getColsNum(width);

    if (newRowsNum !== rowsNum || newColsNum !== colsNum) {
      clearAllTimeouts(activeTimeouts.current);
      clearExplorationVisually(grid);
      dispatch(
        changeGridDimensions({ rowsNum: newRowsNum, colsNum: newColsNum })
      );

      dispatch(setIsGridExplored(false));
      dispatch(setBlockClick(false));
    }
  };

  const handleUpdateDevice = () => {
    setTimeout(() => dispatch(updateDevice()), 10);
  };

  useEffect(
    () => {
      handleResizeGrid();
    },
    isMobile ? [isMobile, orientation] : [width, height]
  );

  useEffect(() => {
    handleUpdateDevice();
  }, [width, height]);

  return (
    <>
      <Header
        getExplorationData={getExplorationData}
        activeTimeouts={activeTimeouts}
      />
      <Grid getExplorationData={getExplorationData} />
    </>
  );
};

export default App;
