import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="menus">
          <ul className="menu">
            <Link to="/">Inventory</Link>
            <span> | </span>
            <Link to="/order">Order</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
