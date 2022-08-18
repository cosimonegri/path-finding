import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";

import { setIsGridExplored } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import {
  makeVisitedVisually,
  makePathVisually,
} from "utils/helpers/cell.helpers";
import { hasWeights } from "utils/helpers/grid.helpers";

import { PATH_ALGORITHMS_SHORT } from "utils/constants/ids.constants";
import {
  MAKE_VISITED_SPEED,
  MAKE_PATH_SPEED,
  PATH_ANIMATION_DURATION,
} from "utils/constants/times.constants";

const VisualizeButton = ({
  getExplorationData,
  clearExploration,
  activeTimeouts,
}) => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);
  const startCoords = useSelector((state) => state.grid.startCoords);
  const endCoords = useSelector((state) => state.grid.endCoords);
  const algorithmId = useSelector((state) => state.interactions.algorithmId);

  const getButtonName = (id) => {
    if (id) {
      return "Visualize " + PATH_ALGORITHMS_SHORT[id];
    } else {
      return "Visualize";
    }
  };

  const pathAlgorithmIsUnweighted = (id) => {
    return id === 4 || id === 5 || id === 6;
  };

  const handleStartAlgorithm = () => {
    if (!algorithmId) return;
    if (pathAlgorithmIsUnweighted(algorithmId) && hasWeights(grid)) {
      console.log("This algorithm cannot be used with weights.");
      //! add an alert
      return;
    }

    clearExploration();
    dispatch(setBlockClick(true));

    const [visitedCellsInOrder, path] = getExplorationData(
      startCoords,
      endCoords
    );

    animateSearch(visitedCellsInOrder, path);
  };

  const animateSearch = (visitedCellsInOrder, path) => {
    for (let [i, cell] of visitedCellsInOrder.entries()) {
      let timeout = setTimeout(() => {
        makeVisitedVisually(cell);
      }, MAKE_VISITED_SPEED * i);
      activeTimeouts.current.push(timeout);
    }

    let timeout = setTimeout(() => {
      animatePath(path);
    }, MAKE_VISITED_SPEED * visitedCellsInOrder.length); //! + VISITED_ANIMATION_DURATION ???
    activeTimeouts.current.push(timeout);
  };

  const animatePath = (path) => {
    for (let [i, cell] of path.entries()) {
      let timeout = setTimeout(() => {
        makePathVisually(cell);
      }, MAKE_PATH_SPEED * i);
      activeTimeouts.current.push(timeout);
    }

    let timeout = setTimeout(() => {
      dispatch(setIsGridExplored(true));
      dispatch(setBlockClick(false));
    }, MAKE_PATH_SPEED * path.length + PATH_ANIMATION_DURATION);
    activeTimeouts.current.push(timeout);
  };

  return (
    <Nav.Link
      className="mx-2"
      onClick={handleStartAlgorithm}
      disabled={!algorithmId}
    >
      {getButtonName(algorithmId)}
    </Nav.Link>
  );
};

export default VisualizeButton;
