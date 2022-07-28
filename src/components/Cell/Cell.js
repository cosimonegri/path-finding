import React from "react";
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

import { IconContext } from "react-icons";
import { MdArrowForwardIos } from "react-icons/md";
import { SiTarget } from "react-icons/si";
import { FaWeightHanging } from "react-icons/fa";

import { ICON_COLOR } from "utils/constants/constants";
import {
  isStart,
  isEnd,
  isOnlyWeight,
  haveSameCoords,
} from "utils/helpers/cell.helpers";

import styles from "components/Cell/cell.module.css";

const Cell = ({ cell }) => {
  const dispatch = useDispatch();
  const startCoords = useSelector((state) => state.grid.startCoords);
  const endCoords = useSelector((state) => state.grid.endCoords);
  const isGridExplored = useSelector((state) => state.grid.isExplored);
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

  const getCellClassName = (cell, startCoords, endCoords) => {
    if (isStart(cell, startCoords) || isEnd(cell, endCoords)) {
      return styles.cell;
    } else if (cell.isWall) {
      return `${styles.cell} ${styles.wall}`;
    } else {
      return styles.cell;
    }
  };

  const getCellStyle = (isGridExplored) => {
    if (isGridExplored) {
      return { animationDuration: "0s" };
    } else {
      return {};
    }
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0) return; //! only the left click counts
    if (blockClick || isGridExplored) return;

    if (isStart(cell, startCoords)) {
      dispatch(setIsMovingStart(true));
      return;
    }
    if (isEnd(cell, endCoords)) {
      dispatch(setIsMovingEnd(true));
      return;
    }

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

  const handleMouseEnter = () => {
    if (isMovingStart) {
      if (!haveSameCoords(cell, endCoords)) {
        dispatch(moveStart(cell));
      }
    } else if (isMovingEnd) {
      if (!haveSameCoords(cell, startCoords)) {
        dispatch(moveEnd(cell));
      }
    } else if (isCreatingWall) {
      dispatch(makeWall(cell));
    } else if (isCreatingWeight) {
      dispatch(makeWeight(cell));
    } else if (isClearing) {
      dispatch(clearCell(cell));
    }
  };

  const handleStartEndMouseUp = () => {
    dispatch(setIsMovingStart(false));
    dispatch(setIsMovingEnd(false));
  };

  return (
    <IconContext.Provider value={{ color: ICON_COLOR }}>
      <div
        id={`cell-${cell.row}-${cell.col}`}
        className={getCellClassName(cell, startCoords, endCoords)}
        style={getCellStyle(isGridExplored)}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleStartEndMouseUp}
      >
        {isStart(cell, startCoords) && (
          <MdArrowForwardIos className={styles.start} />
        )}
        {isEnd(cell, endCoords) && <SiTarget className={styles.end} />}
        {isOnlyWeight(cell, startCoords, endCoords) && (
          <FaWeightHanging className={styles.weight} />
        )}
      </div>
    </IconContext.Provider>
  );
};

export default Cell;
