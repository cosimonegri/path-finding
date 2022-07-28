import React from "react";
import { useSelector } from "react-redux";

import { IconContext } from "react-icons";
import { MdArrowForwardIos } from "react-icons/md";
import { SiTarget } from "react-icons/si";
import { FaWeightHanging } from "react-icons/fa";

import {
  isStart,
  isEnd,
  isOnlyWall,
  isOnlyWeight,
} from "utils/helpers/cell.helpers";

import { ICON_COLOR } from "utils/constants/constants";
import styles from "components/Cell/cell.module.css";

const Cell = ({
  cell,
  handleMouseDown,
  handleMouseEnter,
  handleStartEndMouseUp,
}) => {
  const startCoords = useSelector((state) => state.grid.startCoords);
  const endCoords = useSelector((state) => state.grid.endCoords);
  const isGridExplored = useSelector((state) => state.grid.isExplored);

  const getCellClassName = (cell, startCoords, endCoords) => {
    if (isOnlyWall(cell, startCoords, endCoords)) {
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
