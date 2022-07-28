import React from "react";
import Header from "components/Header/Header";
import Grid from "components/Grid/Grid";

// sistemare recalculate path

// far cominciare gli algoritmi maze dalla cella iniziale e non da quella in alto a sinistra ????
// aggiungere reset coords in grid.slice  ????

// GRID CON DIMENSIONE VARIABILE

// dijkstra e a-star: usare priority queue
// dijkstra e a-star: unvisitedCells comincia vuota e si riempie via via
// migliori funzioni per ottenere numero pari e dispari

const App = () => {
  return (
    <>
      <Header />
      <Grid />
    </>
  );
};

export default App;
