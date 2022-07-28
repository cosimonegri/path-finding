import React from "react";
import { useSelector } from "react-redux";

import Header from "components/Header/Header";
import Grid from "components/Grid/Grid";

import { clearCellVisually } from "utils/helpers/cell.helpers";

// sistemare recalculate path

// anche se grid explored, quando clicco su visualize algorithm azzera e fa vedere animazione

// far cominciare gli algoritmi maze dalla cella iniziale e non da quella in alto a sinistra ????
// aggiungere reset coords in grid.slice  ????

// GRID CON DIMENSIONE VARIABILE

// dijkstra e a-star: usare priority queue
// dijkstra e a-star: unvisitedCells comincia vuota e si riempie via via
// migliori funzioni per ottenere numero pari e dispari

const App = () => {
  const grid = useSelector((state) => state.grid.grid);

  const clearExplorationGraphic = () => {
    for (let row of grid) {
      for (let cell of row) {
        clearCellVisually(cell);
      }
    }
  };

  return (
    <>
      <Header clearExplorationGraphic={clearExplorationGraphic} />
      <Grid clearExplorationGraphic={clearExplorationGraphic} />
    </>
  );
};

export default App;
