import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown, NavLink, NavItem } from "react-bootstrap";

import { setAlgorithmId } from "redux/interactions.slice";

import { PATH_ALGORITHMS } from "utils/constants/ids.constants";

const PathDropdown = () => {
  const dispatch = useDispatch();

  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Algorithms</Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        {[...Array(6).keys()].map((i) => {
          return (
            <Dropdown.Item
              key={i + 1}
              onClick={() => dispatch(setAlgorithmId(i + 1))}
            >
              {PATH_ALGORITHMS[i + 1]}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PathDropdown;
