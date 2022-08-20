import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { toast } from "react-toastify";

import { setIsGridExplored } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import {
  makeVisitedVisually,
  makePathVisually,
} from "utils/helpers/cell.helpers";
import { hasWeights } from "utils/helpers/grid.helpers";
import { getToastStyle } from "utils/helpers/helpers";

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

  const pathAlgorithmIsOptimal = (id) => {
    return id === 1 || id === 2 || id === 4 || id === 6;
  };

  const notifyPathAlgorithmError = () => {
    const text = "This algorithm cannot be used with weights";
    const toastId = "algorithmError";
    const activeTime = 3000;

    if (!toast.isActive(toastId)) {
      toast.error(text, getToastStyle(toastId, activeTime));
    } else {
      toast.update(toastId, { autoClose: activeTime });
    }
  };

  const notifyPathFound = (pathLength) => {
    const text = pathLength
      ? "Found path of length " + (pathLength - 1)
      : "No path found";
    const toastId = "pathFound";
    const activeTime = 3000;

    if (!toast.isActive(toastId)) {
      if (pathLength) {
        toast.success(text, getToastStyle(toastId, activeTime));
      } else {
        toast.warning(text, getToastStyle(toastId, activeTime));
      }
    } else {
      toast.update(toastId, { render: text, autoClose: activeTime });
    }
  };

  const notifyOptimalPath = (algorithmId) => {
    const text = pathAlgorithmIsOptimal(algorithmId)
      ? "The path length is optimal"
      : "The path length might not be optimal";
    const toastId = "optimalPath";
    const activeTime = 3000;

    if (!toast.isActive(toastId)) {
      toast.info(text, getToastStyle(toastId, activeTime));
    } else {
      toast.update(toastId, { render: text, autoClose: activeTime });
    }
  };

  const handleStartAlgorithm = () => {
    if (!algorithmId) return;
    if (pathAlgorithmIsUnweighted(algorithmId) && hasWeights(grid)) {
      notifyPathAlgorithmError();
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
    notifyPathFound(path.length);

    for (let [i, cell] of path.entries()) {
      let timeout = setTimeout(() => {
        makePathVisually(cell);
      }, MAKE_PATH_SPEED * i);
      activeTimeouts.current.push(timeout);
    }

    if (path.length) {
      let timeout1 = setTimeout(() => {
        notifyOptimalPath(algorithmId);
      }, MAKE_PATH_SPEED * path.length);
      activeTimeouts.current.push(timeout1);
    }

    let timeout2 = setTimeout(() => {
      dispatch(setIsGridExplored(true));
      dispatch(setBlockClick(false));
    }, MAKE_PATH_SPEED * path.length + PATH_ANIMATION_DURATION);
    activeTimeouts.current.push(timeout2);
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
