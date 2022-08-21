import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";

import { setIsGridExplored, clearGridWallsAndWeights } from "redux/grid.slice";
import { setBlockClick } from "redux/interactions.slice";

import Title from "components/TopBar/Title";
import VisualizeButton from "components/TopBar/VisualizeButton";
import PathDropdown from "components/TopBar/PathDropdown";
import MazeDropdown from "components/TopBar/MazeDropdown";
import InstrumentDropdown from "components/TopBar/InstrumentDropdown";

import {
  clearExplorationVisually,
  clearAllTimeouts,
} from "utils/helpers/helpers";

const TopBar = ({ getExplorationData, activeTimeouts }) => {
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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid className="mx-3 py-1">
        <Title />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="container-fluid p-0 d-flex justify-content-between"
            style={{ maxWidth: "700px", marginLeft: "0px" }}
          >
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
            <Nav.Link onClick={handleClearGrid}>Clear Grid</Nav.Link>
            <Nav.Link onClick={handleClearExploration}>Clear Path</Nav.Link>
            <InstrumentDropdown />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
