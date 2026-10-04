import { NavLink } from "react-router-dom";

import Logo from "./Logo";
import StockSearch from "./StockSearch";
import Navigation from "./Navigation";
import ProfileMenu from "./ProfileMenu";

function TopBar() {
  return (
    <header className="topbar container-fluid border-bottom py-3">
      <div className="row align-items-center g-3">

        {/* Logo */}
        <div className="col-auto">
          <Logo />
        </div>

        {/* Search */}
        <div className="col-12 col-md">
          <StockSearch />
        </div>

        {/* Desktop Navigation */}
        <div className="col-auto d-none d-lg-block">
          <Navigation />
        </div>

        {/* Tablet / Mobile Navigation */}
        <div className="col-auto d-lg-none">
          <div className="dropdown">

            <button
              className="btn btn-outline-light"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="d-none d-md-inline">
                Navigation
              </span>

              <span className="d-md-none">
                ☰
              </span>
            </button>

            <div className="dropdown-menu dropdown-menu-end p-2">

              <NavLink
                className="dropdown-item rounded"
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className="dropdown-item rounded"
                to="/dashboard"
              >
                Dashboard
              </NavLink>

              <NavLink
                className="dropdown-item rounded"
                to="/orders"
              >
                Orders
              </NavLink>

              <NavLink
                className="dropdown-item rounded"
                to="/funds"
              >
                Funds
              </NavLink>

              <NavLink
                className="dropdown-item rounded"
                to="/apps"
              >
                Apps
              </NavLink>

              <div className="dropdown-divider"></div>

              <div className="dropdown-item rounded">
                👤 Profile
              </div>

            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="col-auto d-none d-md-block">
          <ProfileMenu />
        </div>

      </div>
    </header>
  );
}

export default TopBar;