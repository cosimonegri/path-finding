import React from "react";
import { Navbar } from "react-bootstrap";
import { BsGithub } from "react-icons/bs";

const Title = () => {
  const redirectOnGithub = () => {
    window.location.href =
      "https://github.com/cosimonegri/pathfinding-visualizer";
  };

  return (
    <Navbar.Brand className="d-flex align-items-center">
      <span style={{ paddingRight: "16px" }}>Pathfinding Visualizer</span>
      <BsGithub
        style={{ cursor: "pointer", marginRight: "8px" }}
        onClick={redirectOnGithub}
      />
    </Navbar.Brand>
  );
};

export default Title;
