import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown, NavLink, NavItem } from "react-bootstrap";

import { setAlgorithmId } from "redux/interactions.slice";

import { PATH_ALGORITHMS } from "utils/constants/ids.constants";

const PathDropdown = () => {
  const dispatch = useDispatch();

  return (
    <Dropdown className="mx-2" as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Algorithms</Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(1))}>
          {PATH_ALGORITHMS[1]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(2))}>
          {PATH_ALGORITHMS[2]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(3))}>
          {PATH_ALGORITHMS[3]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(4))}>
          {PATH_ALGORITHMS[4]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setAlgorithmId(5))}>
          {PATH_ALGORITHMS[5]}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PathDropdown;
