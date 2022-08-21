import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import TopBar from "components/TopBar";
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
  getToastStyle,
} from "utils/helpers/helpers";

// fare schede tutorial
// refactoring ultimo codice scritto ???

// poter smuovere inizio e fine su smartphone
// migliore topbar su smartphone

// su schermi piccoli le celle sono più piccole
// refactoring codice e css per scegliere il numero di righe e colonne
// migliorare transizione quando le dimensioni della grid cambiano
// la notifica della grid resize potrebbe non funzionare in modo ottimale

// a-star: usare priority queue
// migliori funzioni per ottenere numero pari e dispari

const App = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions(); // they are automatically updated when the window is resized
  const activeTimeouts = useRef([]);
  const initialRender = useRef(true);

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

  const handleUpdateDevice = () => {
    setTimeout(() => dispatch(updateDevice()), 10);
  };

  useEffect(() => {
    handleUpdateDevice();
  }, [width, height]);

  const notifyResizeGrid = () => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const text = "The grid has been resized";
    const toastId = "resizeGrid";
    const activeTime = 2000;

    if (!toast.isActive(toastId)) {
      toast.warning(text, getToastStyle(toastId, activeTime));
    } else {
      toast.update(toastId, { autoClose: activeTime });
    }
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

  useEffect(
    () => {
      notifyResizeGrid();
      handleResizeGrid();
    },
    isMobile ? [isMobile, orientation] : [width, height]
  );

  const handlePageReload = () => {
    initialRender.current = true;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handlePageReload);
    return () => {
      window.removeEventListener("beforeunload", handlePageReload);
    };
  }, []);

  return (
    <>
      <TopBar
        getExplorationData={getExplorationData}
        activeTimeouts={activeTimeouts}
      />
      <Grid getExplorationData={getExplorationData} />
      <ToastContainer />
    </>
  );
};

export default App;
