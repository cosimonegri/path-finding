import React from "react";
import { useSelector } from "react-redux";

import Header from "components/Header/Header";
import Grid from "components/Grid/Grid";

import dijkstra from "algorithms/path/dijkstra";
import aStar from "algorithms/path/aStar";
import bfs from "algorithms/path/bfs";
import dfs from "algorithms/path/dfs";

import { clearCellVisually } from "utils/helpers/cell.helpers";

// si puo diegnare mura anche quando griglia esplorata

// far cominciare gli algoritmi maze dalla cella iniziale e non da quella in alto a sinistra ????

// GRID CON DIMENSIONE VARIABILE

// dijkstra e a-star: usare priority queue
// dijkstra e a-star: unvisitedCells comincia vuota e si riempie via via
// migliori funzioni per ottenere numero pari e dispari

const App = () => {
  const grid = useSelector((state) => state.grid.grid);
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

  return (
    <>
      <Header
        clearExplorationGraphic={clearExplorationGraphic}
        getExplorationData={getExplorationData}
      />
      <Grid
        clearExplorationGraphic={clearExplorationGraphic}
        getExplorationData={getExplorationData}
      />
    </>
  );
};

export default App;
