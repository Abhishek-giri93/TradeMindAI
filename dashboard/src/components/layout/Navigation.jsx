import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navigation() {

  const [activeMenu, setActiveMenu] = useState(0);

  const handleMenuClick = (index) => {
    setActiveMenu(index);
  };

  return (
    <nav className="navigation d-none d-lg-flex gap-4">

      <NavLink
        to="/"
        onClick={() => handleMenuClick(0)}
        className={activeMenu === 0 ? "active-nav" : "text-secondary"}
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard"
        onClick={() => handleMenuClick(1)}
        className={activeMenu === 1 ? "active-nav" : "text-secondary"}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/orders"
        onClick={() => handleMenuClick(2)}
        className={activeMenu === 2 ? "active-nav" : "text-secondary"}
      >
        Orders
      </NavLink>

      <NavLink
        to="/funds"
        onClick={() => handleMenuClick(3)}
        className={activeMenu === 3 ? "active-nav" : "text-secondary"}
      >
        Funds
      </NavLink>

      <NavLink
        to="/apps"
        onClick={() => handleMenuClick(4)}
        className={activeMenu === 4 ? "active-nav" : "text-secondary"}
      >
        Apps
      </NavLink>

    </nav>
  );
}

export default Navigation;