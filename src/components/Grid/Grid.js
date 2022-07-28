import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  moveStart,
  moveEnd,
  makeWall,
  makeWeight,
  clearCell,
} from "redux/grid.slice";
import { makeHandling, resetIsHandling } from "redux/interactions.slice";

import { isStart, isEnd, haveSameCoords } from "utils/helpers/cell.helpers";
import {
  makeVisitedVisually,
  makePathVisually,
} from "utils/helpers/cell.helpers";
import { getCoordsObject } from "utils/helpers/helpers";

import Cell from "components/Cell/Cell";
import styles from "components/Grid/grid.module.css";

const Grid = ({ clearExplorationGraphic, getExplorationData }) => {
  const dispatch = useDispatch();

  const grid = useSelector((state) => state.grid.grid);
  const startCoords = useSelector((state) => state.grid.startCoords);
  const endCoords = useSelector((state) => state.grid.endCoords);
  const isGridExplored = useSelector((state) => state.grid.isExplored);

  const instrumentId = useSelector((state) => state.interactions.instrumentId);
  const blockClick = useSelector((state) => state.interactions.blockClick);
  const isHandling = useSelector((state) => state.interactions.isHandling);

  const handleMouseDown = (event, cell) => {
    if (event.button !== 0) return; //! only the left click counts
    if (blockClick) return;

    if (isStart(cell, startCoords)) {
      dispatch(makeHandling("start"));
      return;
    }
    if (isEnd(cell, endCoords)) {
      dispatch(makeHandling("end"));
      return;
    }

    if (isGridExplored) return; //! can't draw if the grid is explored

    switch (instrumentId) {
      case 1:
        dispatch(makeHandling("wall"));
        dispatch(makeWall(cell));
        break;
      case 2:
        dispatch(makeHandling("weight"));
        dispatch(makeWeight(cell));
        break;
      case 3:
        dispatch(makeHandling("clear"));
        dispatch(clearCell(cell));
        break;
    }
  };

  const handleStartEndMouseUp = () => {
    dispatch(resetIsHandling(["start", "end"]));
  };

  const handleMouseUp = () => {
    dispatch(resetIsHandling(["wall", "weight", "clear"]));
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseEnter = (cell) => {
    if (isHandling.start) {
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

    if (isHandling.end) {
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

    if (isHandling.wall) {
      dispatch(makeWall(cell));
    } else if (isHandling.weight) {
      dispatch(makeWeight(cell));
    } else if (isHandling.clear) {
      dispatch(clearCell(cell));
    }
  };

  const recalculatePath = (newStartCoords, newEndCoords) => {
    clearExplorationGraphic();

    const [visitedCellsInOrder, path] = getExplorationData(
      newStartCoords,
      newEndCoords
    );

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
