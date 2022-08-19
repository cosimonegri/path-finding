import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  isClear,
  getCellFromTouchPosition,
  makeVisitedVisually,
  makePathVisually,
} from "utils/helpers/cell.helpers";
import {
  isClickLeft,
  isTouchMultiple,
} from "utils/helpers/interactions.helpers";
import {
  getCoordsObject,
  clearExplorationVisually,
} from "utils/helpers/helpers";

import styles from "components/Grid/grid.module.css";

const Grid = ({ getExplorationData }) => {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.device.isMobile);
  const grid = useSelector((state) => state.grid.grid);
  const startCoords = useSelector((state) => state.grid.startCoords);
  const endCoords = useSelector((state) => state.grid.endCoords);
  const isGridExplored = useSelector((state) => state.grid.isExplored);
  const instrumentId = useSelector((state) => state.interactions.instrumentId);
  const blockClick = useSelector((state) => state.interactions.blockClick);
  const isHandling = useSelector((state) => state.interactions.isHandling);
  const gridStartPosition = useRef(null);

  const updateGridStartPosition = () => {
    const gridRect = document.getElementById("grid").getBoundingClientRect();
    gridStartPosition.current = { x: gridRect.x, y: gridRect.y };
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

    if (isGridExplored) return; //! can't draw if the grid is already explored

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

  const handleContinueInteraction = (cell) => {
    if (isHandling.start) {
      let newStartCoords = startCoords;
      if (isClear(cell, startCoords, endCoords)) {
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
      if (isClear(cell, startCoords, endCoords)) {
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

  const handleMouseDown = (event, cell) => {
    if (isMobile || !isClickLeft(event)) return;
    handleStartInteraction(cell);
  };

  const handleTouchStart = (event) => {
    // if (!isMobile) return;
    if (!isMobile || isTouchMultiple(event)) return;

    updateGridStartPosition();
    const cell = getCellFromTouchPosition(event, gridStartPosition, grid);
    handleStartInteraction(cell);
  };

  const handleMouseEnter = (event, cell) => {
    if (isMobile || !isClickLeft(event)) return;
    handleContinueInteraction(cell);
  };

  const handleTouchMove = (event) => {
    // if (!isMobile) return;
    if (!isMobile || isTouchMultiple(event)) return;

    // updateGridStartPosition();
    const cell = getCellFromTouchPosition(event, gridStartPosition, grid);
    handleContinueInteraction(cell);
  };

  const handleStartEndMouseUp = () => {
    dispatch(resetIsHandling(["start", "end"]));
  };

  const handleInstrumentMouseUp = () => {
    dispatch(resetIsHandling(["wall", "weight", "clear"]));
  };

  const handleMouseUp = () => {
    handleStartEndMouseUp();
    handleInstrumentMouseUp();
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleInstrumentMouseUp);
    return () => window.removeEventListener("mouseup", handleInstrumentMouseUp);
  }, []);

  const handlePreventScrollingOrZoomig = (event) => {
    event.preventDefault();
    // event.stopImmediatePropagation();
  };

  //! la modifica potrebbe dare problemi?
  useEffect(() => {
    const gridElement = document.getElementById("grid");
    gridElement.addEventListener("touchmove", (event) =>
      handlePreventScrollingOrZoomig(event)
    );

    return gridElement.removeEventListener("touchmove", (event) =>
      handlePreventScrollingOrZoomig(event)
    );
  });

  const recalculatePath = (newStartCoords, newEndCoords) => {
    clearExplorationVisually(grid);
    const [visitedCellsInOrder, path] = getExplorationData(
      newStartCoords,
      newEndCoords
    );

    for (let cell of visitedCellsInOrder) {
      makeVisitedVisually(cell);
    }
    for (let cell of path) {
      makePathVisually(cell);
    }
  };

  return (
    <div
      id={"grid"}
      className={styles["grid"]}
      onTouchStart={(event) => handleTouchStart(event)}
      onTouchMove={(event) => handleTouchMove(event)}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
    >
      {grid.map((row, rowIndex) => {
        return (
          <React.Fragment key={rowIndex}>
            {row.map((cell, colIndex) => {
              return (
                <Cell
                  key={colIndex}
                  cell={cell}
                  handleMouseDown={(event) => handleMouseDown(event, cell)}
                  handleMouseEnter={(event) => handleMouseEnter(event, cell)}
                  handleStartEndMouseUp={handleStartEndMouseUp}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Grid;
