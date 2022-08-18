import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";

import Cell from "components/Cell/Cell";

import {
  moveStart,
  moveEnd,
  makeWall,
  makeWeight,
  clearCell,
} from "redux/grid.slice";
import { makeHandling, resetIsHandling } from "redux/interactions.slice";

import {
  isStart,
  isEnd,
  getCellFromTouchPosition,
  makeVisitedVisually,
  makePathVisually,
} from "utils/helpers/cell.helpers";
import {
  getCoordsObject,
  clearExplorationVisually,
} from "utils/helpers/helpers";

import styles from "components/Grid/grid.module.css";

const Grid = ({ getExplorationData }) => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);
  const startCoords = useSelector((state) => state.grid.startCoords);
  const endCoords = useSelector((state) => state.grid.endCoords);
  const isGridExplored = useSelector((state) => state.grid.isExplored);
  const instrumentId = useSelector((state) => state.interactions.instrumentId);
  const blockClick = useSelector((state) => state.interactions.blockClick);
  const isHandling = useSelector((state) => state.interactions.isHandling);
  const gridPosition = useRef(null);

  const handleMouseDown = (event, cell) => {
    if (isMobile || event.button !== 0) return; //! only the left click counts

    handleStartInteraction(cell);
  };

  const handleTouchStart = (event) => {
    if (event.touches.length > 1) {
      return;
    }

    const gridRect = document.getElementById("grid").getBoundingClientRect();
    gridPosition.current = { x: gridRect.x, y: gridRect.y };

    const cell = getCellFromTouchPosition(event, gridPosition.current, grid);
    handleStartInteraction(cell);
  };

  const handleStartInteraction = (cell) => {
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
      if (!isEnd(cell, endCoords) && !isStart(cell, startCoords)) {
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
      if (!isStart(cell, startCoords) && !isEnd(cell, endCoords)) {
        dispatch(moveEnd(cell));
        newEndCoords = getCoordsObject(cell.row, cell.col);
      }
      if (isGridExplored) {
        recalculatePath(startCoords, newEndCoords);
      }
      return;
    }

    if (isHandling.wall && !cell.isWall) {
      dispatch(makeWall(cell));
    } else if (isHandling.weight && !cell.isWeight) {
      dispatch(makeWeight(cell));
    } else if (isHandling.clear && (cell.isWall || cell.isWeight)) {
      dispatch(clearCell(cell));
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length > 1) {
      return;
    }
    const cell = getCellFromTouchPosition(event, gridPosition, grid);
    handleMouseEnter(cell);
  };

  const handlePreventScrollingOrZoomig = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  useEffect(() => {
    document
      .getElementById("grid")
      .addEventListener("touchmove", (event) =>
        handlePreventScrollingOrZoomig(event)
      );

    return document
      .getElementById("grid")
      .removeEventListener("touchmove", (event) =>
        handlePreventScrollingOrZoomig(event)
      );
  });

  const recalculatePath = (newStartCoords, newEndCoords) => {
    clearExplorationVisually(grid);

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

  return (
    <div
      id={"grid"}
      className={styles["grid"]}
      onTouchStart={(event) => handleTouchStart(event)}
      onTouchMove={(event) => handleTouchMove(event)}
      onTouchEnd={() => {
        handleMouseUp();
        handleStartEndMouseUp();
      }}
      onTouchCancel={() => {
        handleMouseUp();
        handleStartEndMouseUp();
      }}
    >
      {cellElements}
    </div>
  );
};

export default Grid;
