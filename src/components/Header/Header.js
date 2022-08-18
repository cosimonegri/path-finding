import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";

import { setIsGridExplored, clearGridWallsAndWeights } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import VisualizeButton from "components/Header/PathAlgorithms/VisualizeButton";
import PathDropdown from "components/Header/PathAlgorithms/PathDropdown";
import MazeDropdown from "components/Header/MazeDropdown";
import InstrumentDropdown from "components/Header/InstrumentDropdown";

import {
  clearExplorationVisually,
  clearAllTimeouts,
} from "utils/helpers/helpers";

const Header = ({ getExplorationData, activeTimeouts }) => {
  const dispatch = useDispatch();
  const grid = useSelector((state) => state.grid.grid);

  const handleClearExploration = () => {
    clearAllTimeouts(activeTimeouts.current);
    clearExplorationVisually(grid);
    dispatch(setIsGridExplored(false));
    dispatch(setBlockClick(false));
  };

  const handleClearGrid = () => {
    handleClearExploration();
    dispatch(clearGridWallsAndWeights());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid className="mx-3 py-2">
        <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <VisualizeButton
              getExplorationData={getExplorationData}
              clearExploration={handleClearExploration}
              activeTimeouts={activeTimeouts}
            />
            <PathDropdown />
            <MazeDropdown
              clearGrid={handleClearGrid}
              clearExploration={handleClearExploration}
              activeTimeouts={activeTimeouts}
            />
            <Nav.Link className="mx-2" onClick={handleClearGrid}>
              Clear Grid
            </Nav.Link>
            <Nav.Link className="mx-2" onClick={handleClearExploration}>
              Clear Path
            </Nav.Link>
            <InstrumentDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
