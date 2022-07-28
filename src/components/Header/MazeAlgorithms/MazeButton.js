import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";

const MazeButton = ({ mazeId, mazeName, startMaze }) => {
  const blockClick = useSelector((state) => state.interactions.blockClick);

  return (
    <Dropdown.Item onClick={() => startMaze(mazeId)} disabled={blockClick}>
      {mazeName}
    </Dropdown.Item>
  );
};

export default MazeButton;
