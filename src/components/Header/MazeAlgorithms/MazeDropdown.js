import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, NavLink, NavItem } from "react-bootstrap";

import { makeWall, clearCell, coverGridWithWalls } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import MazeButton from "components/Header/MazeAlgorithms/MazeButton";

import recursiveDivision from "algorithms/maze/recursiveDivision";
import recursiveBacktracking from "algorithms/maze/recursiveBacktracking";
import kruskal from "algorithms/maze/kruskal";
import prim from "algorithms/maze/prim";

import { MAZE_ALGORITHMS } from "utils/constants/ids.constants";
import {
  MAKE_MAZE_SPEED,
  WALL_ANIMATION_DURATION,
} from "utils/constants/times.constants";

const MazeDropdown = ({ clearGrid, clearExploration }) => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);

  const mazeAlgorithmDoesCreateWalls = (mazeId) => {
    return mazeId === 1;
  };

  const handleStartMaze = (mazeId) => {
    dispatch(setBlockClick(true));
    let wallCellsInOrder;
    let passageCellsInOrder;

    if (mazeId === 1) {
      wallCellsInOrder = recursiveDivision(grid);
    } else if (mazeId === 2) {
      passageCellsInOrder = recursiveBacktracking(grid);
    } else if (mazeId === 3) {
      passageCellsInOrder = kruskal(grid);
    } else if (mazeId === 4) {
      passageCellsInOrder = prim(grid);
    }

    if (mazeAlgorithmDoesCreateWalls(mazeId)) {
      clearGrid();
      animateMazeWalls(wallCellsInOrder);
    } else {
      clearExploration();
      dispatch(coverGridWithWalls());
      animateMazePassages(passageCellsInOrder);
    }
  };

  const animateMazeWalls = (wallCellsInOrder) => {
    for (let [i, cell] of wallCellsInOrder.entries()) {
      setTimeout(() => {
        dispatch(makeWall(cell));
      }, MAKE_MAZE_SPEED * i);
    }

    setTimeout(() => {
      dispatch(setBlockClick(false));
    }, MAKE_MAZE_SPEED * wallCellsInOrder.length + WALL_ANIMATION_DURATION);
  };

  const animateMazePassages = (passageCellsInOrder) => {
    const delay = 400; //! because it lags a bit when covering the grid with walls. Try to solve it

    for (let [i, cell] of passageCellsInOrder.entries()) {
      setTimeout(() => {
        dispatch(clearCell(cell));
      }, MAKE_MAZE_SPEED * i + delay);
    }

    setTimeout(() => {
      dispatch(setBlockClick(false));
    }, MAKE_MAZE_SPEED * passageCellsInOrder.length + delay);
  };

  return (
    <Dropdown className="mx-2" as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Mazes</Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <MazeButton
          mazeId={1}
          mazeName={MAZE_ALGORITHMS[1]}
          startMaze={(mazeId) => handleStartMaze(mazeId)}
        />
        <MazeButton
          mazeId={2}
          mazeName={MAZE_ALGORITHMS[2]}
          startMaze={(mazeId) => handleStartMaze(mazeId)}
        />
        <MazeButton
          mazeId={3}
          mazeName={MAZE_ALGORITHMS[3]}
          startMaze={(mazeId) => handleStartMaze(mazeId)}
        />
        <MazeButton
          mazeId={4}
          mazeName={MAZE_ALGORITHMS[4]}
          startMaze={(mazeId) => handleStartMaze(mazeId)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MazeDropdown;
