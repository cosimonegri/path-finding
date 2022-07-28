import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setIsCreatingWall,
  setIsCreatingWeight,
  setIsClearing,
} from "redux/interactions.slice";

import Cell from "components/Cell/Cell";
import styles from "components/Grid/grid.module.css";

const Grid = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);

  const handleMouseUp = () => {
    dispatch(setIsCreatingWall(false));
    dispatch(setIsCreatingWeight(false));
    dispatch(setIsClearing(false));
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const cellElements = grid.map((row, rowIndex) => {
    return (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => {
          return <Cell key={colIndex} cell={cell} />;
        })}
      </React.Fragment>
    );
  });

  return <div className={styles["grid-row"]}>{cellElements}</div>;
};

export default Grid;

// const recalculatePath = (endRow, endCol) => {
//   // used when moving the End Cell after startAlgo has terminated
//   // setblockClick(true);
//   const path = getPath(grid, startCoords, { row: endRow, col: endCol });
//   instantSearch(visitedCellsInOrder, path, endRow, endCol);
// };

// const instantSearch = (visitedCellsInOrder, path, endRow, endCol) => {
//   if (visitedCellsInOrder.length === 0) {
//     setblockClick(false);
//     setIsGridExplored(true);
//     return;
//   }

//   let i = 0;
//   for (i; i < visitedCellsInOrder.length; i++) {
//     const { row, col } = visitedCellsInOrder[i];
//     if (row == endRow && col == endCol) {
//       instantPath(path, endRow, endCol);
//       break;
//     }

//     document.getElementById(
//       `cell-${row}-${col}`
//     ).className = `${cellStyles.cell} ${cellStyles.visited}`;

//     if (i === visitedCellsInOrder.length - 1) {
//       instantPath(path, endRow, endCol);
//     }
//   }

//   for (i; i < visitedCellsInOrder.length; i++) {
//     const { row, col } = visitedCellsInOrder[i];
//     if (row == startCoords.row && col == startCoords.col) {
//       continue;
//     }

//     document.getElementById(
//       `cell-${row}-${col}`
//     ).className = `${cellStyles.cell}`;
//   }
// };

// const instantPath = (path, endRow, endCol) => {
//   if (path.length === 0) {
//     setblockClick(false);
//     setIsGridExplored(true);
//     return;
//   }

//   let i = 0;
//   for (i; i < path.length; i++) {
//     const { row, col } = path[i];
//     if (row == endRow && col == endCol) {
//       setblockClick(false);
//       setIsGridExplored(true);
//       break;
//     }

//     document.getElementById(
//       `cell-${row}-${col}`
//     ).className = `${cellStyles.cell} ${cellStyles.path}`;
//   }
// };
