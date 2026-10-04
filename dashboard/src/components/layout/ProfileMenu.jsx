import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getCurrentUser, logoutUser } from "../../api/authApi";

function ProfileMenu() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // ==========================================
  // FETCH CURRENT USER
  // ==========================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.log("Failed to fetch current user:", err);
      }
    };

    fetchUser();
  }, []);

  // ==========================================
  // HANDLE LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await logoutUser();

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <div className="dropdown">

      {/* Profile Button */}
      <button
        type="button"
        className="btn btn-light rounded-circle p-2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        👤
      </button>

      <div className="dropdown-menu dropdown-menu-end p-2">

        {/* Profile Info */}
        <div className="px-3 py-2">
          <div className="fw-semibold">
            {user?.name || "User"}
          </div>

          <small className="text-secondary">
            Trader
          </small>
        </div>

        <div className="dropdown-divider"></div>

        {/* Profile */}
        <NavLink
          to="/profile"
          className="dropdown-item rounded"
        >
          My Profile
        </NavLink>

        {/* Settings */}
        <button
          type="button"
          className="dropdown-item rounded"
        >
          Settings
        </button>

        <div className="dropdown-divider"></div>

        {/* Logout */}
        <button
          type="button"
          className="dropdown-item rounded text-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default ProfileMenu;