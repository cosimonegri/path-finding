import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  moveStart,
  moveEnd,
  makeWall,
  makeWeight,
  clearCell,
} from "redux/grid.slice";
import {
  setIsMovingStart,
  setIsMovingEnd,
  setIsCreatingWall,
  setIsCreatingWeight,
  setIsClearing,
} from "redux/interactions.slice";

import dijkstra from "algorithms/path/dijkstra";
import aStar from "algorithms/path/aStar";
import bfs from "algorithms/path/bfs";
import dfs from "algorithms/path/dfs";

import { isStart, isEnd, haveSameCoords } from "utils/helpers/cell.helpers";
import {
  makeVisitedVisually,
  makePathVisually,
} from "utils/helpers/cell.helpers";
import { getCoordsObject } from "utils/helpers/helpers";

import Cell from "components/Cell/Cell";
import styles from "components/Grid/grid.module.css";

const Grid = ({ clearExplorationGraphic }) => {
  const dispatch = useDispatch();

  const grid = useSelector((state) => state.grid.grid);
  const startCoords = useSelector((state) => state.grid.startCoords);
  const endCoords = useSelector((state) => state.grid.endCoords);
  const isGridExplored = useSelector((state) => state.grid.isExplored);

  const algorithmId = useSelector((state) => state.interactions.algorithmId);
  const instrumentId = useSelector((state) => state.interactions.instrumentId);
  const blockClick = useSelector((state) => state.interactions.blockClick);
  const isMovingStart = useSelector(
    (state) => state.interactions.isMovingStart
  );
  const isMovingEnd = useSelector((state) => state.interactions.isMovingEnd);
  const isCreatingWall = useSelector(
    (state) => state.interactions.isCreatingWall
  );
  const isCreatingWeight = useSelector(
    (state) => state.interactions.isCreatingWeight
  );
  const isClearing = useSelector((state) => state.interactions.isClearing);

  const handleMouseDown = (event, cell) => {
    if (event.button !== 0) return; //! only the left click counts
    if (blockClick) return;

    if (isStart(cell, startCoords)) {
      dispatch(setIsMovingStart(true));
      return;
    }
    if (isEnd(cell, endCoords)) {
      dispatch(setIsMovingEnd(true));
      return;
    }

    if (isGridExplored) return; //! can't draw if the grid is explored

    switch (instrumentId) {
      case 1:
        dispatch(setIsCreatingWall(true));
        dispatch(makeWall(cell));
        break;
      case 2:
        dispatch(setIsCreatingWeight(true));
        dispatch(makeWeight(cell));
        break;
      case 3:
        dispatch(setIsClearing(true));
        dispatch(clearCell(cell));
        break;
    }
  };

  const handleStartEndMouseUp = () => {
    if (isMovingStart) {
      dispatch(setIsMovingStart(false));
    }
    if (isMovingEnd) {
      dispatch(setIsMovingEnd(false));
    }
  };

  const handleMouseUp = () => {
    if (isCreatingWall) {
      dispatch(setIsCreatingWall(false));
    }
    if (isCreatingWeight) {
      dispatch(setIsCreatingWeight(false));
    }
    if (isClearing) {
      dispatch(setIsClearing(false));
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseEnter = (cell) => {
    if (isMovingStart) {
      let newStartCoords = startCoords;
      if (!haveSameCoords(cell, endCoords)) {
        dispatch(moveStart(cell));
        newStartCoords = getCoordsObject(cell.row, cell.col);
      }
      if (isGridExplored) {
        recalculatePath(newStartCoords, endCoords);
      }
      return;
    }

    if (isMovingEnd) {
      let newEndCoords = endCoords;
      if (!haveSameCoords(cell, startCoords)) {
        dispatch(moveEnd(cell));
        newEndCoords = getCoordsObject(cell.row, cell.col);
      }
      if (isGridExplored) {
        recalculatePath(startCoords, newEndCoords);
      }
      return;
    }

    if (isCreatingWall) {
      dispatch(makeWall(cell));
    } else if (isCreatingWeight) {
      dispatch(makeWeight(cell));
    } else if (isClearing) {
      dispatch(clearCell(cell));
    }
  };

  const recalculatePath = (startCoords, endCoords) => {
    clearExplorationGraphic();
    let visitedCellsInOrder;
    let path;

    if (algorithmId === 1) {
      [visitedCellsInOrder, path] = dijkstra(grid, startCoords, endCoords);
    } else if (algorithmId === 2) {
      [visitedCellsInOrder, path] = aStar(grid, startCoords, endCoords);
    } else if (algorithmId === 3) {
      [visitedCellsInOrder, path] = bfs(grid, startCoords, endCoords);
    } else if (algorithmId === 4) {
      [visitedCellsInOrder, path] = dfs(grid, startCoords, endCoords);
    }

    instantSearch(visitedCellsInOrder);
    instantPath(path);
  };

  const instantSearch = (visitedCellsInOrder) => {
    for (let cell of visitedCellsInOrder) {
      makeVisitedVisually(cell);
    }
  };

  const instantPath = (path) => {
    for (let cell of path) {
      makePathVisually(cell);
    }
  };

  const cellElements = grid.map((row, rowIndex) => {
    return (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => {
          return (
            <Cell
              key={colIndex}
              cell={cell}
              handleMouseDown={(event) => handleMouseDown(event, cell)}
              handleMouseEnter={() => handleMouseEnter(cell)}
              handleStartEndMouseUp={handleStartEndMouseUp}
            />
          );
        })}
      </React.Fragment>
    );
  });

  return <div className={styles["grid-row"]}>{cellElements}</div>;
};

export default Grid;
