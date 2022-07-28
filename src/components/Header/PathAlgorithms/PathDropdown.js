import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown, NavLink, NavItem } from "react-bootstrap";

import { setAlgorithmId } from "redux/interactions.slice";

const PathDropdown = () => {
  const dispatch = useDispatch();

  const ALGORITHMS = {
    1: "Dijkstra's Algorithm",
    2: "A* Search",
    3: "Breadth-First Search",
    4: "Depth-First Search",
  };

  return (
    <Dropdown className="mx-2" as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Algorithms</Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(1))}>
          {ALGORITHMS[1]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(2))}>
          {ALGORITHMS[2]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(3))}>
          {ALGORITHMS[3]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(4))}>
          {ALGORITHMS[4]}
        </Dropdown.Item>
        <Dropdown.Item>Bellman-Ford Algorithm</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PathDropdown;
