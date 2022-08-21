import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, NavLink, NavItem } from "react-bootstrap";

import { setInstrumentId } from "redux/interactions.slice";

import { INSTRUMENTS } from "utils/constants/ids.constants";

const InstrumentDropdown = () => {
  const dispatch = useDispatch();
  const instrumentId = useSelector((state) => state.interactions.instrumentId);

  return (
    <Dropdown className="mx-2" as={NavItem}>
      <Dropdown.Toggle as={NavLink}>
        {INSTRUMENTS[instrumentId]}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => dispatch(setInstrumentId(1))}>
          {INSTRUMENTS[1]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setInstrumentId(2))}>
          {INSTRUMENTS[2]}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setInstrumentId(3))}>
          {INSTRUMENTS[3]}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default InstrumentDropdown;
