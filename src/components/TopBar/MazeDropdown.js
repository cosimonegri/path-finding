import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, NavLink, NavItem } from "react-bootstrap";

import { makeWall, clearCell, coverGridWithWalls } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import recursiveDivision from "algorithms/maze/recursiveDivision";
import recursiveBacktracking from "algorithms/maze/recursiveBacktracking";
import kruskal from "algorithms/maze/kruskal";
import prim from "algorithms/maze/prim";
import binaryTree from "algorithms/maze/binaryTree";

import { MAZE_ALGORITHMS } from "utils/constants/ids.constants";
import {
  MAKE_MAZE_SPEED,
  WALL_ANIMATION_DURATION,
} from "utils/constants/times.constants";

const MazeDropdown = ({ clearGrid, clearExploration, activeTimeouts }) => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);

  const mazeAlgorithmOnWalls = (mazeId) => {
    return mazeId === 1;
  };

  const handleStartMaze = (mazeId) => {
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
    } else if (mazeId === 5) {
      passageCellsInOrder = binaryTree(grid);
    }

    if (mazeAlgorithmOnWalls(mazeId)) {
      clearGrid();
      dispatch(setBlockClick(true));
      animateMazeWalls(wallCellsInOrder);
    } else {
      clearExploration();
      dispatch(coverGridWithWalls());
      dispatch(setBlockClick(true));
      animateMazePassages(passageCellsInOrder);
    }
  };

  const animateMazeWalls = (wallCellsInOrder) => {
    for (let [i, cell] of wallCellsInOrder.entries()) {
      let timeout = setTimeout(() => {
        dispatch(makeWall(cell));
      }, MAKE_MAZE_SPEED * i);
      activeTimeouts.current.push(timeout);
    }

    let timeout = setTimeout(() => {
      dispatch(setBlockClick(false));
    }, MAKE_MAZE_SPEED * wallCellsInOrder.length + WALL_ANIMATION_DURATION);
    activeTimeouts.current.push(timeout);
  };

  const animateMazePassages = (passageCellsInOrder) => {
    const delay = 400; //! because it lags a bit when covering the grid with walls. Try to solve it

    for (let [i, cell] of passageCellsInOrder.entries()) {
      let timeout = setTimeout(() => {
        dispatch(clearCell(cell));
      }, MAKE_MAZE_SPEED * i + delay);
      activeTimeouts.current.push(timeout);
    }

    let timeout = setTimeout(() => {
      dispatch(setBlockClick(false));
    }, MAKE_MAZE_SPEED * passageCellsInOrder.length + delay);
    activeTimeouts.current.push(timeout);
  };

  return (
    <Dropdown className="mx-2" as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Maze Algorithms</Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        {[...Array(5).keys()].map((i) => {
          return (
            <Dropdown.Item key={i + 1} onClick={() => handleStartMaze(i + 1)}>
              {MAZE_ALGORITHMS[i + 1]}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MazeDropdown;
