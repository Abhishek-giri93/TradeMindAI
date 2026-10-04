import { getCurrentUser } from "../api/authApi";
import { useState, useEffect } from "react";


function Profile() {
  // usestate and useEffect-
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const fetchUser = async () => {
      try{
        const data = await getCurrentUser();
        setUser(data);
      } 
      catch(err){
        console.log("Failed to fetch user :", err);
      }
    }

    fetchUser();
    
  }, [])
  return (
    <>
      {/* ==================================================
          PROFILE PAGE
          ================================================== */}

      <div className="profile-page px-3 py-4 px-md-4">

        {/* Page Header */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">
            My Profile
          </h2>

          <p className="text-secondary mb-0">
            Manage your account and profile information.
          </p>
        </div>


        {/* Profile Overview */}
        <div className="profile-overview">

          <div className="profile-avatar">
            👤
          </div>

          <div className="profile-overview-info">
            <h4>{user?.name || "User"}</h4>

            <p className="mb-1">
              Trader
            </p>

            <small>
              Member since 2026
            </small>
          </div>

          <button
            type="button"
            className="btn btn-outline-dark profile-edit-btn"
          >
            Edit Profile
          </button>

        </div>


        {/* Account Information */}
        <div className="profile-section mt-4">

          <h5 className="fw-bold mb-4">
            Account Information
          </h5>

          <div className="row g-4">

            <div className="col-12 col-md-6">
              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                value={user?.name || "Name not found."}
                readOnly
              />
            </div>


            <div className="col-12 col-md-6">
              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                value={user?.email || "Email not found."}
                readOnly
              />
            </div>


            <div className="col-12 col-md-6">
              <label className="form-label">
                Account Type
              </label>

              <input
                type="text"
                className="form-control"
                value="Trader"
                readOnly
              />
            </div>


            <div className="col-12 col-md-6">
              <label className="form-label">
                Account Status
              </label>

              <div className="profile-status">
                <span className="status-dot"></span>
                Active
              </div>
            </div>

          </div>

        </div>


        {/* Trading Overview */}
        <div className="profile-section mt-4">

          <h5 className="fw-bold mb-4">
            Trading Overview
          </h5>

          <div className="row g-3">

            <div className="col-12 col-md-4">
              <div className="profile-stat">
                <small>Total Investments</small>
                <h4>₹50,000</h4>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="profile-stat">
                <small>Total Orders</small>
                <h4>24</h4>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="profile-stat">
                <small>Total Profit</small>
                <h4 className="profit">+₹4,500</h4>
              </div>
            </div>

          </div>

        </div>


        {/* Account Actions */}
        <div className="profile-section mt-4">

          <h5 className="fw-bold mb-4">
            Account Settings
          </h5>

          <div className="profile-actions">

            <button
              type="button"
              className="btn btn-outline-dark"
            >
              Change Password
            </button>

            <button
              type="button"
              className="btn btn-outline-danger"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;