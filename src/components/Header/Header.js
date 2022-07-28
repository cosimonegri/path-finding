import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";

import { setIsGridExplored, clearGridWallsAndWeights } from "redux/grid.slice";

import VisualizeButton from "components/Header/PathAlgorithms/VisualizeButton";
import PathDropdown from "components/Header/PathAlgorithms/PathDropdown";
import MazeDropdown from "components/Header/MazeAlgorithms/MazeDropdown";
import InstrumentDropdown from "components/Header/InstrumentDropdown";

const Header = ({
  clearExplorationGraphic,
  getExplorationData,
  activeTimeouts,
}) => {
  const dispatch = useDispatch();
  const blockClick = useSelector((state) => state.interactions.blockClick);

  const handleClearGrid = () => {
    clearExplorationGraphic();
    dispatch(setIsGridExplored(false));
    dispatch(clearGridWallsAndWeights());
  };

  const handleClearExploration = () => {
    clearExplorationGraphic();
    dispatch(setIsGridExplored(false));
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
            <Nav.Link
              className="mx-2"
              onClick={handleClearGrid}
              disabled={blockClick}
            >
              Clear Grid
            </Nav.Link>
            <Nav.Link
              className="mx-2"
              onClick={handleClearExploration}
              disabled={blockClick}
            >
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
